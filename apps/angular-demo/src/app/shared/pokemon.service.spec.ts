import { PokemonService } from './pokemon.service';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PokemonService', () => {
  let pokemonService: PokemonService;

  beforeEach(() => {
    pokemonService = TestBed.configureTestingModule({
      providers: [
        PokemonService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).inject(PokemonService);
  });

  describe('baseUrl', () => {
    it('should match the snapshot', () => {
      expect(pokemonService.baseUrl).toMatchSnapshot();
    });

    it('should match the inline snapshot', () => {
      expect(pokemonService.baseUrl).toMatchInlineSnapshot(
        `"https://pokeapi.co/api/v2/pokemon"`
      );
    });
  });
});
