import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import SvgLoading from "./SvgLoading";
import CoursesCards from "./sections/section/CoursesCards";
import HeroSection from "./sections/HeroSection";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
  }, []);
  return (
    <div>
      {isLoaded ? (
        <Wrapper>
          <Helmet>
            <title>دوام أونلاين || Devam.online</title>
            <meta
              name="title"
              content="Default Title"
              data-react-helmet="true"
            />
            <meta
              name="description"
              content="الموقع العربي الأول للدورات الاحترافية"
            />
            <meta
              property="og:image"
              itemprop="image primaryImageOfPage"
              content="/images/logos/logo.svg"
            ></meta>
          </Helmet>
          <HeroSection />
          <CoursesCards />
        </Wrapper>
      ) : (
        <SvgLoading />
      )}
    </div>
  );
};

export default Home;

const Wrapper = styled.div`
  width: 1220px;
  margin: 0 auto;
  @media (max-width: 1270px) {
    width: 100%;
  }
`;
