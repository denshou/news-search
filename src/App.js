import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootElement from "./components/RootElement";
import Like from "./components/Like";
import Search from "./components/Search";


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootElement />,
      children: [
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/like",
          element: <Like />,
        },
      ],
    },
  ]);

  
  return (
    <RouterProvider router={router}>

    </RouterProvider>
  );
}

export default App;
