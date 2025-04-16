import React, { useState } from "react";

type Coordinates = {
  latitude: number;
  longitude: number;
};

type Props = {
  onLocationSelected: (coordinates: Coordinates) => void;
};

const SearchForm: React.FC<Props> = ({ onLocationSelected }) => {
  const [place, setPlace] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!place) {
      setError("Inserisci un luogo.");
      return;
    }

    try {
      // Chiamata a una API di geocodifica (ad esempio, OpenWeatherMap)
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=YOUR_API_KEY`
      );

      if (!response.ok) {
        throw new Error("Errore nel recupero delle coordinate.");
      }

      const data = await response.json();
      const { lat, lon } = data.coord;

      // Passa le coordinate al componente EventList
      onLocationSelected({ latitude: lat, longitude: lon });
      setError("");
    } catch (error) {
      setError("Errore nel recupero delle coordinate. Prova un altro luogo.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Inserisci un luogo"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <button type="submit">Cerca eventi</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SearchForm;
