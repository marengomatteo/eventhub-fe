import { FC } from "react";

import "./styles/index.scss";

interface EventsSectionProps {
  title: string;
  highlightEvents: {
    name: string;
    image: string;
    date: string;
    location: string;
  }[];
}

const EventsSection: FC<EventsSectionProps> = ({ title, highlightEvents }) => {
  return (
    <div className="highlightEvents-wrapper">
      <h2>{title}</h2>
      <div className="events-container">
        {highlightEvents.map((event) => (
          <div className="event" key={event.name}>
            <div className="event-image">
              <img src={event.image} alt={event.name} />
              <div className="title">
                <span>{event.name}</span>
              </div>
            </div>
            <div className="event-details">
              <div className="event-date">{event.date}</div>
              <div className="event-location">{event.location}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsSection;
