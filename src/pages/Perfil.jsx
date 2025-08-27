import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ModalEditarPerfil from "../components/ModalEditarPerfil";

function Perfil() {
  const [userData, setUserData] = useState({
    nome: "",
    cpf: "",
    email: "",
    senha: "",
  });

  const [alert, setAlert] = useState({
    type: "",
    message: "",
    visible: false,
  });

  const handleClose = () => {
    setAlert({ ...alert, visible: false });
  };
  const showAlert = (message, type = "info") => {
  setAlert({
    message,
    type,
    visible: true,
  });
 };

  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();
  const id_usuario = localStorage.getItem("id_usuario");

  const getUserInfo = async () => {
    try {
      const response = await api.getUserByID(id_usuario);
      setUserData({
        nome: response.data.user.nome || "",
        email: response.data.user.email || "",
        cpf: response.data.user.cpf || "",
        senha: response.data.user.senha || "",
      });
    } catch (err) {
      console.error(err);
      setAlert({
        type: "error",
        message: error.response?.data?.error || "Ocorreu um erro",
        visible: true,
      });
    }
  };

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
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "500px", padding: 2 }}>
        {alert.visible && (
          <Alert severity={alert.type} sx={{ width: "100%", mb: 2 }}>
            {alert.message}
          </Alert>
        )}

        <Box
          sx={{
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

          {/* EMAIL */}
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
            fullWidth
            disabled
            value={userData.email}
            placeholder={userData.email}
            type="text"
            sx={{
              marginBottom: 3,
              backgroundColor: "white",
              borderRadius: 1,
              "& .MuiInputBase-input": { color: "black" },
              "& .Mui-disabled": {
                WebkitTextFillColor: "black",
                color: "black",
              },
            }}
          />

          {/* SENHA */}
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
            fullWidth
            disabled
            value="********"
            placeholder="********"
            type="password"
            sx={{
              marginBottom: 3,
              backgroundColor: "white",
              borderRadius: 1,
              "& .MuiInputBase-input": { color: "black" },
              "& .Mui-disabled": {
                WebkitTextFillColor: "black",
                color: "black",
              },
            }}
          />

          {/* CPF */}
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
            fullWidth
            disabled
            value={userData.cpf}
            placeholder={userData.cpf}
            type="number"
            sx={{
              marginBottom: 2.5,
              backgroundColor: "white",
              borderRadius: 1,
              "& .MuiInputBase-input": { color: "black" },
              "& .Mui-disabled": {
                WebkitTextFillColor: "black",
                color: "black",
              },
            }}
          />

          {/* Botões */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "#B9181D",
              fontWeight: "bold",
              padding: "10px 20px",
              marginBottom: "10px",
              width: "100%",
              borderRadius: 1,
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            Minhas Reservas
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "#B9181D",
              fontWeight: "bold",
              padding: "10px 20px",
              marginBottom: "10px",
              width: "100%",
              borderRadius: 1,
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
            onClick={() => setOpenModal(true)}
          >
            Editar Perfil
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "#B9181D",
              fontWeight: "bold",
              padding: "10px 20px",
              marginBottom: "10px",
              width: "100%",
              borderRadius: 1,
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            Deletar Perfil
          </Button>
        </Box>

        <Snackbar
          open={alert.visible}
          autoHideDuration={4000} // tempo que o alerta fica visível
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }} // posição do alerta
        >
          {alert.type && (
            <Alert
              severity={alert.type}
              onClose={handleClose}
              sx={{ width: "100%" }}
            >
              {alert.message}
            </Alert>
          )}
        </Snackbar>
        
      </Box>

      {/* Modal */}
      <ModalEditarPerfil
        open={openModal}
        onClose={() => setOpenModal(false)}
        userData={userData}
        setUserData={setUserData}
        showAlert={showAlert}
      />
    </Box>
  );
}

export default Perfil;
