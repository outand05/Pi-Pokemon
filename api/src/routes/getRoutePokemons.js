const { Router } = require("express");
const router = Router();

const { apiDataPokemons} = require("../ApiDataPokemons/apiDataPokemons");

router.get("/", async (req, res) => {
  try {
    const pokemons = await apiDataPokemons();
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(500).json({ error: "Hubo un problema al obtener los Pokémon." });
  }
});
module.exports = router;



// // Ruta para crear un nuevo Pokémon
// router.post("/", async (req, res) => {
//   try {
//     // Lógica para crear un nuevo Pokémon
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });