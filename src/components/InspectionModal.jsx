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

const InspectionModal = ({
  modalData,
  closeModal,
  handleInputChange,
  handleSave,
}) => {
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
              <FieldLabel>주차</FieldLabel> {modalData.주차}
            </Field>
            <Field>
              <FieldLabel>제품명</FieldLabel> {modalData.제품명}
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
            <ChartComponent5 />
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
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    background: "#FFB3B3",
                    color: "#fff",
                    fontSize: "14px",
                    padding: "4px 6px",
                    borderRadius: "4px",
                  }}
                >
                  IM 담당자{" "}
                </span>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "38px",
                      borderRadius: "8px",
                      backgroundColor: "blue",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src="./tempprofile.png"
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div>
                    <div style={{ fontWeight: "bold", textAlign: "left" }}>
                      DRAM개발PI품질&수율
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <div style={{ fontWeight: "bold" }}>장문정</div>
                      <div
                        style={{
                          fontSize: "14px",
                          color: "#4a4a4a",
                          fontWeight: "600",
                        }}
                      >
                        1234567
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      right: "0px",
                      fontSize: "10px",
                      color: "##9b9b9b",
                    }}
                  >
                    작성일: {new Date().toLocaleString("ko-KR")}
                  </div>
                </div>
              </div>
              <div style={{ width: "100%", marginTop: "16px" }}>
                <textarea
                  style={{
                    width: "100%",
                    height: "80px",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                    color: "#333",
                    backgroundColor: "#f9f9f9",
                    resize: "none",
                    boxSizing: "border-box",
                  }}
                  placeholder="코멘트를 작성해주세요."
                  value={modalData.IM.comment}
                  name="IM.comment"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    background: "#A7C7E7",
                    color: "#fff",
                    fontSize: "14px",
                    padding: "4px 6px",
                    borderRadius: "4px",
                  }}
                >
                  공정 담당자{" "}
                </span>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "38px",
                      borderRadius: "8px",
                      backgroundColor: "blue",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={`./tempprofile.png`}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div>
                    <div style={{ fontWeight: "bold", textAlign: "left" }}>
                      SRT공정
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <div style={{ fontWeight: "bold" }}>윤진의</div>
                      <div
                        style={{
                          fontSize: "14px",
                          color: "#4a4a4a",
                          fontWeight: "600",
                        }}
                      >
                        1234567
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      right: "0px",
                      fontSize: "10px",
                      color: "##9b9b9b",
                    }}
                  >
                    작성일: {new Date().toLocaleString("ko-KR")}
                  </div>
                </div>
              </div>
              <div style={{ width: "100%", marginTop: "16px" }}>
                <textarea
                  style={{
                    width: "100%",
                    height: "80px",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                    color: "#333",
                    backgroundColor: "#f9f9f9",
                    resize: "none",
                    boxSizing: "border-box",
                  }}
                  placeholder="코멘트를 작성해주세요."
                  value={modalData.공정.comment}
                  name="공정.comment"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    background: "#99D8A1",
                    color: "#fff",
                    fontSize: "14px",
                    padding: "4px 6px",
                    borderRadius: "4px",
                  }}
                >
                  PI 담당자{" "}
                </span>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "38px",
                      borderRadius: "8px",
                      backgroundColor: "blue",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src="./tempprofile.png"
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div>
                    <div style={{ fontWeight: "bold", textAlign: "left" }}>
                      LUCY PI
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <div style={{ fontWeight: "bold" }}>홍길동</div>
                      <div
                        style={{
                          fontSize: "14px",
                          color: "#4a4a4a",
                          fontWeight: "600",
                        }}
                      >
                        1234567
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      right: "0px",
                      fontSize: "10px",
                      color: "##9b9b9b",
                    }}
                  >
                    작성일: {new Date().toLocaleString("ko-KR")}
                  </div>
                </div>
              </div>
              <div style={{ width: "100%", marginTop: "16px" }}>
                <textarea
                  style={{
                    width: "100%",
                    height: "80px",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                    color: "#333",
                    backgroundColor: "#f9f9f9",
                    resize: "none",
                    boxSizing: "border-box",
                  }}
                  placeholder="코멘트를 작성해주세요."
                  value={modalData.PI.comment}
                  name="PI.comment"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <SaveButton onClick={handleSave}>저장</SaveButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default InspectionModal;
