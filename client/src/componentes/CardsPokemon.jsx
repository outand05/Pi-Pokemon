import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemons } from "./../redux/actions/actions";
import RenderCards from './RenderCard'


const Cards = () => {
  const dispatch = useDispatch();
  const { allPokemons } = useSelector((state) => state);
  React.useEffect(() => {
      dispatch(getPokemons());
    }, []);
    
  return (
    <div>
      {allPokemons.map((pokemon) => (
  <RenderCards key={pokemon.name} name={pokemon.name} url={pokemon.url} />
))}
    </div>
  );
};
export default Cards;
