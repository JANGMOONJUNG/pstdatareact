import React, { useEffect, useRef, useState } from "react";
import "chartjs-plugin-annotation";
import "chartjs-plugin-datalabels";
import styled from "styled-components";
import { product_data } from "../dummyData";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // ensure the plugin is imported

const ChartContainer = styled.div`
  width: 100%;
`;

const ChartCanvas = styled.canvas`
  width: ${(props) => props.canvasWidth}px;
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

const ChartComponent = ({
  activeView,
  selectedProductCategory,
  selectedProducts,
  chartRef,
}) => {
  //const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(800); // 기본값 설정

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
            fill: false,
            lineTension: 0,
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
            fill: false,
            lineTension: 0,
          }));

    const labels =
      activeView === "monthly"
        ? Array.from({ length: 12 }, (_, i) => `${i + 1}월`)
        : Array.from(
            { length: 54 },
            (_, i) => `WW${String(i + 1).padStart(2, "0")}`
          );

    const data = {
      labels,
      datasets,
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              max: 100,
              min: 65,
            },
          },
        ],
      },
      annotation: {
        annotations: [
          {
            id: "line1",
            type: "line",
            mode: "horizontal",
            scaleID: "y-axis-0",
            value: 95,
            borderColor: "rgba(75, 192, 192, 0.4)",
            borderWidth: 2,
            label: {
              content: "양산이관 95%",
              enabled: true,
              position: "left",
              xAdjust: 5,
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            },
          },
          {
            id: "line2",
            type: "line",
            mode: "horizontal",
            scaleID: "y-axis-0",
            value: 90,
            borderColor: "rgba(192, 75, 192, 0.4)",
            borderWidth: 2,
            label: {
              content: "CS qual 90%",
              enabled: true,
              position: "left",
              xAdjust: 5,
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            },
          },
          {
            id: "line3",
            type: "line",
            mode: "horizontal",
            scaleID: "y-axis-0",
            value: 85,
            borderColor: "rgba(192, 192, 75, 0.4)",
            borderWidth: 2,
            label: {
              content: "개발 이관 85%",
              enabled: true,
              position: "left",
              xAdjust: 5,
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            },
          },
        ],
      },
      legend: {
        display: true,
        position: "top",
        align: "end",
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            let label = data.datasets[tooltipItem.datasetIndex].label || "";

            if (tooltipItem.yLabel !== null) {
              label += `: ${tooltipItem.yLabel}%`;
            }

            if (tooltipItem.yLabel == 95) {
              label += " (양산이관 95%)";
            } else if (tooltipItem.yLabel == 90) {
              label += " (CS qual 90%)";
            } else if (tooltipItem.yLabel == 85) {
              label += " (개발 이관 85%)";
            }

            return label;
          },
        },
      },
      plugins: {
        datalabels: {
          display: true,
          align: "top",
          formatter: function (value) {
            return value + "%";
          },
          font: {
            weight: "bold",
          },
        },
      },
    };

    // Canvas 너비 동적 계산
    const newCanvasWidth = Math.max(labels.length * 80, 800); // 레이블의 길이에 따라 너비 계산
    console.log(newCanvasWidth);

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: "line",
      data,
      options,
      plugins: [ChartDataLabels], // ensure the plugin is added to the chart
    });

    setCanvasWidth(newCanvasWidth); // 상태 업데이트로 캔버스 너비 설정

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [activeView, selectedProductCategory, selectedProducts, canvasWidth]);

  return (
    <ChartContainer>
      <div
        style={{
          width: "1400px",
          height: "100%",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            width: `${canvasWidth}px`,
            height: "100%",
          }}
        >
          <ChartCanvas
            ref={chartRef}
            canvasWidth={canvasWidth}
            style={{
              maxWidth: `${canvasWidth}px`,
            }}
            key={activeView + canvasWidth}
          />
        </div>
      </div>
    </ChartContainer>
  );
};

export default ChartComponent;
