// src/components/MonthlyWeeklyRate.js
import React, { useState } from "react";
import styled from "styled-components";
import { product_data } from "../dummyData";
import { colorPalette } from "../color";
import ChartComponent from "./ChartComponent";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
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
  background-color: ${(props) => (props.active ? "#222831" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#222831")};
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
  background-color: ${(props) => (props.active ? "#222831" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#222831")};
  border: 1px solid #222831;
  border-radius: 12px;
  padding: 8px 16px;
  cursor: pointer;
`;

const ProductButton = styled.button`
  background-color: ${(props) =>
    props.active ? colorPalette.deepBlue : "#fff"};
  color: ${(props) => (props.active ? "#fff" : colorPalette.deepBlue)};
  border: 1px solid ${colorPalette.deepBlue};
  border-radius: 12px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 12px;
`;

const MonthlyWeeklyRate = () => {
  const [activeView, setActiveView] = useState("monthly");
  const [selectedProductCategory, setSelectedProductCategory] = useState("CP");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleProductToggle = (product) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.includes(product)
        ? prevSelectedProducts.filter((p) => p !== product)
        : [...prevSelectedProducts, product]
    );
  };

  return (
    <Container>
      <Header>
        <Title>월별 합격률</Title>
        <ButtonGroup>
          <ToggleButton
            active={activeView === "monthly"}
            onClick={() => setActiveView("monthly")}
          >
            월별
          </ToggleButton>
          <ToggleButton
            active={activeView === "weekly"}
            onClick={() => setActiveView("weekly")}
          >
            주별
          </ToggleButton>
        </ButtonGroup>
      </Header>
      <ProductList>
        {Object.keys(product_data).map((category) => (
          <CategoryButton
            key={category}
            active={selectedProductCategory === category}
            onClick={() => {
              setSelectedProductCategory(category);
              setSelectedProducts([]);
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
            active={selectedProducts.includes(product)}
            onClick={() => handleProductToggle(product)}
            title={product_data[selectedProductCategory].data[product].detail}
          >
            {product}
          </ProductButton>
        ))}
      </ProductList>
      <ChartComponent
        activeView={activeView}
        selectedProductCategory={selectedProductCategory}
        selectedProducts={selectedProducts}
      />
    </Container>
  );
};

export default MonthlyWeeklyRate;
