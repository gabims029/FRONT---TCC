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
  isOpen, // Recebe a prop de controle de visibilidade
  onClose, // Recebe a função para fechar o modal
}) {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Reserva Concluída!</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" mb={1}>
          Sua reserva foi realizada com sucesso.
        </Typography>
        <Typography variant="subtitle1" mb={1}>
          Sala: {sala?.numero || "Desconhecida"}
        </Typography>
        <Typography variant="subtitle1" mb={1}>
          Data de Início: {data?.data_inicio}
        </Typography>
        <Typography variant="subtitle1" mb={1}>
          Data de Fim: {data?.data_fim}
        </Typography>
        <Typography variant="subtitle1" mb={1}>
          Horários e dias selecionados:
        </Typography>
        <List dense>
          {horariosSelecionados.map((h, i) => (
            <ListItem key={i} sx={{ pl: 0 }}>
              {h}
            </ListItem>
          ))}
        </List>
        <Alert severity="success" sx={{ mt: 2 }}>
          Reserva para {sala?.numero || "Desconhecida"} confirmada!
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
