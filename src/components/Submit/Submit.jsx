import React, { useState, useContext } from "react";
import "./submit.css";
import { MyContext } from "../../App";
import * as api from "../../api/index";
import * as actions from "../../actionTypes/actionTypes";
const Submit = () => {
  const { jobsDispatch } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((preval) => ({ ...preval, [name]: value }));
  };

  const validateData = () => {
    const { title, company, location, status } = jobData;
    if (
      title.trim().length > 0 &&
      company.trim().length > 0 &&
      location.trim().length > 0 &&
      status.trim().length > 0
    ) {
      return true;
    }
    alert("Please fill all the fields.");
    return false;
  };

  const handleSubmit = async () => {
    if (validateData()) {
      try {
        setLoading(true);
        const { data } = await api.createJob(jobData);
        jobsDispatch({ type: actions.CREATE_JOB, payload: data.data });
        setJobData({ title: "", company: "", location: "", status: "Pending" });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="dashboard-submit section__padding">
      <div className="dashboard">
        <div className="feilds">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            className="left"
            onChange={handleChange}
            value={jobData.title}
          />
          <select
            id="status"
            name="status"
            className="right"
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Declined">Declined</option>
            <option value="Interview">Interview</option>
          </select>
        </div>
        <div className="feilds">
          <input
            type="text"
            name="company"
            placeholder="Company"
            className="left"
            onChange={handleChange}
            value={jobData.company}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="right"
            onChange={handleChange}
            value={jobData.location}
          />
        </div>
        <button onClick={handleSubmit}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default Submit;
