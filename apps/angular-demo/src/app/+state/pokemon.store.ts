import {
  patchState,
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  addEntities,
  addEntity,
  entityConfig,
  withEntities,
} from '@ngrx/signals/entities';
import { Pokemon, PokemonSpeciesGen1 } from '../models/pokemon';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, filter, forkJoin, pipe, switchMap, tap } from 'rxjs';
import { computed, inject } from '@angular/core';
import { PokemonService } from '../shared/pokemon.service';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { PokemonList, PokemonListResult } from '../models/pokemon-list';
import { PokemonFilter } from '../models/pokemon-filter';
import { Pokedex } from '../models/pokedex';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

const pokemonEntityConfig = entityConfig({
  entity: type<Pokemon>(),
  collection: '_pokemon',
  selectId: ({ name }) => name,
});

type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

export const PokemonStore = signalStore(
  { providedIn: 'root' },
  withDevtools('pokemon'),
  withState({
    error: undefined as number | undefined,
    allPokemons: [] as PokemonListResult[],
    searchTerm: '',
    filter: {} as PokemonFilter,
    status: {
      getPokemonList: 'idle' as RequestStatus,
      getPokemons: 'idle' as RequestStatus,
    },
    pokedex: {} as Pokedex,
  }),
  withEntities(pokemonEntityConfig),
  withComputed(
    ({ allPokemons, _pokemonEntities, searchTerm, filter, status }) => ({
      pokemonNames: computed(() => allPokemons().map(({ name }) => name)),
      pokemons: computed(() =>
        _pokemonEntities()
          .filter(({ name }) =>
            name.includes(searchTerm().trim().toLowerCase())
          )
          .filter((pokemon) => {
            const species = filter().species;
            if (species) {
              return pokemon.types.find(({ type: { name } }) =>
                species.includes(name as PokemonSpeciesGen1)
              );
            }
            return true;
          })
      ),
      pokemonsLoading: computed(() => status.getPokemons() === 'loading'),
    })
  ),
  withMethods((store, pokemonService = inject(PokemonService)) => {
    const getPokemon = pipe(
      exhaustMap((name: string) => pokemonService.getPokemon(name)),
      tapResponse({
        next: (response: Pokemon) =>
          patchState(store, addEntity(response, pokemonEntityConfig)),
        error: ({ status }: HttpErrorResponse) =>
          patchState(store, { error: status }),
      })
    );

    return {
      setSearchTerm: (searchTerm = '') => patchState(store, { searchTerm }),
      getPokemon: rxMethod<string>(getPokemon),
      getPokemonList: rxMethod<void>(
        pipe(
          tap(() =>
            patchState(store, {
              status: {
                ...store.status(),
                getPokemonList: 'loading',
                getPokemons: 'loading',
              },
            })
          ),
          exhaustMap(() => pokemonService.getPokemonList()),
          tapResponse({
            next: ({ results }: PokemonList) =>
              patchState(store, {
                allPokemons: results,
                status: { ...store.status(), getPokemonList: 'success' },
              }),
            error: ({ status }: HttpErrorResponse) =>
              patchState(store, {
                status: { ...store.status(), getPokemonList: 'error' },
                error: status,
              }),
          })
        )
      ),
      getPokemons: rxMethod<string[]>(
        pipe(
          filter((names) => names.length > 0),
          switchMap((names) =>
            forkJoin(names.map((name) => pokemonService.getPokemon(name)))
          ),
          tapResponse({
            next: (res: Pokemon[]) => {
              patchState(store, addEntities(res, pokemonEntityConfig), {
                status: { ...store.status(), getPokemons: 'success' },
              });
            },
            error: ({ status }: HttpErrorResponse) =>
              patchState(store, {
                status: { ...store.status(), getPokemons: 'error' },
                error: status,
              }),
          })
        )
      ),
      setFilter: (filter: PokemonFilter) => patchState(store, { filter }),
      updatePokedex: ({
        name,
        selected,
      }: {
        name: string;
        selected: boolean;
      }) =>
        patchState(store, {
          pokedex: { ...store.pokedex(), [name]: selected },
        }),
      resetPokedex: () => patchState(store, { pokedex: {} }),
    };
  }),
  withHooks((store) => ({
    onInit: () => {
      store.getPokemonList();
      store.getPokemons(store.pokemonNames);
    },
  }))
);
