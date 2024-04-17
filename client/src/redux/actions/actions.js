import { GET_POKEMONS_DETAIL, GET_POKEMONS,GET_DB_API, CLEAN_DETAIL,ADD_NEW_POKEMON} from "./actionsType.js";
import axios from "axios";
const URL = "https://pokeapi.co/api/v2/pokemon";
const API_URL_DB = "http://localhost:3001/pokemons";

export const getPokemons = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(URL);

      return dispatch({ type: GET_POKEMONS, payload: data.results });
    } catch (error) {
      console.error("error GET_POKEMONS:", error);
      throw error;
    }
  };
};

export const getPokemonsDetail = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios(`${URL}/${name}`);
      const pokemonData = response.data;
      return dispatch({ type: GET_POKEMONS_DETAIL, payload: pokemonData });
    } catch (error) {
      console.error("error GET_POKEMONS_DETAIL:", error);
      throw error;
    }
  };
};
export const getDbApiPokemon = () => {
  return async (dispatch) => {
    try {
      const response = await axios(API_URL_DB);
      const data = response.data
      return dispatch({ type: GET_DB_API, payload: data });
    }
     catch (error) {
      console.error("error GET_DB_API:", error);
      throw error;
    }
  };
};
export const cleanDetail = () =>{
  return {type:CLEAN_DETAIL}
}
export const addNewPokemon = (newPokemon) => {
  return {
    type: ADD_NEW_POKEMON,
    payload: newPokemon,
  };
};
