const axios = require("axios");

async function getPokemonById(id) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

module.exports = { getPokemonById };