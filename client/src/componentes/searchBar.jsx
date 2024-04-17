import React, { useState } from "react";
import axios from "axios";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3001/pokemon", {
        params: {
          name: searchTerm,
        },
      });
      setSearchResult(response.data);
      setError(null);
      setSearched(true);
    } catch (error) {
      console.error("Error al buscar Pokémon:", error);
      setSearchResult([]);
      setError(
        "Hubo un problema al buscar el Pokémon. Por favor, inténtalo de nuevo."
      );
      setSearched(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar Pokémon por nombre..."
        />
        <button type="submit">Buscar</button>
      </form>
      {searched && !error && searchResult && searchResult.name && (
        <div>
          <h2>{searchResult.name&&searchResult.name}</h2>
          <p>Base Experience: {searchResult.base_experience&&searchResult.base_experience}</p>
          <p>Altura: {searchResult.height&&searchResult.height}</p>
          <p>"Peso:"{searchResult.weight &&  searchResult.weight}</p>
          <p>
            {searchResult.sprites && (
              <img
                src={searchResult.sprites.front_default}
                alt={searchResult.name}
              />
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
