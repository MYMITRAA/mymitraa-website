import "./Adminapplication.css";
import { useEffect, useState } from "react";
import { API } from "../../config/api";

function AdminApplication() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized. Please login as admin.");
      setLoading(false);
      return;
    }

    fetch(API.adminApplications, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch applications.");
        return res.json();
      })
      .then((data) => {
        setApplications(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getViewableUrl = (url) => {
    if (!url) return null;
    const fixed = url
      .replace("/raw/upload/", "/image/upload/")
      .replace("/auto/upload/", "/image/upload/");
    return `https://docs.google.com/viewer?url=${encodeURIComponent(fixed)}&embedded=true`;
  };

  const filtered = applications.filter((app) => {
    const q = search.toLowerCase();
    return (
      app.full_name?.toLowerCase().includes(q) ||
      app.email?.toLowerCase().includes(q) ||
      app.mobile?.toLowerCase().includes(q) ||
      app.job_title?.toLowerCase().includes(q) ||
      app.status?.toLowerCase().includes(q) ||
      app.city?.toLowerCase().includes(q)
    );
  });

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted": return "status accepted";
      case "rejected": return "status rejected";
      case "reviewed": return "status reviewed";
      case "applied":  return "status applied";
      default:         return "status";
    }
  };

  if (loading) return <div className="admin-state">Loading applications...</div>;
  if (error)   return <div className="admin-state error">{error}</div>;

  return (
    <section className="admin-applications">
      <div className="admin-applications-header">
        <h2>All Applications</h2>
        <input
          type="text"
          className="admin-search"
          placeholder="Search by name, email, job or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <p className="admin-count">
        Total: <strong>{filtered.length}</strong> application{filtered.length !== 1 ? "s" : ""}
      </p>

      {filtered.length === 0 ? (
        <div className="admin-state">No applications found.</div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Job Title</th>
                <th>City</th>
                <th>CV</th>
                <th>Applied On</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app, index) => (
                <tr key={app.id}>
                  <td>{index + 1}</td>
                  <td>{app.full_name || "—"}</td>
                  <td>{app.email || "—"}</td>
                  <td>{app.mobile || "—"}</td>
                  <td>{app.job_title || `Job #${app.job_id}`}</td>
                  <td>{app.city || "—"}</td>
                  <td>
                    {app.cv_url ? (
                      <a href={getViewableUrl(app.cv_url)} target="_blank" rel="noreferrer" className="cv-link">View CV</a>
                    ) : (
                      <span className="no-cv">No CV</span>
                    )}
                  </td>
                  <td>
                    {app.applied_at
                      ? new Date(app.applied_at).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                  <td>
                    <span className={getStatusClass(app.status)}>
                      {app.status || "applied"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default AdminApplication;