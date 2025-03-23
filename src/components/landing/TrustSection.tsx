
import React from 'react';
import { CheckCircle, Globe, Users, BadgeCheck } from 'lucide-react';

const TrustSection: React.FC = () => {
  const trustFactors = [
    {
      icon: <Users className="h-10 w-10 text-medical-accent" />,
      number: "10M+",
      label: "Registered Buyers"
    },
    {
      icon: <Globe className="h-10 w-10 text-medical-accent" />,
      number: "56",
      label: "Countries"
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-medical-accent" />,
      number: "500K+",
      label: "Verified Suppliers"
    },
    {
      icon: <BadgeCheck className="h-10 w-10 text-medical-accent" />,
      number: "25+",
      label: "Years of Trust"
    }
  ];

  return (
    <section className="py-16 bg-medical-highlight">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-medical-primary mb-12">Why Choose IndiaMart</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustFactors.map((factor, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4">
                {factor.icon}
              </div>
              <div className="text-3xl font-bold text-medical-primary mb-2">{factor.number}</div>
              <div className="text-gray-700">{factor.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
