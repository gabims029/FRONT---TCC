import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import api from "../axios/axios";
import ModalExcluirReserva from "../components/ModalExcluirReserva";

export default function MinhasReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ type: "", message: "", visible: false });
  const [modalOpen, setModalOpen] = useState(false);
  const [reservaSelecionada, setReservaSelecionada] = useState(null);
  const idUsuario = localStorage.getItem("id_usuario");

  const handleClose = () => setAlert({ ...alert, visible: false });

  const carregarReservas = useCallback(() => {
    if (!idUsuario) {
      setAlert({
        type: "error",
        message: "ID do usuário não encontrado.",
        visible: true,
      });
      setLoading(false);
      return;
    }

    setLoading(true);

    api
      .getSchedulesByUserID(idUsuario)
      .then((res) => {
        const dados = res.data?.reservas || [];
        setReservas(dados);
      })
      .catch((e) => {
        setAlert({
          type: "error",
          message: e.response?.data?.error || e.message,
          visible: true,
        });
      })
      .finally(() => setLoading(false));
  }, [idUsuario]);

  useEffect(() => {
    carregarReservas();
  }, [carregarReservas]);

  const handleExcluir = async () => {
    if (!reservaSelecionada?.id_reserva) return;

    try {
      await api.deleteSchedule(reservaSelecionada.id_reserva);

      setAlert({
        type: "success",
        message: "Reserva excluída com sucesso!",
        visible: true,
      });

      setModalOpen(false);
      carregarReservas();
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.error || "Erro ao excluir a reserva.",
        visible: true,
      });
    }
  };

  <ModalExcluirReserva
    open={modalOpen}
    handleClose={() => setModalOpen(false)}
    reserva={reservaSelecionada}
    onConfirm={handleExcluir}
  />;

  // Agrupar reservas por data
  const reservasPorData = {};
  reservas.forEach((reserva) => {
    let dataFormatada = "Data não informada";
    if (reserva?.data_inicio) {
      const [ano, mes, dia] = reserva.data_inicio.split("T")[0].split("-");
      dataFormatada = `${dia}-${mes}-${ano}`;
    }
    if (!reservasPorData[dataFormatada]) reservasPorData[dataFormatada] = [];
    reservasPorData[dataFormatada].push(reserva);
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "#FFE9E9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 8,
        pb: 4,
      }}
    >
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            width: "100%",
          }}
        >
          <Typography>Carregando...</Typography>
        </Box>
      )}
      {!loading && !reservas.length && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            width: "100%",
          }}
        >
          <Typography
            sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.2rem" }}
          >
            Você não possui reservas no momento.
          </Typography>
        </Box>
      )}
      {!loading && reservas.length > 0 && (
        <Box sx={{ width: "90%", maxWidth: "800px" }}>
          {Object.keys(reservasPorData)
            .sort()
            .map((data) => (
              <Box key={data} sx={{ width: "100%", mb: 3 }}>
                <Box
                  sx={{
                    width: "100%",
                    bgcolor: "#FF9696",
                    py: 1,
                    px: 2,
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", color: "black" }}
                  >
                    {data}
                  </Typography>
                </Box>

                {/* Grid com as salas */}
                <Grid container spacing={2}>
                  {reservasPorData[data]?.map((reserva) => {
                    const {
                      id_reserva,
                      descricaoSala = "Sem descrição",
                      nomeSala = "Sala não informada",
                      dias = "",
                      horario_inicio = "",
                      horario_fim = "",
                    } = reserva || {};

                    return (
                      <Grid item key={id_reserva || Math.random()}>
                        <Card
                          onClick={() => {
                            setReservaSelecionada(reserva);
                            setModalOpen(true);
                          }}
                          sx={{
                            width: 200,
                            borderRadius: 2,
                            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                            cursor: "pointer",
                          }}
                        >
                          <CardHeader
                            title={descricaoSala}
                            titleTypographyProps={{
                              textAlign: "center",
                              fontWeight: "bold",
                              fontSize: "0.95rem",
                              color: "white",
                            }}
                            sx={{ bgcolor: "#b9181d", p: 1 }}
                          />
                          <CardContent sx={{ p: 1.5 }}>
                            <Box
                              sx={{
                                bgcolor: "#f5f5f5",
                                p: 1,
                                borderRadius: 1,
                                mb: 1,
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{ fontWeight: "bold", textAlign: "center" }}
                              >
                                {nomeSala}
                              </Typography>
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{
                                mt: 1,
                                fontWeight: "bold",
                                textAlign: "center",
                              }}
                            >
                              {dias}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                mt: 1,
                                fontWeight: "bold",
                                textAlign: "center",
                              }}
                            >
                              {horario_inicio?.slice(0, 5)}{" "}
                              {horario_fim && `- ${horario_fim.slice(0, 5)}`}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            ))}
        </Box>
      )}
      <ModalExcluirReserva
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        reserva={reservaSelecionada}
        onConfirm={handleExcluir}
      />

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
    </Box>
  );
}
