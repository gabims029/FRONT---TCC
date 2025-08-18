import React, { useState } from "react";
import { Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import DefaultLayout from "../components/DefaultLayout";
import api from "../axios/axios";

function Cadastro() {
  const [user, setUser] = useState({
    nome: "",
    email: "",
    cpf: "",
    senha: "",
    tipo: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    cadastro();
  };

  async function cadastro() {
    await api.postCadastro(user).then(
      (response) => {
        alert(response.data.message);
        // Limpar o formulário
        setUser({
          nome: "",
          email: "",
          cpf: "",
          senha: "",
          tipo: "",
        });
      },
      (error) => {
        console.log(error);
        alert(error.response.data.error);
      }
    );
  }

  return (
    <DefaultLayout headerRender={1}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#FFE9E9",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            maxWidth: 400,
            backgroundColor: "#B9181D",
            borderRadius: 2,
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ color: "white", marginBottom: 2 }}>
            CADASTRAR USUÁRIO
          </Typography>

          {["nome", "email", "cpf", "senha"].map((field) => (
            <TextField
              key={field}
              fullWidth
              name={field}
              label={field.toUpperCase()}
              type={field === "senha" ? "password" : "text"}
              value={user[field]}
              onChange={handleChange}
              sx={{
                marginBottom: 2,
                backgroundColor: "white",
                borderRadius: 1,
              }}
            />
          ))}

          {/* Campo tipo com seleção */}
          <TextField
            select
            fullWidth
            name="tipo"
            label="TIPO"
            value={user.tipo}
            onChange={handleChange}
            sx={{
              marginBottom: 2,
              backgroundColor: "white",
              borderRadius: 1,
            }}
          >
            <MenuItem value="Admin">Administrador</MenuItem>
            <MenuItem value="Comum">Comum</MenuItem>
          </TextField>

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "#B9181D",
              fontWeight: "bold",
              width: "100%",
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            Cadastrar
          </Button>
        </Box>
      </Box>
    </DefaultLayout>
  );
}

export default Cadastro;