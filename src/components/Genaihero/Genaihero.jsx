import "./Genaihero.css";
import genaiBg from "../../assets/images/genaiheroimg.svg";

function Genaihero() {
  return (
    <section
      className="genaihero__section"
      style={{ backgroundImage: `url(${genaiBg})` }}
    >
      <div className="genaihero__overlay"></div>

      <div className="genaihero__content">
        <div className="genaihero__line"></div>

        <div className="genaihero__text">
          <span className="genaihero__tag">AI &amp; Automation</span>
          <h1 className="genaihero__title">Generative AI Solutions</h1>
          <p className="genaihero__subtitle">
            Unlock the next generation of intelligent automation — turning
            data and ideas into intelligent outcomes at scale.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Genaihero;