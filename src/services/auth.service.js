import axios from "axios";
import { config } from "../config";

const API_URL = config.siteUrl;
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

const register = (user_login, user_email, user_pass) => {
  return axios
    .post(
      "https://cors-anywhere.herokuapp.com/https://devam.website/wp-json/wcm/api/register",
      {
        user_login,
        user_email,
        user_pass,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.href = "/profile";
      }
      console.log(response.data);
      return response.data;
    })
    .catch((err) => console.log(err));
};

const login = (username, password) => {
  return axios
    .post(
      "https://cors-anywhere.herokuapp.com/https://devam.website/wp-json/wcm/api/login",
      {
        username,
        password,
      }
    )
    .then((response) => {
      if (response.data.cookie) {
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
