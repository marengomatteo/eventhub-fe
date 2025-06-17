import Header from "@components/header/Header"
import SideBar from "@components/sideBar/SideBar";
import "./styles/profilePage.scss";
import Ticket from "@components/ticket/Ticket";
import Button from "@components/common/button/Button";
import { useState } from "react";
import StaticMap from "@components/common/Mappa/Mappa";
import Logo from "@assets/logo-expanded.png";
const ProfilePage = () => {
    const [showPreviousOrders, setShowPreviousOrders] = useState(false);
    const orders = [
        {
            orderId: "1320242",
            orderDate: "2025-06-17",
            amount: 100,
            eventName: "Evento 1",
            eventDate: "giovedì, 2025-06-17",
            eventTime: "19:00",
            quantity: 1,
            imageUrl: "https://picsum.photos/200",
            location: "Palalpitour Torino",
            name: "Marco",
            surname: "Marconi",
            email: "marco.marconi@gmail.com",
            phone: "1234567890",
        },
        {
            orderId: "1320242",
            orderDate: "2025-06-17",
            amount: 100,
            eventName: "Evento 2",
            eventDate: "giovedì, 2025-06-17",
            eventTime: "19:00",
            quantity: 1,
            imageUrl: "https://picsum.photos/200",
            location: "Palalpitour Torino",
            name: "Marco",
            surname: "Marconi",
            email: "marco.marconi@gmail.com",
            phone: "1234567890",
        }
    ]

    return <>
        <Header showProfileIcon={false} />
        <div className="profile">
            <SideBar />
            <div className="page-content">
                <div className="user">
                    <div className="user-info">MM</div>
                    <div>
                        <div className="user-name">Marco Marconi</div>
                        <div className="user-orders">{orders?.length} {orders?.length == 1 ? "ordine" : "ordini"}</div>
                    </div>
                </div>
                <h2>Il tuo prossimo evento </h2>
                <Ticket order={orders[0]} />
                {!showPreviousOrders && <Button className="seeMore" variant="secondary" label="Vedi ordini precedenti" onClick={() => setShowPreviousOrders(true)} />}
                {showPreviousOrders && (
                    <div className="previous-orders">
                        {orders.slice(1).map((order, index) => (
                            <Ticket key={index} order={order} />
                        ))}
                    </div>
                )}
                <div
                    style={{
                        border: '1px solid #e0e0e0',
                        borderRadius: 12,
                        overflow: 'hidden',
                        width: '100%',
                        background: 'white',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        fontFamily: "'Helvetica', 'Arial', sans-serif",
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            padding: '12px 16px',
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}
                    >
                        <img src={Logo} alt="Logo" style={{ height: '60px', objectFit: 'cover' }} />
                    </div>

                    {/* Order Info */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '12px 16px',
                            borderBottom: '1px solid #f0f0f0',
                        }}
                    >
                        <div>
                            <div style={{ fontSize: 12, color: '#8795a4' }}>Ordine</div>
                            <div style={{ fontWeight: 500 }}>#{orders[0].orderId}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 12, color: '#8795a4' }}>Importo</div>
                            <div style={{ fontWeight: 500 }}>{orders[0].amount}€</div>
                        </div>
                    </div>

                    {/* Event Image */}
                    <div
                        style={{
                            height: 200,
                            backgroundColor: '#f5f7fa',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#8795a4',
                            fontSize: 14,
                        }}
                    >
                        {orders[0].imageUrl ? (
                            <img
                                src={orders[0].imageUrl}
                                alt="Evento"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            'Immagine evento'
                        )}
                    </div>

                    {/* Event Details */}
                    <div style={{ padding: 16 }}>
                        <div style={{ fontWeight: 500, marginBottom: 4 }}>
                            {orders[0].quantity} x {orders[0].eventName}
                        </div>
                        <div
                            style={{
                                color: '#8795a4',
                                fontSize: 14,
                                marginBottom: 16,
                            }}
                        >
                            {orders[0].eventDate} • {orders[0].eventTime}
                        </div>

                        {/* Barcode/QR Code */}
                        <div
                            style={{
                                height: 60,
                                backgroundColor: '#f5f7fa',
                                borderRadius: 4,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#8795a4',
                                fontSize: 12,
                                marginBottom: 16,
                            }}
                        >
                            CODICE A BARRE
                        </div>
                    </div>
                    <StaticMap location={orders[0].location} />

                    {/* Footer */}
                    <div
                        style={{
                            backgroundColor: '#f9fafc',
                            padding: '12px 16px',
                            textAlign: 'center',
                            fontSize: 12,
                            color: '#8795a4',
                            borderTop: '1px solid #f0f0f0',
                        }}
                    >
                        Presenta questo biglietto all'ingresso
                    </div>

                </div>
            </div>
        </div>
    </>;
};

export default ProfilePage;