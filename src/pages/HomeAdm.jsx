import { useNavigate } from "react-router-dom";
import { Box, Container, Button, Typography } from "@mui/material";
import HeaderLogo from "../components/HeaderLogo";
import Footer from "../components/Footer";
import Calendario from "../components/Calendario";

function OpcaoBotao({ letra, onClick }) {
  return (
    <Button
      variant="outlined"
      onClick={() => onClick(letra)}
      sx={{
        margin: 1,
        padding: 0,
        borderColor: "#d97d87",
        color: "#bc2c2f",
        backgroundColor: "#f0f4ff",
        width: "60px",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        "&:hover": {
          //estado do elemento
          boxShadow: "0 0 10px rgba(189, 58, 63, 0.5)", // adiciona uma sombra
        },
      }}
    >
      <Typography variant="h5" component="span">
        {letra}
      </Typography>
    </Button>
  );
}

export default function HomeAdm() {
  const navigate = useNavigate();

  const handleClick = (bloco) => {
    navigate("/salas", { state: { bloco } }); // envia o bloco selecionado
  };

  return (
    <Box //fundo
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
        }}
      >
        <HeaderLogo />

        {/* Botões dos blocos */}
        <Box display="flex" justifyContent="center" gap={2} mt={-5} mb={4}>
          {["A", "B", "C", "D"].map((letra) => (
            <OpcaoBotao key={letra} letra={letra} onClick={handleClick} />
          ))}
        </Box>

        <Calendario />
      </Container>

      <Footer />
    </Box>
  );
}
