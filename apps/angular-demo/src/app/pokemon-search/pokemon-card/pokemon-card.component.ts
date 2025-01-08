import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { Pokemon, Type } from '../../models/pokemon';
import { DecimalPipe, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { ConcatPipe } from '../../shared/concat.pipe';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, DecimalPipe, TitleCasePipe, ConcatPipe],
  selector: 'pokemon-card',
  styleUrl: './pokemon-card.component.scss',
  templateUrl: './pokemon-card.component.html',
})
export class PokemonCardComponent {
  pokemon = input.required<Pokemon>();
  selected = model<boolean>(false);

  toggleSelected() {
    this.selected.update((selected) => !selected);
  }

  mapType({ type }: Type) {
    return type.name;
  }
}
