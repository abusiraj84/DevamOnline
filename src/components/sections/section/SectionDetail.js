import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import PurchaseButton from "../../buttons/PurchaseButton";
import { useSelector } from "react-redux";
import Paypal from "../../Paypal";
import ReactHtmlParser from "react-html-parser";

import {
  Caption,
  Caption2,
  H1,
  H2,
  MediumText,
  SmallText,
} from "../../styles/TextStyles";

function SectionDetail(props) {
  useEffect(() => {}, []);

  const {
    logo,
    title,
    img,
    sections,
    lessons,
    hours,
    desc,
    name,
    instaimg,
    topics,
    imgcolor,
    price,
    sale,
    id,
    isAccess,
    password,
  } = props;

  ////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////

  return (
    <Wrapper>
      <BoxImgWrapper imgcolor={imgcolor}>
        <BoxImg src={img || "../images/Infinity.svg"} />
      </BoxImgWrapper>
      <Logo src={logo || "../images/Infinity.svg"} />
      <Title>{title}</Title>
      <InstracturWrapper>
        <InstracturImg src={instaimg || "../images/Infinity.svg"} />
        <InstracturName>المدرب: {name || "Husam Nasrullah"}</InstracturName>
      </InstracturWrapper>
      <Desc1>
        {sections || "0"} أقسام || {lessons || "0"} درس || {hours || "2"} ساعة
      </Desc1>
      <Desc2>
        {ReactHtmlParser(desc) ||
          " In this course we will show you how to create a promo video using After Effects."}
      </Desc2>

      {/* {isButtonvar()} */}

      {isAccess !== true && price !== "0" ? (
        <PurchaseButton
          title="اشترِ الآن"
          subtitle="عشرات الدورات بانتظارك"
          price={price}
          sale={sale}
          courseid={id}
        />
      ) : price === "0" ? (
        <h1
          style={{
            color: "#ffffff",
            fontSize: "14px",
            background: "black",
            padding: "20px",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          كلمة مرور المرفقات: No Password
        </h1>
      ) : (
        <h1
          style={{
            color: "#ffffff",
            fontSize: "14px",
            background: "black",
            padding: "20px",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          كلمة مرور المرفقات: {password}
        </h1>
      )}

      <Line />
      <TopicWrapper>
        <TopicTitle>
          {topics || "0"} أقسام - {lessons || "0"} درس
        </TopicTitle>
        <TopicDesc>
          جميع الدروس مشروحة بخطوات سهلة ومباشرة، ما عليك إلا المشاهدة.{" "}
        </TopicDesc>
      </TopicWrapper>
    </Wrapper>
  );
}

export default SectionDetail;
const animation = keyframes`
  from { opacity: 0; transform: translateY(-10px); filter: blur(10px); }
  to { opacity: 1; transform: translateY(0px); filter: blur(0px); }
`;

const Wrapper = styled.div`
  max-width: 1234px;
  display: grid;
  box-sizing: border-box;
  grid-template-columns: auto;
  justify-items: center;
  padding: 50px 0px 0px;
  gap: 40px;
  margin: 0px 20px;
  @media (max-width: 1270px) {
    width: 90%;
    margin: 0 auto;
    padding: 100px 0px 0px;
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
    :nth-child(4) {
      opacity: 0;
      animation: ${animation} 1s 0.4s forwards;
    }
    :nth-child(5) {
      opacity: 0;
      animation: ${animation} 1s 0.5s forwards;
    }
    :nth-child(6) {
      opacity: 0;
      animation: ${animation} 1s 0.4s forwards;
    }
  }
`;

const BoxImgWrapper = styled.div`
  width: 360px;
  height: 280px;

  background: ${(props) => props.imgcolor || "#ffffff24"};
  box-shadow: rgba(0, 0, 0, 0.25) 0px 10px 20px,
    rgba(255, 255, 255, 0.25) 0px 0px 0px 0.5px inset;
  box-sizing: border-box;
  border-radius: 20px;
  display: grid;
  -webkit-box-pack: center;
  place-content: center;
  grid-template-columns: auto;
  justify-items: center;
  transition: all 0.8s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
  margin-top: 25px;
  &:hover {
    transform: scale(1.1);
    filter: hue-rotate(-30deg);
  }

  &:hover img {
    transform: scale(0.8);
  }
  @media (max-width: 450px) {
    width: 260px;
    height: 180px;
  }
`;

const BoxImg = styled.img`
  transition: all 0.8s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
  /* width: 300px;
  height: 200px; */
  border-radius: 21px;
`;

const Logo = styled.img`
  width: 60px;
  height: 60px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 10px 20px,
    rgba(255, 255, 255, 0.25) 0px 0px 0px 0.5px inset;
  border-radius: 37px;
`;

const Title = styled(H1)`
  color: rgb(255, 255, 255);
  text-align: center;
  text-shadow: rgba(0, 0, 0, 0.3) 0px 20px 40px;

  @media (max-width: 1270px) {
    text-align: center;
    font-size: 50px;
  }
  @media (max-width: 450px) {
    font-size: 30px;
    padding: 0 40px;
  }
`;

const Desc1 = styled(MediumText)`
  text-align: right;
  direction: rtl;
  text-align: 193%;
`;

const Desc2 = styled.div`
  padding: 40px;
  text-align: right;
  direction: rtl;
  line-height: 175%;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 10px 20px,
    rgba(255, 255, 255, 0.25) 0px 0px 0px 0.5px inset;
  border-radius: 20px;
  ul {
    margin-bottom: 00px;
    margin-top: 20px;
  }
  li {
    padding-bottom: 10px;
    padding-top: 10px;
    background: #dddddd1f;
    margin-bottom: 10px;
    border-radius: 20px;
    padding-right: 30px;
  }
  span {
    padding: 10px;
    margin-top: 40px;
  }
  h1 {
    font-weight: 700;
    color: #32b3e4;
    font-size: 28px;
    text-align: center;
    margin-bottom: 20px;
  }

  h2 {
    font-weight: 700;
    color: #32b3e4;
    font-size: 25px;
    text-align: center;
    margin-bottom: 10px;
    margin-top: 20px;
  }
  strong {
    font-weight: 700;
    color: #32b3e4;
    font-size: 28px;
    text-align: center;
    margin-bottom: 40px;
    padding-top: 10px;
  }
  span {
    padding: 0;
  }
  p {
    margin-bottom: 8px;
  }
  a {
    color: #fff;
    font-weight: 400;
    transition: all 0.2s ease-in-out;
    :hover {
      color: #32b3e4;
      transform: translateY(200px);
    }
  }
  table,
  th {
  }
  thead {
    background: #dddddd1f;
  }

  table {
    width: 70%;
    margin: 0px auto;
    border-collapse: collapse;
  }
  td {
    width: 100px;
  }
  @media (max-width: 450px) {
    padding: 40px 20px;
    width: 90%;
  }
`;

const InstracturWrapper = styled.div`
  display: flex;
  grid-template-columns: 50px 250px;
  -webkit-box-pack: center;
  place-content: center;
  justify-items: center;
  align-items: center;
  z-index: 10;
`;
const InstracturImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  margin-left: 25px;
`;

const InstracturName = styled(Caption)``;

const Line = styled.div`
  width: 280px;
  height: 0.5px;
  margin: 0px auto;
  background: rgba(255, 255, 255, 0.3);
`;
const TopicWrapper = styled.div`
  padding: 0px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TopicTitle = styled(Caption2)`
  color: rgba(255, 255, 255, 0.7);
  font-size: 30px;
  margin-bottom: 20px;
`;
const TopicDesc = styled(SmallText)`
  color: rgba(255, 255, 255, 0.9);
  margin: 12px auto 0px;
  text-align: center;
  font-size: 18px;
`;

const Price = styled(H2)`
  color: #e89325;
  padding: 10px;
  border-radius: 10px;
  background: #dddddd26;
  box-shadow: 0px 50px 100px rgba(0, 0, 0, 0.25),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  -webkit-backdrop-filter: blur(40px);
  backdrop-filter: blur(40px);
`;
const PriceTitle = styled(H2)`
  font-size: 22px;
`;
const Sale = styled(SmallText)`
  font-size: 30px;

  text-decoration: line-through;
  font-size: 22px;
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-radius: 20px;
  background: rgba(15, 14, 71, 0.3);
  box-shadow: 0px 50px 100px rgba(0, 0, 0, 0.25),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  -webkit-backdrop-filter: blur(40px);
  backdrop-filter: blur(40px);
`;

const Registerd = styled.div`
  background: #072d48;
  padding: 15px 164px;
  border-radius: 36px;
  @media (max-width: 450px) {
    padding: 15px 60px;
  }
`;
