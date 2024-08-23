import React, { useRef } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import ChartComponent5 from "./ChartComponent5";
import { colorPalette } from "../color";

import { MdOutlineCameraAlt } from "react-icons/md";

import html2canvas from "html2canvas";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalContent = styled.div`
  background: #e9e9e9;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  padding-bottom: 20px;
`;

const Field = styled.div`
  display: flex;
  height: 36px;
  align-items: center;
  gap: 8px;
  width: 25%;
  font-size: 12px;
`;

const Field2 = styled.div`
  display: flex;
  height: 36px;
  align-items: center;
  gap: 8px;
  width: 50%;
  font-size: 12px;
`;

const Field3 = styled.div`
  display: flex;
  height: 36px;
  align-items: center;
  gap: 8px;
  width: 33%;
  font-size: 12px;
`;

const FieldLabel = styled.label`
  font-size: 14px;
  font-weight: bold;
  display: flex;
  height: 100%;
  align-items: center;
`;

const SaveButton = styled.button`
  background-color: ${colorPalette.deepBlue};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: ${colorPalette.darkBlue};
  }
`;

function getWeekNumber(date) {
  // 주어진 날짜의 연도의 1월 1일 설정
  const startOfYear = new Date(date.getFullYear(), 0, 1);

  // 밀리초 단위로 날짜 차이 계산
  const diffInMilliseconds = date - startOfYear;

  // 밀리초를 일 단위로 변환
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

  // 1월 1일부터의 주 수 계산
  const weekNumber = Math.ceil((diffInDays + 1) / 7);

  return weekNumber;
}

const TrendModal = ({ modalData, closeModal, handleSave }) => {
  const ref = useRef();

  const handleDownloadImage = () => {
    html2canvas(ref.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "capture.png";
      link.click();
    });
  };

  if (!modalData) return null;

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            width: "100%",
            height: "60px",
            background: "#30475e",
            marginBottom: "20px",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
            color: "#fff",
            fontSize: "20px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "20px",
              backgroundColor: "#ffffff",
              width: "30px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
            }}
            onClick={handleDownloadImage}
          >
            <MdOutlineCameraAlt style={{ color: "#30475e" }} />
          </div>
          검출 항목
          <IoMdClose
            style={{ color: "#fff", position: "absolute", right: "20px" }}
            onClick={closeModal}
          />
        </div>
        <div
          style={{
            padding: "0px 20px",
            height: "640px",
            overflowY: "auto",
            overflowX: "clip",
          }}
          ref={ref}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              backgroundColor: "#fff",
              boxSizing: "border-box",
              padding: "0px 4%",
              borderRadius: "8px",
              marginBottom: "12px",
            }}
          >
            <Field>
              <FieldLabel>주차</FieldLabel> {getWeekNumber(new Date())}
            </Field>
            <Field>
              <FieldLabel>코어</FieldLabel> {modalData.CORE}
            </Field>
            <Field>
              <FieldLabel>파생</FieldLabel> {modalData.파생}
            </Field>
            <Field>
              <FieldLabel>GRADE</FieldLabel> {modalData.GRADE}
            </Field>
            <Field>
              <FieldLabel>STEP</FieldLabel> {modalData.STEP}
            </Field>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              backgroundColor: "#fff",
              boxSizing: "border-box",
              padding: "0px 4%",
              borderRadius: "8px",
              marginBottom: "12px",
            }}
          >
            <Field2>
              <FieldLabel>STEP_DESC</FieldLabel> {modalData.STEP_DESC}
            </Field2>
            <Field2>
              <FieldLabel>DCOL_ITEM_CD</FieldLabel> {modalData.DCOL_ITEM_CD}
            </Field2>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              backgroundColor: "#fff",
              boxSizing: "border-box",
              padding: "0px 4%",
              borderRadius: "8px",
              marginBottom: "12px",
            }}
          >
            <Field3>
              <FieldLabel>Module</FieldLabel> {modalData.Module}
            </Field3>
            <Field3>
              <FieldLabel>AREA_ID</FieldLabel> {modalData.AREA_ID}
            </Field3>
            <Field3>
              <FieldLabel>검출횟수</FieldLabel> {modalData.검출횟수}
            </Field3>
          </div>
          <div
            style={{
              width: "100%",
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "16px 0px",
              marginBottom: "20px",
            }}
          >
            <div>
              <h3>CORE{`(${modalData.CORE})`}</h3>
              <ChartComponent5 />
            </div>
            <div>
              <h3>파생{`(${modalData.파생})`}</h3>
              <ChartComponent5 />
            </div>
          </div>
          <div
            style={{
              width: "100%",
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "16px 4%",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: "8px",
                padding: "16px 4%",
                boxSizing: "border-box",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#30475e", color: "#fff" }}>
                    <th
                      style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                    >
                      제품
                    </th>
                    <th
                      style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                    >
                      TARGET
                    </th>
                    <th
                      style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                    >
                      LIMIT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                    >
                      {modalData.CORE}
                    </td>
                    <td
                      style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                    >
                      1.8
                    </td>
                    <td
                      style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                    >
                      0.8
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                    >
                      {modalData.파생}
                    </td>
                    <td
                      style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                    >
                      1.8
                    </td>
                    <td
                      style={{ padding: "8px", borderBottom: "1px solid #ddd" }}
                    >
                      0.7
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ textAlign: "left", padding: 0, margin: 0 }}>
              ▶ SPEC OUT 타점 : 2/6
              <br />▶ 이상 LOT 목록 : 1CP0104, 1CP0105
              <br />
              ▶ Target DGG PI COMMENT : 현실화 예정
              <br />▶ PTS 조치 이력
              <ul style={{ textAlign: "left" }}>
                <li>
                  <span>ww34</span>
                  <ul>
                    <li>IM:테스트123</li>
                    <li>공정:테스트123</li>
                    <li>PI:테스트123</li>
                  </ul>
                </li>
                <li>
                  <span>ww33</span>
                  <ul>
                    <li>IM:테스트123</li>
                    <li>공정:테스트123</li>
                    <li>PI:테스트123</li>
                  </ul>
                </li>
                <li>
                  <span>ww32</span>
                  <ul>
                    <li>IM:테스트123</li>
                    <li>공정:테스트123</li>
                    <li>PI:테스트123</li>
                  </ul>
                </li>
              </ul>
            </p>
          </div>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TrendModal;
