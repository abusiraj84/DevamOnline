import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import lottie from "lottie-web";

function SvgLoading() {
  const container = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current, // Required
      path: "data.json", // Required
      renderer: "svg", // Required
      loop: true, // Optional
      autoplay: true, // Optional
      animationData: require("../data2.json"),
    });
  }, []);

  return (
    <SvgWrapper>
      <Center>
        {/* <Load src="../images/Infinity.svg" /> */}
        <div ref={container}></div>
      </Center>
    </SvgWrapper>
  );
}

export default SvgLoading;

const Fadeanimation = keyframes`
0% {
    backdrop-filter: blur(0px)brightness(80%) saturate(100%); 
}
100% {
    backdrop-filter: blur(20px)brightness(100%) saturate(150%); 
}
`;
const SvgWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0px auto;
  background: #5151513b;
  animation: ${Fadeanimation} 1s 0.6s forwards;
`;
const Center = styled.div`
  width: 1250px;
  margin: 0px auto;
`;
