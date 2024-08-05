import React, { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<Array<IRestaurante>>([]);

  useEffect(() => {
    axios
      .get<Array<IRestaurante>>("http://localhost:8000/api/v2/restaurantes/")
      .then((response) => {
        setRestaurantes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deletaRestaurante = (restaurante: IRestaurante) => {
    axios
      .delete(`http://localhost:8000/api/v2/restaurantes/${restaurante.id}/`)
      .then(() => {
        const novaListaRestaurante = restaurantes.filter((rest) => {
          return rest.id !== restaurante.id;
        });
        setRestaurantes([...novaListaRestaurante]);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Deletar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes?.map((restaurante) => {
            return (
              <TableRow key={restaurante.id}>
                <TableCell>{restaurante.nome}</TableCell>
                <TableCell>
                  [
                  <Link to={`/admin/restaurantes/${restaurante.id}`}>
                    Editar
                  </Link>
                  ]
                </TableCell>
                <TableCell>
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() => deletaRestaurante(restaurante)}
                  >
                    deletar
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdministracaoRestaurantes;
