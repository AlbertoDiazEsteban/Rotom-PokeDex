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
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Pokemon:', error);
        throw error; // Propaga el error para que puedas manejarlo en otro lugar si es necesario
    }
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
        // Buscar una tarjeta existente dentro de la celda
        const existingCard = cell.querySelector('.pokemon-block');

        if (existingCard) {
            // Si ya hay una tarjeta, simplemente actualiza su contenido
            const sprite = existingCard.querySelector('img');
            sprite.src = pokemon.sprites.other['official-artwork'].front_default;

            // Actualiza el tipo y color
            const pokemonType = pokemon.types[0].type.name;
            const backgroundColor = typeColors[pokemonType];
            existingCard.style.backgroundColor = backgroundColor;
        } else {
            // Si no hay una tarjeta existente, crea una nueva
            const card = document.createElement('div');
            card.classList.add('pokemon-block');
            card.key = pokemon.id; // Asigna una clave única basada en el ID del Pokémon

            // SPRITE
            const sprite = document.createElement('img');
            sprite.src = pokemon.sprites.other['official-artwork'].front_default;

            // Pokeball blanca que gira
            const pkb = document.createElement('img');
            pkb.classList.add('whiteball');
            pkb.src = 'whiteball.svg';

            // TIPO Y COLOR
            const pokemonType = pokemon.types[0].type.name;
            const backgroundColor = typeColors[pokemonType];
            card.style.backgroundColor = backgroundColor;

            card.appendChild(sprite);
            card.appendChild(pkb);
            
            // Agrega la tarjeta a la celda
            cell.appendChild(card);
        }
    }
}





// Inicializa la paginación
updatePagination();



