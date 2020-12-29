import React from "react";
import styled from "styled-components";
import Fotter from "./Fotter";
import { Helmet } from "react-helmet";

function Us() {
  return (
    <Wrapper>
      <Helmet title="من نحن">
        <title>من نحن</title>
        <meta name="description" content="من نحن" data-react-helmet="true" />
      </Helmet>
      <Title>من نحن</Title>

      <Desc>
        <center>
          <img src="../images/logos/logo.svg" alt="Logo" />
        </center>
        دوام أونلاين .. هو مورد عبر الإنترنت يقدم دورات تدريبية متخصصة في مجالات
        التصميم والتطوير والبرمجة، الفيديو والصوت والموسيقى.
        <br /> ولأن الإبداع ليس حكرا على فئة لوحدها والتعلم حق متاح للجميع،
        وضعنا بين أيديكم خلاصة خبرة المدربين على مدار سنوات طويلة وبالصوت
        والصورة، كي نفتح آفاقا جديدة ومتنوعة لجيل واعد وموهوب يستقي تعليمه لوحده
        وبأسهل الطرق وأكثرها احترافية. <br /> ولن نكتفي بالبدايات، إنما مستمرون
        معكم بكل جديد ومتنوع ومميز.
      </Desc>
      <Fotter />
    </Wrapper>
  );
}

export default Us;

const Wrapper = styled.div`
  width: 1234px;
  margin: auto;
  padding-top: 200px;
  direction: rtl;

  @media (max-width: 1270px) {
    margin: 0px auto;
    width: 80%;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 40px;
  margin-bottom: 30px;
`;

const Desc = styled.p`
  text-align: justify;
  direction: rtl;
  font-size: 20px;
  margin-bottom: 30px;
  line-height: 160%;
  background: #dddddd14;
  padding: 50px;
  border-radius: 20px;
  @media (max-width: 1270px) {
    font-size: 18px;
  }
`;
