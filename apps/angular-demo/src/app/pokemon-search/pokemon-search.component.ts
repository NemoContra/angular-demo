import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonStore } from '../+state/pokemon.store';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { SpinnerComponent } from '../shared/spinner.component';
import { KeyValuePipe, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import {
  getPokemonSpeciesRecord,
  getSelectedPokemonSpecies,
} from './common/pokemon-species-helpers';
import { Pokemon } from '../models/pokemon';
import { HeaderMenuComponent } from '../header/header-menu.component';
import { mockPokemons } from '../testing/mock-data/pokemons';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    PokemonCardComponent,
    SpinnerComponent,
    TitleCasePipe,
    KeyValuePipe,
    HeaderMenuComponent,
    NgOptimizedImage,
  ],
  providers: [PokemonStore],
  selector: 'pokemon-search',
  styleUrl: './pokemon-search.component.scss',
  templateUrl: './pokemon-search.component.html',
})
export default class PokemonSearchComponent {
  mockPokemon = mockPokemons[0];

  private pokemonStore = inject(PokemonStore);

  searchQuery = signal<string>('');

  pokemons = this.pokemonStore.pokemons;
  pokemonsLoading = this.pokemonStore.pokemonsLoading;

  pokedex = this.pokemonStore.pokedex;

  pokemonSpecies = signal(getPokemonSpeciesRecord());
  selectedSpecies = computed(() =>
    getSelectedPokemonSpecies(this.pokemonSpecies())
  );

  search() {
    this.pokemonStore.setSearchTerm(this.searchQuery());
    this.pokemonStore.setFilter({
      species: this.selectedSpecies(),
    });
  }

  reset() {
    this.searchQuery.set('');
    this.pokemonSpecies.set(getPokemonSpeciesRecord());
    this.search();
    this.pokemonStore.resetPokedex();
  }

  updatePokedex({ name }: Pokemon, selected: boolean) {
    this.pokemonStore.updatePokedex({ name, selected });
  }
}
