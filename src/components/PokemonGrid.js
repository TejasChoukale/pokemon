// src/components/PokemonGrid.js
import React from 'react';
import PokemonCard from './PokemonCard';

function PokemonGrid({ pokemons, setSelectedPokemon }) {
  return (
    <div className="pokemon-grid">
      {pokemons.length > 0 ? (
        pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => setSelectedPokemon(pokemon)}
          />
        ))
      ) : (
        <h3>No Pokémon found!</h3>
      )}
    </div>
  );
}

export default PokemonGrid;
