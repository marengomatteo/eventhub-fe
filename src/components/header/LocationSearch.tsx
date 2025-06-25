import { FC } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { ReactNode } from "@tanstack/react-router";

const libraries: "places"[] = ["places"];

interface LocationSearchProps {
  onLocationSelect: (location: {
    city: string;
    lat: number;
    lng: number;
  }) => void;
  children: ReactNode | Promise<ReactNode>;
}

const LocationSearch: FC<LocationSearchProps> = ({ children }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) return children;

  return children;
};

export default LocationSearch;
