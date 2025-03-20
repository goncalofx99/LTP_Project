import "./App.css";
import router from "./routing/app.routing";
import { RouterProvider } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <StoreProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </StoreProvider>
  );
}

export default App;
