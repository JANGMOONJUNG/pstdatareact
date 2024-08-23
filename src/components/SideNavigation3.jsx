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
          onClick={() => onSelect("trendGather")}
          className={select === "trendGather" ? "side_active" : ""}
        >
          검출Trend 모음
        </li>
        <li
          onClick={() => onSelect("trend-step1")}
          className={select === "trend-step1" ? "side_active" : ""}
        >
          검출분석Tool 1차
        </li>
      </ul>
    </SideNavigationContainer>
  );
};

export default SideNavigation3;
