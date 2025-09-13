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
import TrackingParcel from "../dashboard/user-merchent/TrackingParcel";
import RiderResult from "../dashboard/user-merchent/RiderResult";
import ManageUsers from "../dashboard/admin/ManageUsers";
import RiderApplication from "../dashboard/admin/RiderApplication";
import MerchantNotifications from "../dashboard/user-merchent/MerchantNotifications";
import AdminNotifications from "../dashboard/admin/AdminNotifications";
import PaymentLog from "../dashboard/admin/PaymentLog";
import ActivityLog from "../dashboard/admin/ActivityLog";
import RiderNotifications from "../dashboard/rider/RiderNotifications";
import MessageCenter from "../dashboard/MessageCenter";
import ManageRiders from "../dashboard/admin/ManageRiders";
import ManageParcels from "../dashboard/admin/ManageParcels";
import AssignedParcels from "../dashboard/rider/AssignedParcels";
import RiderEarnings from "../dashboard/rider/RiderEarnings";
import DeliveryHistory from "../dashboard/rider/DeliveryHistory";
import PerformanceStats from "../dashboard/rider/PerformanceStats";
import ReportsAndStats from "../dashboard/admin/Reports & Stats/ReportsAndStats";
// import MigratePayments from "./MigratePayments";

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
        Component: Services, 
      },
      {
        path: "send-parcel",
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
      // temporary route to migrate payment data 
      // {
      //   path: 'migrate-payments',
      //   Component: MigratePayments,
      // },
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
        path: 'Message-center',
        Component: MessageCenter,
      },
      {
        path: 'Payment-history',
        Component: MyPayments,
      },
      {
        path: 'payment/:trackingId',
        Component: Payment,
      },
      {
        path: 'rider-result',
        Component: RiderResult,
      },
      {
        path: 'tracking-parcel',
        Component: TrackingParcel,
      },
      {
        path: 'merc-notifications',
        Component: MerchantNotifications,
      },
      {
        path: 'rider-notifications',
        Component: RiderNotifications,
      },
      {
        path: 'assigned-parcels',
        Component: AssignedParcels,
      },
      {
        path: 'delivery-history',
        Component: DeliveryHistory,
      },
      {
        path: 'earnings',
        Component: RiderEarnings,
      },
      {
        path: 'performance',
        Component: PerformanceStats, 
      },


      // admin path started // 
      {
        path: 'manage-users',
        Component: ManageUsers,
      },
      {
        path: 'rider-applications',
        Component: RiderApplication,
      },
      {
        path: 'payment-logs',
        Component: PaymentLog,
      },
      {
        path: 'activity-log',
        Component: ActivityLog,
      },
      {
        path: 'admn-notifications',
        Component: AdminNotifications,
      },
      {
        path: 'manage-riders',
        Component: ManageRiders,
      },
      {
        path: 'all-parcels',
        Component: ManageParcels,
      },
      {
        path: 'reports',
        Component: ReportsAndStats,
      },
      // {
      //   path: 'admn-messages',
      //   Component: AdminMessageInbox,
      // },
    ]
  }
]);