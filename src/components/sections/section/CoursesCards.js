import React, { useState, useEffect } from "react";
import Card from "../Card";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

function CoursesCards() {
  useEffect(() => {
    fetchData();
  }, []);
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    const data = await fetch("https://devam.website/Devam-Api/public/api/cats");
    const items = await data.json();
    console.log(items.data);
    setItems(items.data);
  };
  return (
    <CourseCardsWrapper>
      {items.map((item) => (
        <div key={item.cat_id}>
          <br /> <br /> <br />
          {item.courses.length ? (
            <>
              {" "}
              <CatHeader>{item.name}</CatHeader> <br /> <br />
            </>
          ) : (
            <>
              <div></div>
            </>
          )}
          <CardSingle>
            {item.courses.map((item) => (
              <div key={item.courses_id}>
                <Link to={`/course/${item.courses_id}`}>
                  <Card
                    title={item.title}
                    img={`https://devam.website/admin/_lib/file/img/${item.img}`}
                    instracturimg={`https://devam.website/admin/_lib/file/img/${item.instructors["0"].img}`}
                    instracturname={item.instructors["0"].name}
                    bgcolor={item.color.color}
                    price={item.price}
                    sale={item.sale}
                    hours={item.hours}
                    sections={item.sections}
                  />
                </Link>
              </div>
            ))}
          </CardSingle>
        </div>
      ))}
    </CourseCardsWrapper>
  );
}

export default CoursesCards;
const animation = keyframes`
  from { opacity: 0; transform: translateY(-10px); filter: blur(10px); }
  to { opacity: 1; transform: translateY(0px); filter: blur(0px); }
`;

const CourseCardsWrapper = styled.div`
  margin: 0px auto 0px;
  margin-bottom: 100px;

  @media (max-width: 1270px) {
    margin: 0px auto;
    width: 100%;
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 1300px) {
    /* margin: 0px auto;
    width: 100%;
    grid-template-columns: 1fr 1fr; */
  }

  @media (max-width: 1030px) {
    grid-template-columns: 1fr 1fr;
    margin: auto auto;
    width: 100%;
  }

  @media (max-width: 940px) {
    grid-template-columns: 1fr 1fr;
    margin: auto auto;
    width: 100%;
    padding: 0px;
  }
  @media (max-width: 750px) {
    grid-template-columns: 1fr 1fr;
    margin: auto auto;
    width: 100%;
    padding: 0px;
  }

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
    margin: auto auto;
    width: 100%;
    padding: 0px;
  }
`;
const CardSingle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
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
  @media (max-width: 1300px) {
    grid-template-columns: 1fr 1fr 1fr;
    margin-right: 50px;
    margin-left: 50px;
  }
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    margin-right: 50px;
    margin-left: 50px;
  }
  @media (max-width: 450px) {
    grid-template-columns: 1fr;
    margin-right: 50px;
    margin-left: 50px;
  }
`;
const CatHeader = styled.div`
min-width:95px;
text-align:center;
   padding: 8px 20px;
    display: inline-table;
    direction: rtl;
    float: right;
    color: #fff1f1;
    border-radius: 6px;
    margin-right: 20px;
    box-shadow: 0px 50px 100px rgba(0,0,0,0.25), inset 0px 0px 0px 0.5px rgba(255,255,255,0.2);
    -webkit-backdrop-filter: blur(40px);
    -webkit-backdrop-filter: blur(40px);
    backdrop-filter: blur(40px);
    background: rgb(70 70 70 / 28%);
    opacity: 0;
      animation: ${animation} 1s 0.1s forwards;
      @media (max-width: 1300px) {
     margin-right: 70px;
   /* margin-left: 50px;
    display:block; */
  }

}

`;
