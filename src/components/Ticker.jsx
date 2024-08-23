// src/components/Ticker.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const tickerAnimation = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const colorAnimation = keyframes`
  0% {
    color:#ffffff;
  }
  50%{
  color:#6986ff;
  }
  100% {
    color:#ffffff;
  }
`;

const TickerContainer = styled.div`
  background-color: #3f4a59;
  color: #ffffff;
  padding: 16px 0;
  text-align: center;
  font-weight: bold;
  overflow: hidden;
  position: relative;
  white-space: nowrap;
`;

const TickerContent = styled.div`
  display: inline-block;
  animation: ${tickerAnimation} 10s linear infinite,
    ${colorAnimation} 4s linear infinite;
`;

const Ticker = () => {
  const [cp, setCp] = useState(0);
  const [lc, setLc] = useState(0);
  const [sp, setSp] = useState(0);

  const [body, setBody] = useState("");

  useEffect(() => {
    /*axios.get("127.0.0.1:5500/data").then((res) => {
      console.log(res);
    });*/
  }, []);

  return (
    <TickerContainer>
      <TickerContent>
        금주의 PTS 검출 - CP {cp}건, LC {lc}건, SP {sp}건 body {body}
      </TickerContent>
    </TickerContainer>
  );
};

export default Ticker;
