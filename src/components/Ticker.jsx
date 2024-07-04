// src/components/Ticker.js
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

const TickerContainer = styled.div`
  background-color: #222831;
  color: #ffd369;
  padding: 16px 0;
  text-align: center;
  font-weight: bold;
  overflow: hidden;
  position: relative;
  white-space: nowrap;
`;

const TickerContent = styled.div`
  display: inline-block;
  animation: ${tickerAnimation} 10s linear infinite;
`;

const Ticker = () => {
  const [cp, setCp] = useState(0);
  const [lc, setLc] = useState(0);
  const [sp, setSp] = useState(0);

  useEffect(() => {
    // 서버에서 데이터를 가져와서
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setCp(json.length);
        setLc(json.length);
        setSp(json.length);
      });
  }, []);

  return (
    <TickerContainer>
      <TickerContent>
        금주의 PTS 검출 - CP {cp}건, LC {lc}건, SP {sp}건
      </TickerContent>
    </TickerContainer>
  );
};

export default Ticker;
