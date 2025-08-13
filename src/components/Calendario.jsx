import React, { useState } from "react";
import { Box, IconButton, Typography, Grid } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

function Calendario() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState([]);

  const daysOfWeek = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

  const changeMonth = (offset) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset)
    );
    setSelectedDays([]);
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

  const days = [
    ...Array(firstDayOfMonth).fill(""),
    ...Array.from({ length: lastDayOfMonth }, (_, i) => i + 1),
  ];

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  return (
    <Box
      sx={{
        width: 300,
        border: "1px solid #B92626",
        borderRadius: 2,
        p: 2,
        bgcolor: "white",
      }}
    >
      {/* Cabeçalho */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <IconButton onClick={() => changeMonth(-1)}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6">
          {currentDate.toLocaleString("pt-BR", { month: "long" })} {year}
        </Typography>
        <IconButton onClick={() => changeMonth(1)}>
          <ArrowForward />
        </IconButton>
      </Box>

      {/* Dias da semana */}
      <Grid container>
        {daysOfWeek.map((day) => (
          <Grid item xs={12 / 7} key={day}>
            <Typography align="center" sx={{ fontWeight: "bold" }}>
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Dias do mês */}
      <Grid container sx={{minHeight: 200}}>
        {days.map((day, index) => (
          <Grid item xs={12 / 7} key={index}>
            <Box
              onClick={() => day && toggleDay(day)}
              sx={{
                m: 0.5,
                p: 1,
                borderRadius: "50%",
                bgcolor: selectedDays.includes(day) ? "#1976d2" : "transparent",
                color: day
                  ? selectedDays.includes(day)
                    ? "white"
                    : "black"
                  : "#ccc",
                cursor: day ? "pointer" : "default",
                transition: "0.2s",
                "&:hover": {
                  bgcolor:
                    day && !selectedDays.includes(day) ? "#e0e0e0" : undefined,
                },
              }}
            >
              <Typography align="center">{day}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Calendario;