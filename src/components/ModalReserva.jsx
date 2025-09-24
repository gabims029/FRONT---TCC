import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

function formatarData(dataString) {
  if (!dataString) return "Data não informada";

  const data = new Date(dataString); // cria objeto Date
  const dia = String(data.getDate()).padStart(2, "0"); // dia com 2 dígitos
  const mes = String(data.getMonth() + 1).padStart(2, "0"); // mês começa em 0
  const ano = data.getFullYear(); // ano completo

  return `${dia}-${mes}-${ano}`;
}

export default function ModalReserva({
  open,
  handleClose,
  reserva,
  onConfirm,
}) {
  if (!reserva) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: "10px",
          border: "2px solid #ccc",
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#b10e14",
          color: "#fff",
          textAlign: "center",
          fontWeight: "bold",
          padding: "16px",
        }}
      >
        RESERVAR
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          padding: "20px 24px",
          "& .MuiTypography-root": {
            fontSize: "1.1rem",
            fontWeight: "bold",
            marginBottom: "10px",
          },
        }}
      >
        <Typography>SALA: {reserva.sala}</Typography>
        <Typography>DATA: {formatarData(reserva.data)}</Typography>
        <Typography>HORÁRIO: {reserva.horario}</Typography>
      </DialogContent>
      <DialogActions sx={{ padding: "16px 24px" }}>
        <Button
          onClick={handleClose}
          className="cancelar"
          disableElevation
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            minWidth: "120px",
            "&.cancelar": {
              backgroundColor: "#f0d5d7",
              color: "#b10e14",
              "&:hover": {
                backgroundColor: "#e0c5c7",
              },
            },
          }}
        >
          CANCELAR
        </Button>
        <Button
          onClick={onConfirm}
          className="confirmar"
          disableElevation
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            minWidth: "120px",
            "&.confirmar": {
              backgroundColor: "#b2e3b2",
              color: "#4f8d4f",
              "&:hover": {
                backgroundColor: "#a2d3a2",
              },
            },
          }}
        >
          CONFIRMAR
        </Button>
      </DialogActions>
    </Dialog>
  );
}
