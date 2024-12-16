import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PokedexComponent } from '../pokedex/pokedex.component';
import { ClickOutsideDirective } from '../shared/click-outside.directive';

@Component({
  selector: 'header-menu',
  template: `
    <header>
      <nav>
        <pokedex
          [(expanded)]="isPokedexExpanded"
          (clickOutside)="isPokedexExpanded.set(false)"
        />
      </nav>
    </header>
  `,
  styles: [
    `
      header {
        position: fixed;
        width: 100%;
        z-index: 99;
        background-color: rgba(53, 110, 177, 0.9);
        height: var(--header-height, 50px);
        display: grid;
        place-items: center end;
      }

      nav {
        margin-inline: 16px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PokedexComponent, ClickOutsideDirective],
})
export class HeaderMenuComponent {
  isPokedexExpanded = signal(false);
}
