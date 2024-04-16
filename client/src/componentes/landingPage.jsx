// LANDING PAGE | deberás crear una página de inicio o bienvenida con:

// Alguna imagen de fondo representativa al proyecto.
// Botón para ingresar a la home page.
import { Button } from "./../styledComponents/styledComp";
import {BodyStyled} from './../styledComponents/styledLandingPage'
import { Link } from "react-router-dom";
import React from "react";
const LandingPage = () => {
  return (
    <BodyStyled>
      <Link to={"/pokemonApi/home"}>
        <Button>Home</Button>
      </Link>
    </BodyStyled>
  );
};
export default LandingPage;
