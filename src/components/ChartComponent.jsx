// src/components/ChartComponent.js
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation";
import styled from "styled-components";
import { product_data } from "../dummyData";

const ChartContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const ChartCanvas = styled.canvas`
  width: 1200px;
  height: 400px;
`;

const pastelColors = [
  "rgba(255, 179, 186, 0.6)",
  "rgba(255, 223, 186, 0.6)",
  "rgba(255, 255, 186, 0.6)",
  "rgba(186, 255, 201, 0.6)",
  "rgba(186, 225, 255, 0.6)",
  "rgba(204, 204, 255, 0.6)",
  "rgba(255, 204, 229, 0.6)",
  "rgba(255, 255, 204, 0.6)",
  "rgba(204, 255, 204, 0.6)",
  "rgba(204, 229, 255, 0.6)",
];

// 플러그인 등록
Chart.register(annotationPlugin);

const ChartComponent = ({
  activeView,
  selectedProductCategory,
  selectedProducts,
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const dataOptions = product_data[selectedProductCategory]?.data;
    const datasets =
      activeView === "monthly"
        ? selectedProducts.map((product, index) => ({
            label: product,
            data: dataOptions[product]?.monthly || [],
            backgroundColor: pastelColors[index % pastelColors.length],
            borderColor: pastelColors[index % pastelColors.length].replace(
              "0.6",
              "1"
            ),
            borderWidth: 1,
          }))
        : selectedProducts.map((product, index) => ({
            label: product,
            data: dataOptions[product]?.weekly || [],
            backgroundColor: pastelColors[index % pastelColors.length],
            borderColor: pastelColors[index % pastelColors.length].replace(
              "0.6",
              "1"
            ),
            borderWidth: 1,
          }));

    const labels =
      activeView === "monthly"
        ? Array.from({ length: 12 }, (_, i) => `${i + 1}월`)
        : Array.from(
            { length: 54 },
            (_, i) => `WW${String(i + 1).padStart(2, "0")}`
          );

    if (chartInstance.current) {
      // 차트 인스턴스가 이미 존재할 경우 데이터만 업데이트
      chartInstance.current.data.labels = labels;
      chartInstance.current.data.datasets = datasets;
      chartInstance.current.update();
    } else {
      // 차트 인스턴스가 존재하지 않을 경우 새로 생성
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: datasets,
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              min: 65,
            },
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
              align: "end",
              labels: {
                generateLabels: function (chart) {
                  const datasets = chart.data.datasets;
                  const annotations =
                    chart.options.plugins.annotation.annotations;
                  let legendItems = datasets.map((dataset, i) => ({
                    text: dataset.label,
                    fillStyle: dataset.backgroundColor,
                    strokeStyle: dataset.borderColor,
                    lineWidth: dataset.borderWidth,
                    hidden: !chart.isDatasetVisible(i),
                    index: i,
                  }));

                  if (annotations) {
                    const annotationLabels = Object.values(annotations).map(
                      (annotation, i) => ({
                        text: annotation.label.content,
                        fillStyle: annotation.borderColor,
                        strokeStyle: annotation.borderColor,
                        lineWidth: annotation.borderWidth,
                        hidden: false,
                        index: datasets.length + i,
                      })
                    );
                    legendItems = legendItems.concat(annotationLabels);
                  }

                  return legendItems;
                },
              },
              onClick: (e, legendItem, legend) => {
                const index = legendItem.index;
                if (index < legend.chart.data.datasets.length) {
                  // 데이터셋 토글
                  legend.chart.toggleDataVisibility(index);
                } else {
                  // 어노테이션 토글
                  const annotationIndex =
                    index - legend.chart.data.datasets.length;
                  const annotationId = Object.keys(
                    legend.chart.options.plugins.annotation.annotations
                  )[annotationIndex];
                  const annotation =
                    legend.chart.options.plugins.annotation.annotations[
                      annotationId
                    ];
                  annotation.display = !annotation.display;
                }
                legend.chart.update();
              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || "";

                  if (context.raw !== null) {
                    label += `: ${context.raw}`;
                  }

                  if (context.raw === 95) {
                    label += " (양산이관 95%)";
                  } else if (context.raw === 90) {
                    label += " (CS qual 90%)";
                  } else if (context.raw === 85) {
                    label += " (개발 이관 85%)";
                  }

                  return label;
                },
              },
            },
            annotation: {
              annotations: {
                line1: {
                  id: "line1",
                  type: "line",
                  yMin: 95,
                  yMax: 95,
                  borderColor: "rgba(75, 192, 192, 0.4)",
                  borderWidth: 2,
                  label: {
                    content: "양산이관 95%",
                    enabled: true,
                    position: "end",
                  },
                },
                line2: {
                  id: "line2",
                  type: "line",
                  yMin: 90,
                  yMax: 90,
                  borderColor: "rgba(192, 75, 192, 0.4)",
                  borderWidth: 2,
                  label: {
                    content: "CS qual 90%",
                    enabled: true,
                    position: "end",
                  },
                },
                line3: {
                  id: "line3",
                  type: "line",
                  yMin: 85,
                  yMax: 85,
                  borderColor: "rgba(192, 192, 75, 0.4)",
                  borderWidth: 2,
                  label: {
                    content: "개발 이관 85%",
                    enabled: true,
                    position: "end",
                  },
                },
              },
            },
          },
        },
      });
    }
  }, [activeView, selectedProductCategory, selectedProducts]);

  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 차트 인스턴스 파괴
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, []);

  return (
    <ChartContainer>
      <ChartCanvas ref={chartRef}></ChartCanvas>
    </ChartContainer>
  );
};

export default ChartComponent;
