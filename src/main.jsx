import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { AuthLayout, Login } from "./components/index.js";
import AllPosts from "./pages/AllPosts.jsx";
import AddPost from "./pages/AddPost.jsx";
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";
import Signup from "./pages/Signup.jsx";
import Features from "./pages/Features.jsx";
import Pricing from "./pages/Pricing.jsx";
import AffiliateProgram from "./pages/AffiliateProgram.jsx";
import PressKit from "./pages/PressKit.jsx";
import Account from "./pages/Account.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import PrivacySection from "./pages/PrivacySection.jsx";
import Help from "./pages/Help.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import CustomerSupport from "./pages/CustomerSupport.jsx";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import Licensing from "./pages/Licensing.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            {" "}
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
      {
        path: "/features",
        element: <Features />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/affiliate-program",
        element: <AffiliateProgram />,
      },
      {
        path: "/press-kit",
        element: <PressKit />,
      },
      {
        path: "/account",
        element: (
          <AuthLayout authentication>
            <Account />
          </AuthLayout>
        ),
      },
      {
        path: "/change-password",
        element: (
          <AuthLayout authentication>
            <ChangePassword />
          </AuthLayout>
        ),
      },
      {
        path: "/privacy",
        element: (
          <AuthLayout authentication>
            <PrivacySection />
          </AuthLayout>
        ),
      },
      {
        path: "/help",
        element: <Help /> ,
      },
      {
        path: "/contact-us",
        element: <ContactUs /> ,
      },
      {
        path: "/customer-support",
        element: <CustomerSupport /> ,
      },
      {
        path: "/terms",
        element: <TermsAndConditions /> ,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy/> ,
      },
      {
        path: "/license",
        element: <Licensing /> ,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
