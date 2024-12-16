export const mockPokemons = [
  {
    name: 'bulbasaur',
    id: 1,
    height: 6,
    weight: 69,
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    },
    types: [
      {
        slot: 1,
        type: {
          name: 'grass',
          url: 'https://pokeapi.co/api/v2/type/12/',
        },
      },
      {
        slot: 2,
        type: {
          name: 'poison',
          url: 'https://pokeapi.co/api/v2/type/4/',
        },
      },
    ],
  },
  {
    name: 'charmander',
    id: 4,
    height: 6,
    weight: 85,
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
    },
    types: [
      {
        slot: 1,
        type: {
          name: 'fire',
          url: 'https://pokeapi.co/api/v2/type/10/',
        },
      },
    ],
  },
  {
    name: 'squirtle',
    id: 7,
    height: 5,
    weight: 90,
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
    },
    types: [
      {
        slot: 1,
        type: {
          name: 'water',
          url: 'https://pokeapi.co/api/v2/type/11/',
        },
      },
    ],
  },
  {
    name: 'pikachu',
    id: 25,
    height: 4,
    weight: 60,
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    },
    types: [
      {
        slot: 1,
        type: {
          name: 'electric',
          url: 'https://pokeapi.co/api/v2/type/13/',
        },
      },
    ],
  },
];
