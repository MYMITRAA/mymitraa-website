import "./Webhero.css";
import WebBg from "../../assets/images/webhero.jpg"; 

function Webhero() {
  return (
    <section
      className="web-hero"
      style={{ backgroundImage: `url(${WebBg})` }}
    >
      <div className="web-overlay"></div>

      <div className="web-content">
        <div className="web-line"></div>

        <div className="web-text">
          <h1>Web & Application Development</h1>
          <p>Building modern web and application platforms powered by intelligent, scalable AI solutions</p>
        </div>
      </div>
    </section>
  );
}

export default Webhero;