export type PokemonId = string & { __type: 'pokemonId' };
export const PokemonId = (pokemonId: string) => pokemonId as PokemonId;
