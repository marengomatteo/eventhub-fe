import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";

import { UserProvider } from "../context/UserContext";

import HomePage from "@pages/HomePage";
import LoginPage from "@pages/LoginPage";

const rootRoute = createRootRoute({
  component: () => (
    <UserProvider>
      <Outlet />
    </UserProvider>
  ),
});

const indexRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  component: HomePage,
});

const loginRoute = createRoute({
  path: "/login",
  getParentRoute: () => rootRoute,
  component: LoginPage,
  /*   beforeLoad: () => {
    const { user } = useUser();
    if (user != null) throw redirect({ to: "/dashboard" });
  }, */
});
/* 
const dashboardRoute = createRoute({
  path: "/dashboard",
  getParentRoute: () => rootRoute,
  component: Dashboard,
  beforeLoad: () => {
    const { authState } = useUser();
    if (authState !== "logged") throw redirect({ to: "/login" });
  },
});
 */
const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  //dashboardRoute,
]);

export const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
