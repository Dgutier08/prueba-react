import { useState , useEffect } from "react";
import axios from "axios";

function MiApi(){
    const [actores, SetListadoActores] = useState ([]);
    const [search, setSearch] = useState ("");
    const [actoresdata, actoresSetData] = useState (""); 
    useEffect (() =>{
        const obtenerPersonaje = async ()=>{
            const url = 'http://thronesapi.com/api/v2/Characters';
            const result = await axios.get(url);
            const {data}  = await result;
            console.log(result.data);
            
           data.sort((a, b) => {
              let x = a.name;
              let y = b.name;
              if (x < y) {
                return -1;
              } else {
                return 1;
              }
            });
            SetListadoActores(data);
        }
        obtenerPersonaje()
    },[]);

    const searchHandler = (e) => {
      setSearch(e.target.value);
    }
    console.log(search);
    const lista = !search
    ? actores
    : actores.filter((x) => x.name.toLowerCase().includes(setSearch))

    return (
    <div>
<input 
value={search}
onChange={(e)=>searchHandler (e)}
type="text"
placeholder="buscardor"
ClassName=""
/>
<h1>Actores de Game Of Throne</h1>
 <ul>
  {actores.length === 0 && <p>Cargando...</p>}
   {actores.map((personas,i)=> {
     return (  
            <li key={i}>
                <h4>Nombre: {personas.fullName}</h4> 
                <img src={personas.imageUrl} alt = "imagenes" width = '200'/>
                <h5>{personas.family}</h5>
            </li>
          )

        }) 
    }    
    
   </ul>

  </div>
    )
}   

export default MiApi;
