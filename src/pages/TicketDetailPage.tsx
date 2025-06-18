import { Order } from "@utils/types";
import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ProfilePageLayout from "@components/common/profilePageLayout/ProfilePageLayout";
import StaticMap from "@components/common/Mappa/Mappa";
import locationIcon from '@assets/icons/pin.png';
import { handleDownload } from "@utils/downloadUtil";

import "./styles/ticketDetailPage.scss";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { TicketPDF } from "@components/TicketPDF/TicketPDF";

const TicketDetailPage: React.FC<{}> = () => {
    const [order, setOrder] = useState<Order | null>(null);
    const [qrcode, setQrcode] = useState<string | null>(null);
    /* finta fetch per recuperare dati da id ordine, dovranno esseree fatti controlli sui permessi dell'utente */
    const { ticketId } = useParams({ from: '/details/$ticketId' });

    const getOrder = (orderId: string) => {
        const order = {
            orderId: orderId,
            orderDate: "2025-06-17",
            amount: 100,
            eventName: "Evento 1",
            eventDate: "giovedì, 2025-06-17",
            eventTime: "19:00",
            quantity: 1,
            imageUrl: "https://picsum.photos/200",
            locationName: "Palalpitour Torino",
            location: "Palalpitour Torino - via Piazza Italia, 1",
            name: "Marco",
            surname: "Marconi",
            email: "marco.marconi@gmail.com",
            phone: "1234567890",
        }
        return order;
    }

    const getQrCode = () => {

        /* false fetch to get qrcode */
        const qrcode = "https://picsum.photos/200";
        setQrcode(qrcode);
    }

    useEffect(() => {
        const order = getOrder(ticketId);
        setOrder(order);
        getQrCode();
    }, [ticketId]);

    return <ProfilePageLayout>
        {order && (
            <div className="ticket-detail">
                <div className="left-container">
                    <img className="ticket__img" src={order?.imageUrl} alt={order?.eventName} />
                    <div className="ticket__details">
                        <div className="ticket__quantity">{order?.quantity} x {order?.eventName}</div>
                        <div className="ticket__date">{order?.eventDate} • {order?.eventTime}</div>
                        <div className="ticket__location"> <img className="icon-pin" src={locationIcon} />{order?.locationName}</div>
                        <hr />
                        {qrcode && <img className="qrCode" src={qrcode} alt="qrcode" />}
                        <div className="order-info">
                            Ordine <span>{order?.orderId}</span> del {order?.orderDate}
                        </div>
                        <PDFDownloadLink
                            document={<TicketPDF biglietto={{ ...order as any }} />}
                            fileName={`biglietto-${order?.orderId}.pdf`}
                            className='download-button'
                        >
                            <i className="icon icon-download"></i>
                        </PDFDownloadLink>
                    </div>


                </div>
                <div className="right-container">
                    {/* Sezione "Come arrivare" con mappa + dati personali */}
                    <div className="arrival-section">
                        <h2>COME ARRIVARE</h2>
                        <StaticMap locationName={order!.locationName} full />
                        <div className="location">
                            <img className="icon-pin" src={locationIcon} />{order?.location}</div>
                        <div className="personal-data">
                            <h3>Dati personali</h3>
                            <p className="personal-data__item">
                                <span>Nome:</span> {order?.name}
                            </p>
                            <p className="personal-data__item">
                                <span>Cognome:</span> {order?.surname}
                            </p>
                            <p className="personal-data__item full"> <span>Email:</span> {order?.email}</p>
                            <p className="personal-data__item full"> <span>Telefono:</span> {order?.phone}</p>
                        </div>
                    </div>
                </div>
            </div>
        )}
        {!order && <div className="not-found">Ordine non trovato</div>}
    </ProfilePageLayout>;
};

export default TicketDetailPage;
