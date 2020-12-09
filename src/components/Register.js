import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { register } from "../actions/auth";
import axios from "axios";

import { NavLink, Redirect } from "react-router-dom";
import { config } from "../config";

const Register = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [user_login, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [user_email, setuser_email] = useState("");
  const [user_pass, setuser_pass] = useState("");
  const [loading, setLoading] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const onChangeFirstname = (e) => {
    const user_login = e.target.value;
    setFirstName(user_login);
  };

  const onChangeLastName = (e) => {
    const lastname = e.target.value;
    setLastName(lastname);
  };

  const onChangeuser_email = (e) => {
    const user_email = e.target.value;
    setuser_email(user_email);
  };

  const onChangeuser_pass = (e) => {
    const user_pass = e.target.value;
    setuser_pass(user_pass);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    dispatch(register(user_login, user_email, user_pass))
      .then(() => {
        setLoading(false);
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
        {message && <Error> {message}</Error>}
        <Title>اشترك معنا</Title>
        <Base onSubmit={handleRegister} method="POST">
          <InputText
            id="user_login"
            placeholder="الإسم المستخدم"
            type="user_login"
            name="user_login"
            onChange={onChangeFirstname}
          />

          <InputText
            placeholder="البريد الإلكتروني"
            id="user_email"
            type="user_email"
            name="user_email"
            onChange={onChangeuser_email}
          />
          <InputText
            autoComplete="off"
            placeholder="كلمة المرور"
            id="user_pass"
            type="password"
            name="user_pass"
            onChange={onChangeuser_pass}
          />
          <Submit type="submit" value="Login">
            <span style={{ marginLeft: "20px" }}>سجّل الآن</span>
            {loading && (
              <span className="spinner-border spinner-border-md"></span>
            )}
          </Submit>
        </Base>
        <Text>
          هل لديك عضوية <NavLink to="/login">سجل دخول الآن</NavLink>
        </Text>
        <TextSmall>
          لن نقوم بنشر معلوماتك الخاصة فجميع الحقوق محفوظة لدى مجموعة دوام
          أونلاين.
        </TextSmall>
      </Container>
    </Wrapper>
  );
};

export default Register;

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
