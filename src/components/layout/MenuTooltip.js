import React from "react";
import styled from "styled-components";
import { tooltipData, GuestData } from "../../data/menuData";
import MenuButton from "../buttons/MenuButton";
import { H2, SmallText } from "../styles/TextStyles";
import { useDispatch, useSelector } from "react-redux";

function MenuTooltip(props) {
  const { isOpen, name, logout } = props;

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Wrapper isOpen={isOpen}>
      {currentUser ? (
        <>
          <Name>{name}</Name>
          {tooltipData.map((item, i) => (
            <MenuButton key={i} item={item} />
          ))}
          <Logout onClick={logout}>تسجيل الخروج</Logout>
        </>
      ) : (
        <>
          {GuestData.map((item, i) => (
            <MenuButton key={i} item={item} />
          ))}
        </>
      )}
    </Wrapper>
  );
}

export default MenuTooltip;

const Wrapper = styled.div`
  background: rgba(15, 14, 71, 0.3);
  box-shadow: 0px 50px 100px rgba(0, 0, 0, 0.25),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(40px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 20px;
  padding: 20px;
  position: absolute;
  top: 60px;
  right: 30px;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  z-index: 1;
  display: grid;
  gap: 10px;
  grid-template-columns: 165px;
  transition: 0.2s ease-in-out;
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transform: ${(props) =>
    props.isOpen
      ? " skewY(0deg) rotate(0deg) translateY(0px)"
      : " skewY(-5deg) rotate(5deg) translateY(-30px)"};
`;

const Name = styled(SmallText)`
  color: #000;
  font-size: 12px;
  text-align: center;
  background: #00cffd;
  padding: 7px;
  border-radius: 10px;
`;

const Logout = styled(SmallText)`
  border-top: 1px solid #ffffff11;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
  transition: 0.3s ease-out;
  :hover {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  }
`;
