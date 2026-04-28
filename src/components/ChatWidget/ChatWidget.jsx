import { useState, useRef, useEffect, useCallback } from "react";
import "./ChatWidget.css";

const CHATBOT_URL = "https://mahibot-dpzf.onrender.com";

// ── Typing Indicator ─────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="cw-msg-row cw-msg-row--ai">
      <div className="cw-msg-avatar">M</div>
      <div className="cw-bubble cw-bubble--ai cw-bubble--typing">
        <span /><span /><span />
      </div>
    </div>
  );
}

// ── Single Message ────────────────────────────────────────────────────
function Message({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`cw-msg-row ${isUser ? "cw-msg-row--user" : "cw-msg-row--ai"}`}>
      {!isUser && <div className="cw-msg-avatar">M</div>}
      <div
        className={`cw-bubble ${isUser ? "cw-bubble--user" : "cw-bubble--ai"} ${
          msg.error ? "cw-bubble--error" : ""
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
}

// ── Main Chat Widget ──────────────────────────────────────────────────
export default function ChatWidget({ isOpen, onToggle }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm MAHIBOT 👋\nHow can I help you today?",
    },
  ]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef   = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, loading]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) setTimeout(() => textareaRef.current?.focus(), 420);
  }, [isOpen]);

  // Auto-resize textarea
  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 110) + "px";
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    autoResize();
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setLoading(true);

    try {
      const res = await fetch(`${CHATBOT_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, query: text }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const reply =
        data.response || data.reply || data.message ||
        data.answer   || data.text  ||
        "Sorry, I couldn't process that.";
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Oops! Something went wrong. Please try again.",
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const canSend = input.trim().length > 0 && !loading;

  return (
    <div
      className={`cw-panel ${isOpen ? "cw-panel--open" : ""}`}
      role="dialog"
      aria-label="MAHIBOT chat"
    >
      {/* Ambient glow layers */}
      <div className="cw-glow-top"    aria-hidden="true" />
      <div className="cw-glow-bottom" aria-hidden="true" />

      {/* Arrow notch pointing up toward the bird */}
      <div className="cw-arrow"       aria-hidden="true" />

      {/* ── Header ── */}
      <div className="cw-header">
        <div className="cw-header-left">
          <div className="cw-avatar-shell" aria-hidden="true">
            <div className="cw-avatar-ring" />
            <div className="cw-avatar-core">M</div>
            <span className="cw-online-dot" />
          </div>
          <div className="cw-header-text">
            <p className="cw-bot-name">MAHIBOT</p>
            <p className="cw-bot-status">
              <span className="cw-status-dot" aria-hidden="true" />
              Always online
            </p>
          </div>
        </div>

        <div className="cw-header-actions">
          <button
            className="cw-hdr-btn cw-hdr-btn--min"
            onClick={onToggle}
            title="Minimize"
            aria-label="Minimize chat"
          >
            <svg width="13" height="2" viewBox="0 0 13 2" fill="none">
              <path d="M0 1h13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button
            className="cw-hdr-btn cw-hdr-btn--close"
            onClick={onToggle}
            title="Close"
            aria-label="Close chat"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 1l10 10M11 1L1 11" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Messages — height grows with replies ── */}
      <div className="cw-messages">
        <div className="cw-date-sep" aria-hidden="true">Today</div>
        {messages.map((msg, i) => (
          <Message key={i} msg={msg} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* ── Input ── */}
      <div className="cw-input-area">
        <div className="cw-input-glass">
          <textarea
            ref={textareaRef}
            className="cw-textarea"
            placeholder="Ask  anything…"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKey}
            rows={1}
            disabled={loading}
            aria-label="Type a message"
          />
          <button
            className={`cw-send-btn${canSend ? " cw-send-btn--active" : ""}${loading ? " cw-send-btn--loading" : ""}`}
            onClick={sendMessage}
            disabled={!canSend}
            aria-label="Send"
          >
            {loading ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            )}
          </button>
        </div>
        <p className="cw-footer-note">
          Secured by <strong>MY MiTRAA Technology</strong>
        </p>
      </div>
    </div>
  );
}
