import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./tabs.css";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { loadProgressBar } from "axios-progress-bar";
import "axios-progress-bar/dist/nprogress.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Caption, H2 } from "./styles/TextStyles";
import qs from "qs";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Fotter from "./Fotter";

function Profile() {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [items, setItems] = useState([]);

  const [display_name, setDisplay_name] = useState("");
  const [user_email, setuser_email] = useState("");
  const [user_pass, setuser_pass] = useState("");

  const orderUrl = `https://fierce-forest-56659.herokuapp.com/https://devam.website/wp-json/wcm/api/orders?per_page=100`;
  const Userurl = `https://fierce-forest-56659.herokuapp.com/https://devam.website/wp-json/wp/v2/users/${currentUser.user.id}`;
  useEffect(() => {
    loadProgressBar();
    axios
      .get(orderUrl, {
        headers: {
          "Content-Type": "application/json",
          "dwm-tkn": currentUser && currentUser.cookie,
        },
      })
      .then((response) => {
        const myData = response.data;
        setItems(myData);
        console.log(myData);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(Userurl, {
        headers: {
          "Content-Type": "application/json",
          "dwm-tkn": currentUser && currentUser.cookie,
          // "X-WP-Nonce": currentUser && currentUser.nonce,
        },
      })
      .then((response) => {
        const myData = response.data;
        console.log(myData);
        setDisplay_name(myData.name);
        setuser_email(myData.user_email);
      })
      .catch((error) => {
        console.log(error);
      });

    // fetchData();
  }, [currentUser, orderUrl, Userurl]);

  ///// ///// /////// For Update Form ///// //// ////

  const onChangeuser_pass = (e) => {
    const user_pass = e.target.value;
    setuser_pass(user_pass);
  };

  const [passwordErr, setPasswordErr] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingPass, setLoadingPass] = useState(false);

  const handleUpdata = (e) => {
    e.preventDefault();

    loadProgressBar();

    setLoading(true);
    if (display_name !== "" && user_email !== "") {
      const url =
        "https://fierce-forest-56659.herokuapp.com/https://devam.website/wp-json/wp/v2/update-profile";

      const data = qs.stringify({
        display_name: display_name,
        user_email: user_email,
        mobile_number: "",
      });

      console.log(qs.stringify(data));
      axios
        .post(url, data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "dwm-tkn": currentUser && currentUser.cookie,
          },
        })
        .then(function (response) {
          setLoading(false);
          console.log(response);
          Swal.fire("ممتاز", "لقد تم تحديث بياناتك بنجاح", "success");
        })
        .catch(function (error) {
          setLoading(false);
          console.log(error);
          Swal.fire("نعتذر", "لم يتم تحديث بياناتك بنجاح", "error");
        });
    } else {
      Swal.fire("تنبيه !", "لا يمكنك ترك أحد الحقول فارغة", "info");
      setLoading(false);
    }
  };

  const handlePassword = (e) => {
    e.preventDefault();

    loadProgressBar();

    setLoadingPass(true);

    const url =
      "https://fierce-forest-56659.herokuapp.com/https://devam.website/wp-json/wp/v2/update-pass";

    const data = qs.stringify({
      password: user_pass,
    });

    console.log(qs.stringify(data));
    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "dwm-tkn": currentUser && currentUser.cookie,
          "X-WP-Nonce": currentUser && currentUser.nonce,
        },
      })
      .then(function (response) {
        setLoadingPass(false);
        console.log(response);
        Swal.fire(
          "ممتاز",
          "لقد تم تغيير كلمة المرور بنجاح ، سيتم تسجيل خروجك الآن",
          "success"
        );
        setTimeout(() => {
          // setIsLoaded(true);
          localStorage.removeItem("user");
          window.location.href = "/login";
        }, 2000);
      })
      .catch(function (error) {
        setLoadingPass(false);
        console.log(error);
        Swal.fire("نعتذر", "لم يتم تغيير كلمة المرور بنجاح", "error");
      });
  };

  return (
    <Wrapper>
      <Helmet title="الملف الشخصي">
        <title>الملف الشخصي</title>
        <meta
          name="description"
          content="الملف الشخصي"
          data-react-helmet="true"
        />
      </Helmet>
      <Tabs>
        <TabList>
          <Tab>الملف الشخصي</Tab>
          <Tab>الدورات</Tab>
          <Tab>المتجر</Tab>
        </TabList>

        <TabPanel>
          <>
            <center>
              <Avatar src={currentUser.user.avatar} />
            </center>

            <Name>{display_name}</Name>

            <Email> {user_email} </Email>

            {/* Update Form  */}

            <center>
              {/* <Base onSubmit={handleUpdata} method="POST">
                <InputText
                  id="display_name"
                  placeholder="الإسم"
                  type="text"
                  name="display_name"
                  onChange={onChangeDisplayname}
                  pattern="^\S+$"
                />
                {Object.keys(usernameErr).map((key) => {
                  return (
                    <>
                      <br />
                      <div style={{ color: "red", textAlign: "right" }}>
                        {usernameErr[key]}
                      </div>
                      <br />
                    </>
                  );
                })}

                <InputText
                  placeholder="البريد الإلكتروني"
                  id="user_email"
                  type="email"
                  name="user_email"
                  onChange={onChangeuser_email}
                  pattern="^\S+$"
                />
                {Object.keys(emailErr).map((key) => {
                  return (
                    <>
                      <br />
                      <div style={{ color: "red", textAlign: "right" }}>
                        {emailErr[key]}
                      </div>
                      <br />
                    </>
                  );
                })}

                <Submit type="submit" value="Login">
                  <span style={{ marginLeft: "20px" }}>حدّث بياناتك</span>
                  {loading && (
                    <span className="spinner-border spinner-border-md"></span>
                  )}
                </Submit>
              </Base> */}
              <hr style={{ borderColor: "rgb(83 78 78 / 68%)" }} />
              <p style={{ marginBottom: "15px" }}>
                يمكنك تغيير كلمة المرور .. من هنا
              </p>
              <Base onSubmit={handlePassword} method="POST">
                <InputText
                  autoComplete="off"
                  placeholder="كلمة المرور (الجديدة)"
                  id="user_pass"
                  type="password"
                  name="user_pass"
                  onChange={onChangeuser_pass}
                  pattern="^\S+$"
                />
                {Object.keys(passwordErr).map((key) => {
                  return (
                    <>
                      <br />
                      <div style={{ color: "red", textAlign: "right" }}>
                        {passwordErr[key]}
                      </div>
                      <br />
                    </>
                  );
                })}
                <Submit type="submit" value="Login">
                  <span style={{ marginLeft: "20px" }}>غيّر كلمة المرور</span>
                  {loadingPass && (
                    <span className="spinner-border spinner-border-md"></span>
                  )}
                </Submit>
              </Base>
            </center>
          </>
        </TabPanel>
        <TabPanel>
          {items.map(
            (course, i) =>
              !course.line_items[0].downloadable &&
              course.status === "completed" && (
                <Box className="todo-row" key={i}>
                  <Link
                    to={`/course/${
                      course.line_items[0].course_slug &&
                      course.line_items[0].course_slug.post_name
                    }`}
                  >
                    <CourseTitle>
                      {course.line_items && course.line_items[0].name}
                    </CourseTitle>
                  </Link>
                </Box>
              )
          )}
        </TabPanel>
        <TabPanel>
          {items.map(
            (course, i) =>
              course.line_items[0].downloadable &&
              course.status === "completed" && (
                <Box className="todo-row" key={i}>
                  <CourseTitle style={{ marginBottom: "20px" }}>
                    {course.line_items && course.line_items[0].name}
                  </CourseTitle>
                  <center
                    style={{
                      color: "#fff",
                      background: "#03030326",
                      fontWeight: "400",
                      padding: "5px 10px",
                      display: "table",
                      borderRadius: "10px",
                      textAlign: "center",
                      width: "10%",
                      margin: "auto",
                      fontSize: "15px",
                    }}
                  >
                    <a
                      href={
                        course.line_items[0].file &&
                        course.line_items[0].file.meta_value
                      }
                    >
                      {" "}
                      <h2>Download</h2>
                    </a>
                  </center>
                  <div style={{ height: "10px" }}></div>
                  <center
                    style={{
                      marginTop: "40px",
                      color: "#fff",
                      background: "#03030326",
                      fontWeight: "300",
                      padding: "5px 10px",
                      display: "table",
                      borderRadius: "10px",
                      textAlign: "center",
                      width: "30%",
                      margin: "auto",
                      fontSize: "15px",
                    }}
                  >
                    <h2>
                      Password:{" "}
                      {(course.line_items[0].zip_password &&
                        course.line_items[0].zip_password.meta_value) ||
                        "NO PASS"}
                    </h2>
                  </center>
                </Box>
              )
          )}
        </TabPanel>
      </Tabs>
      <Fotter />
    </Wrapper>
  );
}

export default Profile;
const Wrapper = styled.div`
  padding-top: 200px;
  width: 1234px;
  margin: auto;
  @media (max-width: 1300px) {
    margin: auto;
    width: 80%;

    margin-top: 50px;
  }
`;

const Box = styled.div`
  position: relative;
  margin-top: 50px;
  margin-right: 20px;
  margin-left: 20px;
  border-radius: 20px;
  background: linear-gradient(
    90deg,
    rgba(255, 118, 20, 1) 0%,
    rgba(255, 84, 17, 1) 100%
  );
  box-shadow: rgba(78, 153, 227, 0.3) 0px 20px 40px,
    rgba(0, 0, 0, 0.05) 0px 1px 3px;
  position: relative;
  display: block;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  min-width: 200px;
  transition: all 0.8s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
  padding: 10px;
  transform: scale(1);
  -webkit-box-pack: center;
  place-content: center;
  justify-items: center;
  align-items: center;
  width: 68%;
  margin: auto;
  margin-bottom: 15px;
  &:hover {
    box-shadow: rgba(78, 153, 227, 0.3) 0px 20px 80px,
      rgba(0, 0, 0, 0.15) 0px 20px 40px;
    cursor: pointer;
    transform: scale(1.1);
    cursor: auto;
  }
  &:hover img,
  InstracturImg {
    transform: scale(0.8);
  }
  @media (max-width: 600px) {
    font-size: 20px;
  }

  :hover a {
    color: black;
  }
`;

const Name = styled.p`
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

const CourseTitle = styled(H2)`
  text-align: center;
  font-size: 20px;
  color: #fff;

  @media (max-width: 1000px) {
    font-size: 16px;
  }
`;
const Email = styled(Caption)`
  margin-bottom: 20px;
  text-align: center;
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

export const InputText = styled.input`
  background: #fff;
  border-radius: 4px;
  border: 0;
  color: #d72828;
  height: 50px;
  line-height: 50px;
  padding: 5px 20px;
  margin-bottom: 10px;
  &:last-of-type {
    margin-bottom: 30px;
  }
`;

export const Submit = styled.button`
  background: #00cffd;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  margin: 0px 0 12px;
  padding: 16px;
  border: 0;
  color: #080812;
  margin-bottom: 40px;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
`;
