export interface Order {
    id: string;
    eventName: string;
    startDate: string;
    startTime: string;
    location: string;
}

export interface Speaker {
    id?: string;
    name: string;
    surname: string;
    email?: string;
    bio?: string;
    company?: string;
}

export interface Session {
    id: string;
    title: string;
    description?: string;
    location?: string;
    startTime: string;
    endTime: string;
    speaker?: Speaker;
}

export interface AgendaResponse {
    id: string;
    eventId: string;
    sessionsList: Session[];
}

export interface Event {
    id: string;
    eventName: string;
    location: string;
    startTime: string;
    endTime: string;
    description: string;
    maxPartecipants: number;
    eventType: string;
    userId: string;
    eventImage?: string;
}

export interface EventListResponse {
    id: string,
    eventName: string,
    startTime: string,
    endTime: string,
    location: string,
    description: string,
    eventImage?: string,
    maxPartecipants: number,
    partecipantsList:
    {
        userId: string,
        name: string,
        surname: string,
        email: string
    }[]
    ,
    eventType: string,
    userId: string
}


export interface StatsCardProps {
    title: string;
    value: number;
    color: string;
}

export interface Feedback {
    id: string;
    userName: string;
    comment: string;
    rating: number;
    date: string;
}
