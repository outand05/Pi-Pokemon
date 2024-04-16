import { GET_POKEMONS_NAME,GET_POKEMONS } from "./actionsType.js";
import axios from "axios";
const URL = "https://pokeapi.co/api/v2/pokemon";

export const getPokemons = ()=>{
  return async (dispatch) =>{
    try {
      const {data} = await axios(URL)
      
      return dispatch({type:GET_POKEMONS,payload:data.results})
    } catch (error) {
      
    }
  }
  
}

export const getPokemonsName = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL}/${name}`)
      const dataName = data.forms.name
      return dispatch({ type: GET_POKEMONS_NAME, payload:dataName  });
    } catch (error) {
        console.error('error GET_POKEMONS_NAME:', error);
        throw error;
    }
  };
};