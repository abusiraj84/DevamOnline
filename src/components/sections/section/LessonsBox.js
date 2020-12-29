import React from "react";
import styled from "styled-components";
import { Caption } from "../../styles/TextStyles";
import ReactHtmlParser from "react-html-parser";

function LessonsBox(props) {
  const { lessonnum, lessontitle, lessontime, preview, fontcolor } = props;

  return (
    <LessonsGrid>
      <Id>
        <Num>{lessonnum || "0"}</Num>
      </Id>
      <TitlLessons fontcolor={fontcolor}>
        {ReactHtmlParser(lessontitle) || "lesson num 1"}
      </TitlLessons>
      <Preview src={`/images/icons/${preview}`} />
      <Time>
        <TitleSmall>{lessontime || ""}</TitleSmall>
      </Time>
    </LessonsGrid>
  );
}

export default LessonsBox;

const LessonsGrid = styled.li`
  display: grid;
  grid-template-columns: 1fr 9fr 1fr 1fr;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(255, 255, 255, 0.1);
  margin-bottom: 10px;
  align-items: center;
  /* filter: brightness(0.8); */
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
  border-radius: 5px;
  &:hover {
    /* filter: brightness(1); */
    color: #000;
    background: rgb(255, 255, 255, 0.1);
    padding: 8px;
    box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 0.5px inset,
      rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.1) 0px 1px 3px;
    border-bottom: none;
  }
  &:nth-last-child(3) {
    border-bottom: 1px solid;
  }
`;

const TitlLessons = styled(Caption)`
  cursor: pointer;
  font-size: 14px;
  color: ${(props) => props.fontcolor || "#fff"};
  line-height: 21px;
  text-align: right;
`;

const Id = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 0.5px inset;
  backdrop-filter: blur(20px) brightness(80%) saturate(150%);
  color: #fff;
`;

const Time = styled.div`
  width: 40px;
  height: 25px;
  margin: 0px;
  padding: 11px 30px;
  top: 10px;
  right: 10px;
  border-radius: 5px;
  line-height: 130%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 0.5px inset;
  backdrop-filter: blur(20px) brightness(80%) saturate(150%);
  color: #fff;
  margin-right: 20px;
`;
const TitleSmall = styled(Caption)`
  cursor: pointer;
  font-size: 15px;
  color: rgb(255, 255, 255);
  font-weight: normal;
`;

const Num = styled(Caption)`
  cursor: pointer;
  font-size: 20px;
  color: rgb(255, 255, 255);
  font-weight: normal;
`;
const Preview = styled.img`
  width: 25px;
  background: #ffffff14;
  padding: 5px;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 40px,
    rgba(255, 255, 255, 0.25) 0px 0px 0px 0.5px inset;
`;
