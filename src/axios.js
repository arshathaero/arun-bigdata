import axios from "axios";

const instance = axios.create({
  baseURL: "http://34.227.94.228:8000",
});

export default instance;
