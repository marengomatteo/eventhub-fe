import React, { useEffect, useState } from "react";

type Event = {
  id: number;
  name: string;
  address: string;
  date: string;
  distance: number;
};

type Coordinates = {
  latitude: number;
  longitude: number;
};

type Props = {
  coordinates: Coordinates;
};

const EventList: React.FC<Props> = ({ coordinates }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `/get-events?lat=${coordinates.latitude}&lon=${coordinates.longitude}`
        );

        if (!response.ok) {
          throw new Error("Errore nel recupero degli eventi.");
        }

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setError("Errore nel recupero degli eventi.");
      } finally {
        setLoading(false);
      }
    };

    if (coordinates.latitude && coordinates.longitude) {
      fetchEvents();
    }
  }, [coordinates]);

  if (loading) {
    return <p>Caricamento eventi...</p>;
  }

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h2>Eventi nelle vicinanze:</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h3>{event.name}</h3>
            <p>{event.address}</p>
            <p>Data: {event.date}</p>
            <p>Distanza: {event.distance.toFixed(2)} km</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
