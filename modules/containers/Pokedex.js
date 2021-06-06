const _ = require('lodash');
const config = require('../../config/config');
const redis = require('../redis/Pokedex');

module.exports = class Pokedex {
    static async getPokemonsList(db, interval) {
        try {
            let data;
            if (config.caching) {
                data = await redis.getPokemonsList(db.redis.read, interval.offset);
                if (!_.isNull(data)) {
                    return JSON.parse(data);
                }
            }
            data = await db.P.getPokemonsList(interval);
            if (data) {
                await redis.setPokemonsList(db.redis.write, interval.offset, data);
            }
            return data;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

    static async getPokemonByName(db, pokemonNamesList, offset) {
        try {
            let data;
            if (config.caching) {
                data = await redis.getPokemonByName(db.redis.read, offset);
                if (!_.isNull(data)) {
                    return JSON.parse(data);
                }
            }
            data = await db.P.getPokemonByName(pokemonNamesList);
            if (data) {
                await redis.setPokemonByName(db.redis.write, offset, data);
            }
            return data;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }

    static async getPokemonSpeciesByName(db, pokemonNamesList, offset) {
        try {
            let data;
            if (config.caching) {
                data = await redis.getPokemonSpeciesByName(db.redis.read, offset);
                if (!_.isNull(data)) {
                    return JSON.parse(data);
                }
            }
            data = await db.P.getPokemonSpeciesByName(pokemonNamesList);
            if (data) {
                await redis.setPokemonSpeciesByName(db.redis.write, offset, data);
            }
            return data;
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }
}