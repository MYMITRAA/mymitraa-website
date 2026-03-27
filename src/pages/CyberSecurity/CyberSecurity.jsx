import CyberSecurityhero from "../../components/CyberSecurityhero/CyberSecurityhero";
import Footer from "../../components/Footer/Footer";
import ContactSection from "../../components/Contactsection/Contactsection";
import CyberSecuritymid from "../../components/CyberSecuritymid/CyberSecuritymid";
import AllServiceMid from "../../components/ServiceMid/AllServiceMid";



function CyberSecurity() {
  return (
    <>
      <CyberSecurityhero />
      <CyberSecuritymid />
      <AllServiceMid />
      <ContactSection />
       <Footer />
    </>
  );
}

export default  CyberSecurity;