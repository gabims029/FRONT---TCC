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

  //atualizar o estado de um objeto (captura as mudanças)
  const onChange = (event) => {
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
    <DefaultLayout>
      <Box //fundo
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

          <TextField
            required
            fullWidth
            id="nome"
            placeholder="Nome"
            name="nome"
            value={user.nome}
            onChange={onChange} //detectar mudanças
            sx={{
              marginBottom: 2,
              backgroundColor: "white",
              borderRadius: 1,
            }}
          />
          <TextField
            required
            fullWidth
            id="email"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={onChange}
            sx={{
              marginBottom: 2,
              backgroundColor: "white",
              borderRadius: 1,
            }}
          />
          <TextField
            required
            fullWidth
            id="cpf"
            placeholder="CPF"
            name="cpf"
            value={user.cpf}
            onChange={onChange}
            sx={{
              marginBottom: 2,
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
              marginBottom: 2,
              backgroundColor: "white",
              borderRadius: 1,
            }}
          />

          {/* Campo tipo com seleção */}
          <TextField
            select
            fullWidth
            name="tipo"
            label="Tipo"
            value={user.tipo}
            onChange={onChange}
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
            sx={{
              backgroundColor: "white",
              color: "#B9181D",
              fontWeight: "bold",
              width: "100%",
            }}
            type="submit"
            variant="contained"
          >
            Cadastrar
          </Button>
        </Box>
      </Box>
    </DefaultLayout>
  );
}

export default Cadastro;
