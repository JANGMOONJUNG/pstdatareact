// src/components/ChartComponent4.js
import React, { useEffect, useRef } from "react";
import Chart from "chart.js";
import styled from "styled-components";
import { product_data } from "../dummyData";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.plugins.unregister(ChartDataLabels);

const ChartContainer = styled.div`
  width: 45%;
  overflow-x: auto;
`;

const ChartCanvas = styled.canvas`
  width: 100%;
  height: 500px;
`;

const ChartComponent4 = ({ selectedProductCategory, selectedProduct }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!selectedProduct) return;

    const dataOptions =
      product_data[selectedProductCategory]?.data[selectedProduct];
    if (!dataOptions) return;

    const colors = [
      "rgba(255, 99, 132, 0.6)",
      "rgba(54, 162, 235, 0.6)",
      "rgba(255, 206, 86, 0.6)",
      "rgba(75, 192, 192, 0.6)",
      "rgba(153, 102, 255, 0.6)",
      "rgba(255, 159, 64, 0.6)",
    ];

    const borderColors = [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
    ];

    const datasets = [
      {
        label: selectedProduct + " DGG Rate",
        data: Object.values(dataOptions.dggRate),
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ];

    const labels = Object.keys(dataOptions.dggRate);

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
                  beginAtZero: true,
                  max: 100,
                  min: 0,
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
  }, [selectedProductCategory, selectedProduct]);

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

export default ChartComponent4;
