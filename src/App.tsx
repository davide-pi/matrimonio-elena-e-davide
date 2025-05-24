import { ArrowRight, Calendar, CalendarCheck2, MessageCircle, PlaneIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import CountdownTimer from "./components/CountdownTimer";
import EventDetails from "./components/EventDetails";
import Footer from "./components/Footer";
import Gift from "./components/Gift";
import LanguageSelector from "./components/LanguageSelector";
import RSVP from "./components/RSVP";
import Schedule from "./components/Schedule";
import { BRIDE, EVENT_DATE, GROOM } from "./config/WeddingInfo";

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
      setShowStickyCountdown(rect.bottom < 0 || rect.top > window.innerHeight || rect.bottom < 60);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-serif text-sage-800">
      {/* Fixed background */}
      <div
        className={`fixed inset-0 bg-cover bg-center bg-no-repeat z-0  transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/4064432/pexels-photo-4064432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          backgroundAttachment: "fixed",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(255, 255, 255, 0.75)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/80"></div>
      </div>

      {/* Content */}
      <div className={`relative z-10 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`} >
        <LanguageSelector />

        {/* Hero Section */}
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-sage-600 italic mb-2 animate-fadeIn">
              {t("app.announcement")}
            </p>
            <h1 className="font-cursive text-5xl md:text-7xl mb-6 text-sage-800 animate-fadeIn animation-delay-300">
              {BRIDE.name} <span className="text-sage-600">&</span> {GROOM.name}
            </h1>

            <p className="text-xl md:text-2xl mb-12 animate-fadeIn animation-delay-600">
              <Calendar className="inline-block mr-2 mb-1" size={20} />
              {/* Use start date and time from config */}
              {EVENT_DATE.toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" })}
              {" • "}
              {EVENT_DATE.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}
            </p>

            <div ref={countdownRef}>
              <CountdownTimer targetDate={EVENT_DATE} size="md" />
            </div>

            <div className="mt-16 animate-fadeIn animation-delay-1000">
              <a
                href="#details"
                className="inline-flex items-center px-6 py-3 rounded-full bg-sage-600 text-white hover:bg-sage-700 transition-colors duration-300"
              >
                {t("app.discoverMore")}{" "}
                <ArrowRight className="ml-2" size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Sticky Countdown */}
        {showStickyCountdown && <StickyCountdown />}

        {/* Details Section */}
        <section id="details" className="py-8 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-center font-cursive text-sage-800 mb-12">
              {t("details.title")}
            </h2>
            <EventDetails />
          </div>
        </section>


        {/* RSVP Section */}
        <section id="rsvp" className="py-8 px-4 md:px-8">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-center font-cursive text-sage-800 mb-12">
              <MessageCircle className="inline-block mr-2 mb-1" size={28} />
              {t("rsvp.title")}
            </h2>
            <RSVP />
          </div>
        </section>

        {/* Schedule Section */}
        <section id="details" className="py-8 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-center font-cursive text-sage-800 mb-10 flex items-center justify-center gap-2">
              <CalendarCheck2 className="inline-block mb-1" size={28} />
              {t("schedule.title")}
            </h2>
            <Schedule />
          </div>
        </section>

        {/* Gift Section */}
        <section id="gift" className="py-8 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-center font-cursive text-sage-800 mb-12">
              <PlaneIcon className="inline-block mr-2 mb-1" size={28} />
              {t("gift.title")}
            </h2>
            <Gift />
          </div>
        </section>


        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

function StickyCountdown() {
  return (
    <div
      className="fixed left-1/2 top-8 -translate-x-1/2 z-50 flex justify-center items-center w-full pointer-events-none"
      style={{ minWidth: 0 }}
    >
      <div className="pointer-events-auto">
        <CountdownTimer targetDate={EVENT_DATE} size="sm" />
      </div>
    </div>
  );
}

export default App;
