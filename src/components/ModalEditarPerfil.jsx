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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function ModalEditarPerfil() {
  const [userData, setUserData] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
  });
  const navigate = useNavigate();

  const id_usuario = localStorage.getItem("id_usuario");

  const onChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

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
            sx={{
              color: "white",
              marginBottom: 0.5,
              marginRight: "auto",
              fontWeight: "bold",
            }}
          >
            NOME
          </Typography>
          <TextField
            required
            fullWidth
            name="nome"
            value={userData.nome}
            placeholder={userData.nome}
            onChange={onChange}
            type="text"
            sx={{
              marginBottom: 3,
              backgroundColor: "white",
              borderRadius: 1,
            }}
          />

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
            onChange={onChange}
            type="text"
            sx={{
              marginBottom: 3,
              backgroundColor: "white",
              borderRadius: 1,
            }}
          />
          <Typography
            sx={{
              color: "white",
              marginBottom: 0.5,
              marginRight: "auto",
              fontWeight: "bold",
            }}
          >
            SENHA
          </Typography>
          <TextField
            required
            fullWidth
            name="senha"
            value=""
            placeholder=""
            type="password"
            onChange={onChange}
            sx={{
              marginBottom: 3,
              backgroundColor: "white",
              borderRadius: 1,
            }}
          />
          <Typography
            sx={{
              color: "white",
              marginBottom: 0.5,
              marginRight: "auto",
              fontWeight: "bold",
            }}
          >
            CPF
          </Typography>
          <TextField
            required
            fullWidth
            disabled
            name="cpf"
            value={userData.cpf}
            placeholder={userData.cpf}
            type="number"
            sx={{
              marginBottom: 2.5,
              backgroundColor: "white",
              borderRadius: 1,
              "& .MuiInputBase-input": {
                color: "black", // cor do texto
              },
              "& .Mui-disabled": {
                WebkitTextFillColor: "black", // força cor quando desabilitado
                color: "black",
              },
            }}
          />

          <Button
            variant="contained"
            //onClick={handleMinhasReservas}
            sx={{
              backgroundColor: "white",
              color: "#B9181D",
              fontWeight: "bold",
              padding: "10px 20px",
              marginBottom: "10px",
              width: "100%",
              borderRadius: 1,
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            //onClick={handleMinhasReservas}
            sx={{
              backgroundColor: "white",
              color: "#B9181D",
              fontWeight: "bold",
              padding: "10px 20px",
              marginBottom: "10px",
              width: "100%",
              borderRadius: 1,
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ModalEditarPerfil;
