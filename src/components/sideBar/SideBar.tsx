import { isUserAdmin } from "@context/UserContext";
import { FC, ReactNode, useState } from "react";

/* icons */
import home from "@icons/home.svg";
import profile from "@icons/profile.svg";
import chevron from "@assets/icons/chevron.svg";

import "./styles/index.scss";
import { Link, useRouterState } from "@tanstack/react-router";

const items = [{
    icon: home,
    id: "Home",
    ref: "/"
},
{
    icon: profile,
    id: "profile",
    refs: ["/profile", "/details/"]
}
]

const SideBar: FC<{ showExpanded?: boolean, children?: ReactNode }> = ({ showExpanded = false, children }) => {
    const pathname = useRouterState({ select: (s) => s.location.pathname });

    if (isUserAdmin()) {
        items.push({
            icon: "dashboard.svg",
            id: "dashboard",
            ref: "/dashboard"
        })
        items.push({
            icon: "create-event.svg",
            id: "create-event",
            ref: "/create-event"
        })
    }


    return <div className="sidebar-wrapper">
        <div className="sidebar">
            {items.map((item, index) => {
                const isSelected = item.refs?.some(ref => pathname.startsWith(ref));
                return <Link to={item.ref} className={`item ${isSelected ? "selected" : ""}`} key={index}>
                    <img src={item.icon} />
                </Link>
            })}
        </div>
        {showExpanded && <div className="sidebar-expanded">
            <button className="back-button"> <img src={chevron} /> Torna indietro</button>
            {children}
        </div>}
    </div>
}

export default SideBar;