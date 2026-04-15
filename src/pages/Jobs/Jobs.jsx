import React, { useState, useEffect } from "react";
import "./Jobs.css";
import Jobapply from "../Jobapply/JobApply";
import Signinmodel from "../../components/Signinmodel/Signinmodel";
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";

const JOBS_PER_PAGE = 6;

const Jobs = () => {
  const [searchQuery,      setSearchQuery]      = useState("");
  const [currentPage,      setCurrentPage]      = useState(1);
  const [selectedJob,      setSelectedJob]      = useState(null);
  const [jobsData,         setJobsData]         = useState([]);
  const [loading,          setLoading]          = useState(true);
  const [error,            setError]            = useState(null);
  const [showSignin,       setShowSignin]       = useState(false);
  const [showSigninPrompt, setShowSigninPrompt] = useState(false);
  const [pendingJob,       setPendingJob]       = useState(null);

  const navigate = useNavigate();

  // ── Auth state ────────────────────────────────────────────
  const token   = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(API.jobs);
        if (!res.ok) throw new Error(`Failed to fetch jobs (${res.status})`);
        const data = await res.json();
        setJobsData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // ── Check login before applying ───────────────────────────
  const handleApplyClick = (job) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setPendingJob(job);
      setShowSigninPrompt(true);
    } else {
      setSelectedJob(job);
    }
  };

  // ── After sign in, continue to apply ─────────────────────
  const handleSigninSuccess = () => {
    setShowSignin(false);
    setShowSigninPrompt(false);
    if (pendingJob) {
      setSelectedJob(pendingJob);
      setPendingJob(null);
    }
  };

  const filtered = jobsData.filter((job) => {
    const q = searchQuery.toLowerCase();
    return (
      job.title.toLowerCase().includes(q) ||
      job.location.toLowerCase().includes(q) ||
      job.job_type.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / JOBS_PER_PAGE));
  const paginated  = filtered.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  const handleSearch = () => setCurrentPage(1);

  const getVisiblePages = () => {
    if (totalPages <= 6)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3)
      return [1, 2, 3, 4, "...", totalPages];
    if (currentPage >= totalPages - 2)
      return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  if (selectedJob) {
    return <Jobapply job={selectedJob} onBack={() => setSelectedJob(null)} />;
  }

  return (
    <div className="jobs-page">

      {/* ── Sign In Required Prompt ───────────────────────── */}
      {showSigninPrompt && (
        <div className="signin-prompt-overlay">
          <div className="signin-prompt-box">
            <div className="signin-prompt-icon">⚠️</div>
            <h3>Sign In Required</h3>
            <p>
              You need to <strong>Sign In</strong> to apply for this job.
              Please sign in to continue your application.
            </p>
            <div className="signin-prompt-actions">
              <button
                className="signin-prompt-btn signin"
                onClick={() => {
                  setShowSigninPrompt(false);
                  setShowSignin(true);
                }}
              >
                Sign In
              </button>
              <button
                className="signin-prompt-btn cancel"
                onClick={() => {
                  setShowSigninPrompt(false);
                  setPendingJob(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Sign In Modal ─────────────────────────────────── */}
      {showSignin && (
        <Signinmodel
          onClose={() => {
            setShowSignin(false);
            setPendingJob(null);
          }}
          onSuccess={handleSigninSuccess}
        />
      )}

      {/* ── Hero Section ──────────────────────────────────── */}
      <div className="jobs-hero">
        <div className="jobs-hero__overlay" />
        <div className="jobs-hero__search">
          <div className="jobs-search-bar">
            <span className="jobs-search-bar__icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              className="jobs-search-bar__input"
              placeholder="Search by keyword, location or type"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button className="jobs-search-bar__btn" onClick={handleSearch}>
            Search
          </button>

          {/* ── My Applications — signed-in non-admin only ── */}
          {token && !isAdmin && (
            <button
              className="my-applications-btn"
              onClick={() => navigate("/my-applications")}
            >
              My Applications
            </button>
          )}

        </div>
      </div>

      {/* ── Jobs Grid ─────────────────────────────────────── */}
      <div className="jobs-container">

        {loading && (
          <p style={{ textAlign: "center", padding: "2rem", color: "#888" }}>
            Loading jobs...
          </p>
        )}

        {error && (
          <p style={{ textAlign: "center", padding: "2rem", color: "#c0392b" }}>
            {error}
          </p>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p style={{ textAlign: "center", padding: "2rem", color: "#888" }}>
            No jobs found{searchQuery ? ` for "${searchQuery}"` : ""}.
          </p>
        )}

        {!loading && !error && paginated.length > 0 && (
          <div className="jobs-grid">
            {paginated.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-card__header">
                  <h3 className="job-card__title">{job.title}</h3>
                  <button
                    className="job-card__apply-btn"
                    onClick={() => handleApplyClick(job)}
                  >
                    Apply Now
                  </button>
                </div>
                <div className="job-card__meta">
                  <p><span className="job-card__meta-label">Job Type:</span> {job.job_type}</p>
                  <p><span className="job-card__meta-label">Location:</span> {job.location}</p>
                </div>
                <p className="job-card__description">{job.description}</p>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && totalPages > 1 && (
          <div className="jobs-pagination">
            {getVisiblePages().map((page, idx) =>
              page === "..." ? (
                <span key={`ellipsis-${idx}`} className="jobs-pagination__ellipsis">...</span>
              ) : (
                <button
                  key={page}
                  className={`jobs-pagination__btn ${currentPage === page ? "jobs-pagination__btn--active" : ""}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              )
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Jobs;