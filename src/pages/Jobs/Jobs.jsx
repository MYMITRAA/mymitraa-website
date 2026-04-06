import React, { useState } from "react";
import "./Jobs.css";
import Jobapply from "../Jobapply/JobApply";

const jobsData = [
  {
    id: 1,
    title: "UI/UX Designer",
    jobType: "Remote",
    experience: "1–4 Years",
    employmentType: "Full-time",
    description:
      "We're looking for a creative and user-focused UI/UX Designer who can turn complex ideas into intuitive, engaging digital experiences. You'll work closely with product managers, developers, and stakeholders to design user-centric web and mobile interfaces.",
  },
  {
    id: 2,
    title: "Web Developer",
    jobType: "Hybrid",
    experience: "Intern",
    employmentType: "Full-time",
    description:
      "We're looking for a creative and user-focused UI/UX Designer who can turn complex ideas into intuitive, engaging digital experiences. You'll work closely with product managers, developers, and stakeholders to design user-centric web and mobile interfaces.",
  },
  {
    id: 3,
    title: "AI Developer Intern",
    jobType: "Remote",
    experience: "1–4 Years",
    employmentType: "Full-time",
    description:
      "We're looking for a creative and user-focused UI/UX Designer who can turn complex ideas into intuitive, engaging digital experiences. You'll work closely with product managers, developers, and stakeholders to design user-centric web and mobile interfaces.",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    jobType: "Remote",
    experience: "1–4 Years",
    employmentType: "Full-time",
    description:
      "We're looking for a creative and user-focused UI/UX Designer who can turn complex ideas into intuitive, engaging digital experiences. You'll work closely with product managers, developers, and stakeholders to design user-centric web and mobile interfaces.",
  },
  {
    id: 5,
    title: "UI/UX Designer",
    jobType: "Remote",
    experience: "1–4 Years",
    employmentType: "Full-time",
    description:
      "We're looking for a creative and user-focused UI/UX Designer who can turn complex ideas into intuitive, engaging digital experiences. You'll work closely with product managers, developers, and stakeholders to design user-centric web and mobile interfaces.",
  },
  {
    id: 6,
    title: "UI/UX Designer",
    jobType: "Remote",
    experience: "1–4 Years",
    employmentType: "Full-time",
    description:
      "We're looking for a creative and user-focused UI/UX Designer who can turn complex ideas into intuitive, engaging digital experiences. You'll work closely with product managers, developers, and stakeholders to design user-centric web and mobile interfaces.",
  },
];

const TOTAL_PAGES = 10;

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);

  // If a job is selected, render the Apply page
  if (selectedJob) {
    return <Jobapply job={selectedJob} onBack={() => setSelectedJob(null)} />;
  }

  const getVisiblePages = () => {
    if (TOTAL_PAGES <= 6) {
      return Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);
    }
    if (currentPage <= 3) return [1, 2, 3, 4, "...", TOTAL_PAGES];
    if (currentPage >= TOTAL_PAGES - 2)
      return [1, "...", TOTAL_PAGES - 3, TOTAL_PAGES - 2, TOTAL_PAGES - 1, TOTAL_PAGES];
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", TOTAL_PAGES];
  };

  return (
    <div className="jobs-page">
      {/* Hero Banner */}
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
              placeholder="Search by keyword"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="jobs-search-bar__btn">Search</button>
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="jobs-container">
        <div className="jobs-grid">
          {jobsData.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-card__header">
                <h3 className="job-card__title">{job.title}</h3>
                <button
                  className="job-card__apply-btn"
                  onClick={() => setSelectedJob(job)}
                >
                  Apply Now
                </button>
              </div>
              <div className="job-card__meta">
                <p><span className="job-card__meta-label">Job Type:</span> {job.jobType}</p>
                <p><span className="job-card__meta-label">Experience:</span> {job.experience}</p>
                <p><span className="job-card__meta-label">Employment Type:</span> {job.employmentType}</p>
              </div>
              <p className="job-card__description">{job.description}</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
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
      </div>
    </div>
  );
};

export default Jobs;
