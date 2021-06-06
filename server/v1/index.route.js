const { Router } = require('express');
const express = require('express');

const pokemonRoute = require('./pokemon/pokemon.route');

const router = express.Router();

router.get('/health-check', (_req, res) => res.send('OK'));
router.use('/pokemon', pokemonRoute);

module.exports = router;