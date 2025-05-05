import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
} from "@tanstack/react-router";

import { UserProvider, useUser } from "../context/UserContext";

import HomePage from "@pages/HomePage";
import LoginPage from "@pages/LoginPage";
import SearchResultsPage from "@pages/SearchResultsPages";
import ProfilePage from "@pages/ProfilePage";
import CreateEventPage from "@pages/CreateEventPage";

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
      if (user != null) throw redirect({ to: "/profile" });
    }, */
});

const profileRoute = createRoute({
  path: "/profile",
  getParentRoute: () => rootRoute,
  component: ProfilePage,
});
const createEventRoute = createRoute({
  path: "/create-event",
  getParentRoute: () => rootRoute,
  component: CreateEventPage,
});

const searchResultsRoute = createRoute({
  path: "/events",
  getParentRoute: () => rootRoute,
  component: SearchResultsPage,
  validateSearch: (search) => {
    return {
      name:
        typeof search.name === "string" && search.name.trim() !== ""
          ? search.name.trim()
          : undefined,

      location:
        typeof search.location === "string" && search.location.trim() !== ""
          ? search.location.trim()
          : undefined,
    };
  },
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
  profileRoute,
  createEventRoute,
  searchResultsRoute,
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
