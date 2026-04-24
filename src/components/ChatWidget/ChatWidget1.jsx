import { useState, useRef, useEffect } from "react";
import "./ChatWidget.css";

const CHATBOT_URL = "https://mahibot-dpzf.onrender.com";

export default function ChatWidget({ isOpen, onToggle }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm MAHIBOT 👋 How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Try common FastAPI chatbot endpoint patterns
      const res = await fetch(`${CHATBOT_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, query: text }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();

      // Handle various response shapes
      const reply =
        data.response ||
        data.reply ||
        data.message ||
        data.answer ||
        data.text ||
        "Sorry, I didn't understand that.";

      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (err) {
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

  return (
    <div className={`cw-panel ${isOpen ? "cw-panel--open" : ""}`}>
      {/* Header */}
      <div className="cw-header">
        <div className="cw-header-info">
          <div className="cw-avatar">
            <span>M</span>
            <span className="cw-online-dot" />
          </div>
          <div>
            <p className="cw-name">MAHIBOT</p>
            <p className="cw-status">Always online</p>
          </div>
        </div>
        <button className="cw-close-btn" onClick={onToggle} aria-label="Close chat">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="cw-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`cw-bubble-wrap ${
              msg.role === "user" ? "cw-bubble-wrap--user" : "cw-bubble-wrap--ai"
            }`}
          >
            {msg.role === "assistant" && (
              <div className="cw-bubble-avatar">M</div>
            )}
            <div
              className={`cw-bubble ${
                msg.role === "user" ? "cw-bubble--user" : "cw-bubble--ai"
              } ${msg.error ? "cw-bubble--error" : ""}`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="cw-bubble-wrap cw-bubble-wrap--ai">
            <div className="cw-bubble-avatar">M</div>
            <div className="cw-bubble cw-bubble--ai cw-typing">
              <span /><span /><span />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="cw-input-area">
        <textarea
          ref={inputRef}
          className="cw-input"
          placeholder="Ask Mitra anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          rows={1}
          disabled={loading}
        />
        <button
          className={`cw-send-btn ${loading ? "cw-send-btn--loading" : ""}`}
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          aria-label="Send"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <p className="cw-footer-note">Powered by MY MiTRAA Technology</p>
    </div>
  );
}
