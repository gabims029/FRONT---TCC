import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button, TextField, Grid } from "@mui/material";
import api from "../axios/axios";

export default function ReservaPage() {
  const location = useLocation();
  const sala = location.state?.sala;

  const hoje = new Date().toISOString().split("T")[0];
  const [data, setData] = useState(hoje);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    const fetchHorarios = async () => {
      if (!sala) return;
      setLoading(true);
      setErro(false);

      try {
        const res = await api.getAllPeriodos(); // Corrigi para chamar como função
        setHorarios(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Erro ao buscar horários:", err);
        setErro(true);
        setHorarios([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHorarios();
  }, [sala]);

  const handleReservar = () => {
    if (!horarioSelecionado) {
      alert("Selecione um horário!");
      return;
    }
    alert(
      `Reserva feita para sala ${
        sala?.numero || "Desconhecida"
      } em ${data} no horário ${horarioSelecionado}`
    );
  };

  if (!sala) {
    return (
      <Box p={3}>
        <Typography variant="h6" color="error">
          Sala não encontrada!
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#ffe9e9",
        minHeight: "100vh",
        p: 0,
      }}
    >
      {/* Cabeçalho fixo */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "100vw", // preenche toda a tela
          p: 3,
          textAlign: "left",
        }}
      >
        {/* Nome da sala */}
        <Box
          sx={{
            backgroundColor: "#f4bcbc",
            p: 2,
            borderBottom: "1px solid #f4bcbc", // sem contraste
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {sala?.numero || "Sala"}
          </Typography>
        </Box>

        {/* Seletor de data */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            px: 2, // só padding horizontal
            py: 1, // padding vertical menor
          }}
        >
          <Typography fontWeight="bold" sx={{ fontSize: "0.9rem", mb: 1 }}>
            Selecione a data:
          </Typography>
          <TextField
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            size="small"
            sx={{
              background: "#ddd",
              "& input": { fontSize: "0.85rem", padding: "6px 8px" },
            }}
          />
        </Box>
      </Box>

      {/* Conteúdo dos horários */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          p: 3,
          mx: "auto",
          mt: 2,
        }}
      >
        {loading ? (
          <Typography textAlign="center">Carregando horários...</Typography>
        ) : erro ? (
          <Typography color="error" textAlign="center">
            Erro ao carregar horários. Tente novamente.
          </Typography>
        ) : horarios.length === 0 ? (
          <Typography textAlign="center">Nenhum horário disponível.</Typography>
        ) : (
          <Grid container spacing={2} justifyContent="center">
            {horarios.map((h) => (
              <Grid item xs={6} sm={4} key={h.id}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() =>
                    h.status === "livre" && setHorarioSelecionado(h.label)
                  }
                  sx={{
                    backgroundColor:
                      h.status === "ocupado"
                        ? "#e57373"
                        : horarioSelecionado === h.label
                        ? "#fff"
                        : "#81c784",
                    color:
                      h.status === "ocupado"
                        ? "#fff"
                        : horarioSelecionado === h.label
                        ? "#000"
                        : "#fff",
                    border:
                      horarioSelecionado === h.label
                        ? "2px solid red"
                        : "1px solid transparent",
                    "&:hover": {
                      backgroundColor:
                        h.status === "ocupado"
                          ? "#e57373"
                          : horarioSelecionado === h.label
                          ? "#fff"
                          : "#66bb6a",
                    },
                    minHeight: "50px",
                  }}
                  disabled={h.status === "ocupado"}
                >
                  {h.label || "Indisponível"}
                </Button>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Botão Reservar */}
        <Box mt={4}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              background: "red",
              "&:hover": { background: "#c62828" },
              py: 1.5,
            }}
            onClick={handleReservar}
          >
            Reservar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
