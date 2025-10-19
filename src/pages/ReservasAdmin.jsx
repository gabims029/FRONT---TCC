import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Snackbar,
  Alert,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import api from "../axios/axios";
import ConfirmDialog from "../components/ConfirmDialog";
import Blocos from "../components/Blocos";


export default function ReservasAdmin() {
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [reservas, setReservas] = useState({});
  const [alert, setAlert] = useState({ type: "", message: "", visible: false });
  const [reservaId, setReservaId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filtroLetra, setFiltroLetra] = useState(null);

  const handleOpenDialog = (id) => {
    setReservaId(id);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setReservaId(null);
  };

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

  const handleDeleteReserva = async () => {
    try {
      const response = await api.deleteReserva(reservaId);
      console.log("Reserva deletada com sucesso!");
      setOpenDialog(false);

      setAlert({
        message: response?.data?.message || "Erro desconhecido",
        type: "success",
        visible: true,
      });
      if (dataSelecionada) {
        const dataFormatada = dayjs(dataSelecionada).format("YYYY-MM-DD");
        getReservas(dataFormatada);
      }
    } catch (error) {
      setAlert({
        message: error.response?.data?.error || "Erro desconhecido",
        type: "error",
        visible: true,
      });
    }
  };

  useEffect(() => {
    if (dataSelecionada) {
      const dataFormatada = dayjs(dataSelecionada).format("YYYY-MM-DD");
      getReservas(dataFormatada);
    } else {
      setReservas({});
    }
  }, [dataSelecionada]);

  const handleClick = (letra) => {
    console.log(`Botão clicado: ${letra}`);
    setFiltroLetra((prev) => (prev === letra ? null : letra));
  };

  return (
    <Box
      sx={{
        fontFamily: "Arial",
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
          mt: 4,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          sx={{ textAlign: "center", fontWeight: "bold", fontSize: "20px", mb: -1 }}
        >
          Selecione uma data:
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <DateCalendar
            value={dataSelecionada}
            onChange={(novaData) => setDataSelecionada(novaData)}
            sx={{ backgroundColor: "white", border: "1px solid black", marginBottom: 3, }}
          />
        </LocalizationProvider>

        <Blocos handleClick={handleClick} />

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {Object.entries(reservas)
            .filter(([nomeSala]) => {
              if (!filtroLetra) return true;
              return nomeSala.startsWith(filtroLetra);
            }).sort(([nomeSalaA], [nomeSalaB]) =>
              nomeSalaA.localeCompare(nomeSalaB)
            )
            .map(([nomeSala, listaReservas]) => (
              <Box key={nomeSala} sx={{ mb: 5 }}>
                <Box
                  sx={{
                    color: "black",
                    padding: "2px 2px",
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: "20px",
                    marginBottom: "8px",
                    mt: -4
                  }}
                >
                  {nomeSala} - {listaReservas[0]?.descricao}
                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  {listaReservas.map((reserva) => (
                    <Paper
                      key={reserva.id_sala}
                      sx={{
                        borderRadius: "8px",
                        border: "1px solid #b22222",
                        minWidth: "22%",
                        cursor: "pointer",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: 2,
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "#b22222",
                          color: "#fff",
                          padding: "15px",
                          fontWeight: "bold",
                          fontSize: "20px",
                        }}
                      >
                        {reserva.nomeSala || "Disciplina"}
                      </Box>

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
                            backgroundColor: "#f5f5f5",
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
                          <Typography sx={{ fontSize: "15px" }}>
                            {reserva.descricao || "N/A"}
                          </Typography>
                          <Typography sx={{ fontSize: "17px" }}>
                            Máx. {reserva.capacidade || "N/A"}
                          </Typography>
                        </Paper>
                      </Box>

                      <Box sx={{ textAlign: "center" }}>
                        <Typography
                          sx={{ fontWeight: "bold", fontSize: "16px" }}
                        >
                          {dayjs(reserva.data_inicio)
                            .add(3, "hour")
                            .format("DD/MM/YYYY")}{" "}
                          -{" "}
                          {dayjs(reserva.data_fim)
                            .add(3, "hour")
                            .format("DD/MM/YYYY")}
                        </Typography>
                        <Typography
                          sx={{ fontWeight: "bold", fontSize: "16px" }}
                        >
                          {reserva.horario_inicio.slice(0, 5)} -{" "}
                          {reserva.horario_fim.slice(0, 5)}
                        </Typography>
                        <Typography
                          sx={{ fontSize: "16px", textTransform: "uppercase" }}
                        >
                          {reserva.dias}
                        </Typography>
                        <Typography sx={{ fontSize: "16px", marginBottom: 1 }}>
                          {reserva.nomeUsuario}
                        </Typography>
                        <Button
                          size="small"
                          onClick={() => handleOpenDialog(reserva.id_reserva)}
                          sx={{
                            color: "#fff",
                            border: "1px solid #b22222",
                            backgroundColor: "#b22222",
                            fontSize: "14px",
                            textTransform: "none",
                            paddingX: 5,
                            marginBottom: 1,
                          }}
                        >
                          Deletar
                        </Button>
                      </Box>
                    </Paper>
                  ))}
                </Box>
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

      <ConfirmDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleDeleteReserva}
        title="Você tem certeza que deseja excluir esta reserva?"
      />
    </Box>
  );
}
