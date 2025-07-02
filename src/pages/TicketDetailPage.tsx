import locationIcon from "@assets/icons/pin.png";
import StaticMap from "@components/common/Mappa/Mappa";
import ProfilePageLayout from "@components/common/profilePageLayout/ProfilePageLayout";
import { TicketPDF } from "@components/TicketPDF/TicketPDF";
import { useUser } from "@context/UserContext";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useParams } from "@tanstack/react-router";
import { Order } from "@utils/types";
import { useCallback, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { getBaseURL } from "../utils";
import "./styles/ticketDetailPage.scss";

const TicketDetailPage: React.FC<{ order: Order }> = () => {
  const [qrcode, setQrcode] = useState<string | null>(null);
  const { ticketId } = useParams({ from: "/details/$ticketId" });
  const { user } = useUser();

  const [order, setOrder] = useState<Order | null>(null);

  const getOrder = useCallback(() => {
    getBaseURL("ticket")
      .get(`/${user?.id}`)
      .then((response) => {
        const order = response.data.find(
          (order: Order) => order.id === ticketId
        );
        setOrder(order);
      });
  }, [ticketId, user?.id]);

  const getQrCode = useCallback(() => {
    if (!order) return;
    const qrcode = order.id;
    setQrcode(qrcode);
  }, [order]);

  useEffect(() => {
    getOrder();
    getQrCode();
  }, [ticketId]);

  return (
    <ProfilePageLayout>
      {order && (
        <div className="ticket-detail">
          <div className="left-container">
            <img
              className="ticket__img"
              src={"https://picsum.photos/200"}
              alt={order?.eventName}
            />
            <div className="ticket__details">
              <div className="ticket__quantity">1x {order?.eventName}</div>
              <div className="ticket__date">
                {order?.startDate} • {order?.startTime}
              </div>
              <div className="ticket__location">
                <img className="icon-pin" src={locationIcon} />
                {order?.location}
              </div>
              <hr />

              {qrcode && (
                <QRCode
                  value={qrcode}
                  size={200}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H"
                />
              )}
              <div className="order-info">
                Ordine <span>{order?.id}</span> del {"2025-01-01"}
              </div>
              <PDFDownloadLink
                document={<TicketPDF biglietto={{ ...user, ...order }} />}
                fileName={`biglietto-${order?.id}.pdf`}
                className="download-button"
              >
                <i className="icon icon-download"></i>
              </PDFDownloadLink>
            </div>
          </div>
          <div className="right-container">
            {/* Sezione "Come arrivare" con mappa + dati personali */}
            <div className="arrival-section">
              <h2>COME ARRIVARE</h2>
              <StaticMap locationName={order!.location} full />
              <div className="location">
                <img className="icon-pin" src={locationIcon} />
                {order?.location}
              </div>
              <div className="personal-data">
                <h3>Dati personali</h3>
                <p className="personal-data__item">
                  <span>Nome:</span> {user?.name}
                </p>
                <p className="personal-data__item">
                  <span>Cognome:</span> {user?.surname}
                </p>
                <p className="personal-data__item full">
                  <span>Email:</span> {user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {!order && <div className="not-found">Ordine non trovato</div>}
    </ProfilePageLayout>
  );
};

export default TicketDetailPage;
