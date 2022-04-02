import axios from "axios";
const API = axios.create({
  baseURL: "https://jobbo-backend.herokuapp.com/api",
});
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const getJobs = () => API.get("/jobs");
export const getJob = (id) => API.get(`/jobs/${id}`);
export const createJob = (data) => API.post("/jobs", data);
export const updateJob = (data, id) => API.patch(`/jobs/${id}`, data);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);
export const login = (data) => API.post("/user/login", data);
export const signup = (data) => API.post("/user/signup", data);
