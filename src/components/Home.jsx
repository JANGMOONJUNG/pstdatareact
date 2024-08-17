import React, { useRef } from "react";
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
  const ref = useRef();

  return (
    <Container>
      <video muted autoPlay style={{ objectFit: "cover" }}>
        <source src="./homeVideo.mp4" type="video/mp4" />
      </video>
    </Container>
  );
};

export default Home;
