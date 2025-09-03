import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import api from "../axios/axios";

function ListarUsuario() {
  const [usuarios, setUsuarios] = useState([]);

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

  async function getUsers() {
    try {
      const response = await api.getUsers();
      setUsuarios(response.data.users);
    } catch (error) {
      showAlert(
        error.response?.data?.error || "Erro ao listar usuário",
        "error"
      );
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
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
        <Box
          sx={{
            backgroundColor: "#B9181D",
            borderRadius: 2,
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              color: "white",
              fontWeight: "bold",
              marginBottom: 3,
              textAlign: "center",
            }}
          >
            LISTA DE USUÁRIOS
          </Typography>
          {usuarios.map((usuario, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: "#fff",
                borderRadius: 2,
                padding: 1.5,
                mb: 1.5,
                width: "100%",
                boxShadow: 1,
              }}
            >
              <Typography variant="h6" fontSize={18}>{usuario.nome}</Typography>
              <Typography variant="body2" color="gray">
                {usuario.email}
              </Typography>
            </Box>
          ))}
        </Box>
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
  );
}

export default ListarUsuario;
