import { PokemonSpeciesGen1, pokemonSpeciesGen1 } from '../../models/pokemon';
import { signal, WritableSignal } from '@angular/core';

export type PokemonSpeciesRecord = Record<
  PokemonSpeciesGen1,
  WritableSignal<boolean>
>;

export const getPokemonSpeciesRecord = () =>
  Object.fromEntries(
    pokemonSpeciesGen1.map((type) => [type, signal(true)])
  ) as PokemonSpeciesRecord;

export const getSelectedPokemonSpecies = (
  pokemonTypeMap: PokemonSpeciesRecord
) =>
  Object.entries(pokemonTypeMap).flatMap(([k, v]) =>
    v() ? [k] : []
  ) as PokemonSpeciesGen1[];
