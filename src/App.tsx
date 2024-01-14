import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import FormPage from "./pages/FormPage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/form",
      element: <FormPage />,
    },
    {
      path: "/about",
      element: <AboutPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
