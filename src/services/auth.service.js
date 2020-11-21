import axios from "axios";

const API_URL = "http://192.168.1.116:8000/api/";
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

const register = (firstname, lastname, email, password) => {
  return axios
    .post(
      API_URL + "register",
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

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  window.location.href = "/";
};

export default {
  register,
  login,
  logout,
};
