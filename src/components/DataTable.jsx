import React, { useState } from "react";
import styled from "styled-components";
import { colorPalette } from "../color";
import { FaCheck } from "react-icons/fa";
import TargetModal from "./TargetModal";

const TableContainer = styled.div`
  margin-top: 20px;
  height: 400px;
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

const ItemField = styled.div`
  flex: 1;
  max-width: 200px;
  overflow: hidden;
`;

const ItemField2 = styled.div`
  flex: 2.2;
  overflow: hidden;
`;

const DataTable = ({ data }) => {
  const [tableData, setTableData] = useState(data);
  const [modalOpen, setModalOpen] = useState(false);

  const [modalData, setModalData] = useState(null);
  const [modalIndex, setModalIndex] = useState(-1);

  if (!tableData || tableData.length === 0) {
    return <p>No data available</p>;
  }

  const checkDifference = (row) => {
    const targetDifference = row.Target !== row["Target.1"];
    const gradeDifference = row.GRADE !== row["GRADE.1"];
    return targetDifference || gradeDifference;
  };

  const openModal = (data, index) => {
    if (data["DATA 판정"] === "TRUE") {
      window.alert("DATA 판정이 TRUE인 것은 수정이 불가능합니다.");
      return;
    }

    setModalData(data);
    setModalIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
    setModalIndex(-1);
  };

  return (
    <TableContainer>
      {modalData && (
        <TargetModal
          modalData={modalData}
          closeModal={closeModal}
          callback={(reason, finalDecision) => {
            let tempData = tableData;
            tempData[modalIndex].사유 = reason;
            tempData[modalIndex].최종판정 = finalDecision === "true" ? "T" : "";

            setTableData(tempData);
          }}
        />
      )}
      <ListWrapper>
        <ListHeader>
          {Object.keys(tableData[0]).map((key) => {
            if (key === "STEP_DESC" || key === "ITEM_CD") {
              return <ItemField2 key={key}>{key}</ItemField2>;
            }

            return <ItemField key={key}>{key}</ItemField>;
          })}
        </ListHeader>
        <ListContainer>
          {tableData.map((row, index) => {
            const hasDifference = checkDifference(row);
            return (
              <ListItem
                key={index}
                style={{
                  backgroundColor: hasDifference ? "#ffe7e7" : "#f9f9f9",
                  cursor: "pointer",
                }}
                onClick={() => openModal(row, index)}
              >
                {Object.entries(row).map(([key, value], idx) => {
                  const isTargetDifference =
                    (key === "Target" && row.Target !== row["Target.1"]) ||
                    (key === "Target.1" && row.Target !== row["Target.1"]);
                  const isGradeDifference =
                    (key === "GRADE" && row.GRADE !== row["GRADE.1"]) ||
                    (key === "GRADE.1" && row.GRADE !== row["GRADE.1"]);
                  const isDifferent = isTargetDifference || isGradeDifference;

                  const isData판정 = key === "DATA 판정";
                  const data판정Color =
                    value === "TRUE"
                      ? "blue"
                      : value === "FALSE"
                      ? "red"
                      : "black";

                  if (key === "STEP_DESC" || key === "ITEM_CD") {
                    return (
                      <ItemField2
                        key={idx}
                        style={{
                          color: "black",
                        }}
                      >
                        {value.toString()}
                      </ItemField2>
                    );
                  }

                  return (
                    <ItemField
                      key={idx}
                      style={{
                        color: isDifferent
                          ? "red"
                          : isData판정
                          ? data판정Color
                          : key === "최종판정"
                          ? value === "T"
                            ? "blue"
                            : "red"
                          : "black",
                      }}
                    >
                      {value !== null ? (
                        key === "사유" ? (
                          value ? (
                            <FaCheck
                              style={{ fontSize: "14px", color: "green" }}
                            />
                          ) : (
                            "-"
                          )
                        ) : key === "최종판정" ? (
                          value === "T" ? (
                            "TRUE"
                          ) : (
                            "FALSE"
                          )
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
    </TableContainer>
  );
};

export default DataTable;
