import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
} from '@angular/core';
import { PokeballComponent } from '../shared/pokeball.component';
import { PokemonStore } from '../+state/pokemon.store';
import { KeyValuePipe } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pokedex',
  styleUrl: './pokedex.component.scss',
  templateUrl: './pokedex.component.html',
  imports: [PokeballComponent, KeyValuePipe],
})
export class PokedexComponent {
  private pokemonStore = inject(PokemonStore);
  expanded = model<boolean>(false);

  pokedex = this.pokemonStore.pokedex;

  toggleExpanded() {
    this.expanded.update((expanded) => !expanded);
  }
}
