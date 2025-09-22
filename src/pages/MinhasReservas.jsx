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

export default function MinhasReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ type: "", message: "", visible: false });
  const idUsuario = localStorage.getItem("id_usuario");

  const handleClose = () => setAlert({ ...alert, visible: false });

  // Função para carregar reservas
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
      .getScheduleById(idUsuario)
      .then((res) => {
        const dados = res.data.data || [];
        setReservas(dados);
      })
      .catch((e) => {
        setAlert({
          type: "error",
          message: e.response?.data?.message || e.message,
          visible: true,
        });
      })
      .finally(() => setLoading(false));
  }, [idUsuario]);

  useEffect(() => {
    carregarReservas();
  }, [carregarReservas]);

  // Agrupar reservas por data (YYYY-MM-DD)
  const reservasPorData = {};
  reservas.forEach((reserva) => {
    // Garantir formato YYYY-MM-DD
    const dataFormatada = reserva.data.split("T")[0];
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
        pt: 4,
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
          <Box
            sx={{
              backgroundColor: "#B9181D",
              borderRadius: 2,
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "white",
                fontWeight: "bold",
                mb: 3,
                textAlign: "center",
              }}
            >
              MINHAS RESERVAS
            </Typography>

            {Object.keys(reservasPorData)
              .sort()
              .map((data) => (
                <Box key={data} sx={{ width: "100%", mb: 3 }}>
                  <Box
                    sx={{
                      bgcolor: "#f0c9c9",
                      color: "#b10e14",
                      p: 1.5,
                      mb: 2,
                      fontWeight: "bold",
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body1">{data}</Typography>
                  </Box>
                  <Grid container spacing={2}>
                    {reservasPorData[data].map(
                      ({ id, titulo, sala, horario }) => (
                        <Grid item key={id}>
                          <Card
                            sx={{
                              width: 200,
                              borderRadius: 2,
                              border: "1px solid #ccc",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            }}
                          >
                            <CardHeader
                              title={titulo}
                              titleTypographyProps={{
                                textAlign: "center",
                                fontWeight: "bold",
                                fontSize: "1rem",
                                color: "white",
                              }}
                              sx={{ bgcolor: "#b10e14", p: 1.5 }}
                            />
                            <CardContent sx={{ p: 2 }}>
                              <Typography variant="body2">
                                Sala {sala}
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{ mt: 2, fontWeight: "bold" }}
                              >
                                {horario}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      )
                    )}
                  </Grid>
                </Box>
              ))}
          </Box>
        </Box>
      )}

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
