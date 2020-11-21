import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { motion } from "framer-motion";

import { Caption } from "../../components/styles/TextStyles";
import { themes } from "../../components/styles/ColorStyles";

import "bootstrap/dist/css/bootstrap.min.css";

import { logout } from "../../actions/auth";
import { clearMessage } from "../../actions/message";

import { history } from "../../helpers/history";
import { menuData } from "../../data/menuData";

export default function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);

  const variants = {
    open: { opacity: 1, x: 0, y: 0 },
    closed: { opacity: 0, y: "-850px" },
  };
  const variants2 = {
    open: { opacity: 1, x: 0, y: 0 },
    closed: { opacity: 0, y: "-850px" },
  };

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut = () => {
    dispatch(logout());
  };
  return (
    <Wrapper>
      <ContentWrapper>
        <Link to="/">
          <Logo src={"../images/logos/logo.svg"} />
        </Link>
        <MenuWrapper>
          {menuData.map((item, index) => (
            <Link to={item.link} key={index}>
              <MenuIcon>
                <Title>{item.title}</Title>
                <img src={item.icon} alt="" />
              </MenuIcon>
            </Link>
          ))}

          {!localStorage.getItem("user") ? (
            <MenuIcon
              alt=""
              onClick={() => setIsOpenLogin(!isOpenLogin)}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              <img src={"../images/icons/account.svg"} alt="" />
            </MenuIcon>
          ) : (
            <>
              <MenuIcon
                alt=""
                onClick={() => setIsOpenLogin(!isOpenLogin)}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.9 }}
              >
                <img src={"../images/icons/account.svg"} alt="" />
              </MenuIcon>
            </>
          )}
          {/* Slide*/}
          <SlideWrapper
            initial={{ opacity: 0 }}
            animate={isOpenLogin ? "open" : "closed"}
            variants={variants2}
            transition={{ type: "spring" }}
          >
            {!localStorage.getItem("user") ? (
              <>
                <Link to="/login">
                  <MenuGrid onClick={() => setIsOpenLogin(!isOpenLogin)}>
                    <img
                      src={
                        process.env.PUBLIC_URL + "../images/icons/courses.svg"
                      }
                      alt=""
                    />
                    <TitleMenu>تسجيل الدخول</TitleMenu>
                  </MenuGrid>
                </Link>
                <Link to="/register">
                  <MenuGrid onClick={() => setIsOpenLogin(!isOpenLogin)}>
                    <img
                      src={
                        process.env.PUBLIC_URL + "../images/icons/courses.svg"
                      }
                      alt=""
                    />
                    <TitleMenu>الإشتراك</TitleMenu>
                  </MenuGrid>
                </Link>
              </>
            ) : (
              <>
                <Name onClick={() => setIsOpenLogin(!isOpenLogin)}>
                  {currentUser
                    ? currentUser.user.firstname +
                      " " +
                      currentUser.user.lastname +
                      " - " +
                      currentUser.user.role.name
                    : null}
                </Name>
                <Link to="/profile">
                  <MenuGrid onClick={() => setIsOpenLogin(!isOpenLogin)}>
                    <img
                      src={
                        process.env.PUBLIC_URL + "../images/icons/courses.svg"
                      }
                      alt=""
                    />
                    <TitleMenu>بروفايلي</TitleMenu>
                  </MenuGrid>
                </Link>
                <MenuGrid onClick={logOut}>
                  <img src={"../images/icons/courses.svg"} alt="" />
                  <TitleMenu>تسجيل الخروج</TitleMenu>
                </MenuGrid>
              </>
            )}
          </SlideWrapper>
        </MenuWrapper>

        <MenuMobile
          src={"../images/icons/menu.svg"}
          alt=""
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.9 }}
        />
      </ContentWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  box-sizing: border-box;
  direction: ltr;
  height: 44px;
  max-width: 1327px;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: 0px auto;
  padding: 60px 30px;
  z-index: 3;
`;
const ContentWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 5fr 5fr;

  @media (max-width: 1024px) {
    padding: 20px 30px;
  }
`;
const MenuWrapper = styled.div`
  display: grid;
  grid-template-columns: 120px 120px 120px 120px 120px 150px;
  grid-column-gap: 30px;
  align-content: center;
  align-items: center;
  justify-items: flex-end;

  @media (max-width: 1024px) {
    display: none;
    width: 100%;
    margin: 0px auto;
  }
`;
const Logo = styled.img`
  cursor: pointer;
`;

const MenuIcon = styled.div`
  display: flex;
  background: none;
  border: none;
  border-radius: 14px;
  align-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out 0s;
  cursor: pointer;
  background-blend-mode: overlay;
  padding: 10px 20px;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: rgba(31, 47, 71, 0.25) 0px 20px 40px,
      rgba(0, 0, 0, 0.1) 0px 1px 5px,
      rgba(255, 255, 255, 0.4) 0px 0px 0px 0.5px inset;
  }
  &:hover p {
    color: rgb(255, 255, 255);
    transform: translateY(-1px);
  }
`;
const MenuMobile = styled(motion.img)`
  display: none;
  @media (max-width: 1024px) {
    display: block;
    cursor: pointer;
    grid-column-start: none;
  }
`;

const Title = styled(Caption)`
  color: ${themes.dark.text1};
  margin-right: 10px;
  transition: all 0.3s ease-in-out 0s;
`;

const Name = styled(Caption)`
  color: ${themes.dark.text1};
  margin-right: 10px;
  transition: all 0.3s ease-in-out 0s;
  text-align: center;
  margin-bottom: 20px;
  padding: 10px;
  background: #2bc2f745;
  border-radius: 20px;
  box-shadow: rgba(31, 47, 71, 0.25) 0px 20px 40px,
    rgba(0, 0, 0, 0.1) 0px 1px 5px,
    rgba(255, 255, 255, 0.4) 0px 0px 0px 0.5px inset;
`;

const TitleMenu = styled(Caption)`
  cursor: pointer;

  color: #fff;
`;

const DropDownMenu = styled(motion.div)`
  z-index: 999;
  transition: width 2s;

  /* display: ${(props) => (props.visibility ? "block" : "none")}; */
  width: 300px;
  position: absolute;
  right: 20px;
  top: 80px;
  border-radius: 10px;
  padding: 20px;
  background: #053646a8;
  box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 0.5px inset;
  backdrop-filter: blur(20px) brightness(80%) saturate(150%);
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 8fr;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(255, 255, 255, 0.1);
  margin-bottom: 10px;
  justify-items: center;
  align-items: center;
  filter: brightness(0.8);
  &:hover {
    filter: brightness(1);
  }
`;
const SlideWrapper = styled(motion.div)`
  z-index: 999;
  transition: width 2s;

  /* display: ${(props) => (props.visibility ? "block" : "none")}; */
  /* height: 50%; */
  width: 400px;
  position: absolute;
  right: 20px;
  top: 60px;
  border-radius: 10px;
  padding: 20px;
  background: #053646a8;
  box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 0.5px inset;
  backdrop-filter: blur(20px) brightness(80%) saturate(150%);
`;
