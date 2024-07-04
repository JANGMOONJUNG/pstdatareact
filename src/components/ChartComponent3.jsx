// src/components/ChartComponent3.js
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import styled from "styled-components";
import { product_data } from "../dummyData";

const ChartContainer = styled.div`
  width: 40%;
  overflow-x: auto;
`;

const ChartCanvas = styled.canvas`
  width: 100%;
  height: 500px;
`;

const ChartComponent3 = ({ selectedProductCategory }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const dataOptions = product_data[selectedProductCategory];
    if (!dataOptions) return;

    const datasets = [
      {
        label: selectedProductCategory + " DGG Rate",
        data: dataOptions.dggRate,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ];

    const labels = dataOptions.options;

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
            y: {
              beginAtZero: true,
              max: 100,
              min: 0,
            },
          },
        },
      });
    }
  }, [selectedProductCategory]);

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

export default ChartComponent3;
