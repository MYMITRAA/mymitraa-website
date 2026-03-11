import blockchain from "../../assets/images/blockchainimage.png";
import "./ServicesContent.css";

export default function Blockchain() {
  return (
    <div className="service-container">

      <img src={blockchain} alt="Blockchain" />

      <div className="service-text">

        <h2>Blockchain (Web3)</h2>

        <p>
          We create blockchain solutions where trust, transparency, and automation matter.
        </p>

        <p>
          Using AI-driven logic and smart contracts, we help businesses design
          secure, efficient, and future-ready decentralized systems that
          simplify operations and strengthen digital trust.
        </p>

        <button>View More</button>

      </div>

    </div>
  );
}