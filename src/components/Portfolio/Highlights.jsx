import "./Highlights.css";

const highlights = [
  { emoji: "🏢", label: "Enterprise SaaS platforms"    },
  { emoji: "🤖", label: "AI-powered automation tools"  },
  { emoji: "🔗", label: "Fintech applications"         },
  { emoji: "🛒", label: "E-commerce projects"          },
];

function Highlights() {
  return (
    <section className="portfolio__highlights">
      <div className="portfolio__highlights-container">
        <div className="portfolio__highlights-header">
          <div>
            <span className="section-label">Portfolio Highlights</span>
            <h2 className="portfolio__highlights-title">
              Industries<br />We've Shaped
            </h2>
          </div>
          <p className="portfolio__highlights-desc">
            A snapshot of the domains and industries where we've delivered
            measurable, lasting impact for our partners.
          </p>
        </div>
        <div className="portfolio__highlights-grid">
          {highlights.map((item, i) => (
            <div key={i} className="portfolio__highlight-card">
              <div className="portfolio__highlight-emoji-wrap">
                <span className="portfolio__highlight-emoji">{item.emoji}</span>
              </div>
              <p className="portfolio__highlight-label">{item.label}</p>
            </div>
          ))}
        </div>
        <p className="portfolio__positioning">
          "Positioned as a strategic partner, not just a vendor —
          we become an extension of your team."
        </p>
      </div>
    </section>
  );
}

export default Highlights;
