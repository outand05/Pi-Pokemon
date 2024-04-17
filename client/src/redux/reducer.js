import { GET_POKEMONS,GET_POKEMONS_DETAIL,GET_DB_API ,CLEAN_DETAIL,ADD_NEW_POKEMON} from "./actions/actionsType";
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
        case CLEAN_DETAIL:
          return{
            ...state,
            pokemonDetail: {}
          }
          case ADD_NEW_POKEMON: // Nueva acción para agregar un nuevo Pokémon
      return {
        ...state,
        allPokemons: [...state.allPokemons, action.payload], // Agrega el nuevo Pokémon a la lista existente
      };
    default:
      return { ...state };
  }
};
export default reducer;
