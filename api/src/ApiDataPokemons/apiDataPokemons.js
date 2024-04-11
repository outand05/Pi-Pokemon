const axios = require("axios");

async function apiDataPokemons() {
  var allPokemons = [];

  async function fetchPokemons(url) {
    try {
      const response = await axios.get(url);
      const data = response.data;

      // Agregar los pokemones de esta página al arreglo
      allPokemons = allPokemons.concat(data.results);

      // Si hay una siguiente página, hacer una solicitud recursiva
      if (data.next) {
        await fetchPokemons(data.next);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Iniciar la solicitud con la URL base
  await fetchPokemons("https://pokeapi.co/api/v2/pokemon");

  return allPokemons;
}
module.exports = { apiDataPokemons };
