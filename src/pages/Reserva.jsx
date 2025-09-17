import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Alert,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  OutlinedInput,
  Snackbar,
} from "@mui/material";
import api from "../axios/axios";
import ModalReserva from "../components/ModalReserva";

export default function ReservaPage() {
  const location = useLocation();
  const sala = location.state?.sala;

  const hoje = new Date().toISOString().split("T")[0];

  const idUsuario = localStorage.getItem("id_usuario");

  const [horariosSelecionados, setHorariosSelecionados] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  const [alert, setAlert] = useState({
    type: "",
    message: "",
    visible: false,
  });

  const [dataInicio, setDataInicio] = useState(hoje);
  const [dataFim, setDataFim] = useState(hoje);
  const [DiaSelecionado, setDiasSelecionado] = useState([]);

  // Função para fechar o alerta
  const handleClose = () => {
    setAlert({ ...alert, visible: false });
  };

  // Função para buscar os horários, agora isolada
  const fetchHorarios = async () => {
    if (!sala) return;
    setLoading(true);
    setErro(false);
    try {
      const res = await api.getAllPeriodos();
      setHorarios(res.data?.periodos || []);
    } catch (err) {
      console.error("Erro ao buscar horários:", err);
      setErro(true);
      setHorarios([]);
      setAlert({
        type: "warning",
        message:
          "Atenção: A reserva foi feita, mas houve um erro ao atualizar a lista de horários.",
        visible: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHorarios();
  }, [sala]);

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
      horariosSelecionados.length === 0 ||
      !dataInicio ||
      !dataFim ||
      DiaSelecionado.length === 0
    ) {
      setAlert({
        type: "warning",
        message:
          "Selecione pelo menos um dia da semana, um horário e defina a data de início e fim antes de reservar!",
        visible: true,
      });
      return;
    }

    if (!idUsuario) {
      setAlert({
        type: "error",
        message:
          "ID do usuário não encontrado. Por favor, faça login novamente.",
        visible: true,
      });
      return;
    }

    try {
      for (const id_periodo of horariosSelecionados) {
        const reserva = {
          fk_id_periodo: id_periodo,
          fk_id_user: idUsuario,
          fk_id_sala: sala.id_sala,
          dias: DiaSelecionado,
          data_inicio: dataInicio,
          data_fim: dataFim,
        };
        await api.createReserva(reserva);
      }

      setAlert({
        type: "success",
        message: `Reserva feita para sala ${sala?.numero || "Desconhecida"}!`,
        visible: true,
      });
      setHorariosSelecionados([]);
      setDiasSelecionado([]);
      setDataInicio(hoje);
      setDataFim(hoje);
    } catch (err) {
      console.error("Erro ao reservar:", err);
      const errorMessage =
        err.response?.data?.error ||
        "Erro ao fazer a reserva. Tente novamente.";

      if (!errorMessage.includes("A sala já está reservada")) {
        setHorariosSelecionados([]);
        setDiasSelecionado([]);
        setDataInicio(hoje);
        setDataFim(hoje);
      }

      setAlert({
        type: "error",
        message: errorMessage,
        visible: true,
      });
    }

    fetchHorarios();
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

        {/* NOVO: Container Único para Datas e Dias */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            px: 2,
            py: 1,
            maxWidth: 600,
            mx: "auto",
          }}
        >
          <Typography fontWeight="bold" sx={{ fontSize: "0.9rem", mb: 1 }}>
            Data Início:
          </Typography>
          <TextField
            type="date"
            size="small"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            sx={{
              background: "#ddd",
              "& input": { fontSize: "0.85rem", padding: "6px 8px" },
            }}
          />

          <Typography
            fontWeight="bold"
            sx={{ fontSize: "0.9rem", mb: 1, mt: 1 }}
          >
            Data Fim:
          </Typography>
          <TextField
            type="date"
            size="small"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            sx={{
              background: "#ddd",
              "& input": { fontSize: "0.85rem", padding: "6px 8px" },
            }}
          />

          {/* Seletor de Dias da Semana*/}
          <Typography
            fontWeight="bold"
            sx={{ fontSize: "0.9rem", mb: 1, mt: 1 }}
          >
            Dias da semana:
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Dias da semana</InputLabel>
            <Select
              multiple
              value={DiaSelecionado}
              onChange={(e) => setDiasSelecionado(e.target.value)}
              input={<OutlinedInput label="Dias da semana" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {["Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map((dias) => (
                <MenuItem key={dias} value={dias}>
                  {dias}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
        )}

        {/* Componente de alerta do MUI */}
        <Snackbar
          open={alert.visible}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
