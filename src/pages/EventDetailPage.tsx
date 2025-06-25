import { useEffect, useState, useCallback } from "react";
import { useParams } from "@tanstack/react-router";
import StaticMap from "@components/common/Mappa/Mappa";
import { getBaseURL } from "../utils";
import { Event, Session, AgendaResponse } from "../utils/types";
import "./styles/eventDetailPage.scss";
import pinIcon from "@assets/icons/pin.png";
import Header from "@components/header/Header";
import { router } from "@routes/router";
import { useUser } from "@context/UserContext";
import Footer from "@components/footer/Footer";

const EventDetailPage = () => {
    const { eventId } = useParams({ from: '/event/$eventId' });
    const [event, setEvent] = useState<Event | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [confirmPage, setConfirmPage] = useState(false);
    const [sessions, setSessions] = useState<Session[]>([]
    );
    const [isLoadingSessions, setIsLoadingSessions] = useState(false);
    const { user } = useUser();

    const fetchEventAgenda = useCallback(async (eventId: string) => {
        try {
            setIsLoadingSessions(true);
            const response = await getBaseURL("agenda").get<AgendaResponse>(`/${eventId}`);
            if (response.status === 200) {
                setSessions(response.data.sessionsList || []);
            }
        } catch (error) {
            console.error("Error fetching event agenda:", error);
        } finally {
            setIsLoadingSessions(false);
        }
    }, []);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await getBaseURL("event").get(`/list`);
                if (response.status === 200) {
                    const events = response.data;
                    const event = events.find((e: Event) => e.id === eventId);
                    setEvent(event);
                    // Fetch agenda when event is loaded
                    await fetchEventAgenda(eventId);
                }
            } catch (err) {
                console.error("Error fetching event:", err);
                setError("Errore nel caricamento dell'evento");
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvent();
    }, [eventId]);

    if (isLoading) {
        return <div className="event-detail-loading">Caricamento in corso...</div>;
    }

    if (error || !event) {
        return <div className="event-detail-error">{error || "Evento non trovato"}</div>;
    }

    const handleClickBuyTicket = async () => {
        if (!user) {
            router.navigate({ to: "/login" });
            return;
        }
        debugger;
        try {
            getBaseURL("event").patch(`/${eventId}/registration`, {

                "userId": user.id,
                "name": user.name,
                "surname": user.surname,
                "email": user.email

            }).then((response) => {
                if (response.status === 200) {
                    setConfirmPage(true);
                }
            });
        } catch (error) {
            console.error("Error registering for event:", error);
            setError("Errore durante la registrazione per l'evento");
        }
    };

    return (
        <>
            <Header showSearchBar={true} />
            {confirmPage ? <ConfirmationPage /> :
                <div className="event-detail">
                    <div className="event-hero">
                        <div className="event-image-container">
                            <img
                                src={event.image || "https://picsum.photos/1200/600"}
                                alt={event.eventName}
                                className="event-main-image"
                            />
                            <div className="event-overlay">
                                <h1>{event.eventName}</h1>
                                <div className="event-meta">
                                    <div className="meta-item">
                                        <span>{event.startDate}</span>
                                    </div>
                                    {event.startTime && (
                                        <div className="meta-item">
                                            <span>{event.startTime}</span>
                                        </div>
                                    )}
                                    <div className="meta-item">
                                        <img src={pinIcon} alt="Luogo" className="meta-icon" />
                                        <span> {event.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="event-content">
                        <div className="event-description">
                            <h2>Descrizione</h2>
                            <p>{event.description || "Nessuna descrizione disponibile per questo evento."}</p>

                            <div className="event-actions">
                                <button className="buy-button" onClick={handleClickBuyTicket}>
                                    Acquista Biglietto
                                </button>
                            </div>

                            {/* Agenda Section */}
                            <div className="event-agenda">
                                <h2>Agenda</h2>
                                {isLoadingSessions ? (
                                    <p>Caricamento agenda in corso...</p>
                                ) : sessions.length > 0 ? (
                                    <div className="sessions-list">
                                        {sessions.map((session) => (
                                            <div key={session.id} className="session-item">
                                                <h3>{session.title}</h3>
                                                {session.speaker && (
                                                    <p className="session-speaker">
                                                        Relatore: {session.speaker.name} {session.speaker.surname}
                                                    </p>
                                                )}
                                                <p className="session-time">
                                                    {new Date(session.startTime).toLocaleTimeString('it-IT', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })} - {new Date(session.endTime).toLocaleTimeString('it-IT', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                                {session.location && (
                                                    <p className="session-location">
                                                        Luogo: {session.location}
                                                    </p>
                                                )}
                                                {session.description && (
                                                    <p className="session-description">
                                                        {session.description}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>Nessuna sessione in programma.</p>
                                )}
                            </div>
                        </div>

                        <div className="event-location">
                            <h2>Come arrivare</h2>
                            <div className="map-container">
                                <StaticMap locationName={event.location} full />
                            </div>
                            <div className="location-address">
                                <img src={pinIcon} alt="Indirizzo" className="location-icon" />
                                <span>{event.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <Footer />
        </>
    );
};

const ConfirmationPage = () => {
    return (
        <div className="confirmation">
            <h1>Biglietto acquistato con successo!</h1>
            <p>Il tuo biglietto è stato acquistato con successo, vai al tuo <a className="profile_link" href={"/profile"}>profilo</a> per vedere il biglietto.</p>
        </div>
    );
};

export default EventDetailPage;
