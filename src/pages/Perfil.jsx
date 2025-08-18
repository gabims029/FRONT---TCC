import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios";
import DefaultLayout from "../components/DefaultLayout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Perfil() {
  const [userData, setUserData] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
  });
  const navigate = useNavigate();

  const id_usuario = localStorage.getItem("id_usuario");

  async function getUserInfo() {
    try {
      const response = await api.getUserByID(id_usuario);
      setUserData({
        nome: response.data.user.nome || "",
        email: response.data.user.email || "",
        cpf: response.data.user.cpf || "",
        senha: "",
      });
    } catch (err) {
      console.error("Erro ao buscar usuário:", err);
      setError("Não foi possível carregar os dados do usuário.");
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#FFE9E9",
        display: "flex",
        flexDirection: "column",
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          padding: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "500px",
            backgroundColor: "#B9181D",
            borderRadius: 2,
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#B9181D",
              borderRadius: "50%",
              width: 100,
              height: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <AccountCircleIcon sx={{ color: "white", fontSize: 140 }} />
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: "white",
              fontWeight: "bold",
              marginBottom: 3,
              textAlign: "center",
            }}
          >
            {userData.nome || "NOME DO USUÁRIO"}
          </Typography>

          <Typography
            sx={{
              color: "white",
              marginBottom: 0.5,
              marginRight: "auto",
              fontWeight: "bold",
            }}
          >
            EMAIL
          </Typography>
          <TextField
            required
            fullWidth
            name="email"
            value={userData.email}
            placeholder={userData.email}
            type="password"
            sx={{
              marginBottom: 3,
              backgroundColor: "white",
              borderRadius: 1,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Perfil;
