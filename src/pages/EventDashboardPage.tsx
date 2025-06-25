import { useEffect, useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { getBaseURL } from "../utils";
import ProfilePageLayout from "@components/common/profilePageLayout/ProfilePageLayout";
import Button from "@components/common/button/Button";
import "./styles/eventDashboard.scss";
import { useUser } from "@context/UserContext";

interface EventData {
  id: string;
  eventName: string;
  startDate: string;
  endDate?: string;
  location: string;
  description: string;
  maxPartecipants: number;
  eventType: string;
}

interface StatsCardProps {
  title: string;
  value: number;
  color: string;
}

interface Feedback {
  id: string;
  userName: string;
  comment: string;
  rating: number;
  date: string;
}

const StatsCard = ({ title, value, color }: StatsCardProps) => (
  <div className="stats-card" style={{ borderTop: `4px solid ${color}` }}>
    <h3>{title}</h3>
    <p className="stats-value">{value}</p>
  </div>
);

const FeedbackItem = ({
  userName,
  comment,
}: {
  userName: string;
  comment: string;
}) => (
  <div className="feedback-item">
    <div className="user-avatar">
      {userName
        .split(" ")
        .map((n) => n[0])
        .join("")}
    </div>
    <div className="feedback-content">
      <h4>{userName}</h4>
      <p>{comment}</p>
    </div>
  </div>
);

const EventDashboardPage = () => {
  const { eventId } = useParams({ strict: false });
  const { user, isLoading: isLoadingUser } = useUser();

  const navigate = useNavigate();
  const [event, setEvent] = useState<EventData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    registrations: 0,
    checkIns: 0,
    absents: 0,
  });
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        // Fetch event details
        const eventResponse = await getBaseURL("event").get(`/${eventId}`);
        if (eventResponse.status === 200) {
          setEvent(eventResponse.data);
        }

        // Fetch event statistics
        const statsResponse = await getBaseURL("event").get(
          `/${eventId}/stats`
        );
        if (statsResponse.status === 200) {
          setStats(statsResponse.data);
        }

        // Fetch feedback
        const feedbackResponse = await getBaseURL("feedback").get(
          `/event/${eventId}`
        );
        if (feedbackResponse.status === 200) {
          setFeedbacks(feedbackResponse.data);
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchEventData();
    }
  }, [eventId]);

  useEffect(() => {
    if (isLoadingUser) return;
    if (!user) {
      navigate({ to: "/login" });
    }
  }, [user, isLoadingUser]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>Evento non trovato</div>;
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("it-IT", options);
  };

  return (
    <ProfilePageLayout>
      <div className="event-dashboard">
        <div className="event-header">
          <h1>{event.eventName}</h1>
          <Button
            variant="secondary"
            label="Modifica"
            icon="pencil"
            onClick={() => navigate({ to: `/events/${eventId}/edit` })}
          />
        </div>

        <div className="event-details">
          <h2>Dati evento</h2>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Data:</span>
              <span className="detail-value">
                {formatDate(event.startDate)}
                {event.endDate && ` - ${formatDate(event.endDate)}`}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Luogo:</span>
              <span className="detail-value">{event.location}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Tipo:</span>
              <span className="detail-value">{event.eventType}</span>
            </div>
            <div className="detail-item full-width">
              <span className="detail-label">Descrizione:</span>
              <p className="detail-value">{event.description}</p>
            </div>
          </div>
        </div>

        <div className="stats-container">
          <StatsCard
            title="ISCRIZIONI"
            value={stats.registrations}
            color="#FFD700" // Gold
          />
          <StatsCard
            title="CHECK IN"
            value={stats.checkIns}
            color="#4CAF50" // Green
          />
          <StatsCard
            title="ASSENTI"
            value={stats.absents}
            color="#FF6B6B" // Red
          />
        </div>

        <div className="feedback-section">
          <div className="section-header">
            <h2>Feedback ({feedbacks.length})</h2>
            <Button
              variant="primary"
              label="Nuovo"
              icon="plus"
              onClick={() => {}}
            />
          </div>

          {feedbacks.length > 0 ? (
            <div className="feedback-list">
              {feedbacks.map((feedback) => (
                <FeedbackItem
                  key={feedback.id}
                  userName={feedback.userName}
                  comment={feedback.comment}
                />
              ))}
            </div>
          ) : (
            <p className="no-feedback">Nessun feedback disponibile</p>
          )}
        </div>
      </div>
    </ProfilePageLayout>
  );
};

export default EventDashboardPage;
