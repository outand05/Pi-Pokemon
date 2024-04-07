const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const { Pokemons, Type } = require("./db.js");
const { apiDataPokemons } = require("./ApiDataPokemons/apiDataPokemons.js");

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
  // Esta ruta obtiene el detalle de un pokemon específico. Es decir que devuelve un objeto con la información pedida en el detalle de un pokemon.
  // El pokemon es recibido por parámetro (ID).
  // Tiene que incluir los datos del tipo de pokemon al que está asociado.
  // Debe funcionar tanto para los pokemones de la API como para los de la base de datos.
});
server.get("/pokemons/name", async (req, res) => {
  // Esta ruta debe obtener todos aquellos pokemons que coinciden con el nombre recibido por query.
  // Debe poder buscarlo independientemente de mayúsculas o minúsculas.
  // Si no existe el pokemon, debe mostrar un mensaje adecuado.
  // Debe buscar tanto los de la API como los de la base de datos.
});
server.post("/pokemons", async (req, res) => {
  //   Esta ruta recibirá todos los datos necesarios para crear un pokemon y relacionarlo con sus tipos solicitados.
  //   Toda la información debe ser recibida por body.
  //   Debe crear un pokemon en la base de datos, y este debe estar relacionado con sus tipos indicados (debe poder relacionarse al menos con dos).
  try {
    const { name, imagen, vida, Ataque, Defensa, Velocidad, Altura, Peso } =
      req.body;
      // if (!tipos || tipos.length < 2) {
      //   return res.status(400).json({ error: "Debe proporcionar al menos dos tipos para el Pokémon." });
      // }
    const newPokemon = await Pokemons.create({
      name,
      imagen,
      vida,
      Ataque,
      Defensa,
      Velocidad,
      Altura,
      Peso,
    });
    await newPokemon.setTypes(req.body.tipos);
    res.status(201).json(newPokemon);
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
