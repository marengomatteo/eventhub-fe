import { Link, useNavigate } from '@tanstack/react-router';
import { EventListResponse } from '@utils/types';
import { FC, useEffect, useState } from 'react';
import ProfilePageLayout from '@components/common/profilePageLayout/ProfilePageLayout';
import { useUser } from '@context/UserContext';
import { getBaseURL } from '../utils';
import { useRouter } from '@tanstack/react-router';

import './styles/DashboardPage.scss';

const DashboardPage: FC = () => {
    const navigate = useNavigate();
    const { user, isLoading: isLoadingUser } = useUser();
    const [events, setEvents] = useState<EventListResponse[]>([]);
    const router = useRouter();

    const handleEventClick = (eventId: string) => {
        navigate({ to: `/dashboard/${eventId}` });
    };

    useEffect(() => {
        /* if (isLoadingUser) return;
        if (!user || user.role !== "ADMIN") {
            router.navigate({ to: "/login" });
            return;
        } */
        const fetchEvents = async () => {
            try {
                const response = await getBaseURL("event").get(`/${user?.id}/list`);
                if (response.status === 200) {
                    const events = response.data;
                    setEvents(events);
                }
            } catch (err) {
                console.error("Error fetching events:", err);
            }
        };
        fetchEvents();
    }, [user, isLoadingUser]);


    return (
        <ProfilePageLayout>
            <div className="dashboardContainer">
                <h1>Your Events</h1>
                <div className="eventsGrid">
                    {events?.map((event) => (
                        <div
                            key={event.id}
                            className="eventCard"
                            onClick={() => handleEventClick(event.id)}
                        >
                            <div className="eventImage">
                                {event.eventImage ? (
                                    <img src={event.eventImage} alt={event.eventName} />
                                ) : (
                                    <div className="imagePlaceholder" />
                                )}
                            </div>
                            <div className="eventInfo">
                                <h3>{event.eventName}</h3>
                                <p>{event.startTime}</p>
                                <p>{event.location}</p>
                            </div>
                        </div>
                    ))}
                    {(!events || events.length === 0) && (
                        <div className="noEvents">
                            <p>Non hai ancora creato eventi.</p>
                            <Link to="/create-event" className="createEventLink">
                                Crea il tuo primo evento
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </ProfilePageLayout>
    );
};

export default DashboardPage;
