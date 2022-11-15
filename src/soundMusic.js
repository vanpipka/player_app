import axios from "axios";

const url = "http://127.0.0.1:8000/";
const redirectUri = "http://localhost:3000";

const apiClient = axios.create({
  baseURL: url,
});

export default apiClient;
