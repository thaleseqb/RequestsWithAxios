import React, { useEffect, useState } from "react";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import axios from "axios";
import { IPaginacao } from "../../interfaces/IPaginacao";
import { Button, TextField } from "@mui/material";

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<Array<IRestaurante>>([]);
  const [proximaPagina, setProximaPagina] = useState("");
  const [restaurante, setRestaurante] = useState("");
  const [restaurantesFiltrados, setRestauranteFiltrados] = useState<
    Array<string>
  >([]);

  useEffect(() => {
    axios
      .get<IPaginacao<IRestaurante>>(
        "http://localhost:8000/api/v1/restaurantes/"
      )
      .then((response) => {
        setRestaurantes(response.data.results);
        setProximaPagina(response.data.next);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const verMais = () => {
    axios
      .get<IPaginacao<IRestaurante>>(proximaPagina)
      .then((response) => {
        setRestaurantes([...restaurantes, ...response.data.results]);
        setProximaPagina(response.data.next);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const aoSubmeter = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const converts = restaurantes
      .filter((rest) => {
        return rest.nome.toLowerCase().includes(restaurante);
      })
      .map((convert) => {
        return convert.nome;
      });

    setRestauranteFiltrados([...converts]);
  };

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>

      <form onSubmit={aoSubmeter} className={style.FormListaRestaurante}>
        <TextField
          value={restaurante}
          onChange={(event) => {
            setRestaurante(event.target.value);
          }}
          label="Suas preferências"
          variant="standard"
        />
        <Button type="submit" variant="outlined">
          Filtrar restaurante
        </Button>
      </form>

      <ul>
        {restaurantesFiltrados?.map((nomeRestaurante) => {
          return <li key={nomeRestaurante}>{nomeRestaurante}</li>;
        })}
      </ul>

      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {proximaPagina && <button onClick={verMais}>ver mais</button>}
    </section>
  );
};

export default ListaRestaurantes;
