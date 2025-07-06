import { useState, useEffect } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import Header from "@components/header/Header"
import SideBar from "@components/sideBar/SideBar"

import "./ProfilePageLayout.scss";

const ProfilePageLayout = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)');

    // Close sidebar when switching to mobile view
    useEffect(() => {
        if (!isMobile) {
            setIsSidebarOpen(false);
        }
    }, [isMobile]);

    return (
        <>
            <Header onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
            <div className="profile-layout">
                <div className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
                    <SideBar onNavigate={() => setIsSidebarOpen(false)} />
                </div>
                <div className="page-content">
                    {children}
                </div>
                {isSidebarOpen && (
                    <div
                        className="overlay"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
            </div>
        </>
    );
};

export default ProfilePageLayout;
