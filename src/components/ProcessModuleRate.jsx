import React, { useRef, useState } from "react";
import styled from "styled-components";
import { TableDataAREA, TableDataModule, product_data } from "../dummyData";
import { colorPalette } from "../color";
import ChartComponent2 from "./ChartComponent2";

import { IoMdDownload } from "react-icons/io";
import { TbMailFilled } from "react-icons/tb";

import html2canvas from "html2canvas";

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
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ToggleButton = styled.button`
  background-color: ${(props) => (props.isActive ? "#222831" : "#fff")};
  color: ${(props) => (props.isActive ? "#fff" : "#222831")};
  border: 1px solid #222831;
  border-radius: 12px;
  padding: 8px 16px;
  cursor: pointer;
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

const CategoryButton = styled.button`
  background-color: ${(props) => (props.isActive ? "#222831" : "#fff")};
  color: ${(props) => (props.isActive ? "#fff" : "#222831")};
  border: 1px solid #222831;
  border-radius: 12px;
  padding: 8px 16px;
  cursor: pointer;
`;

const ProductButton = styled.button`
  background-color: ${(props) =>
    props.isActive ? colorPalette.deepBlue : "#fff"};
  color: ${(props) => (props.isActive ? "#fff" : colorPalette.deepBlue)};
  border: 1px solid ${colorPalette.deepBlue};
  border-radius: 12px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 12px;
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

const Content = styled.div`
  display: flex;
  margin-top: 20px;
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

const StatusBox = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
  font-size: 14px;
  line-height: 1.6;

  display: flex;
  flex-direction: column;
  gap: 12px;

  ul {
    display: flex;
    gap: 10px;
    margin: 0px;
    li {
      list-style: none;
      text-align: center;
    }

    .up {
      color: green;
    }
    .down {
      color: red;
    }
  }
`;

const calculateChanges = (before2, present2) => {
  const changes = {};
  for (const key in before2) {
    if (present2.hasOwnProperty(key)) {
      const change = ((present2[key] - before2[key]) / before2[key]) * 100;
      changes[key] = change.toFixed(2);
    }
  }
  return changes;
};

const ProcessModuleRate = () => {
  const [activeView, setActiveView] = useState("process");
  const [selectedProductCategory, setSelectedProductCategory] = useState("CP");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const ref = useRef();

  const handleDownloadImage = () => {
    html2canvas(ref.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "capture.png";
      link.click();
    });
  };

  const getTableData = () => {
    if (activeView === "process") {
      return TableDataAREA;
    }
    return TableDataModule;
  };

  const renderTable = () => {
    const tableData = getTableData();

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

  const renderStatusBox = () => {
    const product = product_data[selectedProductCategory].data[selectedProduct];

    const changes =
      activeView === "process"
        ? calculateChanges(product.before, product.present)
        : calculateChanges(product.before2, product.present2);

    return (
      <StatusBox>
        <h3 style={{ margin: "0px" }}>지난 주 대비</h3>
        <ul>
          {Object.keys(changes).map((key) => {
            const change = changes[key];
            const isUp = change > 0;
            return (
              <li key={key} className={isUp ? "up" : "down"}>
                {key} {Math.abs(change)}% {isUp ? "▲" : "▼"}
              </li>
            );
          })}
        </ul>
      </StatusBox>
    );
  };

  return (
    <Container>
      <Header>
        <Title>공정별/모듈별 합격률</Title>
        <ButtonGroup>
          <IconButton
            active={activeView === "monthly"}
            onClick={handleDownloadImage}
          >
            <IoMdDownload style={{ fontSize: "20px", fontWeight: "700" }} />
          </IconButton>
          <IconButton
            active={activeView === "monthly"}
            onClick={() => setActiveView("monthly")}
          >
            <TbMailFilled style={{ fontSize: "20px", fontWeight: "700" }} />
          </IconButton>
          <ToggleButton
            isActive={activeView === "process"}
            onClick={() => setActiveView("process")}
          >
            공정별
          </ToggleButton>
          <ToggleButton
            isActive={activeView === "module"}
            onClick={() => setActiveView("module")}
          >
            모듈별
          </ToggleButton>
        </ButtonGroup>
      </Header>
      <ProductList>
        {Object.keys(product_data).map((category) => (
          <CategoryButton
            key={category}
            isActive={selectedProductCategory === category}
            onClick={() => {
              setSelectedProductCategory(category);
              setSelectedProduct(null);
            }}
          >
            {category}
          </CategoryButton>
        ))}
      </ProductList>
      <ProductList>
        {product_data[selectedProductCategory].options.map((product) => (
          <ProductButton
            key={product}
            isActive={selectedProduct === product}
            onClick={() => setSelectedProduct(product)}
            title={product_data[selectedProductCategory].data[product].detail}
          >
            {product}
          </ProductButton>
        ))}
      </ProductList>
      <Content ref={ref}>
        <ChartComponent2
          activeView={activeView}
          selectedProductCategory={selectedProductCategory}
          selectedProduct={selectedProduct}
        />
        {selectedProduct && (
          <TableContainer>
            {renderTable()}
            {renderStatusBox()}
          </TableContainer>
        )}
      </Content>
    </Container>
  );
};

export default ProcessModuleRate;
