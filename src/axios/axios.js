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
  updateUser: (data) => api.put(`/user/`, data),
  getUserByID: (id_usuario) => api.get(`/user/${id_usuario}`),
  deleteUser: (id_usuario) => api.delete(`/user/${id_usuario}`),
  getSalaByBloco: (bloco) => api.get(`/sala/bloco/${bloco}`),
  postReserva: () => api.post(),
  getAllPeriodos: () => api.get("/periodo/"),
  getUsers: () => api.get("/user"),
  getUserByID: (id_usuario) => api.get(`/user/${id_usuario}`),
  deleteUser: (id_usuario) => api.delete(`/user/${id_usuario}`),
  getSala: () => api.get("/sala"),
  getSalaByBloco: (bloco) => api.get(`/sala/bloco/${bloco}`),
  createSala: (sala) => api.post("/sala", sala),
  deleteSala: (sala) => api.delete(`/sala/${sala}`),
};

export default sheets;
