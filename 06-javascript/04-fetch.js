const pokemonColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#ea7ce8',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

// Add your code here
const createNewElement = function(data) {

  const { name: pokemonName, types} = data;
  const { front_default : pokemonImage } = 
    data.sprites.other['official-artwork'];

  const pokemonTypesArray = types.map(item => item.type.name);

  const card = document.createElement('div');
  const h2 =  document.createElement('h2');
  const img =  document.createElement('img');
  const typesDiv =  document.createElement('div');

  //start assigning elements from the data to the new element
  h2.textContent = pokemonName; 

  img.src = pokemonImage;
  img.alt = pokemonName;
  img.width = '240';
  img.height = '240';

  pokemonTypesArray.map(item => {
    //use span elements to put the types next to each other
    const span = document.createElement('span');
    span.textContent = item;
    span.style.backgroundColor = pokemonColors[item];
    span.setAttribute('class', 'pokemonType');
    typesDiv.append(span);
  });

  card.setAttribute('class', 'pokemonCard');

  card.append(h2, img, typesDiv);

  return card;
}

const fetchData = async function() {
  const url = 'https://pokeapi.co/api/v2/pokemon/bulbasaur';

  const pokeList = document.querySelector('.poke-list');

  try {
    const response = await fetch(url);
    const bodyData = await response.json();

    console.log(bodyData);

    const elem = createNewElement(bodyData);
    pokeList.append(elem);
  }
  catch (error) {
    console.error('Error fetching data from the PokeAPI', error);
    const errorElement = document.createElement('p');
    errorElement.textContent = 'Error fetching data from the PokeAPI';
    errorElement.setAttribute('class', 'errorMessage');
    pokeList.append(errorElement);
  }
  finally {
    console.log("executes either way");
    //Make the loading symbol go away when we are done loading pokemon
    const loading = document.querySelector('.loading-container');
    loading.setAttribute('class', 'display-none');
  }
}

const fetchDataAll = async function() {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=25&offset=0';

  const pokeList = document.querySelector('.poke-list');

  try {
    const response = await fetch(url);
    const data = await response.json();

    const pokemonList = data.results;

    const promises = pokemonList.map(pokemon => 
      fetch(pokemon.url)
        .then((response) => response.json())
        .catch((error) => console.error('an error occurred:', error)),
    );

    const pokemonData = await Promise.all(promises);

    console.log(pokemonData);

    pokemonData.forEach(pokemon => {
      const elem = createNewElement(pokemon);
      pokeList.append(elem);
    })

  }
  catch (error) {
    console.error('Error fetching data from the PokeAPI', error);
    const errorElement = document.createElement('p');
    errorElement.textContent = 'Error fetching data from the PokeAPI';
    errorElement.setAttribute('class', 'errorMessage');
    pokeList.append(errorElement);
  }
  finally {
    console.log("executes either way");
    //Make the loading symbol go away when we are done loading pokemon
    const loading = document.querySelector('.loading-container');
    loading.setAttribute('class', 'display-none');
  }
}

fetchDataAll();

const searchInput = document.querySelector('.navbar-search');
searchInput.addEventListener('input', (entry) => {
  const value = entry.target.value.toLowerCase();
  const pokemons = document.querySelectorAll('.pokemonCard');
  //Using similar logic from exercise 2, check the name and
  //all the types against the search term.
  pokemons.forEach(pokemon => {
    const cardText = pokemon.textContent.toLowerCase();
    pokemon.style.display = 
      cardText.includes(value) ? 'block' : 'none';
  });
});