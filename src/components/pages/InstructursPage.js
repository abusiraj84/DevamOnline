import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { H1, H2, SmallText } from "../styles/TextStyles";
import { config } from "../../config";
import SvgLoading from "../SvgLoading";

function InstructursPage() {
  useEffect(() => {
    fetchData();
    setTimeout(() => {
      setIsLoaded(true);
    }, 2500);
  }, []);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    const data = await fetch(`${config.siteUrl}/wp-json/husam/v1/users`);
    const items = await data.json();
    console.log(items);
    setItems(items);
  };

  return (
    <>
      {isLoaded ? (
        <Wrapper>
          <Title>المدربون</Title>
          <CardWrapper>
            {items.map((item, i) =>
              item.courses.length ? (
                <Card key={i}>
                  <Avatar src={`${item.avatar}`} />
                  <Name>{item.display_name}</Name>
                  <CoursNum>عدد الدورات : {item.courses.length}</CoursNum>
                  <Cv>{item.meta.description}</Cv>
                  <IconsWrapper>
                    <a href={item.meta.facebook} target="_blank">
                      <Icon src="images/icons/facebook.svg"></Icon>
                    </a>
                    <a href={item.meta.instagram} target="_blank">
                      <Icon src="images/icons/instagram.svg"></Icon>
                    </a>
                    <a href={item.meta.youtube} target="_blank">
                      <Icon src="images/icons/youtube.svg"></Icon>
                    </a>
                    <a href={item.meta.whatsapp} target="_blank">
                      <Icon src="images/icons/whatsapp.svg"></Icon>
                    </a>
                  </IconsWrapper>
                  <CourseWrapper>
                    <CoursNum style={{ textAlign: "center" }}>الدورات</CoursNum>
                    {item.courses.map((item, i) => (
                      <Link key={i} to={`/course/${item.post_name}`}>
                        <CourseTitle key={i}>{item.post_title}</CourseTitle>
                      </Link>
                    ))}{" "}
                  </CourseWrapper>
                </Card>
              ) : null
            )}
          </CardWrapper>
        </Wrapper>
      ) : (
        <SvgLoading />
      )}
    </>
  );
}

export default InstructursPage;
const animation = keyframes`
  from { opacity: 0; transform: translateY(-10px); filter: blur(10px); }
  to { opacity: 1; transform: translateY(0px); filter: blur(0px); }
`;
const Wrapper = styled.div`
  padding-top: 200px;
  width: 1234px;
  margin: 0px auto;

  @media (max-width: 1300px) {
    padding-top: 150px;
    width: 100%;
    margin: 0px auto;
    margin-bottom: 40px;
  }
`;
const Title = styled(H1)`
  text-align: center;
  font-size: 40px;
  margin-bottom: 40px;
  opacity: 0;
  animation: ${animation} 1s 0.1s forwards;
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  direction: rtl;

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
  @media (max-width: 1300px) {
    width: 100%;
    margin: 0px auto;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  @media (max-width: 800px) {
    width: 100%;
    margin: 0px auto;
    grid-template-columns: 1fr;
  }
`;
const Card = styled.div`
  width: 350px;
  padding: 20px;
  border-radius: 20px;
  box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 0.5px inset;
  -webkit-backdrop-filter: blur(20px) brightness(80%) saturate(150%);
  backdrop-filter: blur(20px) brightness(80%) saturate(150%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  transition: all 0.8s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;

  &:hover {
    box-shadow: rgb(48 198 255 / 30%) 0px 20px 80px,
      rgba(0, 0, 0, 0.15) 0px 20px 40px;

    transform: scale(1.1);
  }
  &:hover img,
  InstracturImg {
    transform: scale(0.8);
  }
  @media (max-width: 1300px) {
    width: 80%;

    margin: 0px auto;
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 600px) {
    width: 80%;
    padding: 20px;
    min-width: 50%;
    grid-template-columns: 1fr;
  }
`;
const Avatar = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 100px;
  border: 4px solid #fff;
  margin-bottom: 20px;
  transition: all 0.3s ease-in-out 0s;
`;

const Name = styled(H1)`
  color: white;
  font-size: 20px;
  margin-bottom: 10px;
`;

const CoursNum = styled(H2)`
  color: #38ffff;
  font-size: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(255, 255, 255, 0.1);
  margin-bottom: 20px;
`;

const Cv = styled.div`
  padding: 20px;
  background: #f3f3f3;
  color: #131212;
  min-width: 300px;
  text-align: center;
  margin-bottom: 20px;
  border-radius: 6px;
  @media (max-width: 1300px) {
    width: 80%;
    padding: 20px;
    min-width: 50%;
  }
`;

const CourseWrapper = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style-type: none;
  background: #02caea14;
  padding: 26px;
  border-radius: 10px;
  width: 100%;
`;

const CourseTitle = styled.li`
  text-align: right;
  font-size: 13px;
  padding-bottom: 20px;
  transition: all 0.3s ease-in-out 0s;
  color: #fff;
  padding: 19px;
  border-radius: 6px;
  background: #b9acac29;
  rgba(255,255,255,0.25) 0px 20px 40px,
  rgba(0,0,0,0.1) 0px 1px 5px,
  rgba(255,255,255,0.4) 0px 0px 0px 0.5px inset;
   &:hover {
    cursor: pointer;
    transform: translateY(-2px);
    color: #ddd;
  }
`;

const IconsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;
const Icon = styled.img`
  /* width: 40px; */
  height: 33px;
  -webkit-transition: all 0.2s ease-in-out 0s;
  transition: all 0.2s ease-in-out 0s;
  /* color: blue; */
  background: #fff;
  padding: 8px;
  border-radius: 10px;
  margin-left: 12px;
  margin-right: 12px;

  :hover {
    transform: scale(1.1) !important;
  }
`;
