
import React from 'react';
import EquipmentCard from './EquipmentCard';
import EquipmentHero from './EquipmentHero';

const MedicalEquipment: React.FC = () => {
  return (
    <section className="py-10 px-4 sm:px-6 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="border-t-4 border-medical-accent rounded-t-sm mb-8"></div>
        <h1 className="text-3xl font-semibold text-medical-primary mb-8 tracking-tight">Hospital and Medical Equipment</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Hero section with equipment images */}
          <div className="lg:col-span-1">
            <EquipmentHero 
              title="Medical Equipment" 
              backgroundImage="/lovable-uploads/5b25fda1-45e3-4ff4-b1a4-b067322379de.png" 
            />
          </div>
          
          {/* Medical Laboratory Instruments */}
          <div className="lg:col-span-1">
            <EquipmentCard
              title="Medical Laboratory Instruments"
              imageSrc="https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              items={[
                "Rapid Test Kit",
                "Biochemistry Analyzer",
                "Blood Bank Equipments", 
                "Hematology Analyzers"
              ]}
            />
          </div>
          
          {/* Patient Monitoring Systems */}
          <div className="lg:col-span-1">
            <EquipmentCard 
              title="Patient Monitoring Systems"
              imageSrc="https://images.unsplash.com/photo-1579154341097-0b572a1cac25?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              items={[
                "Blood Pressure Machine",
                "Capnometer",
                "Medical Monitor",
                "Surgical Monitor"
              ]}
            />
          </div>
          
          {/* Thermometer */}
          <div className="lg:col-span-1">
            <EquipmentCard 
              title="Thermometer"
              imageSrc="https://images.unsplash.com/photo-1584556812952-905ffd0c611a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              items={[
                "Infrared Thermometers",
                "Forehead Thermometer",
                "Non Contact Thermometer",
                "Digital Thermometers"
              ]}
            />
          </div>
          
          {/* Medical Imaging Machine */}
          <div className="lg:col-span-1">
            <EquipmentCard 
              title="Medical Imaging Machine"
              imageSrc="https://images.unsplash.com/photo-1516357231954-91487b459602?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              items={[
                "X Ray Machine",
                "Ultrasound Machines",
                "ECG Machine",
                "Doppler Machine"
              ]}
            />
          </div>
          
          {/* Stethoscope */}
          <div className="lg:col-span-1">
            <EquipmentCard 
              title="Stethoscope"
              imageSrc="https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              items={[
                "Cardiology Stethoscope",
                "Dual Head Stethoscope",
                "Electronic Stethoscope",
                "Pediatric Stethoscope"
              ]}
            />
          </div>
          
          {/* Suction Machine */}
          <div className="lg:col-span-1">
            <EquipmentCard 
              title="Suction Machine"
              imageSrc="https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              items={[
                "Electric Suction Unit",
                "Foot Operated Suction Unit",
                "Liposuction Machine",
                "Central Suction System"
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedicalEquipment;
