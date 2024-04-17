import "./App.css";
import HomePage from "./componentes/homePage";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./componentes/landingPage";
import DetailPage from "./componentes/detailPage";
import FormNewPokemon from "./componentes/formPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pokemonApi/home" element={<HomePage />} />
        <Route path="/pokemonApi/form" element={<FormNewPokemon />} />
        <Route path="/pokemonApi/detail/:name" element={<DetailPage />} />
        <Route path="/detail/:pokemonName" component={DetailPage} />
      </Routes>
    </div>
  );
}

export default App;
