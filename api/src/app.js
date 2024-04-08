const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const { Pokemons, Type } = require("./db.js");
const { apiDataPokemons } = require("./ApiDataPokemons/apiDataPokemons.js");
const {getPokemonById} = require('./ApiDataPokemons/getPokemonById.js')
const axios = require("axios");


require("./db.js").default;

const server = express();

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);
// server.get("/pokemons", async (req, res) => {
//   //  Obtiene un arreglo de objetos, donde cada objeto es un pokemon con su información.
//   try {
//     const pokemons = await apiDataPokemons();
    
//     res.status(201).json(pokemons);
//   } catch (error) {
    
//     res.status(500).json({ error: "Hubo un problema al obtener los Pokémon." });
//   }
// });
server.get("/pokemons/:idPokemon", async (req, res) => {
  const { idPokemon } = req.params;
  
  try {
    let pokemon;
    
    // Verificar si el ID es un UUID
    const isUUID = idPokemon.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/);
    
    if (isUUID) {
      // Buscar en la base de datos por UUID
      pokemon = await Pokemons.findByPk(idPokemon, { include: Type });
    } else {
      // Si no es un UUID, asumir que es un número natural y buscar en el endpoint
      pokemon = await getPokemonById(idPokemon);
    }
    
    // Si el Pokémon se encuentra en la base de datos o en la API, retornarlo
    if (pokemon) {
      res.status(200).json(pokemon);
    } else {
      // Si no se encontró en la base de datos ni en la API, devolver un error
      res.status(404).json({ error: "El Pokémon no fue encontrado" });
    }
  } catch (error) {
    
    res.status(500).json({ error: "Hubo un problema al obtener el Pokémon" });
  }
});
server.get("/pokemons/name", async (req, res) => {
  // Esta ruta debe obtener todos aquellos pokemons que coinciden con el nombre recibido por query.
  // Debe poder buscarlo independientemente de mayúsculas o minúsculas.
  // Si no existe el pokemon, debe mostrar un mensaje adecuado.
  // Debe buscar tanto los de la API como los de la base de datos.
});
server.post("/pokemons", async (req, res) => {
  //   Esta ruta recibirá todos los datos necesarios para crear un pokemon 
  //y relacionarlo con sus tipos solicitados.
  //   Toda la información debe ser recibida por body.
  //   Debe crear un pokemon en la base de datos, y este debe estar relacionado con sus tipos indicados (debe poder relacionarse al menos con dos).
  try {
    const { name, imagen, vida, ataque, defensa, velocidad, altura, peso, tipo } = req.body;

    if (!tipo || tipo.length < 2) {
      return res.status(400).json({ error: "Debe proporcionar al menos dos tipos para el Pokémon." });
    }

    // Crear los tipos que no existan en la base de datos
    const createdTypes = await Promise.all(tipo.map(async typeName => {
      let existingType = await Type.findOne({ where: { nombre: typeName } });
      if (!existingType) {
        // Si el tipo no existe, créalo
        existingType = await Type.create({ nombre: typeName });
      }
      return existingType;
    }));

    // Crear el Pokémon en la base de datos
    const newPokemon = await Pokemons.create({
      name,
      imagen,
      vida,
      ataque,
      defensa,
      velocidad,
      altura,
      peso,
      tipo
    });

    // Relacionar el Pokémon con los tipos proporcionados (existentes o recién creados)
    await newPokemon.setTypes(createdTypes);

    // Obtener los tipos del nuevo Pokémon
    const tiposDelPokemon = await newPokemon.getTypes();

    // Construir el objeto de respuesta con los tipos incluidos
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
      tipos: tiposDelPokemon.map(tipo => tipo.nombre) // Obtener solo los nombres de los tipos
    };

    res.status(201).json(pokemonResponse);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
server.get("/type", async (req, res) => {
  // Obtiene un arreglo con todos los tipos de pokemones.
  // En una primera instancia, cuando la base de datos este vacía, deberás guardar todos los tipos que encuentres en la API.
  // Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.
});

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
