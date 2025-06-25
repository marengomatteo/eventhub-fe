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
  image: string;
  location: string;
  startDate: string;
  endDate: string;
  startTime: string;
  description?: string;
  eventType?: string;
  agendaId?: string;
}
