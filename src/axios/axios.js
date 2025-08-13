import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.88:3000/api",
  headers: { accept: "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const sheets = {
    postLogin: (user) => api.post("/user/login", user),
    postCadastro: (user) => api.post("/user/", user),
};

export default sheets;
