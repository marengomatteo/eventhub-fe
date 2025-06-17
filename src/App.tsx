import "./App.css";
import { useState } from "react";
import { UserProvider } from "./context/UserContext";

import { RouterProvider } from "@tanstack/react-router";
import { router } from "@routes/router";
import { MantineProvider } from "@mantine/core";

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
        {/*  <Header />
      <h1>Cerca eventi vicino a te</h1>
      <SearchForm onLocationSelected={handleLocationSelected} />
      {coordinates && <EventList coordinates={coordinates} />} */}
        {/*         <LoginPage />
         */}
        <RouterProvider router={router} />
      </MantineProvider>
    </UserProvider>
  );
}

export default App;
