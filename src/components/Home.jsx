import React, { useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 760px;
  justify-content: center;
`;

const Home = () => {
  return (
    <Container>
      <video muted autoPlay style={{ objectFit: "cover" }}>
        <source src="./homeVideo.mp4" type="video/mp4" />
      </video>
    </Container>
  );
};

export default Home;
