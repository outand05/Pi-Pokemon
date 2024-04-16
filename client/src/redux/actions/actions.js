import { GET_POKEMONS_DETAIL, GET_POKEMONS } from "./actionsType.js";
import axios from "axios";
const URL = "https://pokeapi.co/api/v2/pokemon";

export const getPokemons = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(URL);

      return dispatch({ type: GET_POKEMONS, payload: data.results });
    } catch (error) {}
  };
};

export const getPokemonsDetail = (name) => {
  return async (dispatch) => {
    try {
      const  {data} = await axios(`${URL}/${name}`)
        return dispatch({ type: GET_POKEMONS_DETAIL, payload: data });
      ;
    } catch (error) {
      console.error("error GET_POKEMONS_DETAIL:", error);
      throw error;
    }
  };
};
