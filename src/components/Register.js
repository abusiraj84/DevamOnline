import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { register } from "../actions/auth";
import axios from "axios";

import { NavLink, Redirect } from "react-router-dom";

const Register = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const onChangeFirstname = (e) => {
    const firstname = e.target.value;
    setFirstName(firstname);
  };

  const onChangeLastName = (e) => {
    const lastname = e.target.value;
    setLastName(lastname);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    // dispatch(register(firstname, lastname, email, password))
    //   .then(() => {
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });
    axios
      .post(
        "http://192.168.1.116:8000/api/register",
        {
          firstname,
          lastname,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          window.location.href = "/profile";
        }
        console.log(response.data);
        return response.data;
      })
      .catch((err) => console.log(err));
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
            id="firstname"
            placeholder="الإسم الأول"
            type="firstName"
            name="firstName"
            onChange={onChangeFirstname}
          />

          <InputText
            id="lastname"
            placeholder="الإسم الأخير"
            type="firstName"
            name="firstName"
            onChange={onChangeLastName}
          />

          <InputText
            placeholder="البريد الإلكتروني"
            id="email"
            type="email"
            name="email"
            onChange={onChangeEmail}
          />
          <InputText
            autoComplete="off"
            placeholder="كلمة المرور"
            id="password"
            type="password"
            name="password"
            onChange={onChangePassword}
          />
          <Submit type="submit" value="Login">
            <span>سجّل الآن</span>
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
    width: 76%;
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
