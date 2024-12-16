import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, DecimalPipe],
  selector: 'pokemon-card',
  styleUrl: './pokemon-card.component.scss',
  templateUrl: './pokemon-card.component.html',
})
export class PokemonCardComponent {
  pokemon = input.required<Pokemon>();
  selected = model<boolean>(false);

  // PBI #2: Select and deselect
  toggleSelected() {
    this.selected.update((selected) => !selected);
  }
}
