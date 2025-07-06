import { FC, ReactNode, useMemo } from "react";


import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { useUser } from "../../context/UserContext";

/* icons */
import chevron from "@assets/icons/chevron.svg";

import "./styles/index.scss";

const SideBar: FC<{ showExpanded?: boolean, children?: ReactNode }> = ({ showExpanded = false, children }) => {
    const router = useRouter();
    const pathname = useRouterState({ select: (s) => s.location.pathname });
    const { user } = useUser();
    const isAdmin = user?.role === "ADMIN";

    const items = useMemo(() => [{
        icon: "icon-home",
        id: "Home",
        refs: ["/"]
    },
    {
        icon: "icon-profile",
        id: "profile",
        refs: ["/profile", "/details/"]
    },
    isAdmin ? {
        icon: "icon-create-event",
        id: "create-event",
        refs: ["/create-event"]
    } : null
    ], [isAdmin]);


    return <div className="sidebar-wrapper">
        <div className="sidebar">
            {items.filter(item => item !== null).map((item, index) => {
                const isSelected = item.refs?.some(ref => ref == "/" ? pathname == "/" : pathname.startsWith(ref));
                return <Link to={item.refs[0]} className={`item ${isSelected ? "selected" : ""}`} key={index}>
                    <i className={item.icon} />
                </Link>
            })}
        </div>
        {showExpanded && <div className="sidebar-expanded">
            <button className="back-button" onClick={() => router.navigate({ to: "/" })}> <img src={chevron} /> Torna alla home</button>
            {children}
        </div>}
    </div>
}

export default SideBar;