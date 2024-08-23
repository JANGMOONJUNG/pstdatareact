import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js";
import "chartjs-plugin-annotation";
import "chartjs-plugin-datalabels";
import styled from "styled-components";
import { IoMdDownload } from "react-icons/io";

import html2canvas from "html2canvas";

const ChartComponent5 = () => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  // 초기 Y축 최대값과 최소값 설정
  const initialYMax = 28.44;
  const initialYMin = 26.36;

  // Y축 최대값과 최소값을 관리하는 상태 변수
  const [yMax, setYMax] = useState(initialYMax);
  const [yMin, setYMin] = useState(initialYMin);

  // 데이터 세트
  const dataSet1 = [27.14, 27.14, 50, null, null, null, null, null];
  const dataSet2 = [null, null, null, null, 27.4, 27.4, 27.4, 27.4];

  const ref = useRef();

  const handleDownloadImage = () => {
    html2canvas(ref.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "capture.png";
      link.click();
    });
  };

  // 데이터에서 최대값과 최소값 계산
  const calculateYMaxMin = () => {
    const allData = [...dataSet1, ...dataSet2].filter(
      (value) => value !== null
    );
    const maxValue = Math.max(...allData);
    const minValue = Math.min(...allData);

    // 기본값의 범위를 벗어나는 경우에만 값을 업데이트
    if (maxValue > initialYMax) {
      setYMax(maxValue + 1); // 최대값보다 조금 더 크게 설정
    } else {
      setYMax(initialYMax); // 기본값 유지
    }

    if (minValue < initialYMin) {
      setYMin(minValue - 1); // 최소값보다 조금 더 작게 설정
    } else {
      setYMin(initialYMin); // 기본값 유지
    }
  };

  const dataSet = [
    {
      label: "6EAS1318",
      data: dataSet1,
      borderColor: "rgba(0, 0, 128, 0.2)", // 파스텔 톤의 파란색
      backgroundColor: "rgba(0, 0, 128, 0.2)", // 파스텔 톤의 파란색
      borderWidth: 1,
      pointRadius: 5,
      pointBackgroundColor: (context) => {
        const value = context.dataset.data[context.dataIndex];
        return value > yMax || value < yMin
          ? "rgba(255, 99, 132, 0.6)"
          : "rgba(0, 0, 128, 0.6)";
      },
      pointBorderColor: (context) => {
        const value = context.dataset.data[context.dataIndex];
        return value > yMax || value < yMin
          ? "rgba(255, 99, 132, 0.6)"
          : "rgba(0, 0, 128, 0.6)";
      },
      fill: false,
      showLine: false, // Only show points, not lines
    },
    {
      label: "6EASD417",
      data: dataSet2,
      borderColor: "rgba(255, 99, 132, 0.2)", // 파스텔 톤의 빨간색
      backgroundColor: "rgba(255, 99, 132, 0.2)", // 파스텔 톤의 빨간색
      borderWidth: 1,
      pointRadius: 5,
      pointBackgroundColor: "rgba(255, 99, 132, 0.6)", // 파스텔 톤의 빨간색
      pointBorderColor: "rgba(255, 99, 132, 0.6)", // 파스텔 톤의 빨간색
      fill: false,
      showLine: false, // Only show points, not lines
    },
  ];

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      chartInstance.current = new Chart(chartContainer.current, {
        type: "line",
        data: {
          labels: [
            "04-30",
            "05-15",
            "05-31",
            "06-15",
            "06-30",
            "07-15",
            "07-31",
            "08-15",
          ],
          datasets: dataSet,
        },
        options: {
          responsive: true,
          aspectRatio: 600 / (300 + parseInt(dataSet.length / 6) * 30),
          scales: {
            yAxes: [
              {
                ticks: {
                  min: yMin,
                  max: yMax, // 업데이트된 Y축 최대값, 최소값 사용
                  stepSize: 0.24,
                },
              },
            ],
          },
          legend: {
            display: true,
            position: "bottom", // 범례를 아래로 이동
            fullWidth: true,
            labels: {
              boxWidth: 10,
            },
          },
          plugins: {
            datalabels: {
              display: false,
            },
            annotation: {
              annotations: [
                {
                  type: "line",
                  mode: "horizontal",
                  scaleID: "y-axis-0",
                  value: 27.4,
                  borderColor: "blue",
                  borderWidth: 1,
                },
                {
                  type: "line",
                  mode: "horizontal",
                  scaleID: "y-axis-0",
                  value: 27.66,
                  borderColor: "red",
                  borderWidth: 1,
                },
                {
                  type: "line",
                  mode: "horizontal",
                  scaleID: "y-axis-0",
                  value: 26.88,
                  borderColor: "red",
                  borderWidth: 1,
                },
              ],
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [yMax, yMin]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "8px",
          width: "100%",
          padding: "0px 5%",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <StyledButton
            onClick={() => {
              setYMax(initialYMax);
              setYMin(initialYMin);
            }}
          >
            초기화
          </StyledButton>
          <StyledButton onClick={calculateYMaxMin}>SpecOut 확인</StyledButton>
        </div>
        <IconButton onClick={handleDownloadImage}>
          <IoMdDownload style={{ fontSize: "18px", fontWeight: "700" }} />
        </IconButton>
      </div>
      <div style={{ width: "500px" }} ref={ref}>
        <canvas ref={chartContainer} />
      </div>
    </div>
  );
};

const StyledButton = styled.button`
  background: #222831;
  color: #ffffff;
  border: none;
  padding: 6px 10px;
  font-size: 10px;
  cursor: pointer;

  &:hover {
    background: #393e46; /* 호버 시 배경 색상 */
    color: #eeeeee; /* 호버 시 텍스트 색상 */
  }
`;

const IconButton = styled.button`
  background-color: #fff;
  color: #222831;
  border: 1px solid #222831;
  border-radius: 6px;
  cursor: pointer;
  width: 24px;
  height: 24px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ChartComponent5;
