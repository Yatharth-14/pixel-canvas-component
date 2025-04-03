
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const LandingHero: React.FC = () => {
  const popularCategories = [
    'Medical Supplies', 'Building Materials', 'Industrial Machinery', 
    'Electronics', 'Chemical Products', 'Agriculture Products'
  ];

  return (
    <div className="bg-gradient-to-r from-medical-highlight to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-medical-primary">
              <span className="block">Connect with</span>
              <span className="text-medical-accent">Verified Suppliers</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-lg">
              India's largest online B2B marketplace connecting buyers with suppliers. 
              Join over 10 million businesses today!
            </p>
            <div className="flex flex-wrap gap-3">
              {popularCategories.map((category) => (
                <Button 
                  key={category} 
                  variant="outline" 
                  className="bg-white border-gray-200 hover:border-medical-accent"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md p-6 shadow-lg border-t-4 border-t-medical-accent">
              <h3 className="text-xl font-semibold mb-4">Tell us what you need</h3>
              <div className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Enter product/service name" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-accent"
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Requirement details" 
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-accent"
                  ></textarea>
                </div>
                <Button className="w-full bg-medical-accent hover:bg-medical-accent/90">
                  Submit Requirement
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  By submitting, you agree to our Terms of Use & Privacy Policy
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
