import { FC } from "react";
import { HeaderProps } from "./types";
import { useUser } from "../../context/UserContext";

import logoExpanded from "@assets/logo-expanded.png";
import profile from "@icons/profile.svg";
import chevron from "@icons/chevron.svg";

import "./styles/index.scss";
import { Link } from "@tanstack/react-router";
import SearchBar from "./SearchBar";

const Header: FC<HeaderProps> = ({ showSearchBar = false, breadcrumb }) => {
  const { user, setUser } = useUser();

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
        <div className="profile">
          {user ? (
            <div className="profile-container">
              <div className="profile-logo">
                {user.name[0] + user.surname[0]}
              </div>
              {`${user.name} ${user.surname}`}
              <img src={chevron} />
            </div>
          ) : (
            <Link to="/login">
              <img src={profile} />
            </Link>
          )}
        </div>
      </header>
      <div className="search-overlay"></div>
    </>
  );
};

export default Header;
