import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.81:3000/api",
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
  postCadastro: (user, imagem) => {
    const data = new FormData();

    // adicionar os campos do usuário
    for (let key in user) {
      data.append(key, user[key]);
    }

    // adicionar a foto
    if (imagem) {
      data.append("foto", imagem); // 👈 tem que ser "foto" porque é o mesmo da rota
    }

    return api.post("/register", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
  },

  updateUser: (form, imagem, userId) => {
    const data = new FormData();

    for (let key in form) {
      data.append(key, form[key]);
    }

    if (imagem) {
      data.append("imagem", imagem);
    }

    return api.put("/user/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
  },
  getUserByID: (id_usuario) => api.get(`/user/${id_usuario}`),
  deleteUser: (id_usuario) => api.delete(`/user/${id_usuario}`),
  getSalaByBloco: (bloco) => api.get(`/sala/bloco/${bloco}`),
  createReserva: (reserva) => api.post("/reserva/", reserva),
  getAllPeriodos: () => api.get("/periodo/"),
  getUsers: () => api.get("/user"),
  getSala: () => api.get("/sala"),
  createSala: (sala) => api.post("/sala", sala),
  deleteSala: (sala) => api.delete(`/sala/${sala}`),
  getSchedulesByUserID: (id_usuario) =>
    api.get(`/reserva/usuario/${id_usuario}`),
  deleteSchedule: (id_reserva) => api.delete(`/reserva/${id_reserva}`),
};

export default sheets;
