import "./EnterpriseTechHero.css";
import enterpriseBg from "../../assets/images/Ebterprisetechhero.png";

function EnterpriseTechHero() {
  return (
    <section
      className="entechhero__section"
      style={{ backgroundImage: `url(${enterpriseBg})` }}
    >
      <div className="entechhero__overlay"></div>

      <div className="entechhero__content">
        <div className="entechhero__line"></div>

        <div className="entechhero__text">
          <span className="entechhero__tag">Infrastructure &amp; Performance</span>
          <h1 className="entechhero__title">Enterprise Technology &amp; Performance</h1>
          <p className="entechhero__subtitle">
            Optimize your enterprise IT ecosystem for peak performance,
            scalability, and reliability — at any scale.
          </p>
        </div>
      </div>
    </section>
  );
}

export default EnterpriseTechHero;
