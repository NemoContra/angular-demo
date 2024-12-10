import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonListResponse } from '../models/pokemon-list-response';
import { PokemonResponse } from '../models/pokemon-response';

type GetPokemonParams = {
  limit: number;
  offset: number;
};

const defaultGetPokemonParams: GetPokemonParams = {
  limit: 5,
  offset: 0,
};

@Injectable({ providedIn: 'root' })
export class PokemonService {
  #httpClient = inject(HttpClient);

  getPokemonList(params: GetPokemonParams = defaultGetPokemonParams) {
    return this.#httpClient.get<PokemonListResponse>(
      'https://pokeapi.co/api/v2/pokemon',
      {
        params,
      }
    );
  }

  getPokemon(name: string) {
    const url = `https://pokeapi.co/api/v2/pokemon/${name
      .trim()
      .toLowerCase()
      .replace(/\s/g, '')}`;
    return this.#httpClient.get<PokemonResponse>(url);
  }
}
