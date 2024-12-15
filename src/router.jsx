import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home"
import Indonesia from "./pages/Indonesia";
import Programming from "./pages/Programming";
import Covid from "./pages/Covid-19";
import App from "./App";
import Saved from "./pages/Saved";
import SearchResults from "./pages/SearchResult";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/Indonesia",
        element: <Indonesia />,
      },
      {
        path: "Programming",
        element: <Programming />,
      },
      {
        path: "Covid",
        element: <Covid />,
      },
      {
        path: "Saved",
        element: <Saved />,
      },
      {
        path: "search",
        element: <SearchResults />
      }
    ]
  }
]);

export default router;
