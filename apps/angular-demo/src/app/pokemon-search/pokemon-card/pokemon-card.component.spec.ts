import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { mockPokemons } from '../../testing/mock-data/pokemons';
import { By } from '@angular/platform-browser';

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

  it('should render with initial inputs', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should select the pokemon', () => {
    fixture.componentRef.setInput('selected', true);
    fixture.detectChanges();
    const buttonText = (
      fixture.debugElement.query(By.css('.actions button'))
        .nativeElement as HTMLButtonElement | null
    )?.textContent?.trim();
    expect(buttonText).toEqual('Remove Pokémon');
  });

  it('should deselect the pokemon', () => {
    fixture.componentRef.setInput('selected', false);
    fixture.detectChanges();
    const buttonText = (
      fixture.debugElement.query(By.css('.actions button'))
        .nativeElement as HTMLButtonElement | null
    )?.textContent?.trim();
    expect(buttonText).toEqual('Add Pokémon');
  });

  it('should toggle the selected state', () => {
    const selectedSpy = jest.fn();
    component.selected.subscribe(selectedSpy);
    expect(selectedSpy).not.toHaveBeenCalled();
    fixture.debugElement.query(By.css('.actions button')).nativeElement.click();
    expect(selectedSpy).toHaveBeenCalledWith(true);
  });
});
