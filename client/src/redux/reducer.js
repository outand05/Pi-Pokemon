import { GET_POKEMONS,GET_POKEMONS_DETAIL,GET_DB_API } from "./actions/actionsType";
const initialState = {
  allPokemons: [],
  pokemonDetail: {},
  
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_POKEMONS:
        return {
            ...state,
            allPokemons:action.payload
        }
        case GET_POKEMONS_DETAIL:
        return {
            ...state,
            pokemonDetail:action.payload
        }
        case GET_DB_API:
        return {
            ...state,
            allPokemons:action.payload
        }
    default:
      return { ...state };
  }
};
export default reducer;
