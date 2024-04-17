// 📍 FORM PAGE |: en esta vista se encontrará el formulario para crear un nuevo pokemon.

// Este formulario debe ser controlado completamente con JavaScritp. No se pueden utilizar validaciones HTML, ni utilizar librerías especiales para esto. Debe contar con los siguientes campos:

// Nombre.
// Imagen.
// Vida.
// Ataque.
// Defensa.
// Velocidad (si tiene).
// Altura (si tiene).
// Peso (si tiene).
// Posibilidad de seleccionar/agregar varios tipos en simultáneo.
// Botón para crear el nuevo pokemon.
// [IMPORANTE]: es requisito que el formulario de creación esté validado sólo con JavaScript. Puedes agregar las validaciones que consideres. Por ejemplo: que el nombre del pokemon no pueda contener números, o que la defensa no pueda exceder determinado valor, etc.
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addNewPokemon } from "../redux/actions/actions";

const FormNewPokemon = () => {
  const [formData, setFormData] = useState({
    name: "",
    imagen: "",
    vida: "",
    ataque: "",
    defensa: "",
    velocidad: "",
    altura: "",
    peso: "",
  });
  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    async function fetchTypes() {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/type");
        const typesData = response.data.results.map((type) => type.name);
        setTypes(typesData);
      } catch (error) {
        console.error("Error al obtener los tipos de Pokémon:", error);
      }
    }

    fetchTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "tipo") {
      if (checked) {
        setSelectedTypes([...selectedTypes, value]);
      } else {
        setSelectedTypes(selectedTypes.filter((type) => type !== value));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/pokemons",
        { ...formData, tipo: selectedTypes }
      );
      const newPokemon = response.data; // Supongamos que el servidor devuelve el nuevo Pokémon creado
      dispatch(addNewPokemon(newPokemon)); // Llama a la acción para agregar el nuevo Pokémon al estado Redux
    } catch (error) {
      console.error("Error al crear el Pokémon:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Imagen:
        <input
          type="text"
          name="imagen"
          value={formData.imagen}
          onChange={handleChange}
        />
      </label>
      <label>
        Vida:
        <input
          type="text"
          name="vida"
          value={formData.vida}
          onChange={handleChange}
        />
      </label>
      <label>
        Ataque:
        <input
          type="text"
          name="ataque"
          value={formData.ataque}
          onChange={handleChange}
        />
      </label>
      <label>
        Defensa:
        <input
          type="text"
          name="defensa"
          value={formData.defensa}
          onChange={handleChange}
        />
      </label>
      <label>
        Velocidad:
        <input
          type="text"
          name="velocidad"
          value={formData.velocidad}
          onChange={handleChange}
        />
      </label>
      <label>
        Altura:
        <input
          type="text"
          name="altura"
          value={formData.altura}
          onChange={handleChange}
        />
      </label>
      <label>
        Peso:
        <input
          type="text"
          name="peso"
          value={formData.peso}
          onChange={handleChange}
        />
      </label>
      <label>
        Tipos:
        {types.map((type, index) => (
          <div key={index}>
            <input
              type="checkbox"
              name="tipo"
              value={type}
              checked={selectedTypes.includes(type)}
              onChange={handleChange}
            />
            <label>{type}</label>
          </div>
        ))}
      </label>
      <button type="submit">Crear Pokémon</button>
    </form>
  );
};

export default FormNewPokemon;