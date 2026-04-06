import React, { useState } from "react";
import "./JobApply.css";

const JobApply = ({ job, onBack }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    cv: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, cv: e.target.files[0] }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Application submitted successfully!");
  };

  return (
    <div className="apply-page">
      <div className="apply-card">
        <h2 className="apply-card__title">{job?.title || "UI/UX Designer"}</h2>
        <p className="apply-card__meta">
          Job Type: {job?.jobType || "Remote"} &nbsp;|&nbsp; Experience:{" "}
          {job?.experience || "1–4 Years"} &nbsp;|&nbsp; Employment Type:{" "}
          {job?.employmentType || "Full-time"}
        </p>

        <div className="apply-form">
          <div className="apply-form__group">
            <label className="apply-form__label">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="apply-form__input"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="apply-form__group">
            <label className="apply-form__label">Email Address</label>
            <input
              type="email"
              name="email"
              className="apply-form__input"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="apply-form__group">
            <label className="apply-form__label">Mobile</label>
            <input
              type="tel"
              name="mobile"
              className="apply-form__input"
              placeholder="Enter mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>

          <div className="apply-form__group">
            <label className="apply-form__label">Address</label>
            <input
              type="text"
              name="address"
              className="apply-form__input"
              placeholder="Enter email address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="apply-form__group">
            <label className="apply-form__label">City</label>
            <input
              type="text"
              name="city"
              className="apply-form__input"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="apply-form__group">
            <label className="apply-form__label">State</label>
            <input
              type="text"
              name="state"
              className="apply-form__input"
              placeholder="Enter state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>

          <div className="apply-form__group">
            <label className="apply-form__label">Country</label>
            <select
              name="country"
              className="apply-form__input apply-form__select"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="apply-form__group">
            <label className="apply-form__label">Zip Code</label>
            <input
              type="text"
              name="zipCode"
              className="apply-form__input"
              placeholder="Enter"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </div>

          <div className="apply-form__group">
            <label className="apply-form__label">CV</label>
            <div className="apply-form__file-wrapper">
              <input
                type="file"
                name="cv"
                id="cv-upload"
                className="apply-form__file-input"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              <label htmlFor="cv-upload" className="apply-form__file-label">
                {formData.cv ? formData.cv.name : "Upload"}
              </label>
            </div>
          </div>

          <button className="apply-form__submit-btn" onClick={handleSubmit}>
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobApply;
