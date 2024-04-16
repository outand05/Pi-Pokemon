const { Router } = require("express");
const router = Router();
const { Pokemons, Type } = require("../db");
const {getPokemonById} = require('./../ApiDataPokemons/getPokemonById.js')

router.get("/:idPokemon", async (req, res) => {
      const { idPokemon } = req.params;
      try {
        // Verificar si el ID es un UUID
        const isUUID = idPokemon.match(
          /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
        );
    
        const pokemon = isUUID
          ? await Pokemons.findByPk(idPokemon, { include: Type })
          : await getPokemonById(idPokemon);
    
        if (pokemon) {
          res.status(200).json(pokemon);
        } else {
          res.status(404).json({ error: "El Pokémon no existe" });
        }
      } catch (error) {
        res.status(500).json({ error: "Hubo un problema al obtener el Pokémon" });
      }
});
module.exports = router;