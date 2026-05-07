// @ts-ignore
import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router";
import Loadable from "src/layouts/full/shared/loadable/Loadable";

const FullLayout = Loadable(lazy(() => import("../layouts/full/FullLayout")));
const BlankLayout = Loadable(lazy(() => import("../layouts/blank/BlankLayout")));

// Main Pages
const Dashboard = Loadable(lazy(() => import("../views/dashboards/Dashboard")));
const Typography = Loadable(lazy(() => import("../views/typography/Typography")));
const Table = Loadable(lazy(() => import("../views/tables/Table")));
const Form = Loadable(lazy(() => import("../views/forms/Form")));
const Alert = Loadable(lazy(() => import("../views/alerts/Alerts")));
const Solar = Loadable(lazy(() => import("../views/icons/Solar")));
const SamplePage = Loadable(
  lazy(() => import("../views/sample-page/SamplePage"))
);

// Auth Pages
const Login = Loadable(lazy(() => import("../views/auth/login/Login")));
const Register = Loadable(
  lazy(() => import("../views/auth/register/Register"))
);
const Error = Loadable(lazy(() => import("../views/auth/error/Error")));

// DummyJSON Pages
const Products = Loadable(lazy(() => import("../views/products/Products")));
const Users = Loadable(lazy(() => import("../views/users/Users")));
const Posts = Loadable(lazy(() => import("../views/posts/Posts")));

// Search Page
const Search = Loadable(lazy(() => import("../views/Search/SearchPage")));

const Router = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/ui/typography", element: <Typography /> },
      { path: "/ui/table", element: <Table /> },
      { path: "/ui/form", element: <Form /> },
      { path: "/ui/alert", element: <Alert /> },
      { path: "/icons/solar", element: <Solar /> },
      { path: "/sample-page", element: <SamplePage /> },

      // DummyJSON Routes
      { path: "/products", element: <Products /> },
      { path: "/users", element: <Users /> },
      { path: "/posts", element: <Posts /> },

      // Search Route
      { path: "/search", element: <Search /> },

      // Fallback
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },

  {
    path: "/",
    element: <BlankLayout />,
    children: [
      { path: "/auth/login", element: <Login /> },
      { path: "/auth/register", element: <Register /> },
      { path: "/auth/404", element: <Error /> },
      { path: "404", element: <Error /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
];

const router = createBrowserRouter(Router);

export default router;