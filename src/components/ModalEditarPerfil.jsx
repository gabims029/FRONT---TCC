import React, { useEffect } from "react";
import { Dialog, Box, Typography, TextField, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import api from "../axios/axios";

function ModalEditarPerfil({
  open,
  onClose,
  userData,
  setUserData,
  showAlert,
}) {
  const id_usuario = localStorage.getItem("id_usuario");

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await api.getUserByID(id_usuario);

        setUserData({
          nome: response.data.user.nome || "",
          email: response.data.user.email || "",
          cpf: response.data.user.cpf || "",
          senhaAtual: "",
          senha: "",
        });
      } catch (err) {
        console.error(err);
        showAlert("Não foi possível carregar os dados do usuário.", "error");
      }
    }
    if (open) getUserInfo();
  }, [open]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };


  const handleSave = async () => {
    try {
      const dataToUpload = {
        id: id_usuario, // id do usuário
        nome: userData.nome,
        email: userData.email,
        cpf: userData.cpf,
        senhaAtual: userData.senhaAtual,
      };

      // Só envia nova senha se o usuário quiser trocar
      if (!userData.senha) {
        dataToUpload.senha = userData.senhaAtual;
      } else {
        dataToUpload.senha = userData.senha;
      }

      await api.updateUser(dataToUpload); // PUT /user/
      showAlert("Perfil atualizado com sucesso!", "success");
      onClose();
    } catch (err) {
      console.error(err);
      showAlert(err.response?.data?.error, "error");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "#B9181D",
          borderRadius: 3,
          padding: 3,
        },
      }}
      fullWidth
      maxWidth="sm"
    >

      {/* Ícone */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <AccountCircleIcon sx={{ color: "white", fontSize: 100 }} />
      </Box>

      {/* NOME */}
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
        fullWidth
        name="nome"
        value={userData.nome}
        placeholder="Digite o novo nome"
        onChange={onChange}
        type="text"
        sx={{
          marginBottom: 3,
          backgroundColor: "white",
          borderRadius: 1,
          "& .MuiInputBase-input": { color: "black" },
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
        name="cpf"
        value={userData.cpf}
        placeholder="************"
        type="text"
        disabled
        sx={{
          marginBottom: 3,
          backgroundColor: "white",
          borderRadius: 1,
          "& .MuiInputBase-input": { color: "black" },
          "& .Mui-disabled": { WebkitTextFillColor: "black", color: "black" },
        }}
      />

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
        name="email"
        value={userData.email}
        placeholder="Digite o novo email"
        onChange={onChange}
        type="text"
        sx={{
          marginBottom: 3,
          backgroundColor: "white",
          borderRadius: 1,
          "& .MuiInputBase-input": { color: "black" },
        }}
      />

      {/* SENHA ATUAL */}
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
        name="senhaAtual"
        value={userData.senhaAtual}
        placeholder="Digite a senha atual"
        onChange={onChange}
        type="password"
        sx={{
          marginBottom: 3,
          backgroundColor: "white",
          borderRadius: 1,
          "& .MuiInputBase-input": { color: "black" },
        }}
      />

      {/* NOVA SENHA */}
      <Typography
        sx={{
          color: "white",
          marginBottom: 0.5,
          marginRight: "auto",
          fontWeight: "bold",
        }}
      >
        NOVA SENHA (opcional)
      </Typography>
      <TextField
        fullWidth
        name="senha"
        value={userData.senha}
        placeholder="Digite a nova senha"
        onChange={onChange}
        type="password"
        sx={{
          marginBottom: 3,
          backgroundColor: "white",
          borderRadius: 1,
          "& .MuiInputBase-input": { color: "black" },
        }}
      />

      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            flex: 1,
            backgroundColor: "white",
            color: "#B9181D",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#f0f0f0" },
          }}
        >
          CANCELAR
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            flex: 1,
            backgroundColor: "white",
            color: "#B9181D",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#f0f0f0" },
          }}
        >
          SALVAR
        </Button>
      </Box>
    </Dialog>
  );
}

export default ModalEditarPerfil;
