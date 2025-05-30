import { useState } from "react";
import { useTranslation } from "react-i18next";

const Gift = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const iban = "IT87Y0306965734100000005260";

  const handleCopyIban = () => {
    navigator.clipboard
      .writeText(iban)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="bg-beige-50/25 backdrop-blur-sm rounded-xl shadow-md p-6 md:p-8 text-center hover:shadow-lg transition-shadow duration-300">
      <div className="mb-8">
        <p className="text-sage-700">{t("gift.description")}</p>
        <p className="text-sage-700 mt-4">{t("gift.contribution")}</p>
      </div>

      <div className="relative">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg py-3 px-4 mb-4 font-mono text-sage-800 break-all text-sm sm:text-base overflow-x-auto shadow-sm hover:shadow-md transition-all duration-300 border border-sage-100">
          <span className="inline-block min-w-full text-center">
            {t("gift.iban")}
          </span>
          <button
            onClick={handleCopyIban}
            className="text-sage-500 hover:text-sage-700 transition-colors px-2"
          >
            {iban}
          </button>
        </div>

        {copied && (
          <div className="text-sage-600 text-sm animate-fadeIn">
            {t("gift.copied")}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gift;
