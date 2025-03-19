export default function Item(props) {
  const { image, title, price } = props;

  return (
    <div>
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
