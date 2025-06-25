import "./App.css";
import { useState } from "react";
import { UserProvider, useUser } from "./context/UserContext";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "@routes/router";
import { MantineProvider } from "@mantine/core";

// Componente wrapper per fornire il contesto al router
function AppWithRouter() {
  const { user, setUser, isLoading } = useUser();

  return (
    <RouterProvider
      router={router}
      context={{
        user,
        setUser,
        isLoading,
      }}
    />
  );
}

function App() {
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const handleLocationSelected = (coordinates: {
    latitude: number;
    longitude: number;
  }) => {
    setCoordinates(coordinates);
  };

  return (
    <UserProvider>
      <MantineProvider>
        <AppWithRouter />
      </MantineProvider>
    </UserProvider>
  );
}

export default App;
