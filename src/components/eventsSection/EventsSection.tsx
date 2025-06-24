import { FC } from "react";

import "./styles/index.scss";

interface EventsSectionProps {
  title: string;
  highlightEvents: {
    eventName: string;
    image: string;
    startDate: string;
    location: string;
  }[];
}

const EventsSection: FC<EventsSectionProps> = ({ title, highlightEvents }) => {
  console.log("highlight", highlightEvents);
  return (
    <div className="highlightEvents-wrapper">
      <h2>{title}</h2>
      <div className="events-container">
        {highlightEvents.map((event) => (
          <div className="event" key={event.eventName}>
            <div className="event-image">
              <img src={event.image || "https://picsum.photos/300/200"} alt={event.eventName} />
              <div className="title">
                <span>{event.eventName}</span>
              </div>
            </div>
            <div className="event-details">
              <div className="event-location">{event.location}</div>
              <div className="event-date">{event.startDate}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsSection;
