import styled from "styled-components";
import imagenFondo from './../assets/imagenes/pokemon_fondoDePantalla.jpg'
export const BodyStyled = styled.body`
  background-image: url(${imagenFondo});
  background-size: cover;
  background-position: center;
  height: 1500px; /* Ajusta la altura según sea necesario */
  margin: 10px; /* Elimina el margen predeterminado del body */
  padding: 0px; /* Elimina el relleno predeterminado del body */
`;
