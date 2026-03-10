import Hero from "../../components/Hero/Hero";
import Discover from "../../components/Discover/Discover";
import Execution from "../../components/Execution/Execution";
import Service from "../../components/Service/Service";
import Explore from "../../components/Explore/Explore";
import ContactSection from "../../components/Contactsection/Contactsection";
import Footer from "../../components/Footer/Footer";


function Home() {
  return (
    <>
      <Hero />
      <Discover />
       <Execution />
      <Service />
      <Explore />
      <ContactSection />
      <Footer />  
    </>
  );
}

export default Home;