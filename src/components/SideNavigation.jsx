import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import axios from "axios";

const SideNavigationContainer = styled.nav`
  position: relative;
  transition: margin-left 0.6s ease; /* Add transition for smooth sliding */
  margin-left: ${({ isOpen }) =>
    isOpen ? "0px" : "-200px"}; /* Change margin based on isOpen prop */
  width: 200px;
  min-width: 200px;
  background-color: #f4f4f4;

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
    height: 44px;
    display: flex;
    align-items: center;
    font-weight: 600;

    margin: 0px;
    padding-left: 16px;
  }

  .side_active {
    background-color: #30475e;
    color: #ffffff;
  }
`;

const SideNavigation = ({ select, onSelect }) => {
  const [isOpen, setIsOpen] = useState(true); // State to control navigation visibility

  const [techs, setTechs] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:4001/products").then((res) => {
      setTechs([...new Set(res.data.map((item) => item.tech))]);
      setProducts(res.data);
    });
  }, []);

  return (
    <SideNavigationContainer isOpen={isOpen}>
      {techs.map((item) => {
        return (
          <>
            <h3
              style={{
                textAlign: "left",
                fontSize: "16px",
                marginLeft: "10px",
              }}
            >
              {item}
            </h3>
            <ul>
              {products
                .filter((e) => e.tech === item)
                .map((e2) => {
                  return (
                    <li
                      onClick={() => onSelect(`${e2.name} - ${e2.detail}`)}
                      className={
                        select === `${e2.name} - ${e2.detail}`
                          ? "side_active"
                          : ""
                      }
                    >
                      <span style={{ color: "red" }}>{`${
                        e2.type === "core" ? "*" : ""
                      }`}</span>
                      {`${e2.name} - ${e2.detail}`}
                    </li>
                  );
                })}
            </ul>
          </>
        );
      })}
      <button
        style={{
          position: "absolute",
          top: "10px",
          right: isOpen ? "-16px" : "-36px",
          border: "2px solid #333",
          width: "32px",
          height: "32px",
          padding: "0px",
          borderRadius: "50%",
          backgroundColor: "#fff",
        }}
        onClick={() => setIsOpen(!isOpen)} // Toggle navigation visibility
      >
        {isOpen ? (
          <FaChevronLeft style={{ color: "#333" }} />
        ) : (
          <FaChevronRight style={{ color: "#333" }} />
        )}
      </button>
    </SideNavigationContainer>
  );
};

export default SideNavigation;
