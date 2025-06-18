import Header from "@components/header/Header"
import SideBar from "@components/sideBar/SideBar"

const ProfilePageLayout = ({ children }: { children: React.ReactNode }) => {
    return <>
        <Header />
        <div className="profile">
            <SideBar />
            <div className="page-content">
                {children}
            </div>
        </div>
    </>
}

export default ProfilePageLayout
