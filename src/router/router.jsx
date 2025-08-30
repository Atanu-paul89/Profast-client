import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../pages/Shared/ErrorPage";
import Coverage from "../pages/Coverage/Coverage";
import Services from "../pages/Services/Services";

import BeARider from "../pages/Be a Rider/BeARider";
import AboutUs from "../pages/About_Us/AboutUs";
import FaqPage from "../pages/FAQ/FaqPage";
import SignIn from "../Auth/SignIn";
import Register from "../Auth/Register";
import AuthLayout from "../Auth/AuthLayout";
import ForgotPass from "../Auth/ForgotPass";
import CalculateFare from "../pages/Pricing/CalculateFare";
import PrivateRoute from "../Auth/PrivateRoute";
import Pricing from "../pages/Pricing/Pricing";
import AddParcel from "../pages/Pricing/AddParcel";
import ContactUs from "../pages/Contact/ContactUs";
import DashboardLayout from "../dashboard/DashboardLayout";
import MyParcels from "../dashboard/user-merchent/MyParcels";
import MyProfile from "../dashboard/user-merchent/MyProfile";
import Payment from "../Auth/Payment/Payment";
import MyPayments from "../dashboard/user-merchent/MyPayments";

export const router = createBrowserRouter([
  // main layout
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
        Component: Services, //81263 //45689 //01840425475
      },
      {
        path: "pricing",
        element: <PrivateRoute> <Pricing></Pricing> </PrivateRoute>,
      },
      {
        path: "calculate-fare",
        element: <PrivateRoute><CalculateFare></CalculateFare> </PrivateRoute>
      },
      {
        path: "contact-us",
        Component: ContactUs,
      },
      {
        path: "be-a-rider",
        element: <PrivateRoute><BeARider></BeARider> </PrivateRoute>
      },
      {
        path: "aboutus",
        Component: AboutUs,
      },
      {
        path: "faq",
        Component: FaqPage,
      },
    ],
  },

  // error page outcome
  {
    path: "*",
    Component: ErrorPage,
  },

  //authentication page layout 
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "signin",
        Component: SignIn,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "forgot-password",
        Component: ForgotPass,
      },
    ]
  },

  // Dashboard page layout 
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout> </PrivateRoute>,
    children: [
      {
        path: 'my-parcel',
        Component: MyParcels,
      },
      {
        path: 'profile',
        Component: MyProfile,
      },
      {
        path: 'Payment-history',
        Component: MyPayments,
      },
      {
        path: 'payment/:trackingId',
        Component: Payment,
      },
      // ...... mroe will be added .....
    ]
  }
]);