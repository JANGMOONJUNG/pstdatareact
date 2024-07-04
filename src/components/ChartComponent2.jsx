// src/components/ChartComponent.js
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import styled from "styled-components";
import { product_data } from "../dummyData";

const ChartContainer = styled.div`
  width: 50%;
  overflow-x: auto;
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
        label: "Before",
        data: Object.values(dataOptions[dataKey]),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Present",
        data: Object.values(dataOptions[dataKeyPresent]),
        backgroundColor: "rgba(192, 75, 192, 0.6)",
        borderColor: "rgba(192, 75, 192, 1)",
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
          responsive: false,
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
      <ChartCanvas ref={chartRef}></ChartCanvas>
    </ChartContainer>
  );
};

export default ChartComponent2;
