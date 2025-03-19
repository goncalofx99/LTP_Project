import { createBrowserRouter } from "react-router-dom";
import { Homepage } from "../screens/Homepage";
import ProductDetails from "../screens/ProductDetails";
import Cart from "../screens/Cart";
import ErrorPage from "../screens/Cart";
import { RootLayout } from "../components/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      {
        path: "store/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
]);

export default router;
