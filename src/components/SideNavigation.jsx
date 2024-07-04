import React from "react";
import styled from "styled-components";

const SideNavigationContainer = styled.nav`
  ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    margin: 0;
  }

  li {
    margin-bottom: 10px;
    cursor: pointer;
    color: #333;

    height: 48px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: bold;
  }

  .side_active {
    background-color: #30475e;
    color: #ffffff;
  }
`;

const SideNavigation = ({ select, onSelect }) => {
  return (
    <SideNavigationContainer>
      <ul>
        <li
          onClick={() => onSelect("monthly-weekly-rate")}
          className={select === "monthly-weekly-rate" ? "side_active" : ""}
        >
          월/주간 합격률
        </li>
        <li
          onClick={() => onSelect("process-module-rate")}
          className={select === "process-module-rate" ? "side_active" : ""}
        >
          공정/모듈별 합격률
        </li>
        <li
          onClick={() => onSelect("inspection-manage")}
          className={select === "inspection-manage" ? "side_active" : ""}
        >
          검출 관리
        </li>
      </ul>
    </SideNavigationContainer>
  );
};

export default SideNavigation;
