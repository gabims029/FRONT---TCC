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
  const { state } = useLocation();
  const sala = state?.sala;

  const hoje = new Date().toISOString().split("T")[0];
  const idUsuario = localStorage.getItem("id_usuario");
  const nomeUsuario = localStorage.getItem("nome_usuario") || "Usuário";

  const [horariosSelecionados, setHorariosSelecionados] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "", visible: false });
  const [dataInicio, setDataInicio] = useState(hoje);
  const [dataFim, setDataFim] = useState(hoje);
  const [diasSelecionados, setDiasSelecionados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => setAlert((prev) => ({ ...prev, visible: false }));

  const fetchHorarios = async () => {
    if (!sala) return;
    try {
      setLoading(true);
      const res = await api.getAllPeriodos();
      setHorarios(res.data?.periodos || []);
      setErro(false);
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

  const handleToggleHorario = (id, status) => {
    if (status === "ocupado") return;
    setHorariosSelecionados((prev) =>
      prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
    );
  };

  const resetForm = () => {
    setHorariosSelecionados([]);
    setDiasSelecionados([]);
    setDataInicio(hoje);
    setDataFim(hoje);
  };

  const handleReservar = async () => {
    if (!idUsuario) {
      return setAlert({
        type: "error",
        message: "ID do usuário não encontrado. Faça login novamente.",
        visible: true,
      });
    }

    try {
      for (let i = 0; i < horariosSelecionados.length; i++) {
        const id = horariosSelecionados[i];
        await api.createReserva({
          fk_id_periodo: id,
          fk_id_user: idUsuario,
          fk_id_sala: sala.id_sala,
          dias: diasSelecionados,
          data_inicio: dataInicio,
          data_fim: dataFim,
        });
      }

      setAlert({
        type: "success",
        message: `Reserva feita para sala ${sala?.numero || "Desconhecida"}!`,
        visible: true,
      });
      resetForm();
    } catch (err) {
      console.error("Erro ao reservar:", err);
      const errorMessage =
        err.response?.data?.error ||
        "Erro ao fazer a reserva. Tente novamente.";

      if (!errorMessage.includes("A sala já está reservada")) resetForm();

      setAlert({ type: "error", message: errorMessage, visible: true });
    }

    fetchHorarios();
  };

  const handleAbrirModal = () => {
    if (
      !dataInicio ||
      !dataFim ||
      diasSelecionados.length === 0 ||
      horariosSelecionados.length === 0
    ) {
      return setAlert({
        type: "warning",
        message:
          "Selecione dias da semana, horário e defina a data de início e fim!",
        visible: true,
      });
    }
    setModalOpen(true);
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
    <Box sx={{ backgroundColor: "#ffe9e9", minHeight: "100vh", width: "100%" }}>
      <Box sx={{ width: "100%", p: 3, boxSizing: "border-box" }}>
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

        {/* Campos de datas e dias */}
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
          <Box sx={{ width: "100%", mb: 1 }}>
            <Typography sx={{ fontSize: "0.9rem", mb: 1 }}>
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
          </Box>

          <Box sx={{ width: "100%", mb: 1 }}>
            <Typography sx={{ fontSize: "0.9rem", mb: 1 }}>
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
          </Box>

          <Typography sx={{ fontSize: "0.9rem", mb: 1 }}>
            Dias da semana:
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Dias da semana</InputLabel>
            <Select
              multiple
              value={diasSelecionados}
              onChange={(e) => setDiasSelecionados(e.target.value)}
              input={<OutlinedInput label="Dias da semana" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {["Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map((dia) => (
                <MenuItem key={dia} value={dia}>
                  {dia}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Lista de horários */}
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

        {/* Alertas */}
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

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            sx={{
              background: "red",
              "&:hover": { background: "#c62828" },
              py: 1.5,
            }}
            onClick={handleAbrirModal}
          >
            Reservar
          </Button>
        </Box>
      </Box>

      {/* Modal de confirmação */}
      <ModalReserva
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        reserva={{
          sala: sala?.numero,
          data: `${dataInicio} a ${dataFim}`,
          horario: horariosSelecionados
            .map(
              (id) =>
                horarios
                  .find((h) => h.id_periodo === id)
                  ?.horario_inicio.slice(0, 5) +
                " - " +
                horarios
                  .find((h) => h.id_periodo === id)
                  ?.horario_fim.slice(0, 5)
            )
            .join(", "),
          usuario: nomeUsuario,
        }}
        onConfirm={() => {
          handleReservar();
          setModalOpen(false);
        }}
      />
    </Box>
  );
}
