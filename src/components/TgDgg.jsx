// src/components/Status.js
import React, { useState } from "react";
import styled from "styled-components";
import SideNavigation2 from "./SideNavigation2";

import ChartComponent3 from "./ChartComponent3";
import ChartComponent4 from "./ChartComponent4";

import { IoMdDownload } from "react-icons/io";
import { TbMailFilled } from "react-icons/tb";
import { RiFileExcel2Fill } from "react-icons/ri";
import TargetManagement from "./TargetManagement";
import LimitManagement from "./LimitManagement";

const ContainerStatus = styled.div`
  display: flex;
`;

const Content = styled.main`
  flex-grow: 1;
  padding: 40px;

  background-color: #e9e9e9;

  display: flex;
  justify-content: center;
  align-items: center;
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

const TgDgg = () => {
  const [selectedComponent, setSelectedComponent] = useState("");

  return (
    <ContainerStatus>
      <SideNavigation2
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
            <Title>Target match list</Title>
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
              width: "100%",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <ChartComponent3 selectedProductCategory={"LC"} />

            <ChartComponent4
              selectedProductCategory={"LC"}
              selectedProduct={"6EN"}
            />
          </div>
          <TargetManagement />
          <LimitManagement />
        </Container>
      </Content>
    </ContainerStatus>
  );
};

export default TgDgg;
