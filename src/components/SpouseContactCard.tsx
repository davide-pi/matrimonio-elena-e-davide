import { Phone } from 'lucide-react';
import { WhatsApp } from '../icons/WhatsApp';
import { Spouse } from '../config/WeddingInfo';

const SpouseContactCard = (spouse: Spouse) => {
  return (
    <div className="grid md:grid-cols-2 gap-4 text-sage-700">
      <div className="bg-white p-4 rounded-lg">
        <h4 className="font-semibold mb-2">{spouse.name}</h4>
        <p className="flex items-center justify-center">
          <Phone className="mr-2 hidden md:inline" size={16} />
          <a href={spouse.whatsappLink} className="inline md:hidden">
            <WhatsApp className="mr-2" size={24} />
          </a>
          {spouse.formattedPhone}
        </p>
      </div>
    </div>
  );
};

export default SpouseContactCard;