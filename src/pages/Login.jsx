import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios";
import senaiLogo from "../assets/senai_logo.png";
import fotologin1 from "../assets/fotologin1.png";
import fotologin2 from "../assets/fotologin2.png";


function Login() {
  const [user, setUser] = useState({
    email: "",
    senha: "",
  });
  const navigate = useNavigate();

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  async function login() {
    await api.postLogin(user).then(
      (response) => {
        alert(response.data.message);
        localStorage.setItem("authenticated", true);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id_usuario", response.data.user.id_user);
        navigate("home/");
      },
      (error) => {
        console.log(error);
        alert(error.response.data.error);
      }
    );
  }

  return (
    <Box sx={{ height: "100vh", backgroundColor: "#FFE9E9", display: "flex", flexDirection: "column" }}>

      <Box sx={{ display: "flex", flexGrow: 1, height: "100%" }}>
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${fotologin1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Formulário central */}
        <Box
          sx={{
            width: "360px",
            backgroundColor: "#AE0000",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 3,
          }}
        >
          <img
            src={senaiLogo}
            alt="SENAI Logo"
            style={{ height: "55px", borderRadius: 2 }}
          />

          <Box
            component="form"
            sx={{ mt: 3, width: "100%" }}
            onSubmit={handleSubmit}
            noValidate
          >
            <TextField
              required
              fullWidth
              id="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={onChange}
              sx={{
                marginBottom: 3.5,
                backgroundColor: "white",
                borderRadius: 1,
              }}
            />
            <TextField
              required
              fullWidth
              id="senha"
              placeholder="Senha"
              name="senha"
              type="password"
              value={user.senha}
              onChange={onChange}
              sx={{
                marginBottom: 3,
                backgroundColor: "white",
                borderRadius: 1,
              }}
            />
            <Button
              sx={{
                mt: 0.5,
                mb: 2,
                backgroundColor: "#FF2A2A",
                borderRadius: 1,
                boxShadow: "none",
                padding: "7px 12px",
                fontSize: "13px",
              }}
              fullWidth
              type="submit"
              variant="contained"
            >
              Login
            </Button>
          </Box>
        </Box>

        {/* Imagem direita como plano de fundo */}
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${fotologin2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </Box>
    </Box>
  );
}

export default Login;