import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { H3, SmallText } from "../../components/styles/TextStyles";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { config } from "../../config";
import ReactHtmlParser from "react-html-parser";
import PurchaseButton from "../buttons/PurchaseButton";

function LessonPage({ match }) {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [lesson, setLesson] = useState("");
  const [course, setCourse] = useState("");
  const [courseId, setCourseId] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [isComplete, setIsComplete] = useState(false);
  useEffect(() => {
    fetchLessons();
    fetchCourses();

    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, []);
  const fetchLessons = async () => {
    const data = await fetch(
      `https://devam.website/wp-json/wp/v2/lessons?slug=${match.params.slug}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "dwm-tkn": currentUser && currentUser.cookie,
        },
      }
    );
    const items = await data.json();

    setLesson(items[0]);
    setCourseId(items[0]._lp_lesson_course);
    console.log("Lesson is:", items[0]);
  };

  const fetchCourses = async () => {
    const dataOfCourse = await fetch(
      `https://cors-anywhere.herokuapp.com/https://devam.website/wp-json/wp/v2/courses/${courseId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "dwm-tkn": currentUser && currentUser.cookie,
        },
      }
    );
    const items2 = await dataOfCourse.json();

    setCourse(items2[0]);
    console.log("Course is:", items2[0]);
  };

  return (
    <>
      {isLoaded ? (
        <Wrapper>
          <Helmet>
            <title>{lesson.title && lesson.title.rendered}</title>
          </Helmet>
          {lesson._lp_lesson_course_access ||
          lesson._lp_preview === "yes" ||
          course._lp_sale_price === "" ||
          course._lp_sale_price === "0.00" ||
          lesson.status === "completed" ? (
            <div>
              <VideoWrapper isOpen={isOpen}>
                <VideoClose onClick={() => setIsOpen(!isOpen)}>
                  <VideoCloseImg
                    src="https://designcode.io/images/icons/x.svg"
                    alt="cancel"
                  />
                </VideoClose>
                <VideoContent>
                  <iframe
                    src={`https://player.vimeo.com/video/${
                      lesson._lp_video_id
                    }${isOpen ? "?autoplay=1" : "?onpause=1"}`}
                    width="100%"
                    height="675"
                    allow="autoplay; fullscreen"
                  ></iframe>
                </VideoContent>
              </VideoWrapper>
              <ContentWrapper>
                <ImgLesson img={lesson._lp_course_thumb || ""}></ImgLesson>
                <PlayWrapper
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <PlayIcon
                    src="../images/icons/play.svg"
                    alt=""
                    onClick={() => setIsOpen(!isOpen)}
                  />
                </PlayWrapper>
                <Title>{lesson.title && lesson.title.rendered}</Title>
                {lesson.content.rendered != "" ? (
                  <Content>
                    {ReactHtmlParser(lesson.content && lesson.content.rendered)}
                  </Content>
                ) : (
                  <p></p>
                )}
                {/* <NextPreWrapper>
          <Link to={number}>
            {" "}
            <Next>التالي</Next>
          </Link>
          <Pre>السابق</Pre>
        </NextPreWrapper> */}

                {/* <button onClick={handleComplete}>تم الإنتهاء</button>
        {complete()} */}
                <Title>
                  {/* {currentUser.user.lessons.map((item, i) =>
            item.lessons_id === lesson.lessons_id ? "Done" : ""
          )} */}
                </Title>
              </ContentWrapper>
            </div>
          ) : (
            !lesson._lp_lesson_course_access && (
              <ContentWrapper>
                <Content>
                  {" "}
                  <h1> ليس لديك صلاحيات لمشاهدة هذا الدرس التابع لدورة : </h1>
                  <Link to={`/course/${course.slug}`}>
                    <p
                      style={{
                        marginTop: "25px",
                        textAlign: "center",
                        color: "#58aaff",
                      }}
                    >
                      {course.title && course.title.rendered}
                    </p>
                  </Link>
                  <center>
                    <PurchaseButton
                      title="اشترِ الآن"
                      subtitle="عشرات الدورات بانتظارك"
                      price={course._lp_sale_price}
                      sale={course._lp_price}
                      courseid={course.id}
                    />
                  </center>
                </Content>
              </ContentWrapper>
            )
          )}
        </Wrapper>
      ) : (
        <Center>
          <Load src="../images/Infinity.svg" />
        </Center>
      )}
    </>
  );
}

export default LessonPage;

const Load = styled.img`
  width: 100px;
`;

const Center = styled.div`
  width: 100px;
  margin: 0px auto;
  padding-top: 50vh;
`;
const Wrapper = styled.div`
  max-width: 100%;
  padding-top: 200px;
  @media (max-width: 450px) {
    padding-top: 80px;
  }
`;
const ContentWrapper = styled.div`
  overflow: hidden;
  max-width: 1234px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 0px;

  @media (max-width: 640px) {
    width: 100%;
    padding: 0px 0px;
  }
`;
const VideoWrapper = styled(motion.div)`
  position: fixed;
  width: 100%;
  top: 127px;
  right: 0;
  background: rgb(0, 0, 0);
  backdrop-filter: blur(40px);
  z-index: 99999;
  transition: 0.3s ease-in-out;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  @media (max-width: 1270px) {
    height: 448px;
  }
  @media (max-width: 640px) {
  }
`;

const VideoContent = styled.div`
  position: relative;
  max-width: 1200px;
  margin: auto;
`;

const VideoClose = styled.div`
  position: absolute;
  width: 36px;
  height: 36px;
  top: 20px;
  right: 20px;
  background: linear-gradient(
    360deg,
    rgba(99, 106, 150, 0.4) 0%,
    rgba(182, 186, 214, 0.5) 100%
  );
  border: 0.5px solid rgba(255, 255, 255, 0.3);
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 20px 40px;
  backdrop-filter: blur(40px);
  border-radius: 30px;
  cursor: pointer;
  z-index: 3;
`;
const VideoCloseImg = styled.img`
  margin: 8px 8px 8px;
`;

const ImgLesson = styled.div`
  position: relative;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  width: 400px;
  height: 400px;
  background-size: 500px 500px;
  @media (max-width: 450px) {
    width: 332px;
    height: 400px;
    background-size: 335px 452px;
  }
`;

const PlayWrapper = styled(motion.div)`
  position: absolute;
  top: 350px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 200px;
  margin-top: 20px;
  @media (max-width: 450px) {
    top: 228px;
  }
`;
const PlayIcon = styled(motion.img)`
  @media (max-width: 640px) {
    display: block;
    cursor: pointer;
    grid-column-start: none;
  }
`;

const Title = styled(H3)`
  color: #fff;
  padding: 20px;
`;
const Content = styled.div`
  color: #fff;
  padding: 40px 20px;
  font-size: 22px;
  text-align: right;
  line-height: 139%;
  background: #00000024;
  border-radius: 20px;
`;

const NextPreWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 40px;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-between;
  justify-items: start;
`;

const Next = styled(H3)`
  padding: 10px 40px;
  background: rgba(15, 14, 71, 0.3);
  border-radius: 26px;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  transition: all 0.2s ease-in-out;
  backdrop-filter: blur(40px);
  :hover {
    transform: translateY(-5px);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  }
`;
const Pre = styled(H3)`
  padding: 10px 40px;
  background: rgba(15, 14, 71, 0.3);
  border-radius: 26px;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  transition: all 0.2s ease-in-out;
  backdrop-filter: blur(40px);
  :hover {
    transform: translateY(-5px);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  }
`;
