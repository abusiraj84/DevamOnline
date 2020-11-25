import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { H3 } from "../../components/styles/TextStyles";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { config } from "../../config";

function LessonPage({ match }) {
  useEffect(() => {
    fetchLessons();
  }, []);
  const fetchLessons = async () => {
    const data = await fetch(`${config.siteUrl}/lessons/${match.params.id}`);
    const items = await data.json();
    console.log(items);
    setLesson(items);
  };
  const { user: currentUser } = useSelector((state) => state.auth);

  const [lesson, setLesson] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const [isComplete, setIsComplete] = useState(false);

  //TODO fetch lessonuser by id see if there is a table and setIscomplete according result by useEfect.

  const handleComplete = () => {
    console.log("complete");
    // `http://192.168.1.116:8000/api/lessonuser/${currentUser.user.id}/${lesson.lessons_id}`
    setIsComplete(!isComplete);
    if (!isComplete) {
      axios({
        method: "post",
        url: `${config.siteUrl}/lessonuser`,
        data: {
          lesson_id: lesson.lessons_id,
          user_id: currentUser.user.id,
        },
      });
    } else {
      axios.delete(
        `${config.siteUrl}/lessonuser/${currentUser.user.id}/${lesson.lessons_id}`
      );
    }
  };
  const complete = () => {
    if (isComplete) {
      return <h2>منتهي</h2>;
    } else {
      return <h2>لم ينتعي</h2>;
    }
  };

  var number = parseInt(match.params.id, 10) + 1;

  return (
    <Wrapper>
      <Helmet>
        <title>{lesson.title}</title>
      </Helmet>
      <VideoWrapper isOpen={isOpen}>
        <VideoClose onClick={() => setIsOpen(!isOpen)}>
          <VideoCloseImg
            src="https://designcode.io/images/icons/x.svg"
            alt="cancel"
          />
        </VideoClose>
        <VideoContent>
          <iframe
            src={`https://player.vimeo.com/video/${lesson.video_url}${
              isOpen ? "?autoplay=1" : "?onpause=1"
            }`}
            width="100%"
            height="675"
            allow="autoplay; fullscreen"
          ></iframe>
        </VideoContent>
      </VideoWrapper>
      <ContentWrapper>
        <ImgLesson img={lesson.img}></ImgLesson>
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
        <Title>{lesson.title}</Title>

        <NextPreWrapper>
          <Link to={number}>
            {" "}
            <Next>التالي</Next>
          </Link>
          <Pre>السابق</Pre>
        </NextPreWrapper>

        {/* <button onClick={handleComplete}>تم الإنتهاء</button>
        {complete()} */}
        <Title>
          {/* {currentUser.user.lessons.map((item, i) =>
            item.lessons_id == lesson.lessons_id ? "Done" : ""
          )} */}
        </Title>
      </ContentWrapper>
    </Wrapper>
  );
}

export default LessonPage;

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
  top: 0px;
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
