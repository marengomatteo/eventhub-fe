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
                baseURL: "http://localhost:8082/event-service/events",
                withCredentials: true
            });
        case "user":
            return axios.create({
                baseURL: "http://localhost:8082/user-service/users",
                withCredentials: true
            });
        case "ticket":
            return axios.create({
                baseURL: "http://localhost:8082/ticket-service/ticket",
                withCredentials: true
            });
        default:
            return axios.create({
                baseURL: "http://localhost:8082",
                withCredentials: true
            });
    }
}