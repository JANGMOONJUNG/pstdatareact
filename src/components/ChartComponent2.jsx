// src/components/ChartComponent.js
import React, { useEffect, useRef } from "react";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import styled from "styled-components";
import { product_data } from "../dummyData";

Chart.plugins.unregister(ChartDataLabels);

const ChartContainer = styled.div`
  width: 50%;
`;

const ChartCanvas = styled.canvas`
  width: 800px;
  height: 400px;
`;

const ChartComponent2 = ({
  activeView,
  selectedProductCategory,
  selectedProduct,
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!selectedProduct) {
      return;
    }

    const dataOptions =
      product_data[selectedProductCategory]?.data[selectedProduct];
    const dataKey = activeView === "process" ? "before" : "before2";
    const dataKeyPresent = activeView === "process" ? "present" : "present2";

    const datasets = [
      {
        label: "One PTS",
        data: ["98.31", "100", "96", "98.68", "100", "98.47", "93.33"],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Control out",
        data: ["99.44", "100", "100", "98.68", "100", "100", "100"],
        backgroundColor: "rgba(192, 75, 142, 0.6)",
        borderColor: "rgba(192, 75, 142, 1)",
        borderWidth: 1,
      },
      {
        label: "OCI Centering",
        data: ["97.75", "100", "96", "98.59", "100", "96.15", "93.33"],
        backgroundColor: "rgba(192, 125, 192, 0.6)",
        borderColor: "rgba(192, 125, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Scatter",
        data: ["99.72", "100", "96", "99.33", "100", "100", "100"],
        backgroundColor: "rgba(152, 75, 192, 0.6)",
        borderColor: "rgba(152, 75, 192, 1)",
        borderWidth: 1,
      },
    ];

    const labels =
      activeView === "process"
        ? ["Total", "C/C", "DIFF", "ETCH", "IMP", "PHOTO", "T/F"]
        : ["Total", "IBG", "GT", "SAC", "SN", "MLM1", "MLM2"];

    if (chartInstance.current) {
      // 차트 인스턴스가 이미 존재할 경우 데이터만 업데이트
      chartInstance.current.data.labels = labels;
      chartInstance.current.data.datasets = datasets;
      chartInstance.current.update();
    } else {
      // 차트 인스턴스가 존재하지 않을 경우 새로 생성
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: datasets,
        },
        options: {
          responsive: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  suggestedMax: 100,
                  suggestedMin: 80,
                  callback: function (value) {
                    return value + "%"; // y축 라벨에 % 추가
                  },
                },
              },
            ],
          },
          plugins: {
            datalabels: {
              display: true,
              formatter: function (value) {
                return value + "%"; // 데이터 레이블에 % 추가
              },
              color: "black",
            },
          },
        },
        plugins: [ChartDataLabels],
      });
    }
  }, [activeView, selectedProductCategory, selectedProduct]);

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
      <div style={{ width: "680px", minWidth: "680px" }}>
        <ChartCanvas ref={chartRef}></ChartCanvas>
      </div>
    </ChartContainer>
  );
};

export default ChartComponent2;
