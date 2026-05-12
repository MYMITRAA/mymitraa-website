import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Contactsection.css";

// ─── Country Codes ────────────────────────────────────────────────────────────
const COUNTRY_CODES = [
  { code: "+91", country: "IN", flag: "🇮🇳", name: "India" },
  { code: "+1",  country: "CA", flag: "🇨🇦", name: "Canada" },
  { code: "+1",  country: "US", flag: "🇺🇸", name: "USA" },
  { code: "+44", country: "GB", flag: "🇬🇧", name: "UK" },
  { code: "+61", country: "AU", flag: "🇦🇺", name: "Australia" },
  { code: "+971",country: "AE", flag: "🇦🇪", name: "UAE" },
  { code: "+65", country: "SG", flag: "🇸🇬", name: "Singapore" },
];

// ─── EmailJS Configuration ────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_rfeharh";
const EMAILJS_TEMPLATE_ID = "template_6jsgzmg";
const EMAILJS_PUBLIC_KEY  = "CriDeVu3IjSdV9aBW";

// ─── Validation helpers ───────────────────────────────────────────────────────
function validate(fields, file) {
  const errs = {};
  if (!fields.name.trim())                              errs.name  = "Full name is required.";
  else if (fields.name.trim().length < 2)               errs.name  = "Name must be at least 2 characters.";

  if (!fields.email.trim())                             errs.email = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = "Enter a valid email address.";

  if (!fields.phone.trim())                             errs.phone = "Contact number is required.";
  else if (!/^\d{7,15}$/.test(fields.phone.replace(/\s/g, ""))) errs.phone = "Enter a valid phone number (7–15 digits).";

  if (file && file.size > 50 * 1024) errs.file = "File size must be under 50 KB. Please compress your resume and try again.";

  return errs;
}

// ─── Email addresses ──────────────────────────────────────────────────────────
const EMAILS = [
  { label : "hr",       address: "hr@mitratechgroup.com" },
  { label: "CEO",       address: "mitraaceo@mitratechgroup.com" },
  { label: "info",      address: "info@mitratechgroup.com" },
  { label: "contact",   address: "contact@mitratechgroup.com" },
  { label: "support",   address: "support@mitratechgroup.com" },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function ContactSection() {
  const fileInputRef = useRef(null);

  const [fields, setFields]         = useState({ name: "", email: "", phone: "", description: "" });
  const [errors, setErrors]         = useState({});
  const [touched, setTouched]       = useState({});
  const [selectedCC, setSelectedCC] = useState(COUNTRY_CODES[0]);
  const [showCCDropdown, setShowCCDropdown] = useState(false);
  const [attachedFile, setAttachedFile]     = useState(null);
  const [sending, setSending]               = useState(false);
  const [toast, setToast]                   = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...fields, [name]: value };
    setFields(updated);
    if (touched[name]) {
      const errs = validate(updated, attachedFile);
      setErrors((prev) => ({ ...prev, [name]: errs[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errs = validate(fields, attachedFile);
    setErrors((prev) => ({ ...prev, [name]: errs[name] }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 50 * 1024) {
      setErrors((prev) => ({ ...prev, file: "File size must be under 50 KB. Please compress your resume and try again." }));
      return;
    }
    setErrors((prev) => ({ ...prev, file: undefined }));
    setAttachedFile(file);
  };

  const removeFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setErrors((prev) => ({ ...prev, file: undefined }));
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true });
    const errs = validate(fields, attachedFile);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSending(true);
    try {
      let fileBase64 = "";
      let fileName   = "";
      if (attachedFile) {
        fileName   = attachedFile.name;
        fileBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload  = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(attachedFile);
        });
      }

      const templateParams = {
        from_name      : fields.name,
        from_email     : fields.email,
        phone          : `${selectedCC.code} ${fields.phone}`,
        message        : fields.description || "(No description provided)",
        attachment_name: fileName || "No attachment",
        ...(fileBase64 ? { attachment: fileBase64 } : {}),
      };

      emailjs.init(EMAILJS_PUBLIC_KEY);
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

      setFields({ name: "", email: "", phone: "", description: "" });
      setTouched({});
      setErrors({});
      setAttachedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      showToast("✅ Your proposal request has been sent successfully!", "success");
    } catch (err) {
      console.error("EmailJS error:", err);
      showToast("❌ Failed to send. Please try again or email us directly.", "error");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section className="contact-section">
        <div className="contact-container">

          {/* ── LEFT ── */}
          <div className="contact-left">
            <h2 className="contact-title">
              We are Excited to Be a Part <br />
              of Your Next Big Project!
            </h2>

            <p className="contact-subtext">
              Your big dreams deserve the right strategy. Fill out the form,
              pick a time that works for you, and let's connect!
            </p>

            <div className="contact-info">

              {/* Phone — India */}
              <div className="info-item">
                <span className="info-icon">🇮🇳</span>
                <a href="tel:+919938330784" className="info-link">+91 99383 30784</a>
              </div>

              {/* Phone — Canada */}
              <div className="info-item">
                <span className="info-icon">🇨🇦</span>
                <a href="tel:+12263390503" className="info-link">+1 (226) 339-0503</a>
              </div>

              {/* Email addresses */}
              <div className="info-item info-item--emails">
                <span className="info-icon">✉️</span>
                <div className="info-email-list">
                  {EMAILS.map(({ label, address }) => (
                    <a
                      key={address}
                      href={`https://mail.google.com/mail/?view=cm&to=${address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="info-email-link"
                    >
                      <span className="email-label">{label}</span>
                      <span className="email-address">{address}</span>
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="contact-right">
            <form className="contact-form" onSubmit={handleSubmit} noValidate>

              {/* Full Name */}
              <div className="form-group">
                <label>Full Name <span>*</span></label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  value={fields.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.name && touched.name ? "input-error" : ""}
                />
                {errors.name && touched.name && <p className="error-msg">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="form-group">
                <label>Email ID <span>*</span></label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email ID"
                  value={fields.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email && touched.email ? "input-error" : ""}
                />
                {errors.email && touched.email && <p className="error-msg">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="form-group">
                <label>Contact Number <span>*</span></label>
                <div className="phone-group">
                  <div
                    className="country-code"
                    onClick={() => setShowCCDropdown((v) => !v)}
                    style={{ position: "relative" }}
                  >
                    <span style={{ fontSize: "18px" }}>{selectedCC.flag}</span>
                    <span style={{ fontSize: "12px" }}>{selectedCC.code}</span>
                    <span>▾</span>

                    {showCCDropdown && (
                      <div className="cc-dropdown">
                        {COUNTRY_CODES.map((cc, i) => (
                          <div
                            key={i}
                            className="cc-option"
                            onClick={(ev) => {
                              ev.stopPropagation();
                              setSelectedCC(cc);
                              setShowCCDropdown(false);
                            }}
                          >
                            <span style={{ fontSize: "18px" }}>{cc.flag}</span>
                            <span>{cc.name} ({cc.code})</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter Contact Number"
                    value={fields.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.phone && touched.phone ? "input-error" : ""}
                  />
                </div>
                {errors.phone && touched.phone && <p className="error-msg">{errors.phone}</p>}
              </div>

              {/* Description */}
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="Enter Description"
                  value={fields.description}
                  onChange={handleChange}
                />
              </div>

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                onChange={handleFileChange}
              />

              {/* Bottom row */}
              <div className="form-bottom">
                <div>
                  <div className="attach" onClick={() => fileInputRef.current?.click()}>
                    📎 <span>{attachedFile ? "Change document" : "Attach your document"}</span>
                  </div>

                  {attachedFile && (
                    <div className="attached-file">
                      {attachedFile.name}&nbsp;
                      ({(attachedFile.size / 1024).toFixed(1)} KB)
                      <span className="remove-file" onClick={removeFile} title="Remove">✕</span>
                    </div>
                  )}
                  {errors.file && <p className="error-msg">{errors.file}</p>}
                </div>

                <button type="submit" className="proposal-btn" disabled={sending}>
                  {sending ? "Sending…" : "Request Proposal"}
                </button>
              </div>

            </form>
          </div>

        </div>
      </section>

      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.msg}
        </div>
      )}
    </>
  );
}
