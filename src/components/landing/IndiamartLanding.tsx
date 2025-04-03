
import React from 'react';
import LandingHeader from './LandingHeader';
import LandingHero from './LandingHero';
import CategorySection from './CategorySection';
import SupplierSection from './SupplierSection';
import TrustSection from './TrustSection';
import LandingFooter from './LandingFooter';

const IndiamartLanding: React.FC = () => {
  // Sample data for categories
  const buildingCategories = [
    {
      title: "Building Materials",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89159f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      items: ["Cement", "Steel", "Bricks", "Tiles"]
    },
    {
      title: "Construction Equipment",
      image: "https://images.unsplash.com/photo-1530649298703-a5f97b4df048?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      items: ["Excavators", "Cranes", "Loaders", "Concrete Mixers"]
    },
    {
      title: "Electrical Supplies",
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      items: ["Wires & Cables", "Switches", "LEDs", "Circuit Breakers"]
    },
    {
      title: "Plumbing Supplies",
      image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      items: ["Pipes", "Fittings", "Valves", "Pumps"]
    }
  ];

  const medicalCategories = [
    {
      title: "Medical Equipment",
      image: "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      items: ["Ventilators", "Oxygen Cylinders", "Medical Monitors", "Surgical Tools"]
    },
    {
      title: "Pharmaceuticals",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      items: ["Antibiotics", "Pain Relievers", "Cardiac Drugs", "Antidiabetics"]
    },
    {
      title: "Personal Protective Equipment",
      image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      items: ["Face Masks", "Gloves", "Coveralls", "Face Shields"]
    },
    {
      title: "Diagnostics",
      image: "https://images.unsplash.com/photo-1579154341043-e6cc281ec84f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      items: ["Test Kits", "Laboratory Equipment", "Blood Analyzers", "X-Ray Machines"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      <LandingHero />
      <CategorySection title="Building & Construction" categories={buildingCategories} />
      <CategorySection title="Medical & Healthcare" categories={medicalCategories} />
      <SupplierSection />
      <TrustSection />
      <LandingFooter />
    </div>
  );
};

export default IndiamartLanding;
