import { RouteObject } from "react-router-dom";
import { HomeContainer } from "../Pages/home";
import { LoginContainer } from "../Pages/login";
import { RegisterContainer } from "../Pages/register";
import { FairContainer } from "../Pages/fair";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomeContainer />,
  },
  {
    path: "login",
    element: <LoginContainer />,
  },
  {
    path: "register",
    element: <RegisterContainer />,
  },
  {
    path: "fair",
    element: <FairContainer />,
  },
  {
    path: "*",
    element: <HomeContainer />,
  },
];
