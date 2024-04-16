import { Link } from "react-router-dom";
const RenderCard = ({ name, url }) => {
  return (
    <div>
      <Link to={`/pokemonApi/detail/${name}`}>
      <h1>{name}</h1>
      </Link>
        <h1>{url}</h1>
    </div>
  );
};
export default RenderCard;
