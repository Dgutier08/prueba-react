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
    <>
    <div className="container d-flex justify-content-center align-items-center h-100">
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
            <>
         <div key={i} className="container">
          <div className="row h-100">
            <img className="h-48 w-full object-cover h-100" src={personas.imageUrl} width="200"/>
          </div>
          <div className="">
            <div className="flex-1">
              <p className="text-sm font-medium ">
                <a className="hover:text-gray-900 text-gray-900">
                  {}
                </a>
              </p>
              <a className="mt-6 block">
                <p className="text-xl font-semibold text-gray-900">Nombre:{personas.fullName}</p>
                <p className="mt-3 text-bas">Familia:{personas.family}</p>
              </a>
            </div>
          </div>
        </div>
            </>
          );
        })}
      </ul>
    </div>
    </>
  );
}

export default MiApi;
