import React, { useState, useEffect } from "react";
import "./MyApplications.css";
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";

const STATUS_META = {
  applied:  { label: "Applied",  color: "status--applied"  },
  reviewed: { label: "Reviewed", color: "status--reviewed" },
  accepted: { label: "Accepted", color: "status--accepted" },
  rejected: { label: "Rejected", color: "status--rejected" },
};

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);
  const [expanded,     setExpanded]     = useState(null); // expanded card id

  const navigate = useNavigate();
  const token    = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(API.myApplications, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Failed to fetch applications (${res.status})`);
        const data = await res.json();
        setApplications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const formatDate = (iso) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-IN", {
      day:   "numeric",
      month: "short",
      year:  "numeric",
    });
  };

  return (
    <div className="mya-page">

      {/* ── Header ─────────────────────────────────────────── */}
      <div className="mya-header">
        <button className="mya-back-btn" onClick={() => navigate("/jobs")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Jobs
        </button>

        <div className="mya-header__title-row">
          <h1 className="mya-header__title">My Applications</h1>
          {!loading && !error && (
            <span className="mya-header__badge">
              {applications.length} {applications.length === 1 ? "Application" : "Applications"}
            </span>
          )}
        </div>
        <p className="mya-header__sub">Track the status of all your job applications</p>
      </div>

      {/* ── Content ────────────────────────────────────────── */}
      <div className="mya-container">

        {loading && (
          <div className="mya-state">
            <div className="mya-spinner" />
            <p>Loading your applications...</p>
          </div>
        )}

        {error && (
          <div className="mya-state mya-state--error">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
              stroke="#c0392b" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p>{error}</p>
            <button className="mya-retry-btn" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && applications.length === 0 && (
          <div className="mya-state mya-state--empty">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none"
              stroke="#bbb" strokeWidth="1.2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            <h3>No Applications Yet</h3>
            <p>You haven't applied for any jobs. Browse open positions and apply!</p>
            <button className="mya-browse-btn" onClick={() => navigate("/jobs")}>
              Browse Jobs
            </button>
          </div>
        )}

        {!loading && !error && applications.length > 0 && (
          <div className="mya-list">
            {applications.map((app) => {
              const meta      = STATUS_META[app.status] || STATUS_META.applied;
              const isExpanded = expanded === app.id;

              return (
                <div key={app.id} className={`mya-card ${isExpanded ? "mya-card--expanded" : ""}`}>

                  {/* ── Card Top Row ── */}
                  <div className="mya-card__top" onClick={() => toggleExpand(app.id)}>
                    <div className="mya-card__left">
                      <div className="mya-card__icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="mya-card__job-title">{app.job_title || `Job #${app.job_id}`}</h3>
                        <p className="mya-card__name">{app.full_name}</p>
                      </div>
                    </div>

                    <div className="mya-card__right">
                      <span className={`mya-status ${meta.color}`}>{meta.label}</span>
                      <span className="mya-card__date">{formatDate(app.applied_at)}</span>
                      <span className={`mya-chevron ${isExpanded ? "mya-chevron--open" : ""}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* ── Expanded Details ── */}
                  {isExpanded && (
                    <div className="mya-card__details">
                      <div className="mya-details-grid">

                        <div className="mya-detail-item">
                          <span className="mya-detail-label">Email</span>
                          <span className="mya-detail-value">{app.email}</span>
                        </div>

                        <div className="mya-detail-item">
                          <span className="mya-detail-label">Mobile</span>
                          <span className="mya-detail-value">{app.mobile}</span>
                        </div>

                        {app.address && (
                          <div className="mya-detail-item">
                            <span className="mya-detail-label">Address</span>
                            <span className="mya-detail-value">{app.address}</span>
                          </div>
                        )}

                        {(app.city || app.state) && (
                          <div className="mya-detail-item">
                            <span className="mya-detail-label">City / State</span>
                            <span className="mya-detail-value">
                              {[app.city, app.state].filter(Boolean).join(", ")}
                            </span>
                          </div>
                        )}

                        {app.country && (
                          <div className="mya-detail-item">
                            <span className="mya-detail-label">Country</span>
                            <span className="mya-detail-value">{app.country}</span>
                          </div>
                        )}

                        {app.zip_code && (
                          <div className="mya-detail-item">
                            <span className="mya-detail-label">ZIP Code</span>
                            <span className="mya-detail-value">{app.zip_code}</span>
                          </div>
                        )}

                        <div className="mya-detail-item">
                          <span className="mya-detail-label">Applied On</span>
                          <span className="mya-detail-value">{formatDate(app.applied_at)}</span>
                        </div>

                        {app.cv_url && (
                          <div className="mya-detail-item mya-detail-item--full">
                            <span className="mya-detail-label">Resume / CV</span>
                            <a
                              href={app.cv_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mya-cv-link"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="7 10 12 15 17 10"/>
                                <line x1="12" y1="15" x2="12" y2="3"/>
                              </svg>
                              View / Download CV
                            </a>
                          </div>
                        )}

                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyApplications;
