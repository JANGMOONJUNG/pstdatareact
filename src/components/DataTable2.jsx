import React, { useState } from "react";
import styled from "styled-components";
import { colorPalette } from "../color";
import { FaCheck } from "react-icons/fa";

const TableContainer = styled.div`
  margin-top: 20px;
  width: 1600px;
  overflow-x: auto;
`;

const ListWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

const ListHeader = styled.div`
  background-color: ${colorPalette.lightGray};
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  border-radius: 12px;
  align-items: center;
  height: 44px;
`;

const ListContainer = styled.div`
  height: 480px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colorPalette.deepBlue};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${colorPalette.lightGray};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${colorPalette.darkBlue};
  }
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  height: 44px;
  align-items: center;
  margin-bottom: 6px;
  border-radius: 12px;
  font-size: 14px;
  background-color: #f9f9f9;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
`;

const Textarea = styled.textarea`
  width: 80%;
  height: 100px;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Select = styled.select`
  width: 80%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ItemField = styled.div`
  flex: 1;
  max-width: 200px;
  overflow: hidden;
`;

const Modal = ({
  show,
  onClose,
  onSubmit,
  initialReason,
  initialJudgement,
}) => {
  const [reason, setReason] = useState(initialReason);
  const [judgement, setJudgement] = useState(initialJudgement);

  if (!show) {
    return null;
  }

  const handleReasonChange = (e) => {
    if (e.target.value.length <= 50) {
      setReason(e.target.value);
    }
  };

  const handleJudgementChange = (e) => {
    setJudgement(e.target.value === "true");
  };

  const handleSubmit = () => {
    onSubmit(reason, judgement);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>사유 입력/수정</h2>
        <Textarea value={reason} onChange={handleReasonChange} />
        <Select value={judgement} onChange={handleJudgementChange}>
          <option value="false">False</option>
          <option value="true">True</option>
        </Select>
        <Button onClick={handleSubmit}>Submit</Button>
        <Button
          onClick={onClose}
          style={{ marginLeft: "10px", backgroundColor: "#dc3545" }}
        >
          Close
        </Button>
      </ModalContent>
    </ModalOverlay>
  );
};

const DataTable2 = ({ data }) => {
  const [tableData, setTableData] = useState(data);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentReason, setCurrentReason] = useState("");
  const [currentJudgement, setCurrentJudgement] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  if (!tableData || tableData.length === 0) {
    return <p>No data available</p>;
  }

  const checkDifference = (row) => {
    const keysToCheck = [
      "SPEC_UL",
      "SPEC_LL",
      "SPEC_ACT",
      "YLD_UL",
      "YLD_LL",
      "YLD_ACT",
    ];

    return keysToCheck.some((key) => row[key] !== row[`${key}.1`]);
  };

  const processRow = (row) => {
    const targetMatch = !checkDifference(row);
    row["DATA 판정"] = targetMatch;
    if (!row.hasOwnProperty("수정 된 판정")) {
      row["수정 된 판정"] = false;
    }
    return row;
  };

  const handleReasonClick = (row) => {
    if (!row["DATA 판정"]) {
      setCurrentReason(row["사유"] || "");
      setCurrentJudgement(row["수정 된 판정"]);
      setCurrentRow(row);
      setModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalSubmit = (newReason, newJudgement) => {
    const updatedData = tableData.map((row) => {
      if (row === currentRow) {
        return { ...row, 사유: newReason, "수정 된 판정": newJudgement };
      }
      return row;
    });
    setTableData(updatedData);
    setModalOpen(false);
  };

  return (
    <TableContainer>
      <Modal
        show={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        initialReason={currentReason}
        initialJudgement={currentJudgement}
      />
      <div style={{ width: "2400px" }}>
        <ListWrapper>
          <ListHeader>
            {Object.keys(tableData[0]).map((key) => (
              <ItemField key={key}>{key}</ItemField>
            ))}
          </ListHeader>
          <ListContainer>
            {tableData.map((row, index) => {
              row = processRow(row); // Process the row to set "DATA 판정"
              const hasDifference = checkDifference(row);
              return (
                <ListItem
                  key={index}
                  style={{
                    backgroundColor: hasDifference ? "#ffe7e7" : "#f9f9f9",
                  }}
                >
                  {Object.entries(row).map(([key, value], idx) => {
                    const isDifference = key.endsWith(".1")
                      ? row[key] !== row[key.split(".1")[0]]
                      : row[key] !== row[key + ".1"];

                    const isData판정 = key === "DATA 판정";
                    const data판정Color =
                      value === true
                        ? "blue"
                        : value === false
                        ? "red"
                        : "black";

                    const handleClick =
                      key === "사유" ? () => handleReasonClick(row) : null;

                    if (
                      key === "Module" ||
                      key === "STEP" ||
                      key === "STEP_DESC" ||
                      key === "DCOL_ITEM_CD" ||
                      key === "제품1" ||
                      key === "제품2" ||
                      key === "수정 된 판정"
                    ) {
                      return (
                        <ItemField
                          key={idx}
                          style={{
                            color: "black",
                            cursor: "default",
                          }}
                          onClick={handleClick}
                        >
                          {value.toString()}
                        </ItemField>
                      );
                    }

                    if (key === "DATA 판정") {
                      return (
                        <ItemField
                          key={idx}
                          style={{
                            color: isData판정 ? data판정Color : "black",
                            cursor:
                              handleClick && !row["DATA 판정"]
                                ? "pointer"
                                : "default",
                          }}
                          onClick={handleClick}
                        >
                          {value !== null ? (
                            key === "사유" ? (
                              <FaCheck
                                style={{ fontSize: "14px", color: "green" }}
                              />
                            ) : (
                              value.toString()
                            )
                          ) : (
                            "-"
                          )}
                        </ItemField>
                      );
                    }

                    return (
                      <ItemField
                        key={idx}
                        style={{
                          color: isDifference
                            ? "red"
                            : isData판정
                            ? data판정Color
                            : "black",
                          cursor:
                            handleClick && !row["DATA 판정"]
                              ? "pointer"
                              : "default",
                        }}
                        onClick={handleClick}
                      >
                        {value !== null ? (
                          key === "사유" ? (
                            <FaCheck
                              style={{ fontSize: "14px", color: "green" }}
                            />
                          ) : (
                            value.toString()
                          )
                        ) : (
                          "-"
                        )}
                      </ItemField>
                    );
                  })}
                </ListItem>
              );
            })}
          </ListContainer>
        </ListWrapper>
      </div>
    </TableContainer>
  );
};

export default DataTable2;
