import React, { ReactNode } from 'react';

interface SectionCardProps {
  id?: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({ id, title, children, className }) => (
  <section id={id} className={`py-8 px-4 md:px-8 ${className ?? ''}`}>
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl text-center font-cursive font-bold text-sage-600 mb-12">
        {title}
      </h2>
      {children}
    </div>
  </section>
);

export default SectionCard;
