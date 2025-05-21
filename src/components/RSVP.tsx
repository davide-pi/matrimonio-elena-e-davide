import { Calendar, Phone } from 'lucide-react';

const RSVP = () => {
  return (
    <div className="bg-beige-50/70 rounded-xl shadow-md p-6 md:p-8 border border-sage-200">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-lg text-sage-700 mb-6">
          È gradita gentile conferma entro il
        </p>

          <p className="flex items-center justify-center text-lg font-medium text-sage-800  mb-6">
            <Calendar className="mr-2" size={20} />
            31 Agosto 2025
          </p>

          <h3 className="text-lg font-medium text-sage-800 mb-4">Contattateci per tutti i dettagli</h3>

          <div className="grid md:grid-cols-2 gap-4 text-sage-700">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Elena</h4>
              <p className="flex items-center justify-center">
                <Phone className="mr-2" size={16} />
                +39 3406049340
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Davide</h4>
              <p className="flex items-center justify-center">
                <Phone className="mr-2" size={16} />
                +39 3493560581
              </p>
            </div>
          </div>

          <p className="mt-6 text-sage-600 italic">
            Nel confermare la vostra presenza, vi preghiamo di comunicarci eventuali allergie o intolleranze alimentari.
          </p>
      </div>
    </div>
  );
};

export default RSVP;