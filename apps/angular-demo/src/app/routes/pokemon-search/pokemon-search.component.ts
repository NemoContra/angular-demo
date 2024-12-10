import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonStore } from './+store/pokemon.store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrl: './pokemon-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, JsonPipe],
  providers: [PokemonStore],
})
export default class PokemonSearchComponent {
  private pokemonStore = inject(PokemonStore);

  searchQuery = signal<string>('');
  allPokemons = this.pokemonStore.allPokemons;
  filteredPokemons = this.pokemonStore.filteredPokemons;

  search() {
    this.pokemonStore.setSearchTerm(this.searchQuery());
  }
}
