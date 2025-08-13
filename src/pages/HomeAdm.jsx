import { Box, Container, Typography } from "@mui/material";
import HeaderLogo from "../components/HeaderLogo";
import Footer from "../components/Footer";
import Calendario from "../components/Calendario";

export default function HomeAdm() {
  return (
    <Box
      style={{
        height: "100%",
        backgroundColor: "#FFE9E9",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: 2,
      }}
    >
      {/* Cabeçalho flutuante */}
      <Box
        style={{
          position: "fixed",
          right: 20,
          zIndex: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: "20px",
            fontFamily: "Arial",
          }}
        >
          HOME
        </Typography>
      </Box>

      {/* Conteúdo */}
      <Container
        sx={{ mt: 8, mb: 4, flex: 1, display: "flex", flexDirection: "column" }}
      >
        <HeaderLogo />

        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#D32F2F",
              fontFamily: "Arial",
            }}
          >
            Bem-vindo
          </Typography>
          <Calendario />
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
