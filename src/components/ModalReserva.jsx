import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    borderRadius: "10px",
    border: "2px solid #ccc",
  },
});

const StyledDialogTitle = styled(DialogTitle)({
  backgroundColor: "#b10e14",
  color: "#fff",
  textAlign: "center",
  fontWeight: "bold",
  padding: "16px",
});

const StyledDialogContent = styled(DialogContent)({
  padding: "20px 24px",
  "& .MuiTypography-root": {
    fontSize: "1.1rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
});

const StyledButton = styled(Button)(({ variant, ...props }) => ({
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
  "&.confirmar": {
    backgroundColor: "#b2e3b2",
    color: "#4f8d4f",
    "&:hover": {
      backgroundColor: "#a2d3a2",
    },
  },
}));

export default function ModalReserva({
  open,
  handleClose,
  reserva,
  onConfirm,
}) {
  if (!reserva) return null;

  return (
    <StyledDialog open={open} onClose={handleClose}>
      <StyledDialogTitle>RESERVAR</StyledDialogTitle>
      <StyledDialogContent dividers>
        <Typography>SALA: {reserva.sala}</Typography>
        <Typography>DATA: {reserva.data}</Typography>
        <Typography>HORÁRIO: {reserva.horario}</Typography>
      </StyledDialogContent>
      <DialogActions sx={{ padding: "16px 24px" }}>
        <StyledButton
          onClick={handleClose}
          className="cancelar"
          disableElevation
        >
          CANCELAR
        </StyledButton>
        <StyledButton
          onClick={onConfirm}
          className="confirmar"
          disableElevation
        >
          CONFIRMAR
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
}
