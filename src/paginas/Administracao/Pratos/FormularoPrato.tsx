import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import http from "../../../http";
import ITag from "../../../interfaces/ITag";
import IValueTag from "../../../interfaces/IValueTag";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioPrato = () => {
  const [nomePrato, setNomePrato] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tags, setTags] = useState<Array<IValueTag>>([]);
  const [tag, setTag] = useState("");
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [restaurante, setRestaurante] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);

  useEffect(() => {
    http
      .get<ITag<IValueTag>>("tags/")
      .then((response) => {
        setTags(response.data.tags);
      })
      .catch((error) => {
        console.log(error);
      });
    http
      .get<IRestaurante[]>("restaurantes/")
      .then((response) => {
        setRestaurantes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const selecionaArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0]);
    } else {
      setImagem(null);
    }
  };

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
  };

  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 1 }}>
        <Paper sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <Typography component="h1" variant="h6">
              Formulário de pratos
            </Typography>
            <Box
              component="form"
              sx={{ width: "100%" }}
              onSubmit={aoSubmeterForm}
            >
              <TextField
                required
                onChange={(evento) => setNomePrato(evento.target.value)}
                value={nomePrato}
                label="Nome do prato"
                variant="standard"
                fullWidth
                margin="dense"
              />
              <TextField
                required
                onChange={(evento) => setDescricao(evento.target.value)}
                value={descricao}
                label="Descrição do prato"
                variant="standard"
                fullWidth
                margin="dense"
              />
              <FormControl margin="dense" fullWidth>
                <InputLabel id="select-tag">Tag</InputLabel>
                <Select
                  value={tag}
                  labelId="select-tag"
                  onChange={(evento) => setTag(evento.target.value)}
                >
                  {tags?.map((tag) => {
                    return (
                      <MenuItem key={tag.id} value={tag.id}>
                        {tag.value}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl margin="dense" fullWidth>
                <InputLabel id="select-restaurante">Restaurante</InputLabel>
                <Select
                  value={restaurante}
                  labelId="select-restaurante"
                  onChange={(evento) => setRestaurante(evento.target.value)}
                >
                  {restaurantes?.map((restaurante) => {
                    return (
                      <MenuItem key={restaurante.id} value={restaurante.id}>
                        {restaurante.nome}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <input type="file" onChange={selecionaArquivo} />

              <Button
                sx={{ marginTop: 1 }}
                fullWidth
                type="submit"
                variant="outlined"
              >
                Salvar
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default FormularioPrato;
