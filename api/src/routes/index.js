const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const getRoutePokemons = require('./getRoutePokemons')
const idRoutePokemons = require('./idRoutePokemons')
const getNameRoutePokemon = require('./getNameRoutePokemon')
const postRoutePokemon = require('./postRoutePokemon')
const getType = require('./getType')
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', getRoutePokemons);
router.use('/pokemons', idRoutePokemons);
router.use('/pokemon', getNameRoutePokemon)
router.use('/pokemons', postRoutePokemon)
router.use('/types', getType)


module.exports = router;
