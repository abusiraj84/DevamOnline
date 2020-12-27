import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import lottie from "lottie-web";

function SvgLoading(props) {
  const container = useRef(null);
  const { json } = props;
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current, // Required
      path: "data.json", // Required
      renderer: "svg", // Required
      loop: true, // Optional
      autoplay: true, // Optional
      animationData: require(`../${props.json}.json`),
    });
  }, []);

  return (
    <SvgWrapper>
      {/* <Load src="../images/Infinity.svg" /> */}
      <div ref={container}></div>
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
  background: #1f1f47;
  animation: ${Fadeanimation} 1s 0.6s forwards;
  @media (max-width: 1270px) {
    width: 100vw;
    height: 100vh;

    margin: 0;
  }
`;
const Center = styled.div`
  width: 1250px;
  margin: 0px auto;
`;
