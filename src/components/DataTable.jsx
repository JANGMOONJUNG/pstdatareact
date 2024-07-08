import React, { useState } from "react";
import styled from "styled-components";

const TableContainer = styled.div`
  margin-top: 20px;
  height: 400px;
  overflow: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  position: sticky;
  top: 0;
  background-color: #f2f2f2;
  z-index: 1;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f2f2f2;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  max-width: 240px;
`;

const Tr = styled.tr`
  background-color: ${(props) =>
    props.hasDifference ? "#d3d3d3" : "transparent"};
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

  z-index: 10;
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

const DataTable = ({ data }) => {
  const [tableData, setTableData] = useState(data);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentReason, setCurrentReason] = useState("");
  const [currentJudgement, setCurrentJudgement] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  if (!tableData || tableData.length === 0) {
    return <p>No data available</p>;
  }

  const checkDifference = (row) => {
    const targetDifference = row.Target !== row["Target.1"];
    const gradeDifference = row.GRADE !== row["GRADE.1"];
    return targetDifference || gradeDifference;
  };

  const processRow = (row) => {
    const targetMatch = row.Target === row["Target.1"];
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
      <Table>
        <Thead>
          <tr>
            {Object.keys(tableData[0]).map((key) => (
              <Th key={key}>{key}</Th>
            ))}
          </tr>
        </Thead>
        <tbody>
          {tableData.map((row, index) => {
            row = processRow(row); // Process the row to set "DATA 판정"
            const hasDifference = checkDifference(row);
            return (
              <Tr key={index} hasDifference={hasDifference}>
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
                    value === true ? "blue" : value === false ? "red" : "black";

                  const handleClick =
                    key === "사유" ? () => handleReasonClick(row) : null;

                  return (
                    <Td
                      key={idx}
                      style={{
                        color: isDifferent
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
                      {value !== null ? value.toString() : "N/A"}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
