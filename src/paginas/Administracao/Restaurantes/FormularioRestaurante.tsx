import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const FormularioRestaurante = () => {
  const [nomeRestaurante, setNomeRestaurante] = useState("");

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    axios
      .post("http://localhost:8000/api/v2/restaurantes/", {
        nome: nomeRestaurante,
      })
      .then(() => {
        alert("Restaurante adicionado");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form onSubmit={aoSubmeterForm}>
      <TextField
        onChange={(evento) => setNomeRestaurante(evento.target.value)}
        value={nomeRestaurante}
        label="Nome do restaurante"
        variant="standard"
      />
      <Button type="submit" variant="outlined">
        Salvar
      </Button>
    </form>
  );
};

export default FormularioRestaurante;
