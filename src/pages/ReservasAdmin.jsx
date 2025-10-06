import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Snackbar,
  Alert,
  Paper,
  Typography,
} from "@mui/material";
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
      console.log("Reservas recebidas:", response.data.schedulesBySala);
      setReservas(response.data.schedulesBySala);
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

        <Box sx={{display: "flex", flexDirection: "column", gap: 3}}>
          {Object.entries(reservas).map(([nomeSala, listaReservas]) => (
            <Box
              key={reservas.id_reserva}
              sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}
            >
              {listaReservas.map((reserva) => (
                <Paper
                  key={reserva.id_reserva}
                  sx={{
                    height: 180,
                    borderRadius: "8px",
                    border: "1px solid #b22222",
                    minWidth: 250,
                    cursor: "pointer",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "15px",
                  }}
                >
                  <Typography
                    sx={{
                      backgroundColor: "#b22222",
                      color: "#fff",
                      padding: "15px",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    {reserva.nomeUsuario || "Disciplina"}
                  </Typography>

                  <Box
                    sx={{
                      padding: "10px",
                      flexGrow: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        backgroundColor: "#f5f5f5", // cinza claro
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        p: 2,
                        borderRadius: 2,
                        width: "50%",
                      }}
                    >
                      <Typography sx={{ fontSize: "17px" }}>
                        {reserva.nomeSala || "N/A"}
                      </Typography>
                      <Typography sx={{ fontSize: "17px" }}>
                        Máx. {reserva.capacidade || "N/A"}
                      </Typography>
                    </Paper>
                  </Box>
                  <Box
                    sx={{
                      padding: "8px",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    {reserva.horarioInicio} - {reserva.horarioFim}
                  </Box>
                </Paper>
              ))}
            </Box>
          ))}
        </Box>
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
