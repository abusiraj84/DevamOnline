import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { login } from "../actions/auth";

import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Fotter from "./Fotter";

const Login = (props) => {
  const form = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    dispatch(login(username, password))
      .then(() => {
        props.history.push("/profile");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Redirect to="/profile" />;
  }

  return (
    <Wrapper>
      <Container>
        {localStorage.getItem("user") && <Redirect to="/" />}

        {message && <Error> {message}</Error>}

        <Title>تسجيل الدخول</Title>
        <Base onSubmit={handleLogin} ref={form}>
          <InputText
            placeholder="اسم المستخدم أو البريد الإلكتروني"
            id="username"
            type="username"
            name="username"
            onChange={onChangeUsername}
            value={username}
          />
          <InputText
            autoComplete="off"
            placeholder="كلمة المرور"
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={onChangePassword}
          />

          <Submit type="submit" value="Login">
            <span style={{ marginLeft: "20px" }}>تسجيل الدخول</span>
            {loading && (
              <span className="spinner-border spinner-border-md"></span>
            )}
          </Submit>
        </Base>
        <Text>
          لست مسجلًا؟ <NavLink to="/register">سجل عضويتك الآن</NavLink>
        </Text>
        <TextSmall>
          لن نقوم بنشر معلوماتك الخاصة .. فجميع الحقوق محفوظة لدى دوام أونلاين.
        </TextSmall>
      </Container>
      <Fotter />
    </Wrapper>
  );
};

export default Login;

export const Wrapper = styled.div`
  padding-top: 200px;
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 660px;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  box-sizing: border-box;
  width: 100%;
  margin: auto;
  max-width: 450px;
  padding: 60px 68px 40px;
  margin-bottom: 100px;
  @media (max-width: 500px) {
    width: 95%;
    margin: -94px auto;
    margin-bottom: 50px;
  }
`;

export const Error = styled.div`
  background: #e87c03;
  border-radius: 4px;
  font-size: 14px;
  margin: 0 0 16px;
  color: white;
  padding: 15px 20px;
`;

export const Base = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  width: 100%;
  z-index: 10;
`;

export const Title = styled.h1`
  color: #fff;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 28px;
  text-align: right;
`;

export const Text = styled.p`
  color: #737373;
  font-size: 16px;
  font-weight: 500;
  text-align: right;
`;

export const TextSmall = styled.p`
  margin-top: 10px;
  font-size: 13px;
  line-height: normal;
  color: #8c8c8c;
  text-align: right;
`;

// export const Link = styled(ReachRouterLink)`
//   color: #fff;
//   text-decoration: none;
//   &:hover {
//     text-decoration: underline;
//   }
// `

export const InputText = styled.input`
  background: #333;
  border-radius: 4px;
  border: 0;
  color: #fff;
  height: 50px;
  line-height: 50px;
  padding: 5px 20px;
  margin-bottom: 20px;
  &:last-of-type {
    margin-bottom: 30px;
  }
`;

export const Submit = styled.button`
  background: #00cffd;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  margin: 24px 0 12px;
  padding: 16px;
  border: 0;
  color: #080812;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
`;
