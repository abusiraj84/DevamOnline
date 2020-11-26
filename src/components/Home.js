import React from "react";
import styled from "styled-components";
import HeroSection from "./sections/HeroSection";
import CoursesCards from "./sections/section/CoursesCards";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <Wrapper>
      <Helmet>
        <title>دوام أونلاين || Devam.online</title>
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
