// 📍 DETAIL PAGE | en esta vista se deberá mostrar toda la información específica de un pokemon:

// ID.







// Peso (si tiene).
// Tipo.
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemonsDetail } from "./../redux/actions/actions";

const DetailPage = () => {
  const dispatch = useDispatch();
  const { pokemonDetail } = useSelector((state) => state);
  const { name } = useParams();
  console.log(name);
  React.useEffect(() => {
    dispatch(getPokemonsDetail(name));
  }, [dispatch, name]);

  return (
    <div>
      {pokemonDetail && (
        <>
          []
          <p>
            {pokemonDetail.sprites && (
              <img
                src={pokemonDetail.sprites.front_default}
                alt={pokemonDetail.name}
              />
            )}
          </p>
          <h1>{pokemonDetail.name && pokemonDetail.name}</h1>
          <p>
            Vida:{" "}
            {pokemonDetail.stats &&
              (pokemonDetail.stats.find((stat) => stat.stat.name === "hp")
                ?.base_stat ||
                "-")}
          </p>
          <p>
            Ataque:{" "}
            {pokemonDetail.stats &&
              (pokemonDetail.stats.find((stat) => stat.stat.name === "attack")
                ?.base_stat ||
                "-")}
          </p>
          <p>
            Defensa:{" "}
            {pokemonDetail.stats &&
              (pokemonDetail.stats.find((stat) => stat.stat.name === "defense")
                ?.base_stat ||
                "-")}
          </p>
          <p>
            Velocidad:{" "}
            {pokemonDetail.stats &&
              (pokemonDetail.stats.find((stat) => stat.stat.name === "speed")
                ?.base_stat ||
                "-")}
          </p>
          <p>Altura {pokemonDetail.height && pokemonDetail.height}</p>
          <p>Peso {pokemonDetail.weight && pokemonDetail.weight}</p>

          <p>
            Types
            <ul>
              {pokemonDetail.types &&
                pokemonDetail.types.map((typeSlot, index) => (
                  <li key={index}>{typeSlot.type.name}</li>
                ))}
            </ul>
          </p>
        </>
      )}
    </div>
  );
};

export default DetailPage;
