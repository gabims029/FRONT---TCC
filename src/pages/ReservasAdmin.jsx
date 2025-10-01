import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Snackbar, Alert } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import api from "../axios/axios";

export default function ReservasAdmin() {
  const navigate = useNavigate();
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [reservas, setReservas] = useState({});
  const [alert, setAlert] = useState({ type: "", message: "", visible: false });

  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  const handleClose = () => {
    setAlert({ ...alert, visible: false });
  };

  async function getReservas() {
    try {
      const response = await api.getReservas();
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
    getReservas();
  }, []);

  // Pega o dia da semana da data selecionada
  const diaSelecionado = dataSelecionada
    ? diasSemana[dataSelecionada.day()]
    : null;
  const reservasFiltradas = diaSelecionado
    ? reservas[diaSelecionado] || []
    : [];

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
          gap: 2,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <DatePicker
            label="Selecione uma data"
            value={dataSelecionada}
            onChange={(novaData) => setDataSelecionada(novaData)}
          />
        </LocalizationProvider>

        {dataSelecionada && reservasFiltradas.length === 0 && (
          <p>Nenhuma reserva para esta data.</p>
        )}

        {reservasFiltradas.length > 0 && (
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
            {reservasFiltradas.map((reserva) => (
              <Box
                key={reserva.id_reserva}
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  width: 200,
                  backgroundColor: "#F5F5F5",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#C62828",
                    color: "#fff",
                    p: 1,
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {reserva.tipo}
                </Box>
                <Box sx={{ p: 1, textAlign: "center" }}>
                  <strong>{reserva.sala}</strong>
                  <p>Máx. 16</p>
                  <p>
                    {dayjs(reserva.data_inicio).locale("pt-br").format("DD/MM/YYYY")}-{" "}
                    {dayjs(reserva.data_fim).locale("pt-br").format("DD/MM/YYYY")}
                  </p>
                  <p>{reserva.dias}</p>
                  <p>{reserva.usernome}</p>
                </Box>
              </Box>
            ))}
          </Box>
        )}
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
