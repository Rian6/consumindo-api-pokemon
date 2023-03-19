import { conectPokeApi } from "../conection/conection"

const buscarPokemon = (pokemon) => {
    return conectPokeApi("pokemon/" + pokemon)
}

export {
    buscarPokemon
}