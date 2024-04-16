import "./App.css";
import Cards from "./componentes/CardsPokemon";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./componentes/landingPage";

// import LandingPage from './componentes/landingPage'
function App() {
  return (
    <div>
      <Routes>
        <Route path="/pokemonApi/home" element={<Cards />} />
        <Route path="/pokemonApi" element={<LandingPage />} />

      
      </Routes>
    </div>
  );
}

export default App;
