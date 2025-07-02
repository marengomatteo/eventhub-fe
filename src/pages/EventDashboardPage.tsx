import { useEffect, useState } from "react";
import { useNavigate, useParams, useRouter } from "@tanstack/react-router";
import { getBaseURL } from "../utils";
import ProfilePageLayout from "@components/common/profilePageLayout/ProfilePageLayout";
import Button from "@components/common/button/Button";
import "./styles/eventDashboard.scss";
import { useUser } from "@context/UserContext";
import { Event, StatsCardProps, Feedback, EventListResponse } from "../utils/types";
import { router } from "@routes/router";

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
  const router = useRouter();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    registrations: 0,
    checkIns: 0,
    absents: 0,
  });
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    if (!eventId) return;
    if (isLoadingUser) return;
    const fetchEventData = async () => {
      try {
        /*         const eventResponse = await getBaseURL("event").get(`/${user?.id}/list`);
                if (eventResponse.status === 200) {
                  setEvent(eventResponse.data.find((e: EventListResponse) => e.id === eventId));
                } */
        setEvent({
          id: eventId!,
          eventName: "",
          location: "",
          startTime: "",
          endTime: "",
          description: "",
          maxPartecipants: 0,
          eventType: "",
          userId: user?.id || "4483494fiefo",
          eventImage: "",
          partecipantsList: [],
        });
        /*         const statsResponse = await getBaseURL("event").get(
                  `/${eventId}/stats`
                );
                if (statsResponse.status === 200) {
                  setStats(statsResponse.data);
                } */

        setStats({
          registrations: 0,
          checkIns: 0,
          absents: 0,
        });

        /*        const feedbackResponse = await getBaseURL("feedback").get(
                 `/event/${eventId}`
               );
               if (feedbackResponse.status === 200) {
                 setFeedbacks(feedbackResponse.data);
               } */
        setFeedbacks([]);
      } catch (error) {
        console.error("Error fetching event data:", error);
      } finally {
        setIsLoading(false);
      }
    };


    if (eventId) {
      fetchEventData();
      console.log("Event data fetched", event);
    }
  }, [eventId, user, isLoadingUser]);

  useEffect(() => {
    /*  if (isLoadingUser) return;
     if (!user || user.role !== "ADMIN") {
       router.navigate({ to: "/login" });
     } */
  }, [user, isLoadingUser]);



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
        {event ? <><div className="event-header">
          <h1>{event.eventName}</h1>
          <button
            className="edit-button"
            onClick={() => navigate({ to: `/events/${eventId}/edit` })}
          >Modifica <i className="icon-edit icon-size-small"></i></button>
        </div>
          <div className="event-details">
            <h2>Dati evento</h2>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Data:</span>
                <span className="detail-value">
                  {formatDate(event.startTime)}
                  {event.endTime && ` - ${formatDate(event.endTime)}`}
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
              <button
                className="edit-button"
                onClick={() => { }}
              >Nuovo <i className="icon-add"></i></button>
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
        </> : isLoading ? <div>Caricamento...</div> : <div>Evento non trovato</div>}
      </div>
    </ProfilePageLayout>
  );
};

export default EventDashboardPage;
