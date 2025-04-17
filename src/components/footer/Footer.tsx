import { FC } from "react";
import logoExpanded from "@assets/logo-expanded.png";

import "./styles/index.scss";

const Footer: FC = () => {
  return (
    <div className="footer">
      <img src={logoExpanded} />
      <div className="footer-content">
        <div className="footer-section">
          <h3>Informazioni</h3>
          <ul>
            <li>Chi siamo</li>
            <li>Contatti</li>
            <li>Termini e condizioni</li>
            <li>Politica di privacy</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Supporto</h3>
          <ul>
            <li>Assistenza</li>
            <li>Guida all'acquisto</li>
            <li>Assistenza alle prenotazioni</li>
            <li>Assistenza alle vendite</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contatti</h3>
          <ul>
            <li>Assistenza</li>
            <li>Guida all'acquisto</li>
            <li>Assistenza alle prenotazioni</li>
            <li>Assistenza alle vendite</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
