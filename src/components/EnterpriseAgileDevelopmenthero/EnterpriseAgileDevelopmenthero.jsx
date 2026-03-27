import "./EnterpriseAgileDevelopmenthero.css";
import genaiBg from "../../assets/images/genaiheroimg.svg";

function EnterpriseAgileDevelopmenthero() {
  return (
    <section
      className="enterprisehero__section"
      style={{ backgroundImage: `url(${genaiBg})` }}
    >
      <div className="enterprisehero__overlay"></div>

      <div className="enterprisehero__content">
        <div className="enterprisehero__line"></div>

        <div className="enterprisehero__text">
          <span className="enterprisehero__tag">Agile & DevOps</span>
          <h1 className="enterprisehero__title">
            Enterprise Agile Development
          </h1>
          <p className="enterprisehero__subtitle">
            Enable faster delivery, better collaboration, and continuous
            innovation by adopting scalable Agile and DevOps practices across
            your organization.
          </p>
        </div>
      </div>
    </section>
  );
}

export default EnterpriseAgileDevelopmenthero;