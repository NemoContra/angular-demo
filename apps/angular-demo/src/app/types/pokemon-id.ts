import { OpaqueType } from './opaque-to-record';

export type PokemonId = OpaqueType<string, 'pokemonId'>;
export const PokemonId = (pokemonId: string) => pokemonId as PokemonId;
