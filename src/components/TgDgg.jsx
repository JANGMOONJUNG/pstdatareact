// src/components/Status.js
import React, { useState } from "react";
import styled from "styled-components";
import SideNavigation2 from "./SideNavigation2";
import TgDggRate from "./TgDggRate";
import TargetManagement from "./TargetManagement";
import LimitManagement from "./LimitManagement";

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

  background-color: #e9e9e9;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const TgDgg = () => {
  const [selectedComponent, setSelectedComponent] = useState("tg-dgg-rate");

  const renderComponent = () => {
    switch (selectedComponent) {
      case "tg-dgg-rate":
        return <TgDggRate />;
      case "target-managemnet":
        return <TargetManagement />;
      case "limit-management":
        return <LimitManagement />;
      default:
        return <></>;
    }
  };

  return (
    <ContainerStatus>
      <SideBar>
        <SideNavigation2
          select={selectedComponent}
          onSelect={setSelectedComponent}
        />
      </SideBar>
      <Content>{renderComponent()}</Content>
    </ContainerStatus>
  );
};

export default TgDgg;
