import React, { useRef, useState } from "react";
import styled from "styled-components";
import { product_data } from "../dummyData";
import { colorPalette } from "../color";
import ChartComponent3 from "./ChartComponent3";
import ChartComponent4 from "./ChartComponent4";

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

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: end;
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

const TgDggRate = () => {
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

  return (
    <Container>
      <Header>
        <Title>Target DGG Rate</Title>
        <ButtonGroup>
          <IconButton>
            <IoMdDownload
              style={{ fontSize: "20px", fontWeight: "700" }}
              onClick={handleDownloadImage}
            />
          </IconButton>
          <IconButton>
            <TbMailFilled style={{ fontSize: "20px", fontWeight: "700" }} />
          </IconButton>
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
        <ChartComponent3 selectedProductCategory={selectedProductCategory} />
        {selectedProduct && (
          <ChartComponent4
            selectedProductCategory={selectedProductCategory}
            selectedProduct={selectedProduct}
          />
        )}
      </Content>
    </Container>
  );
};

export default TgDggRate;
