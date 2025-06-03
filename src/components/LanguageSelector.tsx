import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

const LanguageSelector: React.FC = () => {
  const languages = [
    { code: "it", label: "Italiano" },
    { code: "ro", label: "Română" },
  ];

  const { i18n } = useTranslation();
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lng", lang);
    document.documentElement.lang = lang;
  };

  return (
    <div className="fixed top-4 right-4 z-[60]">
      <div className="relative group">
        <button
          className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white/90 transition-colors duration-300"
          aria-label="Select language"
        >
          <Languages className="w-6 h-6 text-sage-700" />
        </button>

        <div className="absolute right-0 mt-2 w-32 py-2 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full px-4 py-2 text-left hover:bg-sage-50 transition-colors ${
                i18n.language === lang.code
                  ? "text-sage-800 font-semibold"
                  : "text-sage-600"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
