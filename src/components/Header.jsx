// src/components/Header.js
import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: #ffd369;
  color: #222831;
  padding: 20px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 40px;
  font-family: "Nanum Pen Script", cursive;
  font-weight: 900;
`;

const Nav = styled.nav`
  padding: 10px 0;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-around;
  gap: 32px;
`;

const NavItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavLink = styled.span`
  color: #393e46;
  text-decoration: none;
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  border-bottom: 2px solid #ffd369;
  cursor: pointer;

  &.active_menu {
    color: #6986ff;
  }

  &:hover {
    color: #393e46;
    border-bottom: 2px solid #393e46;
  }
`;

const Header = ({ active, setActive }) => {
  return (
    <HeaderContainer>
      <Title>개발PTS</Title>
      <Nav>
        <NavList>
          <NavItem>
            <NavLink
              className={active === 0 ? "active_menu" : ""}
              onClick={() => setActive(0)}
            >
              HOME
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={active === 1 ? "active_menu" : ""}
              onClick={() => setActive(1)}
            >
              STATUS
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={active === 2 ? "active_menu" : ""}
              onClick={() => setActive(2)}
            >
              TREND분석
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={active === 3 ? "active_menu" : ""}
              onClick={() => setActive(3)}
            >
              TG DGG관리
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={active === 4 ? "active_menu" : ""}
              onClick={() => setActive(4)}
            >
              LOT 산포이력
            </NavLink>
          </NavItem>
        </NavList>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
