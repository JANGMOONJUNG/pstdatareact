// src/components/Header.js
import React from "react";
import "../css/Header.css";

const Header = ({ active, setActive }) => {
  return (
    <header>
      <h1>개발PTS</h1>
      <nav>
        <ul>
          <li>
            <span
              className={active === 0 ? "active_menu" : ""}
              onClick={() => {
                setActive(0);
              }}
            >
              HOME
            </span>
          </li>
          <li>
            <span
              className={active === 1 ? "active_menu" : ""}
              onClick={() => {
                setActive(1);
              }}
            >
              STATUS
            </span>
          </li>
          <li>
            <span
              className={active === 2 ? "active_menu" : ""}
              onClick={() => {
                setActive(2);
              }}
            >
              검출관리
            </span>
          </li>
          <li>
            <span
              className={active === 3 ? "active_menu" : ""}
              onClick={() => {
                setActive(3);
              }}
            >
              TREND분석
            </span>
          </li>
          <li>
            <span
              className={active === 4 ? "active_menu" : ""}
              onClick={() => {
                setActive(4);
              }}
            >
              TG DGG관리
            </span>
          </li>
          <li>
            <span
              className={active === 5 ? "active_menu" : ""}
              onClick={() => {
                setActive(5);
              }}
            >
              관리 SPEC
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
