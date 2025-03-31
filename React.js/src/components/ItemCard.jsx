import { useNavigate } from "react-router-dom";

export default function ItemCard(props) {
  const { image, title, price, id } = props;
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/store/${id}`);
  }

  return (
    <div onClick={handleClick} className="font-inter font-bold text-accent">
      <div>
        <img src={image} className=""></img>
      </div>
      <div>
        <p>{title}</p>
        <p>${price}</p>
      </div>
    </div>
  );
}
