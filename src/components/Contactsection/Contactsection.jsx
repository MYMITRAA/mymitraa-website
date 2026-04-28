import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

// ─── CSS Styles injected as a style tag ───────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

  /* ================= CONTACT SECTION ================= */
  .contact-section {
    width: 100%;
    padding: 120px 0;
    background-color: #F6F7FB;
  }

  .contact-container {
    width: 100%;
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 120px;
    box-sizing: border-box;
  }

  /* ================= LEFT ================= */
  .contact-left {
    width: 50%;
    flex-shrink: 0;
  }

  .contact-title {
    font-family: "Helvetica Neue", sans-serif;
    font-size: 42px;
    font-weight: 500;
    line-height: 54px;
    color: #0e1726;
    margin-bottom: 24px;
  }

  .contact-subtext {
    font-family: "Inter", sans-serif;
    font-size: 16px;
    line-height: 26px;
    color: #555;
    margin-bottom: 40px;
    max-width: 420px;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .info-item {
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 16px;
    color: #0e1726;
    font-family: "Inter", sans-serif;
  }

  .info-item img {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
  }

  /* ================= RIGHT ================= */
  .contact-right {
    width: 45%;
    flex-shrink: 0;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .form-group label {
    font-family: "Inter", sans-serif;
    font-size: 14px;
    margin-bottom: 8px;
    display: block;
    color: #1c1c1c;
  }

  .form-group label span {
    color: #ff5c00;
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    height: 52px;
    padding: 0 16px;
    border-radius: 12px;
    border: 1px solid #E0E0E0;
    background: #FFFFFF;
    font-size: 14px;
    font-family: "Inter", sans-serif;
    box-sizing: border-box;
    outline: none;
    transition: border-color 0.2s;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    border-color: #514AD7;
  }

  .form-group input.input-error,
  .form-group textarea.input-error {
    border-color: #e53e3e !important;
    background: #fff5f5;
  }

  .form-group textarea {
    height: 120px;
    padding-top: 14px;
    resize: none;
  }

  .error-msg {
    font-family: "Inter", sans-serif;
    font-size: 12px;
    color: #e53e3e;
    margin-top: 5px;
  }

  /* ================= PHONE GROUP ================= */
  .phone-group {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .phone-group input {
    flex: 1;
  }

  .country-code {
    width: 80px;
    height: 52px;
    background: #f2f2f2;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    cursor: pointer;
    flex-shrink: 0;
    font-size: 14px;
    position: relative;
    border: 1px solid #E0E0E0;
    box-sizing: border-box;
  }

  .country-code img {
    width: 20px;
    height: 14px;
  }

  /* Country Code Dropdown */
  .cc-dropdown {
    position: absolute;
    top: 58px;
    left: 0;
    background: #fff;
    border: 1px solid #E0E0E0;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    z-index: 100;
    min-width: 200px;
    max-height: 220px;
    overflow-y: auto;
  }

  .cc-option {
    padding: 10px 14px;
    font-size: 13px;
    font-family: "Inter", sans-serif;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #0e1726;
  }

  .cc-option:hover {
    background: #f6f7fb;
  }

  .cc-option img {
    width: 20px;
    height: 14px;
  }

  /* ================= FORM BOTTOM ================= */
  .form-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  .attach {
    font-size: 14px;
    cursor: pointer;
    color: #1c1c1c;
    font-family: "Inter", sans-serif;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .attach span {
    text-decoration: underline;
  }

  .attached-file {
    font-size: 12px;
    color: #514AD7;
    font-family: "Inter", sans-serif;
    margin-top: 6px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .remove-file {
    cursor: pointer;
    color: #e53e3e;
    font-size: 14px;
    font-weight: bold;
  }

  .proposal-btn {
    width: 155.56px;
    height: 40px;
    padding: 0;
    border-radius: 44px;
    border: none;
    background: #514AD7;
    color: white;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.6px;
    font-family: "Inter", sans-serif;
    cursor: pointer;
    transition: 0.3s;
    white-space: nowrap;
  }

  .proposal-btn:hover:not(:disabled) {
    opacity: 0.9;
  }

  .proposal-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Toast Notification */
  .toast {
    position: fixed;
    bottom: 32px;
    right: 32px;
    padding: 16px 24px;
    border-radius: 12px;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    z-index: 9999;
    box-shadow: 0 8px 32px rgba(0,0,0,0.18);
    animation: slideIn 0.3s ease;
  }

  .toast.success { background: #38a169; }
  .toast.error   { background: #e53e3e; }

  @keyframes slideIn {
    from { transform: translateY(20px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }

  /* ================= TABLET ================= */
  @media (max-width: 1280px) {
    .contact-container { gap: 80px; padding: 0 40px; }
  }

  @media (max-width: 1024px) {
    .contact-section { padding: 80px 0; }
    .contact-container { padding: 0 30px; gap: 48px; }
    .contact-title { font-size: 34px; line-height: 44px; }
    .contact-left { width: 48%; }
    .contact-right { width: 52%; }
  }

  /* ================= MOBILE ================= */
  @media (max-width: 768px) {
    .contact-section { padding: 0; background-color: #F6F7FB; }
    .contact-container { flex-direction: column; padding: 0; gap: 0; box-sizing: border-box; }

    .contact-left {
      width: 100%; flex-shrink: unset;
      background: linear-gradient(135deg, #6C63FF 0%, #514AD7 100%);
      padding: 52px 28px 44px; box-sizing: border-box;
    }

    .contact-title { font-size: 26px; line-height: 38px; font-weight: 600; color: #ffffff; margin-bottom: 14px; }
    .contact-title br { display: none; }
    .contact-subtext { font-size: 14px; line-height: 24px; color: rgba(255,255,255,0.78); margin-bottom: 36px; max-width: 100%; }
    .contact-info { gap: 0; background: rgba(255,255,255,0.12); border-radius: 16px; overflow: hidden; }
    .info-item { font-size: 14px; color: #ffffff; gap: 14px; padding: 14px 18px; border-bottom: 1px solid rgba(255,255,255,0.12); }
    .info-item:last-child { border-bottom: none; }
    .info-item p { margin: 0; }
    .info-item img { width: 22px; height: 22px; }

    .contact-right { width: 100%; flex-shrink: unset; background: #ffffff; padding: 36px 24px 48px; box-sizing: border-box; }
    .contact-right::before { content: "Send us a message"; display: block; font-family: "Inter", sans-serif; font-size: 18px; font-weight: 600; color: #0e1726; margin-bottom: 28px; letter-spacing: -0.3px; }

    .contact-form { gap: 20px; }
    .form-group label { font-size: 13px; font-weight: 500; color: #444; margin-bottom: 7px; letter-spacing: 0.1px; }

    .form-group input,
    .form-group textarea {
      height: 52px; font-size: 14px; border-radius: 12px;
      border: 1.5px solid #EBEBEB; background: #FAFAFA; color: #0e1726; padding: 0 16px;
    }

    .form-group input::placeholder,
    .form-group textarea::placeholder { color: #b0b0b0; }

    .form-group input:focus,
    .form-group textarea:focus { border-color: #514AD7; background: #ffffff; }

    .form-group textarea { height: 120px; padding-top: 14px; }
    .phone-group { gap: 10px; }
    .country-code { width: 72px; height: 52px; border-radius: 12px; background: #EBEBEB; font-size: 13px; gap: 5px; }
    .country-code img { width: 20px; height: 14px; }

    .form-bottom { flex-direction: column; align-items: stretch; gap: 16px; margin-top: 4px; }
    .attach { justify-content: center; font-size: 13px; color: #666; padding: 13px 0; border: 1.5px dashed #D0D0D0; border-radius: 12px; background: #FAFAFA; gap: 8px; }
    .attach span { text-decoration: none; font-weight: 500; color: #514AD7; }

    .proposal-btn {
      width: 100%; height: 54px; border-radius: 14px; font-size: 15px; font-weight: 600;
      letter-spacing: 0.1px; background: linear-gradient(135deg, #6C63FF 0%, #514AD7 100%);
      box-shadow: 0 6px 24px rgba(81,74,215,0.28);
    }

    .proposal-btn:hover:not(:disabled) { opacity: 0.92; box-shadow: 0 8px 28px rgba(81,74,215,0.36); }
  }

  @media (max-width: 480px) {
    .contact-left { padding: 44px 20px 38px; }
    .contact-title { font-size: 23px; line-height: 34px; }
    .contact-right { padding: 30px 20px 44px; }
    .contact-form { gap: 18px; }
    .form-group input, .form-group textarea { height: 50px; font-size: 14px; }
    .form-group textarea { height: 110px; }
    .country-code { width: 68px; height: 50px; }
    .proposal-btn { height: 52px; font-size: 15px; }
  }
`;

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
// ⚠️ SETUP INSTRUCTIONS:
// 1. Go to https://www.emailjs.com and create a free account
// 2. Add an Email Service (Gmail / Outlook / etc.) → copy Service ID
// 3. Create an Email Template with these variables:
//      {{from_name}}, {{from_email}}, {{phone}}, {{message}}, {{attachment_name}}
//    Set "To Email" in template to: info@mitratechgroup.com
// 4. Go to Account → API Keys → copy your Public Key
// 5. Replace the three values below:

const EMAILJS_SERVICE_ID  = "service_rfeharh";   
const EMAILJS_TEMPLATE_ID = "template_6jsgzmg";  
const EMAILJS_PUBLIC_KEY  = "CriDeVu3IjSdV9aBW";  

// ─── Validation helpers ───────────────────────────────────────────────────────
function validate(fields, file) {
  const errs = {};
  if (!fields.name.trim())                              errs.name    = "Full name is required.";
  else if (fields.name.trim().length < 2)               errs.name    = "Name must be at least 2 characters.";

  if (!fields.email.trim())                             errs.email   = "Email address is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = "Enter a valid email address.";

  if (!fields.phone.trim())                             errs.phone   = "Contact number is required.";
  else if (!/^\d{7,15}$/.test(fields.phone.replace(/\s/g, ""))) errs.phone = "Enter a valid phone number (7–15 digits).";

  if (file && file.size > 50 * 1024)                   errs.file    = "File size must be under 50 KB. Please compress your resume and try again.";

  return errs;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ContactSection() {
  const fileInputRef = useRef(null);

  const [fields, setFields] = useState({ name: "", email: "", phone: "", description: "" });
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});
  const [selectedCC, setSelectedCC] = useState(COUNTRY_CODES[0]);
  const [showCCDropdown, setShowCCDropdown] = useState(false);
  const [attachedFile, setAttachedFile]     = useState(null);
  const [sending, setSending]               = useState(false);
  const [toast, setToast]                   = useState(null); // { msg, type }

  // ── Field change ──────────────────────────────────────────────────────────
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

  // ── File attach ───────────────────────────────────────────────────────────
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

  // ── Show toast ────────────────────────────────────────────────────────────
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all as touched
    setTouched({ name: true, email: true, phone: true });
    const errs = validate(fields, attachedFile);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSending(true);

    try {
      // Convert file to base64 if present
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
        // EmailJS supports sending file as base64 via 'attachment' key
        // Only works if your EmailJS template is configured for attachments
        ...(fileBase64 ? { attachment: fileBase64 } : {}),
      };

      // Initialize EmailJS (safe to call multiple times)
      emailjs.init(EMAILJS_PUBLIC_KEY);

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

      // Reset form
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

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Inject styles */}
      <style>{styles}</style>

      {/* Load EmailJS SDK */}
      <script
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
        async
      />

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
              <div className="info-item">
                <span style={{ fontSize: "22px" }}>🇮🇳</span>
                <p>+91 99833 30784</p>
              </div>
              <div className="info-item">
                <span style={{ fontSize: "22px" }}>🇨🇦</span>
                <p>+1 (226) 339-0503</p>
              </div>
              <div className="info-item">
                <span style={{ fontSize: "20px" }}>✉️</span>
                <p>info@mitratechgroup.com</p>
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
                  {/* Country Code Picker */}
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

              {/* File Input (hidden) */}
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
                  <div
                    className="attach"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    📎 <span>
                      {attachedFile ? "Change document" : "Attach your document"}
                    </span>
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

                <button
                  type="submit"
                  className="proposal-btn"
                  disabled={sending}
                >
                  {sending ? "Sending…" : "Request Proposal"}
                </button>
              </div>

            </form>
          </div>

        </div>
      </section>

      {/* Toast */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.msg}
        </div>
      )}
    </>
  );
}
