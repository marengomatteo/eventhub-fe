import { FC, useState } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
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

const LocationSearch: FC<LocationSearchProps> = ({
  onLocationSelect,
  children,
}) => {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();

      if (place.geometry?.location) {
        const city =
          place.address_components?.find(
            (component) =>
              component.types.includes("locality") ||
              component.types.includes("administrative_area_level_1")
          )?.long_name || "";

        onLocationSelect({
          city,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    }
  };

  if (!isLoaded) return children;

  return (
    /*    <Autocomplete
      onLoad={onLoad}
      onPlaceChanged={onPlaceChanged}
      options={{
        types: ["(cities)"],
        componentRestrictions: { country: "it" },
      }}
    >
      <input 
        type="text" 
        placeholder="Cerca luogo..." 
        className={`search-input ${className}`}
      />
    </Autocomplete> */
    children
  );
};

export default LocationSearch;
