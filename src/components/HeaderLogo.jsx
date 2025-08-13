import * as React from "react";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function Header() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { label: "HOME", path: "/" },
    { label: "PERFIL", path: "/profile" },
    { label: "MINHAS RESERVAS", path: "/minhasReservas" },
    { label: "CADASTRAR USUÁRIO", path: "/cadastro" },
    { label: "SAIR", path: "/" },
  ];

  const handleMenuClick = (item) => {
    if (item.label === "SAIR") {
      const confirmExit = window.confirm("Tem certeza que deseja sair?");
      if (!confirmExit) return; // Se cancelar, não navega
    }
    navigate(item.path);
    setDrawerOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#C91E1E",
          height: "50px",
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          zIndex: 1300,
        }}
      >
        <IconButton onClick={toggleDrawer(true)}>
          <AccountCircleIcon fontSize="large" sx={{ color: "white" }} />
        </IconButton>
      </Box>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250, backgroundColor: "#C91E1E", height: "100%" }}
          role="presentation"
        >
          <List style={{ marginTop: 45 }}>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.label}
                onClick={() => handleMenuClick(item)}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    sx: { color: "white", fontWeight: "bold" },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Header;
