// src/components/PokemonCard.js
import React from 'react';

function PokemonCard({ pokemon, onClick }) {
  return (
    <div className="pokemon-card" onClick={onClick}>
      <img
        src={
          pokemon.sprites.other['official-artwork'].front_default ||
          'https://via.placeholder.com/150'
        }
        alt={pokemon.name}
      />
      <h3>{pokemon.name}</h3>
      <p>ID: {pokemon.id}</p>
      <div>
        {pokemon.types.map((typeInfo) => (
          <span key={typeInfo.slot} className="type-badge">
            {typeInfo.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;
