import React from "react";
import LandingHeader from "./LandingHeader";
import LandingHero from "./LandingHero";
import CategorySection from "./CategorySection";
import SupplierSection from "./SupplierSection";
import TrustSection from "./TrustSection";
import LandingFooter from "./LandingFooter";

const IndiamartLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      <LandingHero />
      <CategorySection title="Medical Supplies" slug="medical-supplies" />
      <CategorySection
        title="Building & Construction"
        slug="building-construction"
      />
      <CategorySection
        title="Electronics & Electrical"
        slug="electronics-electrical"
      />
      <SupplierSection />
      <CategorySection
        title="Industrial Machinery"
        slug="industrial-machinery"
      />
      <CategorySection
        title="Agriculture Products"
        slug="agriculture-products"
      />
      <TrustSection />
      <LandingFooter />
    </div>
  );
};

export default IndiamartLanding;
