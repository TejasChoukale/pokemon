// src/components/Modal.js
import React from 'react';

function Modal({ pokemon, onClose }) {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>{pokemon.name}</h2>
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          className="modal-img"
        />
        <p><strong>Height:</strong> {pokemon.height}</p>
        <p><strong>Weight:</strong> {pokemon.weight}</p>
        <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
        <div>
          <strong>Types:</strong>{' '}
          {pokemon.types.map((typeInfo) => typeInfo.type.name).join(', ')}
        </div>
      </div>
    </div>
  );
}

export default Modal;
