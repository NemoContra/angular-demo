import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonList } from '../models/pokemon-list';
import { mapToPokemon, Pokemon } from '../models/pokemon';
import { map } from 'rxjs';

type GetPokemonParams = {
  limit: number;
  offset: number;
};

const defaultGetPokemonParams: GetPokemonParams = {
  limit: 151,
  offset: 0,
};

@Injectable({ providedIn: 'root' })
export class PokemonService {
  baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  #httpClient = inject(HttpClient);

  getPokemonList(params: GetPokemonParams = defaultGetPokemonParams) {
    return this.#httpClient.get<PokemonList>(this.baseUrl, {
      params,
    });
  }

  getPokemon(name: string) {
    const url = `${this.baseUrl}/${name
      .trim()
      .toLowerCase()
      .replace(/\s/g, '')}`;
    return this.#httpClient
      .get<Pokemon>(url)
      .pipe(map((pokemon) => mapToPokemon(pokemon)));
  }
}
