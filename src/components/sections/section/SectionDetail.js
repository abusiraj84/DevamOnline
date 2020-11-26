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
  const { user: currentUser } = useSelector((state) => state.auth);
  const [theuser, setTheuser] = useState([]);
  const [course, setCourse] = useState([]);
  useEffect(() => {
    if (currentUser) {
      fetchUsers();
    }
  }, []);

  const {
    logo,
    title,
    img,
    sections,
    hours,
    desc,
    name,
    instaimg,
    topics,
    imgcolor,
    price,
    sale,
    id,
  } = props;

  ////////////////////////////////////////////////////////////////////////////////
  const token = currentUser ? currentUser.token : [];
  const fetchUsers = async () => {
    const users = await fetch(
      " https://devam.website/Devam-Api/public/api/user",
      {
        method: "get",
        headers: new Headers({
          Authorization: "Bearer " + token,
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      }
    );

    const userdata = await users.json();

    const theuser = [];
    const course = [];

    for (const [index, value] of userdata.entries()) {
      // value.id == currentUser.user.id ? theuser.push(value.id) : "";

      if (value.id == currentUser.user.id) {
        theuser.push(value);
        for (const [index, courses] of value.courses.entries()) {
          // console.log(courses);
          // console.log(id);
          if (courses.courses_id == id) {
            course.push(courses);
            // console.log("yes");
          }
        }
      }
      // console.log(theuser.push(value.id == currentUser.user.id));
    }
    setTheuser(theuser[0]);
    setCourse(course[0]);
    // console.log(course[0].courses_id);
  };

  ///////////////////////////////////////////////////////////////////////////////

  const isButtonvar = () => {
    if (course) {
      return <Registerd>مشترك</Registerd>;
    } else if (course == undefined && price != 0.0) {
      return (
        <PriceWrapper>
          <PriceTitle>احصل على الدورة بمقابل</PriceTitle>
          <Sale>${sale}</Sale>
          <Price>${price}</Price>
          <Paypal total={price} id={id} />
        </PriceWrapper>
      );
    } else if (price == 0.0) {
      return <Registerd>دورة مجانية!</Registerd>;
    }
  };
  return (
    <Wrapper>
      <BoxImgWrapper imgcolor={imgcolor}>
        <BoxImg src={img || "images/ills/example1.svg"} />
      </BoxImgWrapper>
      <Logo src={logo || "images/icons/cubase.svg"} />
      <Title>{title}</Title>
      <Desc1>
        {sections || "0"} أقسام - {hours || "2"} ساعة
      </Desc1>
      <Desc2>
        {ReactHtmlParser(desc) ||
          " In this course we will show you how to create a promo video using After Effects."}
      </Desc2>
      <InstracturWrapper>
        <InstracturImg
          src={
            instaimg ||
            "https://scontent.fsaw1-6.fna.fbcdn.net/v/t1.0-9/109947688_2536568519897212_8481853244792259908_n.jpg?_nc_cat=109&ccb=2&_nc_sid=09cbfe&_nc_ohc=8Hl_KYSqMNoAX8Xy2Mp&_nc_ht=scontent.fsaw1-6.fna&oh=d51e6ee9c25002df4182a8f11c8da66c&oe=5FB8804F"
          }
        />
        <InstracturName>المدرب: {name || "Husam Nasrullah"}</InstracturName>
      </InstracturWrapper>
      {isButtonvar()}
      <Line />
      <TopicWrapper>
        <TopicTitle>{topics || "20"} درس</TopicTitle>
        <TopicDesc>
          جميع الخطوات مشروحة للمتدربين بطريقة مبسطة وسهلة، وستجد كل شيء في
          متناول يديك.
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
    width: 100%;
    margin: 0 auto;
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

  background: ${(props) =>
    props.imgcolor ||
    "linear-gradient(209.21deg, #9F7FE5 13.57%, #4E99E3 98.38%)"};
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
  width: 300px;
  height: 200px;
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

const Desc2 = styled.p`
  padding: 40px;
  text-align: right;
  direction: rtl;
  line-height: 175%;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 10px 20px,
    rgba(255, 255, 255, 0.25) 0px 0px 0px 0.5px inset;
  border-radius: 20px;
  font-family: tahoma;
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

  strong {
    font-family: "Alaraby";
    color: #32b3e4;
    font-size: 28px;
  }
  span {
    padding: 0;
  }
  @media (max-width: 450px) {
    padding: 40px;
    width: 80%;
  }
`;

const InstracturWrapper = styled.div`
  display: grid;
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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 22px;
`;
const Sale = styled(SmallText)`
  font-size: 30px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
