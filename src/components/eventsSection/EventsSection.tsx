import { FC } from "react";
import { useRouter } from "@tanstack/react-router";
import "./styles/index.scss";
import { Event } from "../../utils/types";

interface EventsSectionProps {
  title: string;
  highlightEvents: Event[];
}

const EventsSection: FC<EventsSectionProps> = ({ title, highlightEvents }) => {
  console.log(highlightEvents);
  const router = useRouter();

  return highlightEvents.length > 0 ? (
    <div className="highlightEvents-wrapper">
      <h2>{title}</h2>
      <div className="events-container">
        {highlightEvents.map((event, i) => (
          <button className="event" key={event.eventName + i} onClick={() => router.navigate({ to: `/event/${event.id}` })}>
            <div className="event-image">
              <img src={event.eventImage || "https://picsum.photos/300/200"} alt={event.eventName} />
              <div className="title">
                <span>{event.eventName}</span>
              </div>
            </div>
            <div className="event-details">
              <div className="event-location">{event.location}</div>
              <div className="event-date">{new Date(event.startTime).toLocaleString("it-IT", { day: "2-digit", month: "2-digit", year: "numeric" })}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
    :
    <div className="highlightEvents-wrapper">
      <h2>{title}</h2>
      <div className="events-container">
        <p>Nessun evento disponibile</p>
      </div>
    </div>
}

export default EventsSection;
