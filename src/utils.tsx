import axios from "axios";

export const getPasswordRequirements = (password: string) => ({
  hasUpperCase: /[A-Z]/.test(password),
  hasLowerCase: /[a-z]/.test(password),
  hasNumber: /\d/.test(password),
  hasSymbol: /[@#$%^&+=.]/.test(password),
  hasMinLength: password.length >= 8,
});

export const getBaseURL = (type: string) => {
  switch (type) {
    case "event":
      return axios.create({
        baseURL: "http://eventhub.127.0.0.1.nip.io/event-service/events",
        withCredentials: true,
      });
    case "user":
      return axios.create({
        baseURL: "http://eventhub.127.0.0.1.nip.io/user-service/users",
        withCredentials: true,
      });
    case "authentication":
      return axios.create({
        baseURL: "http://eventhub.127.0.0.1.nip.io/user-service/authentication",
        withCredentials: true,
      });
    case "ticket":
      return axios.create({
        baseURL: "http://eventhub.127.0.0.1.nip.io/ticket-service/ticket",
        withCredentials: true,
      });
    case "agenda":
      return axios.create({
        baseURL: "http://eventhub.127.0.0.1.nip.io/agenda-service/agenda",
        withCredentials: true,
      });
    default:
      return axios.create({
        baseURL: "http://eventhub.127.0.0.1.nip.io",
        withCredentials: true,
      });
  }
};
