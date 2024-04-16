const { Router } = require("express");
const router = Router();
const { Pokemons, Type } = require("../db");
router.post("/", async (req, res) => {
    //   Esta ruta recibirá todos los datos necesarios para crear un pokemon
    //y relacionarlo con sus tipos solicitados.
    //   Toda la información debe ser recibida por body.
    //   Debe crear un pokemon en la base de datos, y este debe estar relacionado con sus tipos indicados (debe poder relacionarse al menos con dos).
    try {
      const {
        name,
        imagen,
        vida,
        ataque,
        defensa,
        velocidad,
        altura,
        peso,
        tipo,
      } = req.body;
  
      if (!tipo || tipo.length < 2) {
        return res.status(400).json({
          error: "Debe proporcionar al menos dos tipos para el Pokémon.",
        });
      }
  
      const createdTypes = await Promise.all(
        tipo.map(async (typeName) => {
          const existingType = await Type.findOne({ where: { nombre: typeName } });
          return existingType ? existingType : await Type.create({ nombre: typeName });
        })
      );
  
      const newPokemon = await Pokemons.create({
        name,
        imagen,
        vida,
        ataque,
        defensa,
        velocidad,
        altura,
        peso,
        tipo,
      });
  
      await newPokemon.setTypes(createdTypes);
  
      const tiposDelPokemon = await newPokemon.getTypes();
  
      const pokemonResponse = {
        id: newPokemon.id,
        name: newPokemon.name,
        imagen: newPokemon.imagen,
        vida: newPokemon.vida,
        ataque: newPokemon.ataque,
        defensa: newPokemon.defensa,
        velocidad: newPokemon.velocidad,
        altura: newPokemon.altura,
        peso: newPokemon.peso,
        tipos: tiposDelPokemon.map((tipo) => tipo.nombre),
      };
  
      res.status(201).json(pokemonResponse);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  module.exports = router;