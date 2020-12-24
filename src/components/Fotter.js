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
        <h3>
          هذا المشروع أحد روافد شركة &nbsp;
          <a
            href="https://ozone.istanbul"
            style={{ color: "yellow" }}
            target="_blank"
          >
            Ozone Istanbul
          </a>
        </h3>
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Devam.online © 2020
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
}
`;

const Info = styled.div`
    display: grid;
    grid-template-columns: 1fr;

    background: #00000024;
    border-radius: 20px;
    padding: 50px;
  
}
`;
