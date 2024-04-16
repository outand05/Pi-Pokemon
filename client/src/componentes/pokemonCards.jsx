import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemons } from "../redux/actions/actions";
import RenderCards from './renderCard'


const Cards = () => {
  const dispatch = useDispatch();
  const { allPokemons } = useSelector((state) => state);
  React.useEffect(() => {
      dispatch(getPokemons());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
  return (
    <div>
      {allPokemons.map((pokemon) => (
  <RenderCards  name={pokemon.name} url={pokemon.url} />
))}
    </div>
  );
};
export default Cards;
