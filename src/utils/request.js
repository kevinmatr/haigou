import axios from "axios";
import store from "../store";

const url = "http://121.89.205.189:3000/admin";

const request = axios.create({
  baseURL: url,
  timeout: 5000,
});

request.interceptors.request.use(
  function (config) {
    let token = store.state.user.user.token;
    // console.log(token);
    config.headers["token"] = token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default request;
