import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import EventDetails from "./components/EventDetails";
import Footer from "./components/Footer";
import Gift from "./components/Gift";
import HeroSection from "./components/HeroSection";
import LanguageSelector from "./components/LanguageSelector";
import RSVP from "./components/RSVP";
import SectionCard from "./components/SectionCard";

function App() {
  const { t } = useTranslation();
  document.title = t("app.title");

  const [isLoaded, setIsLoaded] = useState(false);
  const countdownRef = useRef<HTMLDivElement>(null);
  const [showStickyCountdown, setShowStickyCountdown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!countdownRef.current) return;
      const rect = countdownRef.current.getBoundingClientRect();
      const percentageVisible = Math.max(0,Math.min(1,(rect.bottom - Math.max(0, rect.top)) / rect.height));
      setShowStickyCountdown(percentageVisible < 0.9);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-serif text-sage-800">
      {/* Fixed background */}
      <div
        className={`fixed inset-0 bg-cover bg-center bg-mountains bg-no-repeat z-[0] transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{
          backgroundAttachment: "fixed",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(255, 255, 255, 0.75)"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/80"></div>
      </div>

      {/* Content */}
      <div
        data-testid="content-container"
        className={`relative z-[10] transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <LanguageSelector />

        {/* Hero Section */}
        <HeroSection countdownRef={countdownRef} showStickyCountdown={showStickyCountdown} />

        {/* Details Section */}
        <SectionCard id="details" title={t("details.title")}>
          <EventDetails />
        </SectionCard>

        {/* RSVP Section */}
        <SectionCard id="rsvp" title={t("rsvp.title")}>
          <RSVP />
        </SectionCard>

        {/* Gift Section */}
        <SectionCard id="gift" title={t("gift.title")}>
          <Gift />
        </SectionCard>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
