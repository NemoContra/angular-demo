import { createComponentFactory } from '@ngneat/spectator';
import { PokedexComponent } from './pokedex.component';

describe('PokedexComponent', () => {
  const component = createComponentFactory({
    component: PokedexComponent,
  });

  it('should render the pokedex', () => {
    const spectator = component();
    expect(spectator.fixture).toMatchSnapshot();
  });
});
