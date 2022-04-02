import { Dashboard, LandingPage, UpdateJob, Auth } from "./components";
import { useState, createContext, useReducer } from "react";
import { jobsReducer, jobsInitialState } from "./reducers/jobs";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";

export const MyContext = createContext();
function App() {
  const [user, setUser] = useState(localStorage.getItem("profile"));
  const [jobsState, jobsDispatch] = useReducer(jobsReducer, jobsInitialState);

  return (
    <MyContext.Provider value={{ jobsState, jobsDispatch }}>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={user ? <Navigate to="/dashboard" /> : <LandingPage />}
          />

          <Route
            exact
            path="/auth"
            element={
              user ? <Navigate to="/dashboard" /> : <Auth setUser={setUser} />
            }
          />
          <Route
            path="/dashboard"
            element={
              user ? (
                <Dashboard user={user} setUser={setUser} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/update/:id"
            element={user ? <UpdateJob /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
