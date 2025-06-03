import { ArrowRight, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BRIDE, EVENT_DATE, GROOM } from "../config/WeddingInfo";
import i18next from "../i18n/config";
import CountdownTimer from "./CountdownTimer";

interface HeroSectionProps {
  countdownRef: React.RefObject<HTMLDivElement>;
  showStickyCountdown: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ countdownRef, showStickyCountdown }) => {
  const { t } = useTranslation();

  const partiallyFormattedDate = EVENT_DATE.toLocaleDateString(i18next.language == "ro" ? "ro-RO" : "it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  const formattedDate = partiallyFormattedDate.slice(0,3) + partiallyFormattedDate.charAt(3).toUpperCase() + partiallyFormattedDate.slice(4);

  const formattedTime = EVENT_DATE.toLocaleTimeString(i18next.language == "ro" ? "ro-RO" : "it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
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
          {formattedDate}
          {" • "}
          {formattedTime}
        </p>
        {/* Countdown Timer */}
        <div
          ref={countdownRef}
          className={`transition-all duration-500 ease-in-out transform ${
            showStickyCountdown ? "opacity-0" : "opacity-100"
          }`}
        >
          <CountdownTimer targetDate={EVENT_DATE} size="md" />
        </div>
        {/* Sticky Countdown Timer */}
        <div
          className={`fixed top-0 left-0 right-0 z-[50] py-2 pointer-events-none transition-all duration-500 ease-in-out transform ${
            showStickyCountdown ? "opacity-100" : "opacity-0"
          }`}
          style={{ minWidth: 0 }}
        >
          <div className="pointer-events-auto">
            <CountdownTimer targetDate={EVENT_DATE} size="sm" />
          </div>
        </div>
        <div className="mt-16 animate-fadeIn animation-delay-1000">
          <a
            href="#details"
            className="inline-flex items-center px-6 py-3 rounded-full bg-sage-600 text-white hover:bg-sage-700 transition-colors duration-300"
          >
            {t("app.discoverMore")} <ArrowRight className="ml-2" size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
