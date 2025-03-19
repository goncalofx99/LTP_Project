import { useNavigate } from "react-router-dom";

export default function Item(props) {
  const { image, title, price, id } = props;
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/store/${id}`);
  }

  return (
    <div onClick={handleClick}>
      <div>
        <img src={image}></img>
      </div>
      <div>
        <p>{title}</p>
        <p>{price}</p>
      </div>
    </div>
  );
}
