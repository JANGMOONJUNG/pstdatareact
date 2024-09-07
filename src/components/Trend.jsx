// src/components/Status.js
import React, { useState } from "react";
import styled from "styled-components";
import SideNavigation3 from "./SideNavigation3";
import TrendStep1 from "./TrendStep1";
import TrendGather from "./TrendGather";
import LotStatus from "./LotStatus";

const ContainerStatus = styled.div`
  display: flex;
  height: 760px;
`;

const SideBar = styled.div`
  width: 200px;
  min-width: 200px;
  background-color: #f4f4f4;
`;

const Content = styled.main`
  flex-grow: 1;
  padding: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Trend = () => {
  const [selectedComponent, setSelectedComponent] = useState("trend-step1");

  const renderComponent = () => {
    switch (selectedComponent) {
      case "trend-step1":
        return <LotStatus />;
      case "trendGather":
        return <LotStatus />;
      default:
        return <></>;
    }
  };

  return (
    <ContainerStatus>
      <Content>{renderComponent()}</Content>
    </ContainerStatus>
  );
};

export default Trend;
