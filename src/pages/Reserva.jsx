import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button, TextField, Grid, Alert } from "@mui/material";
import api from "../axios/axios";

export default function ReservaPage() {
  const location = useLocation();
  const sala = location.state?.sala;

  const hoje = new Date().toISOString().split("T")[0];
  const [data, setData] = useState(hoje);
  const [horariosSelecionados, setHorariosSelecionados] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const fetchHorarios = async () => {
      if (!sala) return;
      setLoading(true);
      setErro(false);

      try {
        const res = await api.getAllPeriodos();
        const listaHorarios = res.data?.periodos || [];
        setHorarios(listaHorarios);
      } catch (err) {
        console.error("Erro ao buscar horários:", err);
        setErro(true);
        setHorarios([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHorarios();
  }, [sala, data]);

  // Função para selecionar/desmarcar horários
  const handleToggleHorario = (intervalo, status) => {
    if (status === "ocupado") return; // não permite selecionar ocupado
    setHorariosSelecionados((prev) =>
      prev.includes(intervalo)
        ? prev.filter((h) => h !== intervalo)
        : [...prev, intervalo]
    );
  };

  const handleReservar = () => {
    if (horariosSelecionados.length === 0) {
      setMensagem("Selecione pelo menos um horário antes de reservar!");
      return;
    }

    setMensagem(
      `Reserva feita para sala ${
        sala?.numero || "Desconhecida"
      } em ${data} nos horários: ${horariosSelecionados.join(", ")}`
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
        width: "100%",
      }}
    >
      {/* Cabeçalho */}
      <Box
        sx={{ width: "100%", p: 3, textAlign: "left", boxSizing: "border-box" }}
      >
        <Box
          sx={{
            backgroundColor: "#f4bcbc",
            p: 2,
            borderBottom: "1px solid #f4bcbc",
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
            px: 2,
            py: 1,
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

      {/* Horários */}
      <Box sx={{ width: "100%", maxWidth: 600, p: 3, mx: "auto", mt: 2 }}>
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
            {horarios.map((h, i) => {
              const intervalo = `${h.horario_inicio.slice(
                0,
                5
              )} - ${h.horario_fim.slice(0, 5)}`;
              const selecionado = horariosSelecionados.includes(intervalo);

              return (
                <Grid item xs={6} sm={4} key={h.id_periodo || i}>
                  <Button
                    fullWidth
                    onClick={() => handleToggleHorario(intervalo, h.status)}
                    sx={{
                      backgroundColor:
                        h.status === "ocupado"
                          ? "#e57373"
                          : selecionado
                          ? "#fff"
                          : "#81c784",
                      color:
                        h.status === "ocupado"
                          ? "#fff"
                          : selecionado
                          ? "#000"
                          : "#fff",
                      border: selecionado
                        ? "2px solid red"
                        : "1px solid transparent",
                      "&:hover": {
                        backgroundColor:
                          h.status === "ocupado"
                            ? "#e57373"
                            : selecionado
                            ? "#fff"
                            : "#66bb6a",
                      },
                      minHeight: "50px",
                    }}
                    disabled={h.status === "ocupado"}
                  >
                    {intervalo}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        )}

        {/* Mensagem de alerta */}
        {mensagem && (
          <Alert
            severity={horariosSelecionados ? "success" : "warning"}
            sx={{ mt: 2 }}
            onClose={() => setMensagem("")} // fecha o alerta
          >
            {mensagem}
          </Alert>
        )}

        {/* Botão Reservar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Button
            variant="contained"
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
