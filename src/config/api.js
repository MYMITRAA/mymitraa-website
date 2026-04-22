const ROOT = "https://my-mitraawebsite-backend.onrender.com";

export const API = {
  // auth
  login:       `${ROOT}/auth/login`,
  register:    `${ROOT}/auth/register`,
  me:          `${ROOT}/auth/me`,
  verifyEmail: `${ROOT}/auth/verify-email`,
  resendOtp:   `${ROOT}/auth/resend-otp`,

  // jobs
  jobs:           `${ROOT}/jobs/`,
  jobById:     (id) => `${ROOT}/jobs/${id}`,
  applyJob:    (id) => `${ROOT}/jobs/${id}/apply`,
  myApplications: `${ROOT}/jobs/my/applications`,

  // admin
  adminJobs:           `${ROOT}/admin/jobs`,
  adminApplications:   `${ROOT}/admin/applications`,
  adminJobById: (id) => `${ROOT}/admin/jobs/${id}`,
};