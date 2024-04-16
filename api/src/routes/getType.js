const { Router } = require("express");
const router = Router();
const { Pokemons, Type } = require("../db");
const {getPokemonTypes}= require('./../ApiDataPokemons/getPokemonType.js')
router.get("/type", async (req, res) => {
    try {
      // Verificar si existen elementos en la base de datos
      const dbTypes = await Type.findAll();
  
      const typesExist = dbTypes.length > 0;
      const apiTypes = await getPokemonTypes();
  
      if (!typesExist) {
        // Si la base de datos está vacía, crear todos los tipos de la API
        await Type.bulkCreate(apiTypes.map(type => ({ nombre: type.nombre })));
        const types = apiTypes.map(type => type.nombre);
        res.json({ types });
        return;
      }
  
      const newTypes = [];
      for (const apiType of apiTypes) {
        const existingType = dbTypes.find(dbType => dbType.nombre === apiType.nombre);
        if (!existingType) {
          // Si no existe en la base de datos, crearlo
          await Type.create({ nombre: apiType.nombre });
          newTypes.push(apiType.nombre);
        }
      }
  
      if (newTypes.length > 0) {
        // Si se crearon nuevos tipos, enviar un mensaje indicando los tipos creados
        res.json({ message: "Nuevos tipos creados:", types: newTypes });
      } else {
        // Si no se crearon nuevos tipos, enviar un mensaje indicando que los tipos ya existen
        const types = dbTypes.map(type => type.nombre);
        res.json({ message: "Los tipos ya existen en la base de datos:",});
      }
    } catch (error) {
      console.error("Error al obtener o guardar tipos de pokémon:", error);
      res.status(500).json({ error: "Error al obtener o guardar tipos de pokémon" });
    }
  });
  module.exports = router;