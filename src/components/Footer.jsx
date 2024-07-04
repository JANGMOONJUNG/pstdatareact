// src/components/Footer.js
import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #222831;
  color: #ffd369;
  text-align: center;
  padding: 10px 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2024. 개발PTS All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
