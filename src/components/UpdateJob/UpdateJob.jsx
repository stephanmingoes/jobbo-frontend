import React, { useEffect, useState } from "react";
import { Navbar } from "../index";
import "../Submit/submit.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as api from "../../api/index";
import "./update.css";

const UpdateJob = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    status: "",
    location: "",
  });

  useEffect(async () => {
    try {
      const { data } = await api.getJob(id);
      setJobData(data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

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
        const { data } = await api.updateJob(jobData, jobData._id);
        setLoading(false);
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="section__padding">
        {" "}
        <Link to="/dashboard" className="home">
          Back Home
        </Link>
        <h1 style={{ textAlign: "center" }}>Update Job</h1>
      </div>
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
            {" "}
            {loading ? " Loading..." : "Update"}
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateJob;
