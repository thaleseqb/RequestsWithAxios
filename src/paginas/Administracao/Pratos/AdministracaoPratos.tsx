import { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";

const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<Array<IPrato>>([]);

  useEffect(() => {
    http
      .get<Array<IPrato>>("pratos/")
      .then((response) => {
        setPratos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deletaPrato = (prato: IPrato) => {
    http.delete(`restaurantes/${prato.id}/`).then(() => {
      const novaListaPratos = pratos.filter((prato_) => {
        return prato_.id !== prato.id;
      });
      setPratos([...novaListaPratos]);
    });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Tag</TableCell>
              <TableCell>Imagem</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Deletar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pratos?.map((prato) => {
              return (
                <TableRow key={prato.id}>
                  <TableCell>{prato.nome}</TableCell>
                  <TableCell>{prato.tag}</TableCell>
                  <TableCell>
                    [
                    <a rel="noreferrer" href={prato.imagem} target="_blank">
                      Ver imagem
                    </a>
                    ]
                  </TableCell>
                  <TableCell>
                    [<Link to={`/admin/pratos/${prato.id}`}>Editar</Link>]
                  </TableCell>
                  <TableCell>
                    <Button
                      color="error"
                      variant="outlined"
                      onClick={() => deletaPrato(prato)}
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
    </>
  );
};

export default AdministracaoPratos;
