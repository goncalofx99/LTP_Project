import { useParams } from "react-router";
import { getItemDetails } from "../utils/items.service";
import useFetch from "../hooks/useFetch";
export default function ProductDetails() {
  const params = useParams();
  const id = params.id;

  const { data: productDetails, loading: loadingCategories } = useFetch(() =>
    getItemDetails(id)
  );

  return loadingCategories ? (
    <div>
      <h2>Loading Details</h2>
    </div>
  ) : (
    <div>
      <img src={productDetails.thumbnail}></img>
      <p>{ProductDetails.title}</p>
      <p>{productDetails.price}</p>
      <p>{productDetails.description}</p>
    </div>
  );
}
