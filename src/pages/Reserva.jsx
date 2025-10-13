const fetchHorarios = async () => {
  if (!sala) return;
  try {
    setLoading(true);

    const res = await api.getPeriodoStatus(sala.id_sala, dataInicio);

    const todosHorarios = res.data.periodos || [];

    const horariosProcessados = todosHorarios.map((h) => ({
      ...h,
      reservado: h.status === "reservado",
    }));

    setHorarios(horariosProcessados);
    setErro(false);

    if (res.data.message) {
      setAlert({
        type: "info",
        message: res.data.message,
        visible: true,
      });
    }
  } catch (err) {
    console.error("Erro ao buscar horários:", err);
    setErro(true);
    setHorarios([]);

    setAlert({
      type: "error",
      message:
        err.response?.data?.error || "Não foi possível carregar os horários",
      visible: true,
    });
  } finally {
    setLoading(false);
  }
};

const handleReservar = async () => {
  if (!idUsuario) {
    return setAlert({
      type: "error",
      message: "ID do usuário não encontrado. Faça login novamente.",
      visible: true,
    });
  }

  try {
    for (let i = 0; i < horariosSelecionados.length; i++) {
      const id = horariosSelecionados[i];
      const res = await api.createReserva({
        fk_id_periodo: id,
        fk_id_user: idUsuario,
        fk_id_sala: sala.id_sala,
        dias: diasSelecionados,
        data_inicio: dataInicio,
        data_fim: dataFim,
      });

      if (res.data.message) {
        setAlert({
          type: "success",
          message: res.data.message,
          visible: true,
        });
      }
    }

    resetForm();
  } catch (err) {
    console.error("Erro ao reservar:", err);

    setAlert({
      type: "error",
      message:
        err.response?.data?.error ||
        "Erro ao fazer a reserva. Tente novamente.",
      visible: true,
    });

    if (!err.response?.data?.error?.includes("A sala já está reservada")) {
      resetForm();
    }
  }

  fetchHorarios();
};
