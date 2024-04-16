import { Link } from "react-router-dom";
const RenderCard = ({ name, url }) => {
  return (
    <div>
      <h1>{name}</h1>
      <Link to={`/detail/${name}`}>
        <h1>{url}</h1>
      </Link>
    </div>
  );
};
export default RenderCard;
