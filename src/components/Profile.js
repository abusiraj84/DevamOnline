import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { Caption, H1, H2, SmallText, SmallText2 } from "./styles/TextStyles";
import { config } from "../config";

const Profile = () => {
  useEffect(() => {
    fetchData();
    setView(Profile());
  }, []);

  const { user: currentUser } = useSelector((state) => state.auth);
  const [view, setView] = useState();
  const [color, setColor] = useState([]);
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    const data = await fetch(`${config.siteUrl}/courses`);
    const items = await data.json();
    console.log(items.data);
    setItems(items.data);
  };

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const Profile = () => {
    return (
      <>
        <Avatar src="https://3znvnpy5ek52a26m01me9p1t-wpengine.netdna-ssl.com/wp-content/uploads/2017/07/noimage_person.png" />
        <Name>
          {currentUser.user.firstname + " " + currentUser.user.lastname}
        </Name>
        <Email> {currentUser.user.email} </Email>
        <Subscription>{currentUser.user.role.name}</Subscription>
      </>
    );
  };

  const Courses = () => {
    return (
      <>
        {currentUser.user.courses.map((courses, i) => (
          <Link key={i} to={`/course/${courses.courses_id}`}>
            <Box>
              <InstracturWrapper>
                {/* <InstracturName>{"dd"}</InstracturName>
              <InstracturImg
                src={
                  "https://scontent.fsaw1-9.fna.fbcdn.net/v/t1.0-9/60034390_10155925053061333_7596400182741172224_o.jpg?_nc_cat=101&ccb=2&_nc_sid=174925&_nc_ohc=6uu7a1JoBFQAX_7zy4J&_nc_ht=scontent.fsaw1-9.fna&oh=2a37c9ef28c306d04ef3bf53b1e8d8f5&oe=5FBCF9AC"
                }
              /> */}
              </InstracturWrapper>
              <Title>{courses.title}</Title>

              <KindWrapper>
                <VideosNum>{courses.sections} فيديو</VideosNum>
                <VideosNum>{courses.hours} ساعات</VideosNum>
              </KindWrapper>
            </Box>
          </Link>
        ))}
      </>
    );
  };

  const Shop = () => {
    return <>Shop</>;
  };
  return (
    <Wrapper>
      <TitleHome>ملفي</TitleHome>
      <BoxWrapper>
        {/* {currentUser.user.firstname + " " + currentUser.user.lastname} */}

        <Menu>
          <Button onClick={() => setView(Profile())}>
            <h2>البيانات الشخصية</h2>
          </Button>
          <Button onClick={() => setView(Courses())}>
            <h2>الدورات</h2>
          </Button>
          <Button onClick={() => setView(Shop())}>
            <h2>المتجر</h2>
          </Button>
        </Menu>
        <View>{view || Courses()}</View>
      </BoxWrapper>
    </Wrapper>
  );
};

export default Profile;
const animation = keyframes`
  from { opacity: 0; transform: translateY(-10px); filter: blur(10px); }
  to { opacity: 1; transform: translateY(0px); filter: blur(0px); }
`;
const Wrapper = styled.div`
  padding-top: 200px;
  width: 1234px;
  margin: auto auto;
  direction: rtl;
  text-align: right;
  overflow: hidden;
  @media (max-width: 1420px) {
    width: 100%;
    margin: auto auto;
    padding-top: 150px;
  }
`;

const TitleHome = styled(H1)`
  text-align: center;
  font-size: 35px;
  margin-bottom: 40px;
  opacity: 0;
  animation: ${animation} 1s 0.1s forwards;
`;

const BoxWrapper = styled.div`
  width: 1234px;
  background: rgb(0, 0, 0, 0.4);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(40px);
  display: flex;
  min-height: 500px;
  gap: 30px;
  @media (max-width: 1420px) {
    width: 70%;
    margin: auto auto;
    flex-direction: column;
  }
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 10px;
`;

const Button = styled.div`
  color: #fff;
  padding: 10px 20px;
  border-radius: 20px;
  border: 2px solid #fff;
  background: rgb(34 19 44 / 32%);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(40px);
  transition: all 0.3s ease-in-out 0s;
  text-align: center;
  cursor: pointer;
  :hover {
    background: #fff;
    color: #000;
    transform: translateY(5px);
  }
`;
const View = styled.div`
  width: 1020px;
  min-height: 200px;
  background: rgb(34 19 44 / 32%);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(40px);
  border-radius: 20px;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  @media (max-width: 1420px) {
    width: 100%;
    margin: auto auto;
    flex-direction: column;
  }
`;

const Avatar = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 100px;
  border: 4px solid #fff;
  margin-bottom: 20px;
  transition: all 0.3s ease-in-out 0s;
  @media (max-width: 450px) {
    width: 80px;
    height: 80px;
    margin-bottom: 20px;
  }
`;
const Subscription = styled(SmallText)`
  background: gold;
  color: #000;
  padding: 8px 20px;
  border-radius: 20px;
  border: 4px solid #000;
  margin-bottom: 20px;
`;

const Name = styled(H2)`
  margin-bottom: 10px;
  @media (max-width: 1000px) {
    font-size: 20px;
  }
`;
const Email = styled(Caption)`
  margin-bottom: 20px;
`;

//  // // //

const Box = styled.div`
  position: relative;
  margin-top: 20px;
  margin-right: 20px;
  margin-left: 20px;
  border-radius: 20px;
  background: ${(props) => props.bgcolor || "palevioletred"};
  box-shadow: rgba(78, 153, 227, 0.3) 0px 20px 40px,
    rgba(0, 0, 0, 0.05) 0px 1px 3px;
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  min-width: 200px;
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
  width: 150px;
  height: 150px;
  margin-top: 30px;
  opacity: 1;
  animation: 1s ease 0s 1 normal forwards running jBcSpD;
  transition: all 0.8s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
`;

const Title = styled.p`
  font-style: normal;
  font-size: 18px;
  line-height: 140%;
  font-weight: bold;
  text-align: center;
  color: rgb(255, 255, 255);
  margin: 0px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 20px;
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
  gap: 50px;
  justify-content: space-around;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const VideosNum = styled(SmallText)`
  color: #fff;
  background: rgb(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 20px;
  font-size: 12px;
  text-align: center;
`;

const Hours = styled.div``;
