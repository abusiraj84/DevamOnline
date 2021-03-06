import React from "react";
import styled, { keyframes } from "styled-components";
// import WaveBackground from "../backgrounds/WaveBackground";
import { H1, MediumText } from "../styles/TextStyles";

function HeroSection() {
  return (
    <>
      <Wrapper>
        <ContentWrapper>
          <TextWrapper>
            <Title>انضمّ إلينا لتتعلم ما يجعلك المميز</Title>
            <Description>
              هنا ستتعلم الأساسيات وصولا للاحتراف، ضمن خطة واضحة وسهلة للوصول
              إلى هدفك. <br /> نحن نضعك على أول الطريق وسنطور من قدراتك، لتنطلق
              بكل ثقة نحو تحقيق كل طموحاتك.
            </Description>

            {/* <PurchaseButton
              title="اشترِ الآن"
              subtitle="عشرات الدورات بانتظارك"
            /> */}
          </TextWrapper>
          <ImgHero src="../images/backgrounds/herobg.svg" />
        </ContentWrapper>
      </Wrapper>
    </>
  );
}

export default HeroSection;
const animation = keyframes`
  from { opacity: 0; transform: translateY(-10px); filter: blur(10px); }
  to { opacity: 1; transform: translateY(0px); filter: blur(0px); }
`;

const Wrapper = styled.div`
  width: 100%;

  perspective: 1000;
`;
const ContentWrapper = styled.div`
  max-width: 1234px;
  margin: 0 auto;
  padding: 200px 30px;
  padding-bottom: 20px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 360px auto;
  gap: 135px;
  @media (max-width: 1270px) {
    grid-template-columns: auto;
    gap: 60px;
    padding: 170px 20px 250px;
    margin: 0px auto;
    padding-bottom: 0px;
  }
  @media (max-width: 450px) {
    grid-template-columns: auto;
    gap: 60px;
    padding: 100px 20px 250px;
    margin: 0px auto;
    padding-bottom: 0px;
  }
`;
const TextWrapper = styled.div`
  max-width: 500px;
  display: grid;
  @media (max-width: 1270px) {
    padding: 10px 30px;

    margin: 0px auto;
  }
  > * {
    :nth-child(1) {
      opacity: 0;
      animation: ${animation} 1s 0.1s forwards;
    }
    :nth-child(2) {
      opacity: 0;
      animation: ${animation} 1s 0.2s forwards;
    }
    :nth-child(3) {
      opacity: 0;
      animation: ${animation} 1s 0.3s forwards;
    }
  }
`;
const Title = styled(H1)`
  font-weight: 600;
  font-size: 55px;
  line-height: 124%;
  text-align: right;
  color: white;
  margin-bottom: 28px;
  opacity: 0;
  animation: ${animation} 1s 0.1s forwards;
  background: linear-gradient(180deg, #00cffd 0%, #ca00fd 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (max-width: 1270px) {
    text-align: center;
    font-size: 50px;
  }
  @media (max-width: 550px) {
    font-size: 40px;
  }
`;
const Description = styled(MediumText)`
  font-weight: normal;
  font-size: 18px;
  line-height: 180%;
  text-align: justify;
  margin-bottom: 7px;
  font-weight: 200;
  @media (max-width: 1270px) {
    text-align: center;
    line-height: 140%;
    margin-bottom: 20px;
  }
  @media (max-width: 550px) {
    font-size: 16px;
  }
`;

const ImgHero = styled.img`
  width: 674px;
  opacity: 0;
  animation: ${animation} 1s 0.7s forwards;
  @media (max-width: 1270px) {
    padding: 10px 30px;
    gap: 50px;
    width: 75px;
    display: none;
  }
`;
