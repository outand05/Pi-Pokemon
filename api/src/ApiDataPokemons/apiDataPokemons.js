const axios = require("axios");

async function apiDataPokemons() {
  const API_URL = "https://pokeapi.co/api/v2/pokemon";
  
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  
}
module.exports = { apiDataPokemons };
