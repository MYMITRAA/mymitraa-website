import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminAddJob.css";
import { API } from "../../config/api";

const JOB_TYPES = ["Full-Time", "Part-Time", "Remote", "Contract", "Internship"];

const INITIAL_FORM = {
  title: "",
  description: "",
  location: "",
  job_type: "",
  is_active: true,
};

const AdminAddJob = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Job title is required.";
    if (!form.description.trim()) e.description = "Description is required.";
    if (!form.location.trim()) e.location = "Location is required.";
    if (!form.job_type) e.job_type = "Job type is required.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setApiError("");
    setSuccessMsg("");

    try {
      const res = await fetch(API.adminJobs || "/admin/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || `Request failed (${res.status})`);
      }

      setSuccessMsg("Job posted successfully!");
      setForm(INITIAL_FORM);

      setTimeout(() => navigate("/jobs"), 1500);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="aaj-page">
      {/* background grid decoration */}
      <div className="aaj-bg-grid" aria-hidden="true" />

      <div className="aaj-card">
        {/* Header */}
        <div className="aaj-card__header">
          <button className="aaj-back-btn" onClick={() => navigate("/jobs")} type="button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Jobs
          </button>

          <div className="aaj-card__title-group">
            <span className="aaj-card__badge">Admin</span>
            <h1 className="aaj-card__title">Post a New Job</h1>
            <p className="aaj-card__subtitle">Fill in the details below to publish an open position.</p>
          </div>
        </div>

        {/* Alerts */}
        {successMsg && (
          <div className="aaj-alert aaj-alert--success">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {successMsg}
          </div>
        )}
        {apiError && (
          <div className="aaj-alert aaj-alert--error">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {apiError}
          </div>
        )}

        {/* Form */}
        <form className="aaj-form" onSubmit={handleSubmit} noValidate>
          {/* Row 1: Title + Job Type */}
          <div className="aaj-form__row">
            <div className={`aaj-field ${errors.title ? "aaj-field--error" : ""}`}>
              <label className="aaj-field__label" htmlFor="title">
                Job Title <span className="aaj-field__required">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className="aaj-field__input"
                placeholder="e.g. Senior Frontend Developer"
                value={form.title}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.title && <p className="aaj-field__error">{errors.title}</p>}
            </div>

            <div className={`aaj-field ${errors.job_type ? "aaj-field--error" : ""}`}>
              <label className="aaj-field__label" htmlFor="job_type">
                Job Type <span className="aaj-field__required">*</span>
              </label>
              <select
                id="job_type"
                name="job_type"
                className="aaj-field__input aaj-field__select"
                value={form.job_type}
                onChange={handleChange}
              >
                <option value="">Select a type…</option>
                {JOB_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.job_type && <p className="aaj-field__error">{errors.job_type}</p>}
            </div>
          </div>

          {/* Row 2: Location */}
          <div className={`aaj-field ${errors.location ? "aaj-field--error" : ""}`}>
            <label className="aaj-field__label" htmlFor="location">
              Location <span className="aaj-field__required">*</span>
            </label>
            <input
              id="location"
              name="location"
              type="text"
              className="aaj-field__input"
              placeholder="e.g. New York, NY or Remote"
              value={form.location}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.location && <p className="aaj-field__error">{errors.location}</p>}
          </div>

          {/* Row 3: Description */}
          <div className={`aaj-field ${errors.description ? "aaj-field--error" : ""}`}>
            <label className="aaj-field__label" htmlFor="description">
              Job Description <span className="aaj-field__required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              className="aaj-field__input aaj-field__textarea"
              placeholder="Describe responsibilities, requirements, perks…"
              rows={6}
              value={form.description}
              onChange={handleChange}
            />
            {errors.description && <p className="aaj-field__error">{errors.description}</p>}
          </div>

          {/* Row 4: Active toggle */}
          <div className="aaj-field aaj-field--toggle">
            <label className="aaj-toggle" htmlFor="is_active">
              <input
                id="is_active"
                name="is_active"
                type="checkbox"
                className="aaj-toggle__input"
                checked={form.is_active}
                onChange={handleChange}
              />
              <span className="aaj-toggle__track">
                <span className="aaj-toggle__thumb" />
              </span>
              <span className="aaj-toggle__label">
                Publish immediately
                <span className="aaj-toggle__hint">
                  {form.is_active ? "This job will be visible to applicants." : "This job will be saved as a draft."}
                </span>
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="aaj-form__actions">
            <button
              type="button"
              className="aaj-btn aaj-btn--ghost"
              onClick={() => navigate("/jobs")}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="aaj-btn aaj-btn--primary"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="aaj-spinner" />
                  Posting…
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Post Job
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddJob;
