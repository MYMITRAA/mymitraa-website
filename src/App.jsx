import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Aboutus from "./pages/Aboutus/Aboutus";
import Careers from "./pages/Careers/Careers";
import News from "./pages/News/News";
import Genai from "./pages/Genai/Genai";
import Web from "./pages/Web/Web";

import Service from "./components/Service/Service";
import Execution from "./components/Execution/Execution";

import Landingslider from "./pages/LandingSlider/LandingSlider";

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>

        {/* Landing page */}
        <Route path="/" element={<Landingslider />} />

        {/* Main Website */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />

              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/aboutus" element={<Aboutus />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/news" element={<News />} />
                <Route path="/genai" element={<Genai />} />
                <Route path="/web" element={<Web />} />
                <Route path="/service" element={<Service />} />
                <Route path="/execution" element={<Execution />} />
              </Routes>
            </>
          }
        />

      </Routes>
    </>
  );
}

export default App;