import {
  createRoute,
  createRouter,
  Navigate,
  Outlet,
  redirect,
  createRootRouteWithContext,
} from "@tanstack/react-router";

import { User } from "@context/UserContext";

import HomePage from "@pages/HomePage";
import LoginPage from "@pages/LoginPage";
import SearchResultsPage from "@pages/SearchResultsPages";
import ProfilePage from "@pages/ProfilePage";
import CreateEventPage from "@pages/CreateEventPage";
import RegisterPage from "@pages/RegisterPage";
import TicketDetailPage from "@pages/TicketDetailPage";

const NotFound = () => {
  return <Navigate to="/" />;
};

// Definiamo il tipo del contesto del router
export interface RouterContext {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Creiamo una route radice con il contesto
const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
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
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({ to: "/" });
    }
  },
});

const registerRoute = createRoute({
  path: "/register",
  getParentRoute: () => rootRoute,
  component: RegisterPage,
});
const profileRoute = createRoute({
  path: "/profile",
  getParentRoute: () => rootRoute,
  component: ProfilePage,
});

const ticketDetailRoute = createRoute({
  path: "/details/$ticketId",
  getParentRoute: () => rootRoute,
  component: TicketDetailPage,
  beforeLoad: ({ params }) => {
    if (!/^\d+$/.test(params.ticketId)) {
      throw new Error("Ticket id non valido");
    }
  },
});
const createEventRoute = createRoute({
  path: "/create-event",
  getParentRoute: () => rootRoute,
  component: CreateEventPage,
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/login" });
    }
  },
});
const notFoundRoute = createRoute({
  path: "*",
  getParentRoute: () => rootRoute,
  component: NotFound,
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
  registerRoute,
  profileRoute,
  ticketDetailRoute,
  createEventRoute,
  searchResultsRoute,
  notFoundRoute,
]);

export const router = createRouter({
  routeTree,
  context: {
    user: null,
    setUser: () => { },
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
