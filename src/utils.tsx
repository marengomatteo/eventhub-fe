import axios from "axios";

export const getPasswordRequirements = (password: string) => ({
  hasUpperCase: /[A-Z]/.test(password),
  hasLowerCase: /[a-z]/.test(password),
  hasNumber: /\d/.test(password),
  hasSymbol: /[@#$%^&+=.]/.test(password),
  hasMinLength: password.length >= 8,
});

export const API_URL = "http://localhost:8082";

export const getBaseURL = (type: string) => {
  switch (type) {
    case "event":
      return axios.create({
        baseURL: `${API_URL}/event-service/events`,
        withCredentials: true,
      });
    case "user":
      return axios.create({
        baseURL: `${API_URL}/user-service/users`,
        withCredentials: true,
      });
    case "authentication":
      return axios.create({
        baseURL: `${API_URL}/user-service/authentication`,
        withCredentials: true,
      });
    case "ticket":
      return axios.create({
        baseURL: `${API_URL}/ticket-service/ticket`,
        withCredentials: true,
      });
    case "agenda":
      return axios.create({
        baseURL: `${API_URL}/agenda-service/agenda`,
        withCredentials: true,
      });
    default:
      return axios.create({
        baseURL: "${apiUrl}",
        withCredentials: true,
      });
  }
};
