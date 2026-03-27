
import Footer from "../../components/Footer/Footer";
import ContactSection from "../../components/Contactsection/Contactsection";

import AllServiceMid from "../../components/ServiceMid/AllServiceMid";
import Blockchainmid from "../../components/Blockchainmid/BlockchainMid";
import BlockchainHero from "../../components/Blockchainhero/BlockchainHero";

function Blockchain() {
  return (
    <>
       <BlockchainHero />
      <Blockchainmid />
      <AllServiceMid />
      <ContactSection />
       <Footer />
    </>
  );
}

export default Blockchain;