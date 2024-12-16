import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { mockPokemons } from '../../testing/mock-data/pokemons';

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pokemon', mockPokemons[0]);
    fixture.componentRef.setInput('selected', false);
    fixture.detectChanges();
  });

  it.todo('should render with initial inputs');

  it('should select the pokemon', () => {
    fixture.componentRef.setInput('selected', true);
    // detect changes
    // query the button text
    const buttonText = '';
    expect(buttonText).toEqual('Remove Pokémon');
  });

  it('should deselect the pokemon', () => {
    fixture.componentRef.setInput('selected', false);
    // detect changes
    // query the button text
    const buttonText = '';
    expect(buttonText).toEqual('Add Pokémon');
  });

  it('should toggle the selected state', () => {
    const selectedSpy = null as any; // create a spy
    component.selected.subscribe(selectedSpy);

    // expect that spy has not been called yet
    // interaction
    // expect that spy has been called with boolean value true
  });
});
