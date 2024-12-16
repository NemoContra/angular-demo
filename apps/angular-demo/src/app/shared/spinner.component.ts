import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PokeballComponent } from './pokeball.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PokeballComponent],
  selector: 'spinner',
  template: `<pokeball spin="true" />`,
})
export class SpinnerComponent {}
