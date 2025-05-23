import { Calendar } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { BRIDE, GROOM } from '../config/WeddingInfo';
import SpouseContactCard from './SpouseContactCard';

const RSVP = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-beige-50/25 backdrop-blur-sm rounded-xl shadow-md p-6 md:p-8 hover:shadow-lg transition-shadow duration-300">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-sage-700 mb-6">
          {t('rsvp.deadline')}
        </p>

        <p className="flex items-center justify-center text-lg font-medium text-sage-800 mb-6">
          <Calendar className="mr-2" size={20} />
          {t('rsvp.deadlineDate')}
        </p>

        <h3 className="font-medium text-sage-800 mb-4">{t('rsvp.contact')}</h3>

        <div className="grid md:grid-cols-2 gap-4 text-sage-700">
          <SpouseContactCard {...BRIDE}/>

          <SpouseContactCard {...GROOM}/>
        </div>

        <p className="mt-6 text-sage-600 italic">
          {t('rsvp.dietary')}
        </p>
      </div>
    </div>
  );
};

export default RSVP;