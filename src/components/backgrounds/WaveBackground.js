import React from "react";
import styled from "styled-components";

export default function WaveBackground() {
  return (
    <Wrapper>
      <Background />
      <Wave
        src="/images/waves/hero-wave1.svg"
        style={{ top: "100px", filter: "blur(100px)" }}
      />
      <Wave src="/images/waves/course-wave2.svg" style={{ top: "300px" }} />
      <Wave src="/images/waves/hero-wave2.svg" style={{ top: "400px" }} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

const Wave = styled.img`
  position: absolute;
  left: 0;
  width: 100%;
  overflow: hidden;
  z-index: -1;
  @media (min-width: 1440px) {
    width: 100%;
  }
  /* background: linear-gradient(180deg, #4316db 0%, #9076e7 100%); */
`;

const Background = styled.div`
  /* background: linear-gradient(180deg, #4316db 0%, #9076e7 100%); */
  position: absolute;
  width: 100%;
  /* height: 800px; */
  z-index: -1;
`;
