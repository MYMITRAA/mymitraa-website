import blockchain from "../../assets/images/blockchainimage.png";
import "./ServicesContent.css";
import { useNavigate } from "react-router-dom";




export default function Blockchain() {
  const navigate = useNavigate();
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

         <button onClick={() => navigate("/blockchain")}>View More</button>

      </div>

    </div>
  );
}