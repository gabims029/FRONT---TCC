import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  Chip,
} from "@mui/material";
import api from "../axios/axios";

export default function ReservaPage({ idUsuario }) {
  const location = useLocation();
  const sala = location.state?.sala;
  const idSala = sala?.id_sala;

  const hoje = new Date().toISOString().split("T")[0];
  const id_usuario = localStorage.getItem("id_usuario");

  const [datasSelecionadas, setDatasSelecionadas] = useState([hoje]);
  const [horariosSelecionados, setHorariosSelecionados] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [mensagemTipo, setMensagemTipo] = useState("success");

  // Carrega horários disponíveis
  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const res = await api.getAllPeriodos();
        setHorarios(res.data?.periodos || []);
      } catch (err) {
        console.error("Erro ao buscar horários:", err);
        setHorarios([]);
      }
    };
    fetchHorarios();
  }, []);

  const handleAddData = (novaData) => {
    if (!datasSelecionadas.includes(novaData)) {
      setDatasSelecionadas([...datasSelecionadas, novaData]);
    }
  };

  const handleRemoveData = (data) => {
    setDatasSelecionadas(datasSelecionadas.filter((d) => d !== data));
  };

  const handleToggleHorario = (id_periodo, status) => {
    if (status === "ocupado") return;
    setHorariosSelecionados((prev) =>
      prev.includes(id_periodo)
        ? prev.filter((h) => h !== id_periodo)
        : [...prev, id_periodo]
    );
  };

  const handleReservar = async () => {
    if (
      !idSala ||
      horariosSelecionados.length === 0 ||
      datasSelecionadas.length === 0
    ) {
      setMensagem(
        "Selecione pelo menos um horário e uma data antes de reservar!"
      );
      setMensagemTipo("warning");
      return;
    }

    try {
      const reservas = [];

      // Para cada data selecionada, envia os horários escolhidos
      datasSelecionadas.forEach((dia) => {
        horariosSelecionados.forEach((id_periodo) => {
          reservas.push({
            fk_id_periodo: id_periodo,
            fk_id_user: id_usuario,
            fk_id_sala: idSala,
            dias: [], 
            data_inicio: dia,
            data_fim: dia,
          });
        });
      });

      // Chamada para o backend
      await api.createReserva(reservas);

      setMensagem("Reserva realizada com sucesso!");
      setMensagemTipo("success");
      setDatasSelecionadas([hoje]);
      setHorariosSelecionados([]);
    } catch (err) {
      console.error("Erro ao reservar:", err);
      setMensagem("Erro ao fazer a reserva. Tente novamente.");
      setMensagemTipo("warning");
    }
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
            {sala?.numero}
          </Typography>
        </Box>

        {/* Seletor de datas */}
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
            Selecione datas:
          </Typography>
          <TextField
            type="date"
            size="small"
            sx={{
              background: "#ddd",
              "& input": { fontSize: "0.85rem", padding: "6px 8px" },
            }}
            onChange={(e) => handleAddData(e.target.value)}
          />
          <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
            {datasSelecionadas.map((d) => (
              <Chip
                key={d}
                label={d}
                onDelete={() => handleRemoveData(d)}
                color="primary"
                size="small"
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Horários */}
      <Box sx={{ width: "100%", maxWidth: 600, p: 3, mx: "auto", mt: 2 }}>
        <Grid container spacing={2} justifyContent="center">
          {horarios.map((h) => {
            const selecionado = horariosSelecionados.includes(h.id_periodo);
            return (
              <Grid item xs={6} sm={4} key={h.id_periodo}>
                <Button
                  fullWidth
                  onClick={() => handleToggleHorario(h.id_periodo, h.status)}
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
                  {`${h.horario_inicio.slice(0, 5)} - ${h.horario_fim.slice(
                    0,
                    5
                  )}`}
                </Button>
              </Grid>
            );
          })}
        </Grid>

        {mensagem && (
          <Alert
            severity={mensagemTipo}
            sx={{ mt: 2 }}
            onClose={() => setMensagem("")}
          >
            {mensagem}
          </Alert>
        )}

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
