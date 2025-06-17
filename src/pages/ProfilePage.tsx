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

            </div>
        </div >
    </>;
};

export default ProfilePage;