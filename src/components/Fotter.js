import React from "react";
import styled from "styled-components";
import { tooltipData, GuestData } from "../data/menuData";
import MenuButton from "./buttons/MenuButton";
import { H2, SmallText } from "./styles/TextStyles";
import { useDispatch, useSelector } from "react-redux";

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
        <h3 style={{ marginTop: "18px", textAlign: "center" }}>
          جميع الحقوق محفوظة لدى &nbsp;
          <a
            href="https://ozone.istanbul"
            style={{ color: "yellow" }}
            target="_blank"
          >
            Devam Online
          </a>
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
  margin-bottom: 50px;
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
    width: 90%;
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
`;

const Info = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  background: #00000024;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 50px;
  width: 95%;
`;
