// src/components/Header.js
import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: #222831;
  color: #ffffff;
  padding: 20px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
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
  color: #ffffff;
  text-decoration: none;
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  cursor: pointer;

  &.active_menu {
    color: #6986ff;
  }

  &:hover {
    color: #6986ff;
    border-bottom: 2px solid #6986ff;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background-color: blue;
`;

const UserDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const UserDepartment = styled.span`
  font-weight: 700;
`;

const UserNameAndNumber = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const UserName = styled.span`
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-weight: 600;
`;

const UserNumber = styled.span`
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  color: #555;
`;

const Header = ({ active, setActive }) => {
  const profile = {
    EMP_NO: "2053940",
    NAME_KOR: "장문정",
    DEPT_NAME_KOR: "DRAM개발PI품질&수율",
  };

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
      <UserInfo>
        <UserImage src={""} alt="User Photo" />
        <UserDetailContainer>
          <UserDepartment>{profile.DEPT_NAME_KOR}</UserDepartment>
          <UserNameAndNumber>
            <UserName>{profile.NAME_KOR}</UserName>
            <UserNumber>{profile.EMP_NO}</UserNumber>
          </UserNameAndNumber>
        </UserDetailContainer>
      </UserInfo>
    </HeaderContainer>
  );
};

export default Header;
