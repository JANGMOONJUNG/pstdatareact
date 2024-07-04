import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 760px;
  justify-content: center;
`;

const Image = styled.img`
  width: 800px;
  height: auto;
  object-fit: contain;
`;

const Home = () => {
  return (
    <Container>
      <Image src="./homeMain.png" alt="메인 사진" />
    </Container>
  );
};

export default Home;
