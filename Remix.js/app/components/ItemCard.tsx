import { Link } from "@remix-run/react";

interface ItemCardProps {
  image: string;
  title: string;
  price: number;
  id: number;
}

export default function ItemCard(props: ItemCardProps) {
  const { image, title, price, id } = props;

  return (
    <Link to={`/store/${id}`} className="font-inter font-bold text-accent">
      <div>
        <img src={image} className="" alt={title} />
      </div>
      <div>
        <p>{title}</p>
        <p>${price}</p>
      </div>
    </Link>
  );
}
