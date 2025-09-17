import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  Alert,
} from "@mui/material";

export default function ModalReserva({
  sala,
  data,
  horariosSelecionados,
  children,
}) {
  const [open, setOpen] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const handleOpen = () => {
    if (horariosSelecionados.length === 0) {
      setMensagem("Selecione pelo menos um horário antes de reservar!");
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setMensagem(
      `Reserva feita para sala ${
        sala?.numero || "Desconhecida"
      } em ${data} nos horários: ${horariosSelecionados.join(", ")}`
    );
    setOpen(false);
  };

  return (
    <>
      {/* Elemento que abre o modal */}
      <span onClick={handleOpen}>{children}</span>

      {/* Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Confirmação de Reserva</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" mb={1}>
            Sala: {sala?.numero || "Desconhecida"}
          </Typography>
          <Typography variant="subtitle1" mb={1}>
            Data: {data}
          </Typography>
          <Typography variant="subtitle1" mb={1}>
            Horários selecionados:
          </Typography>
          <List dense>
            {horariosSelecionados.map((h, i) => (
              <ListItem key={i} sx={{ pl: 0 }}>
                {h}
              </ListItem>
            ))}
          </List>
          {mensagem && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {mensagem}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} color="primary" variant="contained">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
