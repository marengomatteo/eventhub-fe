import React from 'react';
import './styles/index.scss';

import { PDFDownloadLink } from '@react-pdf/renderer';
import { TicketPDF } from "../TicketPDF/TicketPDF";
import { router } from "@routes/router";
import { Order } from "@utils/types";
import { useUser } from "@context/UserContext";

interface TicketProps {
    order: Order;
}

const Ticket: React.FC<TicketProps> = ({
    order
}) => {
    const { user } = useUser();

    const { id, orderDate = "2025/03/03", eventName, startDate, startTime } = order;
    return (
        <button className="ticket" onClick={() => router.navigate({ to: `/details/${id}` })}>
            <div className="ticket__header">
                <span className="ticket__order-info">Ordine <span className="ticket__order-id">{id}</span> del {orderDate}</span>
            </div>
            <div className="ticket__divider"></div>
            <div className="ticket__content">
                <img
                    src={"https://picsum.photos/200/200"}
                    alt={eventName}
                    className="ticket__image"
                />
                <div className="ticket__details">
                    <div className="ticket__quantity">1x {eventName}</div>
                    <div className="ticket__date">{startDate} • {startTime}</div>
                </div>
                <PDFDownloadLink
                    document={<TicketPDF biglietto={{ ...user as any, ...order as any }} />}
                    fileName={`biglietto-${id}.pdf`}
                    className='ticket__download-button'
                >
                    <span onClick={(e) => e.stopPropagation()}>
                        <i className='icon icon-download'></i>
                        <span>Scarica</span>
                    </span>
                </PDFDownloadLink>
            </div>
        </button>
    );
};

export default Ticket;
