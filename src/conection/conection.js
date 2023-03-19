const conectPokeApi = (url) => {
    return fetch("https://pokeapi.co/api/v2/"+url)
        .then((response) => response.json())
}

export {conectPokeApi}