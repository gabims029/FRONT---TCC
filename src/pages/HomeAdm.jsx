import { useNavigate } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Footer from "../components/Footer";
import Calendario from "../components/Calendario";
import Blocos from "../components/Blocos";

export default function HomeAdm() {
  const navigate = useNavigate();

  const handleClick = (bloco) => {
    navigate("/salas", { state: { bloco } }); // envia o bloco selecionado
  };

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
        }}
      >
        <Blocos handleClick={handleClick} />
        <Calendario />
      </Container>

      <Footer />
    </Box>
  );
}
