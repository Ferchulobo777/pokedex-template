import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from '../contexts/UserContext';

import axios from 'axios';

import PokemonCard from '../components/PokemonCard';

import { usePagination } from '../hooks/usePagination';

const getAllPokemons = async () => {
  try {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon/');

    return res.data.results;
  } catch (error) {
    console.error(error);
  }
};

const Pokedex = () => {
  const { user } = useContext(UserContext);

  const [pokemons, setPokemons] = useState([]);

  const pokemonsPagination = usePagination(pokemons, 10);

  const loadAllPokemons = async () => {
    const allPokemons = await getAllPokemons();

    setPokemons(allPokemons);
  };

  useEffect(() => {
    loadAllPokemons();
  }, []);

  return (
    <div className="w-full p-5">
      <p>
        <span className="text-red-500 font-semibold">Bienvenido {user}, </span>
        aqui podras encontrar tu pokemon favorito
      </p>

      <div className="flex flex-row gap-2">
        {pokemonsPagination.pages.map((page) => (
          <button key={page} onClick={() => pokemonsPagination.changePageTo(page)}>
            {page}
          </button>
        ))}
      </div>

      <section>
        {pokemonsPagination.listSlice.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonData={pokemon} />
        ))}
      </section>
    </div>
  );
};

export default Pokedex;
