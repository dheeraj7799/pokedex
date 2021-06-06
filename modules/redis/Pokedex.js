module.exports = class Pokedex {
    static getPokemonsList(client, offset) {
        return client.getAsync(`POKEDEX_LIST:${offset}`);
    }

    static setPokemonsList(client, offset, data) {
        return client.setAsync(`POKEDEX_LIST:${offset}`, JSON.stringify(data), 'Ex', 60 * 60 * 24); // * 24 hours
    }

    static getPokemonByName(client, offset) {
        return client.getAsync(`POKEDEX_BY_NAME_LIST:${offset}`);
    }

    static setPokemonByName(client, offset, data) {
        return client.setAsync(`POKEDEX_BY_NAME_LIST:${offset}`, JSON.stringify(data), 'Ex', 60 * 60 * 24); // * 24 hours
    }

    static getPokemonSpeciesByName(client, offset) {
        return client.getAsync(`POKEDEX_SPECIES_BY_NAME_LIST:${offset}`);
    }

    static setPokemonSpeciesByName(client, offset, data) {
        return client.setAsync(`POKEDEX_SPECIES_BY_NAME_LIST:${offset}`, JSON.stringify(data), 'Ex', 60 * 60 * 24); // * 24 hours
    }
}