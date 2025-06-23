import { FC } from "react";
import { HeaderProps } from "./types";
import { useUser } from "../../context/UserContext";

import logoExpanded from "@assets/logo-expanded.png";
import profile from "@icons/profile.svg";
import chevron from "@icons/chevron.svg";

import "./styles/index.scss";
import { Link } from "@tanstack/react-router";
import SearchBar from "./SearchBar";
import { Popover } from "@mantine/core";
import { useState } from "react";
import { useRouter } from "@tanstack/react-router";

const Header: FC<HeaderProps> = ({ showSearchBar = false, breadcrumb, showProfileIcon = true }) => {
  const { user, logout } = useUser();
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setOpened(false);
    router.navigate({ to: "/login" });
  }
  return (
    <>
      <header className="header">
        <Link to="/">
          <img className="header-logo" src={logoExpanded} alt="logo expanded" />
        </Link>

        {showSearchBar && <SearchBar />}
        {breadcrumb && (
          <div className="breadcrumb">
            {breadcrumb.split("/").map((item, i) => (
              <span key={item}>
                {item}
                {i < breadcrumb.split("/").length - 1 && <img src={chevron} />}
              </span>
            ))}
          </div>
        )}
        {showProfileIcon && <div className="header-profile">
          {user ? (

            <Popover width={200} position="bottom"
              onChange={(opened) => {
                setOpened(opened);
              }}
              withOverlay
              overlayProps={{ zIndex: 100, blur: '4px' }}
              zIndex={2000}
              offset={4} withArrow shadow="lg">
              <Popover.Target>
                <button className="profile-container">
                  <div className="profile-logo">
                    {user.name[0] + user.surname[0]}
                  </div>
                  {`${user.name} ${user.surname}`}
                  <img className={`arrow ${opened ? "rotate" : ""}`} src={chevron} />
                </button>
              </Popover.Target>
              <Popover.Dropdown>
                <div className="profile-dropdown">
                  <Link to="/profile">Profilo</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </Popover.Dropdown>
            </Popover>
          ) : (
            <Link to="/login">
              <img src={profile} />
            </Link>
          )}
        </div>}
      </header>
      <div className="search-overlay"></div>
    </>
  );
};

export default Header;
