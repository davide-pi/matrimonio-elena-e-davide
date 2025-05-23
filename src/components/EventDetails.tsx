import { MapPin, Calendar, Clock, CalendarPlus2 } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { atcb_action } from 'add-to-calendar-button';

const EventDetails: React.FC = () => {
  const { t } = useTranslation();

  // Calendar config for atcb_action
  const calendarConfig = {
    name: t('calendar.name'),
    description: t('calendar.description'),
    startDate: "2025-09-20",
    startTime: "16:30",
    endDate: "2025-09-20",
    endTime: "23:59",
    location: t('calendar.location'),
    options: ["Google", "Outlook.com", "Apple"] as ["Google", "Outlook.com", "Apple"],
    timeZone: "Europe/Rome",
    buttonStyle: "round" as const,
    hideTextLabelButton: false,
    size: "4",
    label: t('details.addToCalendar'),
    styleLight: "--btn-background: #ffffffbf; --btn-text: #495c41; --btn-shadow: #000000; --btn-shadow-hover: #000000; --btn-background-hover: #ffffffbf;",
    listStyle: "modal" as const,
    trigger: "click",
    hideBackground: false,
    hideCheckmark: false,
    hideBranding: false,
    language: "it" as const
  };

  const handleCalendarClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    atcb_action(calendarConfig, e.currentTarget);
  };

  return (
    <div className="bg-beige-50/25 backdrop-blur-sm rounded-xl shadow-md p-6 md:p-8 hover:shadow-lg transition-shadow duration-300">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-sage-800 flex items-center">
              <Calendar className="inline-block mr-2" size={20} />
              {t('details.date')}
            </h3>
            <p className="text-sage-700">{t('app.date')}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-sage-800 flex items-center">
              <Clock className="inline-block mr-2" size={20} />
              {t('details.time')}
            </h3>
            <p className="text-sage-700">{t('details.ceremony')}</p>
            <p className="text-sage-700">{t('details.reception')}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-sage-800 flex items-center">
              <MapPin className="inline-block mr-2" size={20} />
              {t('details.location')}
            </h3>
            <p className="text-sage-700">{t('details.venue')}</p>
            <p className="text-sage-700">{t('details.address')}</p>
            <p className="text-sage-700">{t('details.city')}</p>
            <a
              href="https://maps.app.goo.gl/dXv5HdSq86oLbJQo8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-2 text-sage-600 hover:text-sage-800 hover:underline transition-colors"
            >
              {t('details.viewMap')}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden shadow-md h-64 md:h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2827.465054025074!2d9.965048812450966!3d44.87318407094978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4780f53c9fc52ebb%3A0x5cc2ba644256f74e!2sLa%20Rondanina!5e0!3m2!1sen!2sit!4v1747834896773!5m2!1sen!2sit"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={t('details.venue')}
          ></iframe>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={handleCalendarClick}
          className="bg-white/75 p-4 rounded-full shadow-sm hover:shadow-lg transition-all duration-300"
          id="custom-calendar-btn"
        >
        <CalendarPlus2 className="inline-block mr-2" size={20} />
          {t('details.addToCalendar')}
        </button>
      </div>
    </div>
  );
};

export default EventDetails;