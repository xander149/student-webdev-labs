const pokemons = [
  { id: 1, name: 'Bulbasaur', types: ['Grass', 'Poison'] },
  { id: 2, name: 'Ivysaur', types: ['Grass', 'Poison'] },
  { id: 3, name: 'Venusaur', types: ['Grass', 'Poison'] },
  { id: 4, name: 'Charmander', types: ['Fire'] },
  { id: 5, name: 'Charmeleon', types: ['Fire'] },
  { id: 6, name: 'Charizard', types: ['Fire', 'Flying'] },
  { id: 7, name: 'Squirtle', types: ['Water'] },
  { id: 8, name: 'Wartortle', types: ['Water'] },
  { id: 9, name: 'Blastoise', types: ['Water'] },
  { id: 10, name: 'Caterpie', types: ['Bug'] },
  { id: 11, name: 'Metapod', types: ['Bug'] },
  { id: 12, name: 'Butterfree', types: ['Bug', 'Flying'] },
  { id: 13, name: 'Weedle', types: ['Bug', 'Poison'] },
  { id: 14, name: 'Kakuna', types: ['Bug', 'Poison'] },
  { id: 15, name: 'Beedrill', types: ['Bug', 'Poison'] },
  { id: 16, name: 'Pidgey', types: ['Normal', 'Flying'] },
  { id: 17, name: 'Pidgeotto', types: ['Normal', 'Flying'] },
  { id: 18, name: 'Pidgeot', types: ['Normal', 'Flying'] },
  { id: 19, name: 'Rattata', types: ['Normal'] },
  { id: 20, name: 'Raticate', types: ['Normal'] },
];

const sortPokemons = function logSortedPokemons(sortType) {
  const sortedPokemons = [];
  // Add your code here
  const [sortKey, sortDirection] = str.split(",", 2);
  sortKey = sortKey.trim().toLower();
  sortDirection = sortDirection.trim().toLower();

  switch (sortKey)
  {
    case "alphabetically":
      switch (sortDirection)
      {
        case "ascending":
          //by default, strings are 
          sortedPokemons = pokemons.toSorted((a,b), a.name.LocalCompare(b.name));
          break;

        case "descending":
          sortedPokemons = pokemons.toSorted((a,b), b.name.LocalCompare(a.name));
          break;

        default:
          console.error("Invalid sort direction: must use ascending or descending. Sort direction used: ", sortDirection)
          throw new Error("Execution halted due to invalid sort direction")
      }
      break;

    case "numerically":
      switch (sortDirection) 
      {
        case "ascending":
          sortedPokemons = pokemons.toSorted((a,b), a.id - b.id);
          break;

        case "descending":
          sortedPokemons = pokemons.toSorted((a,b), b.id - a.id);
          break;
          
        default:
          console.error("Invalid sort direction: must use ascending or descending. Sort direction used: ", sortDirection)
          throw new Error("Execution halted due to invalid sort direction")
      }
      break;
    default:
      console.error("Invalid sort key type: must use alphabetically or numerically. Sort key used: ", sortKey);
      throw new Error("Execution halted due to invalid sort type")
  }
  return sortedPokemons;
};

console.log(sortPokemons('numerically, in ascending order'));
console.log(sortPokemons('numerically, in descending order'));
console.log(sortPokemons('alphabetically, in ascending order'));
console.log(sortPokemons('alphabetically, in descending order'));
