interface Biglietto {
    orderId: string;
    orderDate: string;
    amount: number;
    eventName: string;
    eventDate: string;
    eventTime: string;
    quantity: number;
    imageUrl: string;
    location: string;
}

export declare const handleDownload: (biglietto: Biglietto) => void;
