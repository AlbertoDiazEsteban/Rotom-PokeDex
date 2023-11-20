const typeColors = {
    "dark": "#79767a",
    "normal": "#d1cfcf",
    "fire": "#f5a66e",
    "water": "#accff6",
    "grass": "#a3ed7f",
    "electric": "#f7dd77",
    "ice": "#c7f6f6",
    "fighting": "#f66059",
    "poison": "#e167e1",
    "ground": "#ead498",
    "flying": "#b3cdf6",
    "psychic": "#f6a1a2",
    "bug": "#e0ef59",
    "rock": "#ebdcaf",
    "ghost": "#a08cbf",
    "dragon": "#a37efa",
    "steel": "#dadaf1",
    "fairy": "#f7d2df"
  };
const pokemonCells = document.querySelectorAll('.pokemon-cell');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');

let offset = 1;
const limit = pokemonCells.length;

prevPageButton.addEventListener('click', () => {
    if (offset > 1) {
        offset -= limit;
        updatePagination();
    }
});

nextPageButton.addEventListener('click', () => {
    offset += limit;
    updatePagination();
});

async function fetchPokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await response.json();
    return data;
}

async function updatePagination() {
    for (let i = 0; i < limit; i++) {
        const cell = pokemonCells[i];
        cell.innerHTML = '';
    }

    for (let i = offset; i < offset + limit; i++) {
        const pokemon = await fetchPokemon(i);
        createPokemon(pokemon, i - offset);
    }
}

function createPokemon(pokemon, cellIndex) {
    const cell = pokemonCells[cellIndex];

    // Verificar si la celda existe antes de realizar cualquier operación
    if (cell) {
        const card = document.createElement('div');
        card.classList.add('pokemon-block');

        // SPRITE
        const sprite = document.createElement('img');
        sprite.src = pokemon.sprites.other['official-artwork'].front_default;
        //pokeball blanca QUE GIRA
        const pkb = document.createElement('img');
        pkb.classList.add('whiteball')
        pkb.src = 'whiteball.svg';
        // TIPO Y COLOR
        const pokemonType = pokemon.types[0].type.name;
        const backgroundColor = typeColors[pokemonType];
        card.style.backgroundColor = backgroundColor;

        card.appendChild(sprite);
        cell.appendChild(card);
        card.appendChild(pkb);
    }
}



// Inicializa la paginación
updatePagination();



