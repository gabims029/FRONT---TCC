import { useState, useEffect } from "react";
import { Box, Container, Snackbar, Alert, Paper, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import api from "../axios/axios";

export default function ReservasAdmin() {
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [reservas, setReservas] = useState({});
  const [alert, setAlert] = useState({ type: "", message: "", visible: false });

  const handleClose = () => {
    setAlert({ ...alert, visible: false });
  };

  async function getReservas(dataFormatada) {
    try {
      const response = await api.getReservasByData(dataFormatada);
      console.log("Reservas recebidas:", response.data.schedulesByDay);
      setReservas(response.data.schedulesByDay);
    } catch (error) {
      setAlert({
        message: error.response?.data?.error || "Erro desconhecido",
        type: "error",
        visible: true,
      });
      console.log(error);
    }
  }

  useEffect(() => {
    if (dataSelecionada) {
      const dataFormatada = dayjs(dataSelecionada).format("YYYY-MM-DD");
      getReservas(dataFormatada);
    } else {
      setReservas({});
    }
  }, [dataSelecionada]);

  return (
    <Box
      sx={{
        height: "100%",
        backgroundColor: "#FFE9E9",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: 2,
      }}
    >
      <Container
        sx={{
          mt: 10,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <DatePicker
            label="Selecione uma data"
            value={dataSelecionada}
            onChange={(novaData) => setDataSelecionada(novaData)}
          />
        </LocalizationProvider>

        {/* Renderização das reservas agrupadas por sala */}
        {Object.keys(reservas).length > 0 ? (
          <Box sx={{ width: "100%", mt: 4, display: "flex", flexDirection: "column", gap: 3 }}>
            {Object.entries(reservas).map(([nomeSala, listaReservas]) => (
              <Box key={reservas.id_reserva}>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  {listaReservas.map((reserva) => (
                    <Paper
                      key={reserva.id_reserva}
                      sx={{
                        width: 250,
                        p: 2,
                        borderRadius: 2,
                        boxShadow: 3,
                        backgroundColor: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: 16,
                          mb: 1,
                          color: "#b22222",
                        }}
                      >
                        {reserva.nomeUsuario}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }}>
                        Horário: {reserva.horario_inicio} - {reserva.horario_fim}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }}>Dias: {reserva.dias}</Typography>
                    </Paper>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        ) : dataSelecionada ? (
          <Typography sx={{ mt: 4 }}>Nenhuma reserva para esta data.</Typography>
        ) : null}
      </Container>

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
