import {
  getPokemonByUserId,
  getUserByPokemonId,
  hasUserPokemon,
} from './get-pokemon-by-user-id';

describe('PokedexHelpers', () => {
  describe('getPokemonByUserId', () => {
    it.each`
      userId                                    | pokemonId
      ${'9951c7aa-84ca-45ea-afa1-9e47c47dd676'} | ${'bulbasaur'}
      ${'200260b7-920a-41b5-9ed2-6375b1e50e69'} | ${'pikachu'}
    `(
      'should return "$userId" for user "$pokemonId"',
      ({ userId, pokemonId }) => {
        expect(getPokemonByUserId(userId)).toEqual(pokemonId);
      }
    );
  });

  describe('getUserByPokemonId', () => {
    it.each`
      pokemonId      | userId
      ${'bulbasaur'} | ${'9951c7aa-84ca-45ea-afa1-9e47c47dd676'}
      ${'pikachu'}   | ${'200260b7-920a-41b5-9ed2-6375b1e50e69'}
    `(
      'should return "$userId" for user "$pokemonId"',
      ({ pokemonId, userId }) => {
        expect(getUserByPokemonId(pokemonId)).toEqual(userId);
      }
    );
  });

  describe('hasUserPokemon', () => {
    it.each`
      userId                                    | pokemonId               | result
      ${'9951c7aa-84ca-45ea-afa1-9e47c47dd676'} | ${'bulbasaur'}          | ${true}
      ${'200260b7-920a-41b5-9ed2-6375b1e50e69'} | ${'pikachu'}            | ${true}
      ${'9951c7aa-84ca-45ea-afa1-9e47c47dd676'} | ${'pikachu'}            | ${false}
      ${'200260b7-920a-41b5-9ed2-6375b1e50e69'} | ${'bulbasaur'}          | ${false}
      ${'someunknownuser'}                      | ${'someunknownpokemon'} | ${false}
    `(
      'should return "$result" for user "$userId" and pokemon "$pokemonId"',
      ({ userId, pokemonId, result }) => {
        expect(hasUserPokemon(pokemonId, userId)).toBe(result);
      }
    );
  });
});
