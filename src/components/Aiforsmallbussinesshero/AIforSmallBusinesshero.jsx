import "./AIforSmallBusinesshero.css";
import smallBizBg from "../../assets/images/genaiheroimg.jpg";

function AIforSmallBusinesshero() {
  return (
    <section
      className="aismhero__section"
      style={{ backgroundImage: `url(${smallBizBg})` }}
    >
      <div className="aismhero__overlay"></div>

      <div className="aismhero__content">
        <div className="aismhero__line"></div>

        <div className="aismhero__text">
          <span className="aismhero__tag">Growth &amp; Innovation</span>
          <h1 className="aismhero__title">AI for Small Business</h1>
          <p className="aismhero__subtitle">
            Affordable, scalable, and easy-to-deploy AI solutions that drive
            growth without complexity — built for small and medium businesses.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AIforSmallBusinesshero;
