import { createBrowserRouter } from "react-router-dom";
import AppRoot from "../pages/AppRoot/AppRoot";
import HomePage from "../pages/Home/HomePage";
import ShopPage from "../pages/Shop/ShopPage";
import BlogPage from "../pages/BlogPage/BlogPage";
import appLoader from "./appLoader";
import PostPage from "../pages/PostPage/PostPage";
import postPageLoader from "./postPageLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRoot />,
    id: "app-loader",
    loader: appLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ":postSlug",
        element: <PostPage />,
        loader: postPageLoader,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
      {
        path: "blog",
        children: [
          {
            index: true,
            element: <BlogPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
