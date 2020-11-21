import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import styled from "styled-components";
import { menuData } from "../data/menuData";
import MenuButton from "./buttons/MenuButton";
import MenuTooltip from "./layout/MenuTooltip";
import { logout } from "../actions/auth";

function Nav() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  const tooltipRef = useRef();

  function handleClick(event) {
    // console.log(event);
    setIsOpen(!isOpen);

    event.preventDefault();
  }

  const logOut = () => {
    dispatch(logout());
  };

  function handleClickOutside(event) {
    if (
      ref.current &&
      !ref.current.contains(event.target)
      //  &&
      // !tooltipRef.current.contains(event.target)
    ) {
      console.log("Document is clicked");
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <Wrapper>
      <Link to="/">
        <img src="../images/logos/logo.svg" alt="Logo" />
      </Link>
      <MenuWrapper count={menuData.length} ref={ref}>
        {menuData.map((item, i) =>
          item.link === "/account" ? (
            <MenuButton
              key={i}
              item={item}
              onClick={(event) => handleClick(event)}
            />
          ) : (
            <MenuButton key={i} item={item} />
          )
        )}
        <HamburgerWrapper>
          <MenuButton
            item={{ icon: "/images/icons/hamburger.svg", link: "/" }}
            onClick={(event) => handleClick(event)}
          />
        </HamburgerWrapper>
      </MenuWrapper>
      <div ref={tooltipRef}>
        <MenuTooltip
          isOpen={isOpen}
          name={
            currentUser
              ? currentUser.user.firstname +
                " " +
                currentUser.user.lastname +
                " - " +
                currentUser.user.role.name
              : null
          }
          logout={logOut}
        />
      </div>
    </Wrapper>
  );
}

export default Nav;

const Wrapper = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  left: 0;
  display: grid;
  grid-template-columns: 44px auto;
  width: 100%;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0 30px;
  margin: 0px auto;
  align-items: center;
  z-index: 999;
  direction: ltr;
  max-width: 1234px;
  @media (max-width: 988px) {
    top: 30px;
  }
`;
const MenuWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.count}, auto);
  gap: 30px;
  @media (max-width: 988px) {
    grid-template-columns: auto;
    > a {
      display: none;
    }
  }
`;

const HamburgerWrapper = styled.div`
  display: none;

  @media (max-width: 988px) {
    position: relative;
    display: grid;
    -webkit-box-pack: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    right: 0px;
    border-radius: 50%;
    background: rgba(15, 14, 71, 0.3);
    box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 0.5px inset;
    backdrop-filter: blur(40px);
    cursor: pointer;
  }
`;
