import { isUserAdmin } from "@context/UserContext";
import { FC, ReactNode, useMemo } from "react";

/* icons */
import chevron from "@assets/icons/chevron.svg";

import "./styles/index.scss";
import { Link, useRouter, useRouterState } from "@tanstack/react-router";


const SideBar: FC<{ showExpanded?: boolean, children?: ReactNode }> = ({ showExpanded = false, children }) => {
    const router = useRouter();
    const pathname = useRouterState({ select: (s) => s.location.pathname });
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
    isUserAdmin() ? {
        icon: "icon-dashboard",
        id: "dashboard",
        refs: ["/dashboard"]
    } : null,
    isUserAdmin() ? {
        icon: "icon-create-event",
        id: "create-event",
        refs: ["/create-event"]
    } : null
    ], [isUserAdmin()]);


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