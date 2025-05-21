import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 px-4 text-center text-sage-600 bg-white">
      <div className="max-w-4xl mx-auto">
        <p className="font-cursive text-2xl mb-4">Elena & Davide</p>
        <p className="mb-2">20 Settembre 2025</p>
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