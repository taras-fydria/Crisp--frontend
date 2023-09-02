import { createBrowserRouter } from "react-router-dom";
import AppRoot from "../pages/AppRoot/AppRoot";
import HomePage from "../pages/Home/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRoot />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
