import "./App.css";
import Cards from "./componentes/cardsPokemon";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./componentes/landingPage";
import DetailPage from './componentes/detailPage'
// import LandingPage from './componentes/landingPage'
function App() {
  return (
    <div>
      <Routes>
        <Route path="/pokemonApi/home" element={<Cards />} />
        <Route path="/pokemonApi" element={<LandingPage />} />
        <Route path="/pokemonApi/detail/:name" element={<DetailPage />} />

      
      </Routes>
    </div>
  );
}

export default App;
