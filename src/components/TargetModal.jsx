import React, { useRef, useState } from "react";
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

const TargetModal = ({ modalData, closeModal, callback }) => {
  const ref = useRef();
  const [reason, setReason] = useState(modalData.사유 ? modalData.사유 : "");
  const [finalDecision, setFinalDecision] = useState(
    modalData.최종판정 === "T"
  );

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
              <FieldLabel>CORE</FieldLabel> {modalData.Core}
            </Field>
            <Field>
              <FieldLabel>파생</FieldLabel> {modalData.파생}
            </Field>
            <Field>
              <FieldLabel>Module</FieldLabel> {modalData.Module}
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
              <FieldLabel>ITEM_CD</FieldLabel> {modalData.ITEM_CD}
            </Field2>
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
              <h3>CORE{`(${modalData.Core})`}</h3>
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
            <div>
              <FieldLabel style={{ marginBottom: "10px" }}>
                사유 작성
              </FieldLabel>
              <textarea
                style={{
                  width: "100%",
                  height: "100px",
                  borderRadius: "8px",
                  borderColor: "#ccc",
                  padding: "10px",
                  boxSizing: "border-box",
                }}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            <div>
              <FieldLabel style={{ marginBottom: "10px" }}>
                최종 판정
              </FieldLabel>
              <select
                style={{
                  width: "100%",
                  height: "36px",
                  borderRadius: "8px",
                  borderColor: "#ccc",
                }}
                value={finalDecision}
                onChange={(e) => setFinalDecision(e.target.value)}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          </div>
          <SaveButton
            onClick={() => {
              callback(reason, finalDecision);
              closeModal();
            }}
          >
            저장
          </SaveButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TargetModal;
