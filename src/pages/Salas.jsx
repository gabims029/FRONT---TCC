import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import api from "../axios/axios";

export default function SalasPage() {
  const location = useLocation();
  const blocoSelecionadoInicial = location.state?.bloco; // bloco enviado pelo navigate
  const [salas, setSalas] = useState([]);
  const [search, setSearch] = useState("");
  const [blocoSelecionado, setBlocoSelecionado] = useState(
    blocoSelecionadoInicial
  );

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const res = await api.getSalaByBloco(blocoSelecionado);
        setSalas(res.data.salas || []);
      } catch (err) {
        console.error(err);
        setSalas([]);
      }
    };
    fetchSalas();
  }, [blocoSelecionado]);

  const salasFiltradas = salas.filter(
    (s) =>
      s.numero?.toString().includes(search) ||
      s.descricao?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box
      sx={{
        backgroundColor: "#FFE9E9",
        minHeight: "100vh",
        p: 2,
      }}
    >
      {/* ajusta conforme a altura do header */}
      <Container sx={{ pt: "80px" }}>
        {/* Topo */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <TextField
            variant="outlined"
            placeholder="Pesquisar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ background: "#fff", flex: 1, mr: 2 }}
          />
          <TextField
            select
            value={blocoSelecionado}
            onChange={(e) => setBlocoSelecionado(e.target.value)}
            sx={{ width: 120, background: "#fff" }}
            label="Bloco"
          >
            {["A", "B", "C", "D"].map((b) => (
              <MenuItem key={b} value={b}>
                {b}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {/* Cards */}
        <Grid container spacing={2}>
          {salasFiltradas.map((sala, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card
                sx={{
                  borderRadius: 2,
                  border: "1px solid #e0e0e0",
                  background: "#fff",
                }}
              >
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{
                      backgroundColor: "#bc2c2f",
                      color: "white",
                      borderRadius: 1,
                      p: 1,
                      mb: 2,
                    }}
                  >
                    {sala.nome}
                  </Typography>

                  {/* Exibe as propriedades */}
                  <Typography>Numero: {sala.numero}</Typography>
                  <Typography>Descrição: {sala.descricao}</Typography>
                  <Typography>Capacidade: {sala.capacidade}</Typography>
                  <Typography>Bloco: {sala.bloco}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
