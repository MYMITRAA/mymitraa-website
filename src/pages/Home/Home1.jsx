import Hero from "../../components/Hero/Hero";
import Discover from "../../components/Discover/Discover";
import Execution from "../../components/Execution/Execution";
import Service from "../../components/Service/Service";
import Explore from "../../components/Explore/Explore";
import ContactSection from "../../components/Contactsection/Contactsection";
import Footer from "../../components/Footer/Footer";
import birdinicon from "../../assets/images/birdinicon.svg";
import "./Home.css";

function Home() {
  return (
    <>
      {/* Sticky floating bird — fixed to viewport, always visible on desktop */}
      <img
        src={birdinicon}
        alt="Floating Bird"
        className="home-floating-bird"
      />

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
