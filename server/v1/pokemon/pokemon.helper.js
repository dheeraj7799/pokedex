const PokedexContainer = require('../../../modules/containers/Pokedex');

function getImagesRecursively(sprites, key, arr) {
    for (const objectKey in sprites) {
        if (objectKey === key) {
            arr = [ ...arr, sprites[objectKey]];
        }
        if (typeof sprites[objectKey] === 'object' && sprites[objectKey] && objectKey !== 'versions') {
            const images = getImagesRecursively(sprites[objectKey], key, arr);
            arr = [...images];
        }
    }
    return arr;
}

function getSvgLink(sprites) {
    const images = getImagesRecursively(sprites, 'front_default', []);
    const findsvg = images.filter((image) => image.endsWith('svg'));
    if (findsvg && findsvg.length) {
        return findsvg[0];
    }
    return images[0];
}

async function generatePokemonObjectForHomepage(db, pokemonNamesList, offset) {
    try {
        const pokemonsList = await PokedexContainer.getPokemonByName(db, pokemonNamesList, offset);
        const pokemonSpeciesList = await PokedexContainer.getPokemonSpeciesByName(db, pokemonNamesList, offset);

        // console.log(pokemonSpeciesList);
        let pokemons = pokemonsList.map((pokemon, index) => ({
            name: pokemon.name,
            link: getSvgLink(pokemon.sprites),
            color: pokemonSpeciesList[index].color.name,
        }));
        console.log(pokemons);
        return pokemons;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}

module.exports = {
    generatePokemonObjectForHomepage,
}