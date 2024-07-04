// src/components/Status.js
import React, { useState } from "react";
import styled from "styled-components";
import ProcessModuleRate from "./ProcessModuleRate";
import MonthlyWeeklyRate from "./MonthlyWeeklyRate";
import SideNavigation from "./SideNavigation";
import InspectionManage from "./InspectionManage";
import SideNavigation2 from "./SideNavigation2";
import TgDggRate from "./TgDggRate";

const ContainerStatus = styled.div`
  display: flex;
  height: 760px;
`;

const SideBar = styled.div`
  width: 200px;
  background-color: #f4f4f4;
`;

const Content = styled.main`
  flex-grow: 1;
  padding: 40px;
`;

const TgDgg = () => {
  const [selectedComponent, setSelectedComponent] = useState("tg-dgg-rate");

  const renderComponent = () => {
    switch (selectedComponent) {
      case "tg-dgg-rate":
        return <TgDggRate />;
      case "target-managemnet":
        return <></>;
      case "limit-management":
        return <></>;
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
