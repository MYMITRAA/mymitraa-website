const ROOT = "http://3.90.7.185/api/";

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