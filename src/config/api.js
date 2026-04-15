const ROOT = "http://127.0.0.1:8000";

export const API = {
  // auth
  login:    `${ROOT}/auth/login`,
  register: `${ROOT}/auth/register`,
  me:       `${ROOT}/auth/me`,

  // jobs
  jobs:        `${ROOT}/jobs/`,
  jobById:  (id) => `${ROOT}/jobs/${id}`,
  applyJob: (id) => `${ROOT}/jobs/${id}/apply`,
  myApplications: `${ROOT}/jobs/my/applications`,

  // admin
  adminJobs:        `${ROOT}/admin/jobs`,
  adminApplications:`${ROOT}/admin/applications`,
};