// This is dangerous
const userIdPokemonIdMap: Record<string, string> = {
  '9951c7aa-84ca-45ea-afa1-9e47c47dd676': 'bulbasaur',
  '200260b7-920a-41b5-9ed2-6375b1e50e69': 'pikachu',
};

// This is fine
export const getPokemonByUserId = (userId: string) => {
  return userIdPokemonIdMap[userId];
};

// This has a bug
export const getUserByPokemonId = (id: string) => {
  return userIdPokemonIdMap[id];
};

// This is problematic to refactor
export const hasUserPokemon = (pokemonId: string, userId: string) => {
  return userIdPokemonIdMap[userId] === pokemonId;
};
