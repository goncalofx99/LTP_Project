import "./App.css";
import router from "./routing/app.routing";
import { RouterProvider } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
function App() {
  return (
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  );
}

export default App;
