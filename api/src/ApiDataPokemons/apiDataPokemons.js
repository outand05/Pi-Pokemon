const axios = require("axios");

async function apiDataPokemons() {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
    return response.data.results;
  } catch (error) {
    throw Error;
  }
}
module.exports = { apiDataPokemons };
