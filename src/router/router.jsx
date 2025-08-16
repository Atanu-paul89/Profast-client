import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../pages/Shared/ErrorPage";
import Coverage from "../pages/Coverage/Coverage";
import Services from "../pages/Services/Services";
import Pricing from "../pages/Pricing/Pricing";
import BeARider from "../pages/Be a Rider/BeARider";
import AboutUs from "../pages/About_Us/AboutUs";
import FaqPage from "../pages/FAQ/FaqPage";
import SignIn from "../Auth/SignIn";
import Register from "../Auth/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
      },
      {
        path: "services",
        Component: Services, 
      },
      {
        path: "pricing",
        Component: Pricing,
      },
      {
        path: "be-a-rider",
        Component: BeARider,
      },
      {
        path: "aboutus",
        Component: AboutUs,
      },
      {
        path: "faq",
        Component: FaqPage,
      },
      {
        path: "signin",
        Component: SignIn,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  }
]);