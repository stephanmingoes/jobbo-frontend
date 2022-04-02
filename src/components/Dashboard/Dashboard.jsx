import React, { useEffect, useContext, useReducer } from "react";
import "./dashboard.css";
import { Navbar, Submit, Job } from "../index";
import { getJobs } from "../../api";
import { GET_JOBS } from "../../actionTypes/actionTypes";
import { MyContext } from "../../App";
import { authInitialState, authReducer } from "../../reducers/auth";
import * as actions from "../../actionTypes/actionTypes";
import decode from "jwt-decode";
const Dashboard = ({ user, setUser }) => {
  const { jobsState, jobsDispatch } = useContext(MyContext);
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);

  useEffect(async () => {
    const parsed = JSON.parse(user);
    const token = parsed.token;
    if (token) {
      const decoded = decode(token);
      if (decoded.exp * 100 > new Date().getTime()) {
        authDispatch({ type: actions.LOGOUT });
        setUser(localStorage.getItem("profile"));
      }
    }

    try {
      const { data } = await getJobs();
      jobsDispatch({ type: GET_JOBS, payload: data.data });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const Jobs = () => {
    return (
      <div className="jobs section__padding">
        {jobsState.map((job) => (
          <Job
            key={job.date}
            date={job.date}
            company={job.company}
            title={job.title}
            location={job.location}
            status={job.status}
            user={job.user}
            _id={job._id}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <Submit />
      {jobsState.length ? (
        <Jobs />
      ) : (
        <p className="no_data">Add a JOB applicaton.</p>
      )}
    </>
  );
};

export default Dashboard;
