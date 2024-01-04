import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import FormPage from "./pages/FormPage";
import AboutPage from "./pages/AboutPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/form">Form</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
        </div>
      ),
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
