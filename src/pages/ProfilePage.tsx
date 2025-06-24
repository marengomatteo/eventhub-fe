import Ticket from "@components/ticket/Ticket";
import Button from "@components/common/button/Button";
import { useEffect, useState } from "react";
import ProfilePageLayout from "@components/common/profilePageLayout/ProfilePageLayout";
import { useUser } from "@context/UserContext";
import { useRouter } from "@tanstack/react-router";
import { getBaseURL } from "../utils";
import { Order } from "@utils/types";

import "./styles/profilePage.scss";


const ProfilePage = () => {
    const [showPreviousOrders, setShowPreviousOrders] = useState(false);
    const [orders, setOrders] = useState([]);


    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.navigate({ to: "/login" });
        }
    }, [user, router]);


    useEffect(() => {
        if (!user) {
            return;
        }
        const fetchOrders = async () => {
            try {
                const response = await getBaseURL("ticket").get(`/${user.id}`);
                if (response.status === 200) {
                    setOrders(response.data.sort((a: Order, b: Order) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()));
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    }, [user]);

    return <ProfilePageLayout>
        <div className="user">
            <div className="user-info">MM</div>
            <div>
                <div className="user-name">Marco Marconi</div>
                <div className="user-orders">{orders?.length} {orders?.length == 1 ? "ordine" : "ordini"}</div>
            </div>
        </div>
        <h2>Il tuo prossimo evento </h2>
        {orders.length > 0 ? <Ticket order={orders[0]} /> : <div>Non hai ancora acquistato biglietti</div>}
        {!showPreviousOrders && orders.length > 1 && <Button className="seeMore" variant="secondary" label="Vedi ordini precedenti" onClick={() => setShowPreviousOrders(true)} />}
        {showPreviousOrders && orders.length > 1 && (
            <div className="previous-orders">
                {orders.slice(1).map((order, index) => (
                    <Ticket key={index} order={order} />
                ))}
            </div>
        )}

    </ProfilePageLayout>
};

export default ProfilePage;