const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const { Pokemons, Type } = require("./db.js");
const { Op } = require("sequelize");
const { apiDataPokemons } = require("./ApiDataPokemons/apiDataPokemons.js");
const { getPokemonById } = require("./ApiDataPokemons/getPokemonById.js");
const { getPokemonByName } = require("./ApiDataPokemons/getPokemonByName.js");
const { getPokemonTypes } = require("./ApiDataPokemons/getPokemonType.js");
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
server.get("/pokemons", async (req, res) => {
  //  Obtiene un arreglo de objetos, donde cada objeto es un pokemon con su información.
  try {
    const pokemons = await apiDataPokemons();

    res.status(201).json(pokemons);
  } catch (error) {
    res.status(500).json({ error: "Hubo un problema al obtener los Pokémon." });
  }
});
server.get("/pokemons/:idPokemon", async (req, res) => {
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
server.get("/pokemons/name/query", async (req, res) => {
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
server.post("/pokemons", async (req, res) => {
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
server.get("/type", async (req, res) => {
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
// Obtiene un arreglo con todos los tipos de pokemones.
// En una primera instancia, cuando la base de datos este vacía, deberás guardar todos los tipos que encuentres en la API.
// Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo).
//Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
