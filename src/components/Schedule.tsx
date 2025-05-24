import { Sparkles } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { EVENT_DATE, SCHEDULE } from "../config/WeddingInfo";

const Schedule = () => {
  const { t } = useTranslation();
  const visibilityDate = new Date(
    EVENT_DATE.getTime() -
      SCHEDULE.visibilityBeforeEventDateInMinutes * 60 * 1000,
  );
  const now = useMemo(() => new Date(), []);
  const isEventDay = now >= visibilityDate;

  return (
    <div className="bg-beige-50/25 backdrop-blur-sm rounded-xl shadow-md p-6 md:p-8 hover:shadow-lg transition-shadow duration-300">
      <div className="max-w-xl mx-auto text-left">
        {isEventDay ? (
          <ol className="relative border-l border-sage-200">
            {SCHEDULE.items.map((item, idx) => {
              // Parse the event time for today
              const [h, m] = item.time.split(":").map(Number);
              const itemDate = new Date(EVENT_DATE);
              itemDate.setHours(h, m, 0, 0);
              const isPast = now > itemDate;
              return (
                <li
                  key={idx}
                  className={`relative -left-9 mb-10 ml-6 ${isPast ? "opacity-60 grayscale" : ""}`}
                >
                  <span className="flex absolute top-1 justify-center items-center w-6 h-6 bg-sage-100 rounded-full">
                    <Sparkles className="text-sage-500" size={16} />
                  </span>
                  <div className="flex flex-col md:flex-row md:items-center md:gap-4 pl-8">
                    <span className="text-sage-700 font-semibold text-lg md:text-xl">
                      {item.time}
                    </span>
                    <span className="text-sage-800 font-bold text-lg md:text-xl">
                      {t(item.titleKey)}
                    </span>
                  </div>
                  <p className="text-sage-600 mt-1 ml-0 md:ml-10 text-base pl-8">
                    {t(item.descKey)}
                  </p>
                </li>
              );
            })}
          </ol>
        ) : (
          <div className="text-center text-sage-700">
            <p>{t("schedule.funnyPhrase.firstLine")}</p>
            <p>{t("schedule.funnyPhrase.secondLine")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
