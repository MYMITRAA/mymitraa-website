import React, { useState } from "react";
import "./JobApply.css";
import { API } from "../../config/api";

const COUNTRY_CODES = [
  { code: "+91",  label: "🇮🇳 +91"  },
  { code: "+1",   label: "🇺🇸 +1"   },
  { code: "+44",  label: "🇬🇧 +44"  },
  { code: "+1",   label: "🇨🇦 +1"   },
  { code: "+61",  label: "🇦🇺 +61"  },
  { code: "+971", label: "🇦🇪 +971" },
  { code: "+65",  label: "🇸🇬 +65"  },
  { code: "+49",  label: "🇩🇪 +49"  },
  { code: "+33",  label: "🇫🇷 +33"  },
  { code: "+81",  label: "🇯🇵 +81"  },
];

const COUNTRIES = [
  "India", "USA", "UK", "Canada", "Australia",
  "UAE", "Singapore", "Germany", "France", "Japan", "Other",
];

const CV_MAX_BYTES = 50 * 1024;

const INITIAL_FORM = {
  fullName:    "",
  email:       "",
  countryCode: "+91",
  mobile:      "",
  address:     "",
  city:        "",
  state:       "",
  country:     "",
  zipCode:     "",
  cv:          null,
};

const INITIAL_ERRORS = {
  fullName: "",
  email:    "",
  mobile:   "",
  address:  "",
  city:     "",
  state:    "",
  country:  "",
  zipCode:  "",
  cv:       "",
};

const validators = {
  fullName:  (v) => !v.trim()                           ? "Full name is required."
                  : v.trim().length < 2                 ? "Name must be at least 2 characters."
                  : !/^[a-zA-Z\s.'-]+$/.test(v.trim())  ? "Name can only contain letters, spaces, or . ' -"
                  : "",

  email:     (v) => !v.trim()                                     ? "Email is required."
                  : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "Enter a valid email address."
                  : "",

  mobile:    (v) => !v.trim()           ? "Mobile number is required."
                  : !/^\d{10}$/.test(v) ? "Mobile must be exactly 10 digits."
                  : "",

  address:   (v) => !v.trim()           ? "Address is required."
                  : v.trim().length < 5 ? "Enter a complete address."
                  : "",

  city:      (v) => !v.trim()                        ? "City is required."
                  : !/^[a-zA-Z\s]+$/.test(v.trim()) ? "City can only contain letters."
                  : "",

  state:     (v) => !v.trim()                        ? "State is required."
                  : !/^[a-zA-Z\s]+$/.test(v.trim()) ? "State can only contain letters."
                  : "",

  country:   (v) => !v ? "Please select a country." : "",

  zipCode:   (v) => !v.trim()             ? "Zip code is required."
                  : !/^\d{4,10}$/.test(v) ? "Enter a valid zip code (4–10 digits)."
                  : "",

  cv:        (f) => !f ? "CV is required. Please upload your CV."
                  : !["application/pdf",
                      "application/msword",
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                     ].includes(f.type)   ? "Only PDF, DOC, or DOCX files are allowed."
                  : f.size > CV_MAX_BYTES ? `CV must be under 50 KB. Your file is ${(f.size / 1024).toFixed(1)} KB.`
                  : "",
};

const validateAll = (formData) => {
  const errs = {};
  Object.keys(INITIAL_ERRORS).forEach((key) => {
    errs[key] = validators[key](formData[key]);
  });
  return errs;
};

const hasErrors = (errs) => Object.values(errs).some(Boolean);

/* ── Component ── */
const JobApply = ({ job, onBack }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors,   setErrors]   = useState(INITIAL_ERRORS);
  const [touched,  setTouched]  = useState({});
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState("");

  /* Generic text/select fields */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
  };

  /* Mobile — own handler to avoid synthetic event reconstruction */
  const handleMobileChange = (e) => {
    const clean = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, mobile: clean }));
    if (touched.mobile) {
      setErrors((prev) => ({ ...prev, mobile: validators.mobile(clean) }));
    }
  };

  const handleMobileBlur = () => {
    setTouched((prev) => ({ ...prev, mobile: true }));
    setErrors((prev) => ({ ...prev, mobile: validators.mobile(formData.mobile) }));
  };

  /* Zip — own handler */
  const handleZipChange = (e) => {
    const clean = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, zipCode: clean }));
    if (touched.zipCode) {
      setErrors((prev) => ({ ...prev, zipCode: validators.zipCode(clean) }));
    }
  };

  const handleZipBlur = () => {
    setTouched((prev) => ({ ...prev, zipCode: true }));
    setErrors((prev) => ({ ...prev, zipCode: validators.zipCode(formData.zipCode) }));
  };

  /* Country code dropdown */
  const handleCodeChange = (e) => {
    setFormData((prev) => ({ ...prev, countryCode: e.target.value }));
  };

  /* File upload */
  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;
    setFormData((prev) => ({ ...prev, cv: file }));
    setTouched((prev) => ({ ...prev, cv: true }));
    setErrors((prev) => ({ ...prev, cv: validators.cv(file) }));
  };

  /* Submit */
  const handleSubmit = async () => {
    const allTouched = Object.keys(INITIAL_ERRORS).reduce(
      (acc, k) => ({ ...acc, [k]: true }), {}
    );
    setTouched(allTouched);

    const errs = validateAll(formData);
    setErrors(errs);
    if (hasErrors(errs)) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setErrors((prev) => ({ ...prev, fullName: "Please sign in before applying." }));
      return;
    }

    setLoading(true);
    setSuccess("");

    try {
      const payload = new FormData();
      payload.append("full_name", formData.fullName);
      payload.append("email",     formData.email);
      payload.append("mobile",    `${formData.countryCode}${formData.mobile}`);
      payload.append("address",   formData.address);
      payload.append("city",      formData.city);
      payload.append("state",     formData.state);
      payload.append("country",   formData.country);
      payload.append("zip_code",  formData.zipCode);
      payload.append("cv",        formData.cv);

      const res  = await fetch(API.applyJob(job.id), {
        method:  "POST",
        headers: { Authorization: `Bearer ${token}` },
        body:    payload,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Submission failed.");

      setSuccess("Application submitted successfully! 🎉");
      setFormData(INITIAL_FORM);
      setErrors(INITIAL_ERRORS);
      setTouched({});

    } catch (err) {
      setErrors((prev) => ({ ...prev, fullName: err.message }));
    } finally {
      setLoading(false);
    }
  };

  /* Field wrapper */
  const Field = ({ label, required, errorKey, children }) => (
    <div className={`apply-form__group${errors[errorKey] && touched[errorKey] ? " apply-form__group--error" : ""}`}>
      <label className="apply-form__label">
        {label}{required && <span className="apply-form__required"> *</span>}
      </label>
      {children}
      {touched[errorKey] && errors[errorKey] && (
        <span className="apply-form__error-msg">{errors[errorKey]}</span>
      )}
    </div>
  );

  return (
    <div className="apply-page">
      <div className="apply-card">

        {onBack && (
          <button className="apply-card__back" onClick={onBack}>
            ← Back to Jobs
          </button>
        )}

        <h2 className="apply-card__title">{job?.title || "UI/UX Designer"}</h2>
        <p className="apply-card__meta">
          Job Type: {job?.jobType || "Remote"} &nbsp;|&nbsp; Experience:{" "}
          {job?.experience || "1–4 Years"} &nbsp;|&nbsp; Employment Type:{" "}
          {job?.employmentType || "Full-time"}
        </p>

        {success && <p className="apply-success">{success}</p>}

        <div className="apply-form">

          <Field label="Full Name" required errorKey="fullName">
            <input
              type="text" name="fullName"
              className="apply-form__input"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>

          <Field label="Email Address" required errorKey="email">
            <input
              type="email" name="email"
              className="apply-form__input"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>

          <Field label="Mobile" required errorKey="mobile">
            <div className="apply-form__mobile-row">
              <select
                name="countryCode"
                className="apply-form__input apply-form__code-select"
                value={formData.countryCode}
                onChange={handleCodeChange}
              >
                {COUNTRY_CODES.map((c, i) => (
                  <option key={i} value={c.code}>{c.label}</option>
                ))}
              </select>
              <input
                type="tel"
                name="mobile"
                className="apply-form__input apply-form__mobile-input"
                placeholder="10-digit number"
                value={formData.mobile}
                onChange={handleMobileChange}
                onBlur={handleMobileBlur}
                inputMode="numeric"
              />
            </div>
          </Field>

          <Field label="Address" required errorKey="address">
            <input
              type="text" name="address"
              className="apply-form__input"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>

          <Field label="City" required errorKey="city">
            <input
              type="text" name="city"
              className="apply-form__input"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>

          <Field label="State" required errorKey="state">
            <input
              type="text" name="state"
              className="apply-form__input"
              placeholder="Enter state"
              value={formData.state}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>

          <Field label="Country" required errorKey="country">
            <select
              name="country"
              className="apply-form__input apply-form__select"
              value={formData.country}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select country</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>

          <Field label="Zip Code" required errorKey="zipCode">
            <input
              type="text"
              name="zipCode"
              className="apply-form__input"
              placeholder="Enter zip code"
              value={formData.zipCode}
              onChange={handleZipChange}
              onBlur={handleZipBlur}
              inputMode="numeric"
            />
          </Field>

          <Field label="CV" required errorKey="cv">
            <div className="apply-form__file-wrapper">
              <input
                type="file" name="cv" id="cv-upload"
                className="apply-form__file-input"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              <label
                htmlFor="cv-upload"
                className={`apply-form__file-label${formData.cv ? " apply-form__file-label--filled" : ""}`}
              >
                <span className="apply-form__file-icon">📎</span>
                {formData.cv
                  ? `${formData.cv.name} (${(formData.cv.size / 1024).toFixed(1)} KB)`
                  : "Upload CV — PDF, DOC, DOCX · max 50 KB"}
              </label>
            </div>
          </Field>

          <button
            className="apply-form__submit-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting…" : "Apply Now"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default JobApply;
