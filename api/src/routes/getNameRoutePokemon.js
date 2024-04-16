const { Router } = require("express");
const router = Router();
const { Pokemons } = require("../db");
const { Op } = require("sequelize");
const {
  getPokemonByName,
} = require("./../ApiDataPokemons/getPokemonByName.js");
router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    // Buscar en la base de datos por nombre, independientemente de mayúsculas o minúsculas
    const findNamePokemons = await Pokemons.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`, // Utilizar ILIKE para búsqueda insensible a mayúsculas y minúsculas
        },
      },
    });

    // Si el Pokémon se encuentra en la base de datos o en la API, retornarlo
    if (findNamePokemons.length > 0) {
      res.status(200).json(findNamePokemons);
    } else {
      // Si no se encuentran resultados en la base de datos, buscar en la PokeAPI
      const pokemonFromAPI = await getPokemonByName(name);

      // Si se encuentra el Pokémon en la PokeAPI, devolverlo
      if (!pokemonFromAPI) {
        res.status(404).json({ error: "El Pokémon no fue encontrado" });
      } else {
        // Si no se encuentra el Pokémon en la base de datos ni en la PokeAPI, devolver un error
        res.status(200).json(pokemonFromAPI);
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un problema al obtener el Pokémon" });
  }
});
module.exports = router;
