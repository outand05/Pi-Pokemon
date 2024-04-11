const axios = require("axios");

async function getPokemonTypes() {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/type");
    const types = response.data.results.map(type => ({ nombre: type.name }));
    return types;
  } catch (error) {
    console.error("Error al obtener tipos de pokémon:", error);
    throw error;
  }
}


module.exports = { getPokemonTypes };
