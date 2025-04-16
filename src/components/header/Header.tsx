import { FC, useEffect } from "react";
import { HeaderProps } from "./types";
import { useUser } from "../../context/UserContext";

import logoExpanded from "@assets/logo-expanded.png";
import profile from "@icons/profile.svg";
import chevron from "@icons/chevron.svg";
import searchIcon from "@icons/search.svg";
import locationIcon from "@icons/location.svg";

import "./styles/index.scss";
import { Link } from "@tanstack/react-router";

const Header: FC<HeaderProps> = ({ showSearchBar = false, breadcrumb }) => {
  const { user, setUser } = useUser();

  return (
    <>
      <header className="header">
        <img className="header-logo" src={logoExpanded} alt="logo expanded" />

        {showSearchBar && (
          <div className="search-container">
            <div className="search-input-wrapper">
              <img src={searchIcon} alt="search" className="search-icon" />
              <input
                type="text"
                placeholder="Cerca eventi..."
                className="search-input"
              />
            </div>
            <div className="search-separator" />
            <div className="search-input-wrapper">
              <img src={locationIcon} alt="location" className="search-icon" />
              <input
                type="text"
                placeholder="Cerca luogo..."
                className="search-input"
              />
            </div>
          </div>
        )}
       {breadcrumb && (
          <div className="breadcrumb">
          {breadcrumb.split("/").map((item, i) => (
            <>
              {item}
              {i < breadcrumb.split("/").length - 1 && <img src={chevron} />}
            </>
          ))}
        </div>)}
        <div className="profile">
          {user ? (
            <div className="profile-container">
              <div className="profile-logo">{user.name[0] + user.surname[0]}</div>
              {`${user.name} ${user.surname}`}
              <img src={chevron} />
            </div>
          ) : (
            <Link to="/login"><img src={profile} /></Link>
          )}
        </div>
      </header>
      <div className="search-overlay"></div>
    </>
  );
};

export default Header;
