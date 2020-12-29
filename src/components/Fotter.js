import React from "react";
import styled from "styled-components";
import { tooltipData, GuestData } from "../data/menuData";
import MenuButton from "./buttons/MenuButton";
import { useSelector } from "react-redux";

function Fotter() {
  // const { isOpen, name, logout } = props;

  const { user: currentUser } = useSelector((state) => state.auth);
  return (
    <Wrapper>
      <Grid>
        {currentUser ? (
          <>
            {tooltipData.map((item, i) => (
              <MenuButton key={i} item={item} />
            ))}
            {/* <Logout onClick={logout}>تسجيل الخروج</Logout> */}
          </>
        ) : (
          <>
            {GuestData.map((item, i) => (
              <MenuButton key={i} item={item} />
            ))}
          </>
        )}
        {/* <h2>fdfdf</h2> */}
      </Grid>
      <Info>
        <h3
          style={{
            textAlign: "center",
            fontSize: "12px",
            lineHeight: "140%",
          }}
        >
          جميع الحقوق محفوظة &nbsp;
          {/* <a
            href="https://devam.online"
            style={{ color: "yellow", fontSize: "13px" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Devam Online
          </a> */}
        </h3>
        <p
          style={{
            textAlign: "center",
            marginTop: "0px",
            marginBottom: "8px",
          }}
        >
          Devam.online © 2021
        </p>

        <IconsWrapper>
          <a
            href="https://www.facebook.com/Devam.Online"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon src="images/icons/facebook.svg"></Icon>
          </a>
          <a
            href="https://www.instagram.com/devamonline/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon src="images/icons/instagram.svg"></Icon>
          </a>
          <a
            href="https://www.youtube.com/channel/UCPAUIw4YGaCQwtYpau89gGw/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon src="images/icons/youtube.svg"></Icon>
          </a>
          <a
            href="https://wa.me/905318549587"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon src="images/icons/whatsapp.svg"></Icon>
          </a>
        </IconsWrapper>
      </Info>
    </Wrapper>
  );
}

export default Fotter;

const Wrapper = styled.div`
  width: 1234px;
  margin: 0px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;

  margin-top: 50px;
  @media (max-width: 1300px) {
    margin: auto;
    width: 80%;
    /* margin-left: 50px;
    display:block; */
    grid-template-columns: 1fr;
    margin-top: 50px;
  }
  @media (max-width: 780px) {
    width: 100%;
    /* margin-left: 50px;
    display:block; */
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  width: 100%;
  gap: 18px;
  background: #00000024;
  border-radius: 20px;
  padding: 10px;
  /*  */
  margin-bottom: 50px;
  @media (max-width: 780px) {
    display: none;
    /* margin-left: 50px;
    display:block; */
  }
`;

const Info = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  background: #00000024;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 50px;
  width: 95%;
  @media (max-width: 780px) {
    width: 70%;
    /* margin-left: 50px;
    display:block; */
    h3 {
      margin-bottom: 10px;
    }
  }
`;

const IconsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;

  margin: auto;
`;
const Icon = styled.img`
  /* width: 40px; */
  height: 28px;
  -webkit-transition: all 0.2s ease-in-out 0s;
  transition: all 0.2s ease-in-out 0s;
  /* color: blue; */
  background: #fff;
  padding: 6px;
  border-radius: 10px;
  margin-left: 12px;
  margin-right: 12px;

  :hover {
    transform: scale(1.1) !important;
  }
`;
