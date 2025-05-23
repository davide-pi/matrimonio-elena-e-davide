import { Heart } from 'lucide-react';
import { BRIDE, GROOM } from '../config/WeddingInfo';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="py-8 px-4 text-center text-sage-600">
      <div className="max-w-4xl mx-auto">
        <p className="font-cursive text-2xl mb-4">{BRIDE.name} & {GROOM.name}</p>
        <p className="mb-2">{t('app.date')}</p>
        <div className="flex justify-center items-center">
          <span className="mx-2">•</span>
          <Heart className="text-sage-500" size={16} />
          <span className="mx-2">•</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;