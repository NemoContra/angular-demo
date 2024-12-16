import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
} from '@angular/core';
import { PokeballComponent } from '../shared/pokeball.component';
import { PokemonStore } from '../+state/pokemon.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'pokedex',
  styleUrl: './pokedex.component.scss',
  templateUrl: './pokedex.component.html',
  imports: [PokeballComponent],
})
export class PokedexComponent {
  private pokemonStore = inject(PokemonStore);
  expanded = model<boolean>(false);

  // PBI #5: Render pokedex
  pokedex = this.pokemonStore.pokedex;

  toggleExpanded() {
    this.expanded.update((expanded) => !expanded);
  }
}
