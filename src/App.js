// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import PokemonGrid from './components/PokemonGrid';
import Pagination from './components/Pagination';
import Modal from './components/Modal';
import Footer from './components/Footer'; // add this at top




function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 12;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await response.json();
        const results = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );
        setPokemonList(results);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Pokémon:', err);
        setError(true);
        setLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  const filteredPokemon = pokemonList.filter((pokemon) => {
    const nameMatch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatch = selectedType === '' || pokemon.types.some((t) => t.type.name === selectedType);
    return nameMatch && typeMatch;
  });

  const indexOfLast = currentPage * pokemonsPerPage;
  const indexOfFirst = indexOfLast - pokemonsPerPage;
  const currentPokemons = filteredPokemon.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPokemon.length / pokemonsPerPage);

  const allTypes = Array.from(
    new Set(
      pokemonList.flatMap((pokemon) => pokemon.types.map((t) => t.type.name))
    )
  );

  if (loading) return <h2>Loading Pokémon...</h2>;
  if (error) return <h2>Error loading Pokémon 😞</h2>;

  return (
    <div className="app">
      <h1>Pokémon Explorer</h1>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        allTypes={allTypes}
      />

      <PokemonGrid
        pokemons={currentPokemons}
        setSelectedPokemon={setSelectedPokemon}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      {selectedPokemon && (
        <Modal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
