import React from "react";
import styled from "styled-components";

function LoadingScreen() {
  return (
    <Wrapper>
      <Load src="images/load.svg" />
    </Wrapper>
  );
}

export default LoadingScreen;
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #ffffff1c;
  z-index: 99999;
  justify-content: center;
  align-content: center;
  display: flex;
  backdrop-filter: blur(20px) brightness(85%) saturate(150%);
`;

const Load = styled.img`
  width: 100px;
`;
