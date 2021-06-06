const PokemonHelper = require('./pokemon.helper');
const PokedexContainer = require('../../../modules/containers/Pokedex');

async function get(req, res) {
    try {
        const P = req.app.get('pokedex');
        const { id, name } = req.query;
        if (!id && !name) {
            return res.status(400).json({
                message: 'Id or Name is required',
            });
        }
        console.log(id, name);
        const response = await P.getPokemonByName(id || name);
        console.log(response);
        return res.status(200).json({
            message: 'Request successful',
        });
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}

async function home(req, res) {
    try {
        const db = req.app.get('db');
        const offset = parseInt(req.query.offset) || 0;
        const interval = {
            limit: 10,
            offset,
        };
        const pokemons = await PokedexContainer.getPokemonsList(db, interval);
        const pokemonNames = pokemons.results.map((pokemon) => (pokemon.name));
        const generatePokemonsObject = await PokemonHelper.generatePokemonObjectForHomepage(db, pokemonNames, offset);
        return res.status(200).json({
            meta: {
                code: 200,
                message: 'SUCCESS',
            },
            data: {
                pokemons: generatePokemonsObject,
                next_button: {
                    is_next_enabled: pokemons.results.length !== 0,
                    next_offset: offset + 10,
                },
                previous_button: {
                    is_previous_enabled: offset - 10 >= 0,
                    previous_offset: offset - 10,
                },
            },
        });
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}

module.exports = {
    get,
    home,
}