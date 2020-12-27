import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import CoursesCards from "../sections/section/CoursesCards";
import { H1 } from "../styles/TextStyles";
import SvgLoading from "../SvgLoading";
import Fotter from "../Fotter";
function CoursesPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);
  return (
    <div>
      {isLoaded ? (
        <Wrapper>
          <Helmet title="دورات دوام أونلاين">
            <title>دورات دوام أونلاين</title>
            <meta
              name="description"
              content="دورات دوام أونلاين"
              data-react-helmet="true"
            />
          </Helmet>
          <Title> جميع الدورات </Title>
          <CoursesCards />
        </Wrapper>
      ) : (
        <SvgLoading json="2" />
      )}
      <Fotter />
    </div>
  );
}

export default CoursesPage;

const Wrapper = styled.div`
  min-height: 100vh;
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
