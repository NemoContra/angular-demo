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
import { PokemonResponse } from '../../../models/pokemon-response';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  exhaustMap,
  filter,
  forkJoin,
  from,
  materialize,
  merge,
  mergeAll,
  mergeMap,
  pipe,
  switchMap,
  tap,
} from 'rxjs';
import { computed, inject } from '@angular/core';
import { PokemonService } from '../../../shared/pokemon.service';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import {
  PokemonListResponse,
  PokemonListResult,
} from '../../../models/pokemon-list-response';

const pokemonEntityConfig = entityConfig({
  entity: type<PokemonResponse>(),
  collection: '_pokemon',
  selectId: ({ name }) => name,
});

export const PokemonStore = signalStore(
  withState({
    error: undefined as number | undefined,
    allPokemons: [] as PokemonListResult[],
    searchTerm: '',
  }),
  withEntities(pokemonEntityConfig),
  withComputed(({ allPokemons, _pokemonEntities, searchTerm }) => ({
    pokemonNames: computed(() => allPokemons().map(({ name }) => name)),
    filteredPokemons: computed(() =>
      _pokemonEntities().filter(({ name }) => name.includes(searchTerm()))
    ),
  })),
  withMethods((store, pokemonService = inject(PokemonService)) => {
    const getPokemon = pipe(
      exhaustMap((name: string) => pokemonService.getPokemon(name)),
      tapResponse({
        next: (response: PokemonResponse) =>
          patchState(store, addEntity(response, pokemonEntityConfig)),
        error: ({ status }: HttpErrorResponse) =>
          patchState(store, { error: status }),
      })
    );

    return {
      setSearchTerm: (searchTerm: string) => patchState(store, { searchTerm }),
      getPokemon: rxMethod<string>(getPokemon),
      getPokemonList: rxMethod<void>(
        pipe(
          exhaustMap(() => pokemonService.getPokemonList()),
          tapResponse({
            next: ({ results }: PokemonListResponse) =>
              patchState(store, { allPokemons: results }),
            error: ({ status }: HttpErrorResponse) =>
              patchState(store, { error: status }),
          })
        )
      ),
      getPokemons: rxMethod<string[]>(
        pipe(
          filter((names) => names.length > 0),
          mergeMap((names) =>
            forkJoin(names.map((name) => pokemonService.getPokemon(name)))
          ),
          tapResponse({
            next: (res: PokemonResponse[]) =>
              patchState(store, addEntities(res, pokemonEntityConfig)),
            error: ({ status }: HttpErrorResponse) =>
              patchState(store, { error: status }),
          })
        )
      ),
    };
  }),
  withHooks((store) => ({
    onInit: () => {
      store.getPokemonList();
      store.getPokemons(store.pokemonNames);
    },
  }))
);
