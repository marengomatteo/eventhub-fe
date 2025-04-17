import { isNotEmpty, useForm } from "@mantine/form";
import { useCallback, useState } from "react";

import searchIcon from "@icons/search.svg";
import locationIcon from "@icons/location.svg";
import LocationSearch from "./LocationSearch";
import { Button, TextInput } from "@mantine/core";
import { useRouter } from "@tanstack/react-router";

interface FormValues {
  eventName: string;
  eventLocation: string;
}

const SearchBar = () => {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<{
    city: string;
    lat: number;
    lng: number;
  } | null>({
    city: "Torino",
    lat: 45.116177,
    lng: 7.742615,
  });

  const form = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      eventName: "",
      eventLocation: "",
    },
    onValuesChange: (values) => {
      console.log(values);
    },
  });

  const handleLocationSelect =
    (/* location: { city: string; lat: number; lng: number } */) => {
      setSelectedLocation({
        city: "Torino",
        lat: 45.116177,
        lng: 7.742615,
      });
    };
  const formSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      const { eventName } = form.getValues();
      e.preventDefault();

      const location = selectedLocation?.city;

      router.navigate({
        to: "/events",
        search: {
          location: location?.trim() !== "" ? location : undefined,
          name: eventName.trim() !== "" ? eventName.trim() : undefined,
        },
      });
    },
    [form, selectedLocation]
  );

  return (
    <form onSubmit={formSubmit} className="search-container">
      <div className="search-input-wrapper">
        <img src={searchIcon} alt="search" className="search-icon" />
        <TextInput
          variant="unstyled"
          {...form.getInputProps("eventName")}
          key={form.key("eventName")}
          placeholder="Cerca eventi..."
          className="search-input"
        />
      </div>
      <div className="search-separator" />
      <div className="search-input-wrapper">
        <img src={locationIcon} alt="location" className="search-icon" />
        <LocationSearch onLocationSelect={handleLocationSelect}>
          <TextInput
            variant="unstyled"
            {...form.getInputProps("eventLocation")}
            key={form.key("eventLocation")}
            placeholder="Cerca luogo..."
            className={`search-input`}
          />
        </LocationSearch>
      </div>
      <button
        className="search-button"
        type="submit"
        disabled={
          !form.getValues().eventName.trim() &&
          !form.getValues().eventLocation.trim()
        }
      >
        <img src={searchIcon} />
      </button>
    </form>
  );
};

export default SearchBar;
