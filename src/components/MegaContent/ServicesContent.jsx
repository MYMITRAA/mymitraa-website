import GenAI from "./GenAIContent";
import Web from "./WebMobileContent";
import Blockchain from "./BlockchainContent";
import Agile from "./AgileContent";
import CyberSecurity from "./CyberSecurityContent";
import Enterprise from "./EnterpriseContent";

export default function ServicesContent({ service, closeMenu }) {

  if(service === "genai") return <GenAI closeMenu={closeMenu} />;

  if(service === "web") return <Web closeMenu={closeMenu} />;

  if(service === "blockchain") return <Blockchain closeMenu={closeMenu} />;

  if(service === "agile") return <Agile closeMenu={closeMenu} />;

  if(service === "security") return <CyberSecurity closeMenu={closeMenu} />;

  if(service === "enterprise") return <Enterprise closeMenu={closeMenu} />;

  return <GenAI closeMenu={closeMenu} />;
}