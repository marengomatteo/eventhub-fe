import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { GoogleOAuthProvider } from '@react-oauth/google';

import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import '@mantine/dropzone/styles.css';
import '@mantine/dates/styles.css';

import "./index.scss";
import "./variables.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="690276829654-98b2qel0npcvo4p6ipcdhnijenvuui7o.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
