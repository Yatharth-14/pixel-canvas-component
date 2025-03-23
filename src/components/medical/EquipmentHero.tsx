
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EquipmentHeroProps {
  title: string;
  backgroundImage: string;
}

const EquipmentHero: React.FC<EquipmentHeroProps> = ({ title, backgroundImage }) => {
  const heroItems = [
    "Medical Ventilators",
    "Oxygen Cylinder",
    "Patient Handling Equipment",
    "CPAP, BiPAP Machine & Accessories",
    "POCT Devices"
  ];

  return (
    <div className="relative w-full overflow-hidden rounded-lg" style={{ maxHeight: '380px' }}>
      <div 
        className="relative h-[380px] bg-cover bg-center rounded-lg overflow-hidden" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        <div className="relative z-10 h-full flex flex-col justify-center p-8">
          <div className="max-w-md animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6">{title}</h2>
            <ul className="space-y-2 mb-8">
              {heroItems.map((item, index) => (
                <li 
                  key={index} 
                  className="text-white/90 hover:text-white flex items-center transition-all duration-300 ease-in-out"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <ChevronRight className="h-4 w-4 mr-2 text-medical-secondary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button 
              variant="default" 
              className="bg-medical-accent hover:bg-medical-accent/90 text-white rounded-md mt-2 px-6 animate-fade-in"
              style={{ animationDelay: '0.6s' }}
            >
              View All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentHero;
