import React, { useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./job.css";
import * as api from "../../api/index";
import * as actions from "../../actionTypes/actionTypes";
import { MyContext } from "../../App";
const Job = ({ company, title, date, status, location, user, _id }) => {
  const { jobsDispatch } = useContext(MyContext);

  return (
    <div className="job">
      <div className="div-1">
        {" "}
        <div className="job_heading">
          <h1 className="title-image">{company.charAt(0)}</h1>
          <p className="c-name">{company}</p>
        </div>
      </div>
      <div className="div-2">
        {" "}
        <div className="job_data">
          <h3 className="position">Position: {title}</h3>
          <p className="date">
            Date Applied:{" "}
            {moment(date).toLocaleString().split(" ").slice(0, 4).join(" ")}
          </p>
          <p className="">Location: {location}</p>
          <p className="status">Status: {status}</p>
        </div>
        <div className="actions">
          <div></div>
          <div>
            {" "}
            <Link to={`/update/${_id}`}>
              <button className="edit" to={`/update/${_id}`}>
                edit
              </button>
            </Link>
            <button
              className="delete"
              onClick={async () => {
                const { data } = await api.deleteJob(_id);
                jobsDispatch({
                  type: actions.DELETE_JOB,
                  payload: data.data,
                });
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
