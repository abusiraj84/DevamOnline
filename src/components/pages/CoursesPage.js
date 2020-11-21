import React from "react";
import styled from "styled-components";

import CoursesCards from "../sections/section/CoursesCards";

function CoursesPage() {
  return (
    <Wrapper>
      <CoursesCards />
    </Wrapper>
  );
}

export default CoursesPage;

const Wrapper = styled.div`
  padding-top: 80px;
  width: 1234px;
  margin: 0px auto;
  @media (max-width: 1270px) {
    width: 100%;
  }
`;
