// src/components/Status.js
import React, { useState } from "react";
import styled from "styled-components";
import ProcessModuleRate from "./ProcessModuleRate";
import MonthlyWeeklyRate from "./MonthlyWeeklyRate";
import SideNavigation from "./SideNavigation";
import InspectionManage from "./InspectionManage";

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

const Status = () => {
  const [selectedComponent, setSelectedComponent] = useState(
    "monthly-weekly-rate"
  );

  const renderComponent = () => {
    switch (selectedComponent) {
      case "monthly-weekly-rate":
        return <MonthlyWeeklyRate />;
      case "process-module-rate":
        return <ProcessModuleRate />;
      case "inspection-manage":
        return <InspectionManage />;
      default:
        return <MonthlyWeeklyRate />;
    }
  };

  return (
    <ContainerStatus>
      <SideBar>
        <SideNavigation
          select={selectedComponent}
          onSelect={setSelectedComponent}
        />
      </SideBar>
      <Content>{renderComponent()}</Content>
    </ContainerStatus>
  );
};

export default Status;
