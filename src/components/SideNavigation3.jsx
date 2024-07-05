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

const SideNavigation3 = ({ select, onSelect }) => {
  return (
    <SideNavigationContainer>
      <ul>
        <li
          onClick={() => onSelect("trend-step1")}
          className={select === "trend-step1" ? "side_active" : ""}
        >
          Trend 1차 분석
        </li>
      </ul>
    </SideNavigationContainer>
  );
};

export default SideNavigation3;
