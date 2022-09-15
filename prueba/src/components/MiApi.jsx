import { useState, useEffect } from "react";
import axios from "axios";

function MiApi() {
  const [actores, setListadoActores] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const obtenerPersonaje = async () => {
      const url = "http://thronesapi.com/api/v2/Characters";
      const result = await axios.get(url);
      const { data } = result;

      const filtrados = data.sort((a, b) => {
        let x = a.firstName;
        let y = b.firstName;
        if (x < y) {
          return -1;
        } else {
          return 1;
        }
      });
      setListadoActores(filtrados);
    };
    obtenerPersonaje();
  }, []);

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const lista = !search
    ? actores
    : actores.filter((x) =>
        x.firstName.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );

  return (
    <div>
      <input
        value={search}
        onChange={(e) => searchHandler(e)}
        type="text"
        placeholder="buscardor"
      />
      <h1>Actores de Game Of Throne</h1>
      <ul>
        {lista.length === 0 && <p>Cargando...</p>}
        {lista.map((personas, i) => {
          return (
            <li key={i}>
              <h4>Nombre: {personas.fullName}</h4>
              <img src={personas.imageUrl} alt="imagenes" width="200" />
              <h5>{personas.family}</h5>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MiApi;