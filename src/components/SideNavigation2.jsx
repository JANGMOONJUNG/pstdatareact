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

const SideNavigation2 = ({ select, onSelect }) => {
  return (
    <SideNavigationContainer>
      <ul>
        <li
          onClick={() => onSelect("tg-dgg-rate")}
          className={select === "tg-dgg-rate" ? "side_active" : ""}
        >
          TG DGG Rate
        </li>
        <li
          onClick={() => onSelect("target-managemnet")}
          className={select === "target-managemnet" ? "side_active" : ""}
        >
          Target 관리
        </li>
        <li
          onClick={() => onSelect("limit-management")}
          className={select === "limit-management" ? "side_active" : ""}
        >
          Limit 관리
        </li>
      </ul>
    </SideNavigationContainer>
  );
};

export default SideNavigation2;
