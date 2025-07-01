import { User } from "@context/UserContext";
import CreateEventPage from "@pages/CreateEventPage";
import DashboardPage from "@pages/DashboardPage";
import EventDashboardPage from "@pages/EventDashboardPage";
import EventDetailPage from "@pages/EventDetailPage";
import HomePage from "@pages/HomePage";
import LoginPage from "@pages/LoginPage";
import ProfilePage from "@pages/ProfilePage";
import RegisterPage from "@pages/RegisterPage";
import SearchResultsPage from "@pages/SearchResultsPages";
import TicketDetailPage from "@pages/TicketDetailPage";
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  Navigate,
  Outlet,
} from "@tanstack/react-router";

const NotFound = () => {
  return <Navigate to="/" />;
};

// Definiamo il tipo del contesto del router
export interface RouterContext {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
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

const eventDetailRoute = createRoute({
  path: "/event/$eventId",
  getParentRoute: () => rootRoute,
  component: EventDetailPage,
  beforeLoad: ({ params }) => {
    if (!/^[a-zA-Z0-9]+$/.test(params.eventId)) {
      throw new Error("Event id non valido");
    }
  },
});
const ticketDetailRoute = createRoute({
  path: "/details/$ticketId",
  getParentRoute: () => rootRoute,
  component: TicketDetailPage,
  beforeLoad: ({ params }) => {
    if (!/^[a-zA-Z0-9]+$/.test(params.ticketId)) {
      throw new Error("Ticket id non valido");
    }
  },
});

const createEventRoute = createRoute({
  path: "/create-event",
  getParentRoute: () => rootRoute,
  component: CreateEventPage,
});

const dashboardRoute = createRoute({
  path: "/dashboard",
  getParentRoute: () => rootRoute,
  component: DashboardPage,
});
const eventDashboardRoute = createRoute({
  path: "/dashboard/$eventId",
  getParentRoute: () => rootRoute,
  component: EventDashboardPage,
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
});
const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  profileRoute,
  eventDetailRoute,
  ticketDetailRoute,
  createEventRoute,
  dashboardRoute,
  eventDashboardRoute,
  searchResultsRoute,
  notFoundRoute,
]);

export const router = createRouter({
  routeTree,
  context: {
    user: null,
    setUser: () => { },
    isLoading: false,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
