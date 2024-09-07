// src/components/Status.js
import React, { useRef, useState } from "react";
import styled from "styled-components";
import SideNavigation from "./SideNavigation";
import ChartComponent from "./ChartComponent";
import ChartComponent2 from "./ChartComponent2";
import InspectionManage from "./InspectionManage";

import { TableDataAREA, TableDataModule } from "../dummyData";

import { IoMdDownload } from "react-icons/io";
import { TbMailFilled } from "react-icons/tb";
import { RiFileExcel2Fill } from "react-icons/ri";

const ContainerStatus = styled.div`
  display: flex;
  min-height: 740px;
`;

const Content = styled.main`
  flex-grow: 1;
  padding: 40px;

  background-color: #e9e9e9;

  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 1440px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;

  box-sizing: border-box;

  background-color: #ffffff;

  border-radius: 16px;

  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.1);

  position: relative;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 32px;

  margin-bottom: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: end;
  position: absolute;
  right: 24px;
`;

const IconButton = styled.button`
  background-color: #fff;
  color: #222831;
  border: 1px solid #222831;
  border-radius: 12px;
  cursor: pointer;
  width: 36px;
  height: 36px;
`;

const TableContainer = styled.div`
  min-width: 600px;
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const Th = styled.th`
  border: 1px solid #222831;
  padding: 8px;
  background-color: #f1f1f1;
`;

const Td = styled.td`
  border: 1px solid #222831;
  padding: 8px;
  font-size: 14px;
`;

const Status = () => {
  const [selectedComponent, setSelectedComponent] = useState(
    "monthly-weekly-rate"
  );

  const [activeView, setActiveView] = useState("monthly");
  const [selectedProductCategory, setSelectedProductCategory] = useState("CP");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const renderTable = (activeView) => {
    const tableData =
      activeView === "process" ? TableDataAREA : TableDataModule;

    if (!tableData) return null;

    return (
      <Table>
        <thead>
          <tr>
            {tableData[0].map((header, index) => (
              <Th key={index}>{header}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => {
                if (cellIndex === 0) {
                  return <Td key={cellIndex}>{cell}</Td>;
                }

                const [numerator, denominator] = cell.split("/").map(Number);
                const percentage = ((numerator / denominator) * 100).toFixed(2);

                return (
                  <Td key={cellIndex}>
                    {cell}
                    <br />({percentage}%)
                  </Td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <ContainerStatus>
      <SideNavigation
        select={selectedComponent}
        onSelect={setSelectedComponent}
      />
      <Content>
        <Container>
          <ButtonGroup>
            <IconButton>
              <IoMdDownload style={{ fontSize: "20px", fontWeight: "700" }} />
            </IconButton>
            <IconButton>
              <RiFileExcel2Fill
                style={{ fontSize: "20px", fontWeight: "700" }}
              />
            </IconButton>
            <IconButton>
              <TbMailFilled style={{ fontSize: "20px", fontWeight: "700" }} />
            </IconButton>
          </ButtonGroup>
          <Header>
            <Title>PTS overview</Title>
            <div
              style={{
                marginBottom: "10px",
                fontSize: "20px",
                fontWeight: "700",
              }}
            >
              Canopus TAS - 3G GDDR7
            </div>
            <div>2024년 09월 07일 WW32</div>
          </Header>
          <div
            style={{
              display: "flex",
              marginBottom: "20px",
            }}
          >
            <div style={{ width: "50%" }}>
              <h2 style={{ marginBottom: "10px", fontSize: "20px" }}>
                월별 합격률
              </h2>
              <ChartComponent
                activeView={"monthly"}
                selectedProductCategory={"LC"}
                selectedProducts={["6EK"]}
              />
            </div>
            <div style={{ width: "50%" }}>
              <h2 style={{ marginBottom: "10px", fontSize: "20px" }}>
                주별 합격률
              </h2>
              <ChartComponent
                activeView={"weekly"}
                selectedProductCategory={"LC"}
                selectedProducts={["6EK"]}
              />
            </div>
          </div>
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <div style={{ width: "50%" }}>
              <h2 style={{ marginBottom: "10px", fontSize: "20px" }}>
                공정별 합격률
              </h2>
              <ChartComponent2
                activeView={"process"}
                selectedProductCategory={"LC"}
                selectedProduct={"6EK"}
              />
              <TableContainer>{renderTable("process")}</TableContainer>
            </div>
            <div style={{ width: "50%" }}>
              <h2 style={{ marginBottom: "10px", fontSize: "20px" }}>
                모듈별 합격률
              </h2>
              <ChartComponent2
                activeView={"module"}
                selectedProductCategory={"LC"}
                selectedProduct={"6EK"}
              />
              <TableContainer>{renderTable("module")}</TableContainer>
            </div>
          </div>
          <InspectionManage />
        </Container>
      </Content>
    </ContainerStatus>
  );
};

export default Status;
