import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
// https://tasktify-pj.herokuapp.com
// http://localhost:5000

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchCoachs = () => API.get("/coachs");
export const createCoach = (newCoach) => API.post("/coachs", newCoach);
export const updateCoach = (id, updatedCoach) =>
  API.patch(`/coachs/${id}`, updatedCoach);
export const deleteCoach = (id) => API.delete(`/coachs/${id}`);

export const fetchCoachTrips = () => API.get("/coachtrips");
export const createCoachTrip = (newCoachTrip) =>
  API.post("/coachtrips", newCoachTrip);
export const updateCoachTrip = (id, updatedCoachTrip) =>
  API.patch(`/coachtrips/${id}`, updatedCoachTrip);
export const deleteCoachTrip = (id) => API.delete(`/coachtrips/${id}`);

export const fetchDrivers = () => API.get("/drivers");
export const createDriver = (newDriver) => API.post("/drivers", newDriver);
export const updateDriver = (id, updatedDriver) =>
  API.patch(`/drivers/${id}`, updatedDriver);
export const deleteDriver = (id) => API.delete(`/drivers/${id}`);

export const fetchRoutes = () => API.get("/routes");
export const createRoute = (newRoute) => API.post("/routes", newRoute);
export const updateRoute = (id, updatedRoute) =>
  API.patch(`/routes/${id}`, updatedRoute);
export const deleteRoute = (id) => API.delete(`/routes/${id}`);

export const fetchTickets = () => API.get("/tickets");
export const createTicket = (newTicket) => API.post("/tickets", newTicket);
export const updateTicket = (id, updatedTicket) =>
  API.patch(`/tickets/${id}`, updatedTicket);
export const deleteTicket = (id) => API.delete(`/tickets/${id}`);

export const getUsers = () => API.get("/user");
export const updateUser = (id, updatedUser) =>
  API.patch(`/user/${id}`, updatedUser);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
