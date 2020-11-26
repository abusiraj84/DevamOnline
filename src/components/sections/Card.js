import React from "react";
import styled from "styled-components";
import { SmallText, SmallText2 } from "../styles/TextStyles";

function Card(props) {
  const {
    title,
    img,
    instracturimg,
    instracturname,
    bgcolor,
    price,
    sale,
    sections,
    hours,
  } = props;

  return (
    <Box bgcolor={bgcolor}>
      <BoxImg
        src={
          img ||
          "//images.ctfassets.net/ooa29xqb8tix/7sZsITPVNFJcG5Fmu0AyBi/442a2ee3d4dc94a9795ae2ec5222f039/React_Hooks_Illustration_Cover.svg"
        }
        alt="Build a web app with React Hooks icon"
      />
      <InstracturWrapper>
        <InstracturName>{instracturname || "Husam Nasrullah"}</InstracturName>
        <InstracturImg
          src={
            instracturimg ||
            "https://scontent.fsaw1-9.fna.fbcdn.net/v/t1.0-9/60034390_10155925053061333_7596400182741172224_o.jpg?_nc_cat=101&ccb=2&_nc_sid=174925&_nc_ohc=6uu7a1JoBFQAX_7zy4J&_nc_ht=scontent.fsaw1-9.fna&oh=2a37c9ef28c306d04ef3bf53b1e8d8f5&oe=5FBCF9AC"
          }
        />
      </InstracturWrapper>
      <Title>{title || "Build a web aTitlep with React Hooks"}</Title>
      <PriceWrapper>
        <SaleBox>${sale}</SaleBox>
        <PriceBox>${price}</PriceBox>
      </PriceWrapper>{" "}
      <KindWrapper>
        <VideosNum>{sections} فيديو</VideosNum>
        <VideosNum>{hours} ساعات</VideosNum>
      </KindWrapper>
    </Box>
  );
}

export default Card;
const Box = styled.div`
  position: relative;
  margin-top: 50px;
  margin-right: 20px;

  border-radius: 20px;
  background: ${(props) => props.bgcolor || "palevioletred"};
  box-shadow: rgba(78, 153, 227, 0.1) 0px 20px 40px,
    rgba(0, 0, 0, 0.05) 0px 1px 3px;
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  min-width: 200px;
  height: 360px;
  transition: all 0.8s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
  padding: 20px;
  transform: scale(1);
  -webkit-box-pack: center;
  place-content: center;
  justify-items: center;
  align-items: center;
  &:hover {
    box-shadow: rgba(78, 153, 227, 0.3) 0px 20px 80px,
      rgba(0, 0, 0, 0.15) 0px 20px 40px;
    cursor: pointer;
    transform: scale(1.1);
  }
  &:hover img,
  InstracturImg {
    transform: scale(0.8);
  }
`;

const BoxImg = styled.img`
  width: 186px;
  height: 114px;
  margin-top: 45px;
  opacity: 1;
  opacity: 1;
  animation: 1s ease 0s 1 normal forwards running jBcSpD;
  transition: all 0.8s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
`;

const Title = styled.p`
  font-style: normal;
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
  text-align: center;
  color: rgb(255, 255, 255);
  margin: 0px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const InstracturWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 160px;
  justify-content: space-between;
  width: 86%;
`;
const InstracturName = styled(SmallText2)`
  color: #fff;
`;
const InstracturImg = styled.img`
  width: 40px;
  border-radius: 100px;
  box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 0.5px inset,
    rgba(23, 0, 102, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.1) 0px 1px 3px;
`;

const KindWrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 4fr;
  gap: 32px;
  justify-content: space-around;
  margin-top: 23px;
`;

const VideosNum = styled(SmallText)`
  color: #fff;
  background: rgb(0 0 0 / 18%);
  padding: 4px 9px;
  border-radius: 20px;
  font-size: 11px;
  text-align: center;
  backdrop-filter: blur(20px) brightness(85%) saturate(150%);
`;

const Hours = styled.div``;

const PriceBox = styled.div`
  color: white;
  font-size: 18px;
`;

const SaleBox = styled.div`
  text-decoration: line-through;
  color: #fff;
  font-weight: normal;
  font-size: 15px;
`;
const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;

  background: black;
  padding: 5px 63px;
  border-radius: 32px;
  backdrop-filter: blur(20px) brightness(85%) saturate(150%);
  background: rgb(0 0 0 / 18%);
  gap: 8px;
  transform: scale(0.84);
`;
