// cnpm install axios -S
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/admin";
export const isLogin = (params) => {
  console.log(params);
  return axios.post("/userlogin", params).then((res) => res.data);
};
