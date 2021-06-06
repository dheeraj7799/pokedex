const express = require('express');

const pokemonController = require('./pokemon.controller.js')

const router = express.Router();

router.get('/get', pokemonController.get);
router.get('/home', pokemonController.home);

module.exports = router;