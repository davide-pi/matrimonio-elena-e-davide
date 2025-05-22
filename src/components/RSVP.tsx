import { Calendar, Phone } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { SpouseContactCard} from './SpouseContactCard';
import { WhatsApp } from '../icons/WhatsApp';
import { SPOUSES } from '../config/WeddingInfo';

const RSVP = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-beige-50/70 rounded-xl shadow-md p-6 md:p-8 border border-sage-200">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-lg text-sage-700 mb-6">
          {t('rsvp.deadline')}
        </p>

        <p className="flex items-center justify-center text-lg font-medium text-sage-800  mb-6">
          <Calendar className="mr-2" size={20} />
          {t('rsvp.deadlineDate')}
        </p>

        <h3 className="text-lg font-medium text-sage-800 mb-4">{t('rsvp.contact')}</h3>

        <div className="grid md:grid-cols-2 gap-4 text-sage-700">

          <SpouseContactCard spouse={SPOUSES.bride}/>

          <SpouseContactCard spouse={SPOUSES.groom}/>

        <p className="mt-6 text-sage-600 italic">
          {t('rsvp.dietary')}
        </p>
      </div>
    </div>
  );
};

export default RSVP;