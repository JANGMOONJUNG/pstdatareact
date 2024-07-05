import React, { useState } from "react";
import styled from "styled-components";
import { product_data } from "../dummyData";
import { colorPalette } from "../color";

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

const Content = styled.div`
  display: flex;
  margin-top: 80px;
  gap: 80px;
`;

const TrendStep1 = () => {
  const [selectedProductCategory, setSelectedProductCategory] = useState("CP");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleProductClick = (product) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.includes(product)) {
        // Remove product if already selected
        return prevSelectedProducts.filter((p) => p !== product);
      } else if (prevSelectedProducts.length < 2) {
        // Add product if less than 2 are selected
        return [...prevSelectedProducts, product];
      } else {
        // Do nothing if 2 products are already selected
        return prevSelectedProducts;
      }
    });
  };

  return (
    <Container>
      <Header>
        <Title>Trend 분석 1차</Title>
      </Header>
      <ProductList>
        {Object.keys(product_data).map((category) => (
          <CategoryButton
            key={category}
            isActive={selectedProductCategory === category}
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
            isActive={selectedProducts.includes(product)}
            onClick={() => handleProductClick(product)}
            title={product_data[selectedProductCategory].data[product].detail}
          >
            {product}
          </ProductButton>
        ))}
      </ProductList>
      <Content></Content>
    </Container>
  );
};

export default TrendStep1;
