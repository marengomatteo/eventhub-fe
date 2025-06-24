export interface Order {
    id: string;
    orderDate: string;
    eventName: string;
    startDate: string;
    startTime: string;
    location: string;
}

export interface Event {
    id: string;
    eventName: string;
    image: string;
    location: string;
    startDate: string;
    endDate: string;
    startTime: string;
}
