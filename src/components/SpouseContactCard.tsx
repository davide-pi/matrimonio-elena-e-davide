import { Phone } from 'lucide-react';
import { Spouse } from '../config/WeddingInfo';
import { WhatsApp } from '../icons/WhatsApp';

const SpouseContactCard = (spouse: Spouse) => {
  return (
    <div className="bg-white/75 p-4 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
      <h4 className="font-semibold mb-2">{spouse.name}</h4>
      <p className="flex items-center justify-center">
        {/* Only on desktop */}
        <Phone className="mr-2 hidden md:inline" size={16} />
        <span className="hidden md:inline">{spouse.formattedPhone}</span>
        {/* Only on mobile */}
        <a href={spouse.whatsappLink} className="inline md:hidden">
          <WhatsApp className="mr-2" size={24} />
        </a>
        <a href={spouse.telLink} className="inline md:hidden">
          {spouse.formattedPhone}
        </a>
      </p>
    </div>
  );
};

export default SpouseContactCard;