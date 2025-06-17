import React from 'react';
import './styles/index.scss';

import { handleDownload } from "@utils/downloadUtil.tsx";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { TicketPDF } from "../TicketPDF/TicketPDF";

interface TicketProps {
    order: unknown;
}

const Ticket: React.FC<TicketProps> = ({
    order
}) => {
    const formattedAmount = (order as any).amount.toFixed(2);
    const { orderId, orderDate, amount, eventName, eventDate, eventTime, quantity, imageUrl, location } = order as any;
    return (
        <div className="ticket">
            <div className="ticket__header">
                <span className="ticket__order-info">Ordine <span className="ticket__order-id">{orderId}</span> del {orderDate}</span>
                <span className="ticket__amount">Importo: <span className="ticket__amount-value">{formattedAmount}</span>€</span>
            </div>
            <div className="ticket__divider"></div>
            <div className="ticket__content">
                <img
                    src={imageUrl}
                    alt={eventName}
                    className="ticket__image"
                />
                <div className="ticket__details">
                    <div className="ticket__quantity">{quantity} x {eventName}</div>
                    <div className="ticket__date">{eventDate} • {eventTime}</div>
                </div>
                <PDFDownloadLink
                    document={<TicketPDF biglietto={{ ...order as any }} />}
                    fileName={`biglietto-${orderId}.pdf`}
                    className='ticket__download-button'
                >
                    <i className='icon icon-download'></i>
                    <span>Scarica</span>
                </PDFDownloadLink>
            </div>
        </div>
    );
};

export default Ticket;
