import "./BlockchainHero.css";
import blockchainBg from "../../assets/images/genaiheroimg.jpg";

function BlockchainHero() {
  return (
    <section
      className="blockhero__section"
      style={{ backgroundImage: `url(${blockchainBg})` }}
    >
      <div className="blockhero__overlay"></div>

      <div className="blockhero__content">
        <div className="blockhero__line"></div>

        <div className="blockhero__text">
          <span className="blockhero__tag">Blockchain &amp; Web3</span>
          <h1 className="blockhero__title">Blockchain (Web3)</h1>
          <p className="blockhero__subtitle">
            Empower your business with decentralized technologies that enhance
            transparency, security, and trust.
          </p>
        </div>
      </div>
    </section>
  );
}

export default BlockchainHero;
