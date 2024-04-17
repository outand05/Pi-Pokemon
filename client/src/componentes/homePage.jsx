// HOME PAGE | la página principal de tu SPA debe contener:

// SearchBar: un input de búsqueda para encontrar pokemon por nombre. La búsqueda debe ser exacta, por lo que sólo lo encontrará si se lo busca con su nombre completo.
// Sector en el que se vea un listado de cards con los pokemones. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta GET /pokemons y deberá mostrar su:
// Imagen.
// Nombre.
// Tipos.
// Cuando se le hace click a una Card deberá redirigir al detalle de ese pokemon específico.
// Botones/Opciones para filtrar por tipo, y por si su origen es de la API o de la base de datos (creados por nosotros desde el formulario).
// Botones/Opciones para ordenar tanto ascendentemente como descendentemente los pokemones por orden alfabético y por ataque.
// Paginado: el listado de pokemones se hará por partes. Tu SPA debe contar con un paginado que muestre un total de 12 pokemones por página.
import { Link } from "react-router-dom";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDbApiPokemon } from "../redux/actions/actions";
import SearchBar from './searchBar'
const HomePage = () => {
  const dispatch = useDispatch();
  const { allPokemons} = useSelector((state) => state);
  React.useEffect(() => {
    dispatch(getDbApiPokemon());
  }, []);
  return (
    <div>
      <SearchBar/>
      {allPokemons.results && (
        <div>
          {allPokemons.results.slice(0, 12).map((pokemon, index) => (
            <div key={index}>
              <Link to={`/pokemonApi/detail/${pokemon.name}`}>
                <h1>{pokemon.name}</h1>
              </Link>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                alt={pokemon.name}
              />
              <p>{pokemon.url}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default HomePage;
