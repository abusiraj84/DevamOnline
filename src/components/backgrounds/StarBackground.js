import React from "react";
import styled from "styled-components";

export default function StarBackground() {
  return (
    <Wrapper>
      <Star src="../images/backgrounds/stars.svg" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  background-position: center top;
  background-repeat: repeat;
  background-image: url(/images/backgrounds/stars.svg);
  height: 224px;
  top: 10px;
  overflow: hidden;
`;

const Star = styled.img``;
