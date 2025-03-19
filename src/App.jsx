import "./App.css";
import router from "./routing/app.routing";
import { RouterProvider } from "react-router-dom";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
