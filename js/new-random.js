const url = 'https://pokeapi.co/api/v2/pokemon/';

async function randomPokemon() {
  const randomNum = Math.floor(Math.random() * 1010) + 1;

  try {
    const response = await fetch(url + randomNum);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      imgPokemonContainer.innerHTML = 
      `
      <img src="${data.sprites.other['official-artwork'].front_default}" alt="${data.name.charAt(0).toUpperCase()}" data-tilt-z="50">
      <span class="shadow"></span>
      `;
      pokedexContainer.innerHTML = 
      `
      <h2 class="name"> ${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
      <p class="number">#${data.id.toString().padStart(3, '0')}</p>
      <div>
      <div class="type-container">
          <p class="type">${data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1).toLowerCase()}</p>
          ${data.types[1] ? `<p class="type-secondary">${data.types[1].type.name.charAt(0).toUpperCase() + data.types[1].type.name.slice(1).toLowerCase()}</p>` : ''}
      </div>
      <p class="info">Height: ${data.height / 10}m  |  Weight: ${data.weight / 10}kg</p>
      `;
      statsContainer.innerHTML = 
        `
        <div class="stat-row">
            <div class="stat-desc">HP</div>
            <div class="stat-number">${data.stats[0].base_stat}</div>
            <div class="stat-bar">
                <div class="bar-inner" style="width: ${window.innerWidth <= 800 ? data.stats[0].base_stat / 2 + 'px' : data.stats[0].base_stat + 'px'}"></div>
                <div class="bar-outer"></div>
            </div>
        </div>

        <div class="stat-row">
            <div class="stat-desc">ATK</div>
            <div class="stat-number">${data.stats[1].base_stat}</div>
            <div class="stat-bar">
                <div class="bar-inner" style="width: ${window.innerWidth <= 800 ? data.stats[1].base_stat / 2 + 'px' : data.stats[1].base_stat + 'px'}"></div>
                <div class="bar-outer"></div>
            </div>
        </div>

        <div class="stat-row">
            <div class="stat-desc">DEF</div>
            <div class="stat-number">${data.stats[2].base_stat}</div>
            <div class="stat-bar">
                <div class="bar-inner" style="width: ${window.innerWidth <= 800 ? data.stats[2].base_stat / 2 + 'px' : data.stats[2].base_stat + 'px'}"></div>
                <div class="bar-outer"></div>
            </div>
        </div>

        <div class="stat-row">
            <div class="stat-desc">SPD</div>
            <div class="stat-number">${data.stats[5].base_stat}</div>
            <div class="stat-bar">
                <div class="bar-inner" style="width: ${window.innerWidth <= 800 ? data.stats[5].base_stat / 2 + 'px' : data.stats[5].base_stat + 'px'}"></div>
                <div class="bar-outer"></div>
            </div>
        </div>      
        `;

        //backgroundPokemon.classList.add(`bg-${data.types[0].type.name.toLowerCase()}`);
      
        // fondo del screen del color del tipo de pokemon
        const pokemonType = data.types[0].type.name;
        const backgroundColor = typeColors[pokemonType];
        backgroundPokemon.style.backgroundColor = backgroundColor;
    
        // fondo del TYPE del color del tipo de pokemon
        const typeBackground = document.querySelector(".type");
        typeBackground.style.backgroundColor = backgroundColor;
    
    
        // Barras de los stats del color del tipo primario 
        const statBars = document.querySelectorAll(".bar-outer, .bar-inner");
        statBars.forEach(bar => {
            bar.style.backgroundColor = backgroundColor;
        });
    
        // fondo del TYPE SECUNDARIO del color del tipo de pokemon secundario
        const typeBackgroundSec = document.querySelector(".type-secondary");
        const pokemonTypeSec = data.types[1].type.name;
        const backgroundColorSec = typeColors[pokemonTypeSec];
        typeBackgroundSec.style.backgroundColor = backgroundColorSec;

    } else {
      throw new Error('Error en la solicitud');
    }
  } catch (error) {
    console.error('Hubo un error:', error);
  }
}

randomPokemon();
