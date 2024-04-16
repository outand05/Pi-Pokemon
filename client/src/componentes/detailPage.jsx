// 📍 DETAIL PAGE | en esta vista se deberá mostrar toda la información específica de un pokemon:

// ID.
// Nombre.
// Imagen.
// Vida.
// Ataque.
// Defensa.
// Velocidad (si tiene).
// Altura (si tiene).
// Peso (si tiene).
// Tipo.
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemonsDetail } from "./../redux/actions/actions";

const DetailPage = () => {
  const {name} = useParams();
  const dispatch = useDispatch();
  const { pokemonDetail } = useSelector((state) => state);

  React.useEffect(() => {
    dispatch(getPokemonsDetail(name));
  }, []);

  return (
    <div>
      {pokemonDetail && (
        <div>
          <h1>Nombre: {pokemonDetail.name}</h1>
          {/* Agrega aquí el resto de la información del Pokémon */}
        </div>
      )}
    </div>
  );
};

export default DetailPage;
