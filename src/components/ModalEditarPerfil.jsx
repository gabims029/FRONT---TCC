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
          senha: response.data.user.senha || "",
          senhaAtual: "",
          senhaNova: "",
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
        nome: userData.nome,
        email: userData.email,
        cpf: userData.cpf,
        senha: userData.senhaNova || userData.senha,
      };
      await api.updateUser(id_usuario, dataToUpload);
      showAlert("Perfil atualizado com sucesso!", "success");
      onClose();
    } catch (err) {
      console.error(err);
      showAlert("Erro ao atualizar perfil", "error");
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

      {/* Inputs */}
      {[
        {
          label: "NOME",
          name: "nome",
          placeholder: "Digite o novo nome",
          type: "text",
        },
        {
          label: "CPF",
          name: "cpf",
          placeholder: "************",
          type: "text",
          disabled: true,
        },
        {
          label: "EMAIL",
          name: "email",
          placeholder: "Digite o novo email",
          type: "text",
        },
        {
          label: "SENHA",
          name: "senhaAtual",
          placeholder: "Digite a senha atual",
          type: "password",
        },
        {
          label: "NOVA SENHA",
          name: "senhaNova",
          placeholder: "Digite a nova senha",
          type: "password",
        },
      ].map((field) => (
        <Box key={field.name} sx={{ mb: 2 }}>
          <Typography sx={{ color: "white", fontWeight: "bold", mb: 0.5 }}>
            {field.label}
          </Typography>
          <TextField
            fullWidth
            name={field.name}
            value={userData[field.name]}
            placeholder={field.placeholder}
            onChange={onChange}
            type={field.type}
            disabled={field.disabled || false}
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
              "& .MuiInputBase-input": { color: "black" },
              "& .Mui-disabled": {
                WebkitTextFillColor: "black",
                color: "black",
              },
            }}
          />
        </Box>
      ))}

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
