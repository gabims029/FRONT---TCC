import { Box, Container, Typography, Button } from "@mui/material";
import HeaderLogo from "../components/HeaderLogo";
import Footer from "../components/Footer";
import Calendario from "../components/Calendario";
import api from "../axios/axios";

function OpcaoBotao({ letra }) {
  return (
    <Button
      variant="outlined"
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
          boxShadow: "0 0 10px rgba(189, 58, 63, 0.5)",
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
      {/* Header fixo */}
      <Box
        sx={{
          position: "fixed",
          right: 2,
          top: 2,
          zIndex: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "20px",
            fontFamily: "Arial",
          }}
        >
          HOME
        </Typography>
      </Box>

      {/* Container - main */}
      <Container
        sx={{
          mt: 10,
          mb: 6,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <HeaderLogo />

        {/* Botões */}
        <Box display="flex" justifyContent="center" gap={2} mt={-5}>
          <OpcaoBotao letra="A" />
          <OpcaoBotao letra="B" />
          <OpcaoBotao letra="C" />
          <OpcaoBotao letra="D" />
        </Box>

        <Calendario />
      </Container>

      <Footer />
    </Box>
  );
}
