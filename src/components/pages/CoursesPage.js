import React from "react";
import styled from "styled-components";

import CoursesCards from "../sections/section/CoursesCards";
import { H1 } from "../styles/TextStyles";

function CoursesPage() {
  return (
    <Wrapper>
      <Title> جميع الدورات </Title>
      <CoursesCards />
    </Wrapper>
  );
}

export default CoursesPage;

const Wrapper = styled.div`
  padding-top: 200px;
  width: 1234px;
  margin: 0px auto;
  @media (max-width: 1270px) {
    width: 100%;
    padding-top: 150px;
  }
`;

const Title = styled(H1)`
  text-align: center;
  font-size: 40px;
`;
