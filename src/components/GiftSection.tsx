import { useState } from 'react';

const GiftSection = () => {
  const [copied, setCopied] = useState(false);
  const iban = "IT87Y0306965734100000005260";

  const handleCopyIban = () => {
    navigator.clipboard.writeText(iban)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 md:p-8 text-center">
      <div className="max-w-xl mx-auto">
        <div className="mb-8">

          <p className="text-sage-700">
            Celebreremo questo nuovo inizio con un viaggio ricco di esperienze uniche.
          </p>
          <p className="text-sage-700 mt-4">
            Se lo desiderate, potete contribuire anche voi a regalarci ricordi indimenticabili.
          </p>
        </div>

        <div className="relative">
          <div
            className="bg-white rounded py-3 px-4 mb-4 font-mono text-sage-800 break-all text-sm sm:text-base overflow-x-auto"
          >
            <span className="inline-block min-w-full text-center">IBAN</span>
            <button
              onClick={handleCopyIban}
              className="text-sage-500 hover:text-sage-700 transition-colors bg-white px-2"
              title="Copia IBAN"
            >
              {iban}
            </button>
          </div>

          {copied && (
            <div className="text-sage-600 text-sm animate-fadeIn">
              IBAN copiato negli appunti!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiftSection;