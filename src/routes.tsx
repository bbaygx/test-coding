import { createBrowserRouter } from "react-router-dom";
import RootLayouts from "./app/root/RootLayouts";
import Home from "./app/root/Home";
import AuthLayouts from "./app/auth/AuthLayouts";
import SignIn from "./app/auth/SignIn";
import SignUp from "./app/auth/SignUp";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayouts />,
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);
