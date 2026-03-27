
import Footer from "../../components/Footer/Footer";
import ContactSection from "../../components/Contactsection/Contactsection";

import AllServiceMid from "../../components/ServiceMid/AllServiceMid";
import  EnterpriseTechMid from "../../components/EnterpriseTechMid/EnterpriseTechMid";
import EnterpriseTechHero from "../../components/EnterpriseTechHero/EnterpriseTechHero";




function EnterpriseTech() {
  return (
    <>
        <EnterpriseTechHero />
      <EnterpriseTechMid />
      <AllServiceMid />
      <ContactSection />
       <Footer />
    </>
  );
}

export default EnterpriseTech;