import React, { useState, useEffect } from "react";
import Card from "../Card";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
// import { loadProgressBar } from "axios-progress-bar";

import "axios-progress-bar/dist/nprogress.css";
// import axios from "axios";

function CoursesCards() {
  const [isLoaded, setIsLoaded] = useState(false);
  const url = "https://devam.website/wp-json/wp/v2/course-categories";
  useEffect(() => {
    // loadProgressBar();
    // axios
    //   .get(url)
    //   .then((response) => {
    //     const myData = response.data;
    //     setItems(myData);
    //     console.log(myData);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    const fetchData = async () => {
      const data = await fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const itemss = await data.json();
      setIsLoaded(true);
      setItems(itemss);
      console.log(itemss);
    };
    fetchData();
  }, []);
  const [items, setItems] = useState([]);

  // const fetchData = async () => {
  //   const data = await fetch(
  //     "https://devam.website/wp-json/wp/v2/course-categories",
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //     }
  //   );
  //   const items = await data.json();
  //   // console.log(items);
  //   setItems(items);
  // };

  return (
    <div>
      {isLoaded ? (
        <CourseCardsWrapper>
          {items.map((item) => (
            <Box key={item.id}>
              {item.courses.length ? (
                <CatHeader>{item.name}</CatHeader>
              ) : (
                <div></div>
              )}

              <CardSingle>
                {
                  item.courses.map((item) => (
                    <div key={item.id}>
                      {" "}
                      {item.status === "publish" &&
                        (item._lp_is_soon === "no" ? (
                          <Link to={`/course/${item.slug}`}>
                            <Card
                              title={item.title.rendered}
                              img={item._lp_course_thumb}
                              instracturimg={
                                item._lp_course_author &&
                                item._lp_course_author.avatar
                              }
                              instracturname={
                                item._lp_course_author &&
                                item._lp_course_author.name
                              }
                              bgcolor={item._lp_course_color}
                              price={
                                item._lp_sale_price === "0"
                                  ? "مجانية"
                                  : `$${item._lp_sale_price}`
                              }
                              sale={item._lp_price}
                              hours={item._lp_course_duration}
                              sections={item._lp_curriculum.length}
                            />
                          </Link>
                        ) : (
                          <div>
                            <Card
                              title={item.title.rendered}
                              img={item._lp_course_thumb}
                              instracturimg={
                                item._lp_course_author &&
                                item._lp_course_author.avatar
                              }
                              instracturname={
                                item._lp_course_author &&
                                item._lp_course_author.name
                              }
                              bgcolor={item._lp_course_color}
                              price={item._lp_price}
                              sale={item._lp_price}
                              soon="قريبا"
                              isSoon={item._lp_is_soon}
                              // hours={item._lp_course_duration}
                              // sections={item._lp_curriculum.length}
                            />
                          </div>
                        ))}
                    </div>
                  ))
                  // .reverse()
                }
              </CardSingle>
            </Box>
          ))}
        </CourseCardsWrapper>
      ) : (
        <Center>
          <Load src="images/Infinity.svg" />
        </Center>
      )}
    </div>
  );
}

export default CoursesCards;

const Load = styled.img`
  width: 100px;
`;

const Center = styled.div`
  width: 100px;
  margin: 0px auto;
`;

const animation = keyframes`
  from { opacity: 0; transform: translateY(-10px); filter: blur(10px); }
  to { opacity: 1; transform: translateY(0px); filter: blur(0px); }
`;
const Box = styled.div`
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

const CourseCardsWrapper = styled.div`
  margin: 0px auto 0px;
  margin-bottom: 100px;
  min-height: 482px;

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
  width: 100%;
  text-align: center;
  padding: 8px 20px;
  display: inline-table;
  direction: rtl;
  float: right;
  color: #fff1f1;
  border-radius: 6px;
  margin-right: 20px;
  box-shadow: 0px 50px 100px rgba(0, 0, 0, 0.25),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  -webkit-backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  backdrop-filter: blur(40px);
  background: rgb(70 70 70 / 28%);
  opacity: 0;
  animation: ${animation} 1s 0.1s forwards;
  margin-top: 50px;
  @media (max-width: 1300px) {
    margin: auto;
    width: 80%;
  }
  @media (max-width: 780px) {
    width: 90%;
  }
`;
