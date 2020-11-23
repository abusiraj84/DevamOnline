import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import LessonsBox from "../sections/section/LessonsBox";
import SectionDetail from "../sections/section/SectionDetail";
import { Caption2 } from "../styles/TextStyles";
import { Helmet } from "react-helmet";
import { config } from "../../config";
function CoursePage({ match }) {
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchCourse();
    if (currentUser) {
      fetchUsers();
      console.log(currentUser);
    }
  }, []);

  const [items, setItems] = useState([]);
  const [sections, setSections] = useState([]);
  const [allLessons, setAllLessons] = useState([]);
  const [color, setColor] = useState([]);
  const [foncolor, setFontColor] = useState([]);
  const [theuser, setTheuser] = useState([]);

  const fetchCourse = async () => {
    const data = await fetch(`${config.siteUrl}/courses/${match.params.id}`);

    const items = await data.json();
    setItems(items.data);

    setSections(items.data["0"]["sections"]);

    setAllLessons(items.data["0"]["alllessons"]);
    setFontColor(items.data["0"]["color"].fontcolor);
    setColor(items.data["0"]["color"].bg);
  };
  console.log(items);
  ////////////////////////////////////////////////////////////////////////////////
  function token() {
    if (currentUser) {
      return currentUser.token;
    } else {
      return "211|rPMzbQHe1eJZDVXn7fIepq5pP5QxKWXcRZURiAG";
    }
    console.log(token());
  }
  const fetchUsers = async () => {
    const users = await fetch(`ٍ${config.siteUrl}/user`, {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + token(),
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    });

    const userdata = await users.json();

    const theuser = [];

    for (const [index, value] of userdata.entries()) {
      // value.id == currentUser.user.id ? theuser.push(value.id) : "";
      if (value.id == currentUser.user.id) {
        theuser.push(value);
      }
      // console.log(theuser.push(value.id == currentUser.user.id));
    }
    setTheuser(theuser[0].lessons);
  };
  ///////////////////////////////////////////////////////////////////////////////

  const mylessons = currentUser ? theuser : []; //..some array

  const lessonscompleted = [];

  for (const [index, value] of mylessons.entries()) {
    lessonscompleted.push(value.lessons_id);
  }

  return (
    <Wrapper bgcolor={color}>
      <Helmet>
        <title>{items.title}</title>
      </Helmet>
      <ContentWrapper>
        {items.map((item) => (
          <div key={item.courses_id}>
            {/* <SEO title={item.title} /> */}
            <SectionDetail
              logo={item.logo}
              title={item.title}
              img={`http://localhost:3000/${item.img}`}
              sections={sections.length}
              hours={item.hours}
              desc={item.description}
              name={item.instructors["0"].name}
              instaimg={item.instructors["0"].img}
              topics={allLessons.length}
              imgcolor={item.color.color}
              price={item.price}
              sale={item.sale}
              id={match.params.id}
            />
            <WrapperWidth>
              <WrapperLessons sectionboxcolor={item.color.color}>
                {sections.map((item) => (
                  <div key={item.sections_id}>
                    <Title sectioncolor={color}>{item.sections_title}</Title>

                    {item.lessons.map((item, index) => (
                      <div key={item.lessons_id}>
                        <Link to={`/lesson/${item.lessons_id}`}>
                          <LessonsBox
                            lessonnum={item.num}
                            lessontitle={item.title}
                            lessontime={item.time}
                            complete={""}
                            fontcolor={foncolor}
                            complete={
                              // item.num == lessonscompleted[index] ? "Done" : ""
                              // all_lessonscompleted.map(function (num, i) {
                              //   // num == lessonscompleted[index] ? "Done" : "";
                              // })
                              lessonscompleted.map((lesson, i) =>
                                lesson == item.num ? "تمت المشاهدة" : ""
                              )
                            }
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                ))}
              </WrapperLessons>
            </WrapperWidth>
          </div>
        ))}
      </ContentWrapper>
    </Wrapper>
  );
}

export default CoursePage;

const Wrapper = styled.div`
  max-width: 100%;
  background: ${(props) => props.bgcolor || "palevioletred"};
  padding-top: 200px;
  @media (max-width: 450px) {
    padding-top: 50px;
  }
`;
const ContentWrapper = styled.div`
  overflow: hidden;
  max-width: 1234px;
  margin: 0 auto;

  @media (max-width: 640px) {
    padding: 0px 0px;
  }
`;

const WrapperWidth = styled.div`
  max-width: 1234px;
  display: grid;
  box-sizing: border-box;
  justify-items: center;
  padding: 50px 0px 0px;
  margin: 0px 20px;
  @media (max-width: 640px) {
    max-width: 600px;
  }
`;

const WrapperLessons = styled.div`
  width: 60%;
  background: #fff;
  margin: auto 0;
  border-radius: 20px;
  padding: 20px;
  background: ${(props) => props.sectionboxcolor || "rgba(15, 14, 71, 0.3)"};
  box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 0.5px inset;
  backdrop-filter: blur(20px) brightness(80%) saturate(150%);
  margin-bottom: 50px;
  transition: all 0.9s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;

  &:hover {
    /* transform: translateY(-5px); */
  }

  @media (max-width: 640px) {
    width: 95%;
  }
`;

const Title = styled(Caption2)`
  color: #fff;
  margin-bottom: 40px;
  text-align: center;
  padding: 10px;
  background: ${(props) => props.sectioncolor || "#1ff5ff"};
  box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 0.5px inset,
    rgba(0, 0, 0, 0.2) 0px 10px 20px, rgba(0, 0, 0, 0.1) 0px 1px 3px;
  backdrop-filter: blur(20px) brightness(80%) saturate(150%);
  border-radius: 20px;
`;
