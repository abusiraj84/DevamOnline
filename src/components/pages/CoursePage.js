import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";

import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import LessonsBox from "../sections/section/LessonsBox";
import SectionDetail from "../sections/section/SectionDetail";
import { Caption2 } from "../styles/TextStyles";
import { Helmet } from "react-helmet";
import { config } from "../../config";
import SvgLoading from "../SvgLoading";
import WaveBackground from "../backgrounds/WaveBackground";
import Footer from "../../components/Fotter";
import { FaArrowCircleUp } from "react-icons/fa";

function CoursePage({ match }) {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://fierce-forest-56659.herokuapp.com/${config.siteUrl}/wp-json/wp/v2/courses?slug=${match.params.slug}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",

            "dwm-tkn": currentUser && currentUser.cookie,
          },
        }
      );
      const items = await data.json();
      setItems(items[0]);
      // console.log(items[0]);

      setFontColor(items[0]._lp_course_font_color);
    };
    fetchData();
    // if (currentUser) {
    //   // const fetchOrder = async () => {
    //   //   const data = await fetch(
    //   //     `https://fierce-forest-56659.herokuapp.com/${config.siteUrl}/wp-json/wcm/api/orders`,
    //   //     {
    //   //       method: "get",
    //   //       headers: {
    //   //         "Content-Type": "application/json",
    //   //         "dwm-tkn": currentUser.cookie,
    //   //       },
    //   //     }
    //   //   );
    //   //   // const items = await data.json();
    //   //   // setOrders(items[0]);
    //   //   // setOrderStatus(items[0].status);
    //   //   // setOrderID(items[0].line_items[0].id);
    //   //   // console.log(items[0].line_items[0].id);
    //   //   // console.log(items[0].status);
    //   // };
    //   // fetchOrder();
    // }

    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, [currentUser, match.params.slug]);

  const [items, setItems] = useState([]);
  // const [orders, setOrders] = useState("");
  // const [orderID, setOrderID] = useState("");

  const [fontcolor, setFontColor] = useState([]);

  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrollTop);

  ////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <ScrollTop
        onClick={scrollTop}
        style={{
          height: "40px",

          display: showScroll ? "flex" : "none",
        }}
      >
        <FaArrowCircleUp size={50} />
      </ScrollTop>
      {isLoaded ? (
        <All>
          <WaveBackground />
          {items ? (
            items._lp_is_soon === "no" ? (
              <Wrapper bgcolor={items._lp_course_background}>
                <Helmet title={items.title && items.title.rendered}>
                  <title>{items.title && items.title.rendered}</title>
                  <meta
                    name="description"
                    content={items.title && items.title.rendered}
                    data-react-helmet="true"
                  />
                </Helmet>

                {items.code !== "rest_forbidden" ? (
                  <ContentWrapper>
                    <SectionDetail
                      logo={items._lp_course_logo}
                      title={items.title && items.title.rendered}
                      img={items._lp_course_thumb}
                      sections={
                        items._lp_curriculum && items._lp_curriculum.length
                      }
                      lessons={items._lp_lessons_count}
                      hours={items._lp_course_duration}
                      desc={items.content && items.content.rendered}
                      name={
                        items._lp_course_author && items._lp_course_author.name
                      }
                      instaimg={
                        items._lp_course_author &&
                        items._lp_course_author.avatar
                      }
                      topics={
                        items._lp_curriculum && items._lp_curriculum.length
                      }
                      imgcolor={items._lp_course_background}
                      price={items._lp_sale_price}
                      sale={items._lp_price}
                      id={items.id}
                      isAccess={items._is_accessed}
                      password={items._lp_course_password}
                      // orderStatus={orderStatus}
                      // orderID={orderID}
                    />
                    <WrapperWidth>
                      <WrapperLessons
                        sectionboxcolor={items._lp_course_background}
                      >
                        {items._lp_curriculum &&
                          items._lp_curriculum.map((item, i) => (
                            <div key={item.id}>
                              <Title sectioncolor={items._lp_course_background}>
                                {item.title}
                              </Title>

                              {item.items.map((item, index) => (
                                <div key={item.id}>
                                  {!items._is_accessed &&
                                  items._lp_sale_price !== "" ? (
                                    item.preview === "yes" ? (
                                      <Link to={`/lesson/${item.slug}`}>
                                        <LessonsBox
                                          lessonnum={item.lesson_num}
                                          lessontitle={item.title}
                                          lessontime={item.lesson_duration}
                                          preview={
                                            item.preview === "yes"
                                              ? "eye.svg"
                                              : "lock2.svg"
                                          }
                                          isAccess={items._is_accessed}
                                          fontcolor={fontcolor}
                                        />
                                      </Link>
                                    ) : (
                                      <LessonsBox
                                        lessonnum={item.lesson_num}
                                        lessontitle={item.title}
                                        lessontime={item.lesson_duration}
                                        preview={
                                          item.preview === "yes"
                                            ? "eye.svg"
                                            : "lock2.svg"
                                        }
                                        fontcolor={fontcolor}
                                      />
                                    )
                                  ) : (
                                    <Link to={`/lesson/${item.slug}`}>
                                      <LessonsBox
                                        lessonnum={item.lesson_num}
                                        lessontitle={item.title}
                                        lessontime={item.lesson_duration}
                                        preview={"play-button.svg"}
                                        isAccess={items._is_accessed}
                                        fontcolor={fontcolor}
                                      />
                                    </Link>
                                  )}
                                </div>
                              ))}
                            </div>
                          ))}
                      </WrapperLessons>
                    </WrapperWidth>{" "}
                    <Footer />
                  </ContentWrapper>
                ) : (
                  <Redirect to="/" />
                )}
              </Wrapper>
            ) : (
              <Wrapper>
                <ContentWrapper>
                  {items._lp_is_soon === "yes" ? (
                    <center>
                      <h1
                        style={{
                          fontSize: "30px",
                          marginTop: "100px",
                          background: "#00000059",
                          padding: "10px",
                          borderRadius: "10px",
                        }}
                      >
                        "الدورة قيد التنفيذ"
                      </h1>
                    </center>
                  ) : null}
                </ContentWrapper>
              </Wrapper>
            )
          ) : (
            <Redirect to="/home" />
          )}
        </All>
      ) : (
        <SvgLoading json="4" />
      )}
    </div>
  );
}

export default CoursePage;
const animation = keyframes`
0% {
    backdrop-filter: blur(80px) saturate(120%);
}
100% {
    backdrop-filter: blur(0px) saturate(100%);
}
`;
const All = styled.div`
  animation: ${animation} 2s ease 0s 1 normal forwards running;
`;

const Wrapper = styled.div`
  max-width: 100%;
  background: ${(props) => props.bgcolor || ""};

  @media (max-width: 450px) {
    padding-top: 50px;
  }
`;
const ContentWrapper = styled.div`
  padding-top: 200px;
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

const ScrollTop = styled.div`
  position: fixed;

  bottom: 40px;
  right: 40px;
  align-items: center;
  height: 20px;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
  animation: fadeIn 0.3s;
  transition: opacity 0.4s;
  opacity: 0.5;

  :hover {
    opacity: 1;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.5;
    }
  }
`;
