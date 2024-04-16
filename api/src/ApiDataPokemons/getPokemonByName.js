// Importa Axios
const axios = require('axios');

// Definir la función getPokemonByName
async function getPokemonByName(name) {
  try {
    // Convertir el nombre del Pokémon a minúsculas
    console.log('Nombre del Pokémon:', name)
    const lowercaseName = name.toLowerCase();
    
    // Construir la URL de la solicitud
    const url = `https://pokeapi.co/api/v2/pokemon/${lowercaseName}`;
    
    // Realizar la solicitud GET a la PokeAPI
    const response = await axios.get(url);
    
    // Devolver los datos del Pokémon encontrado
    return response.data;
  } catch (error) {
    // Manejar cualquier error que ocurra durante la solicitud
    console.error('Error al buscar el Pokémon:', error);
    throw error; // Lanza el error para que pueda ser manejado externamente
  }
}

// Exportar la función getPokemonByName para que pueda ser utilizada en otros archivos
module.exports = { getPokemonByName };