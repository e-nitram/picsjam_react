import { useRoutes } from "react-router-dom";
import { Layout } from "../components/organisms";
import {
  Landing,
  Plan,
  Terms,
  Billing,
  SignIn,
  SignUp,
  Profile,
  StripeSuccess
} from "../pages";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Landing />,
        },
        {
          path: "/plan",
          element: <Plan />,
        },
        {
          path: "/terms",
          element: <Terms />,
        },
        {
          path: "/billing",
          element: <Billing />,
        },
        {
          path: "stripe-success",
          element: <StripeSuccess />
        }
      ],
    },
    {
      path: "/",
      children: [
        {
          path: "/signin",
          element: <SignIn />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
  ]);
}
