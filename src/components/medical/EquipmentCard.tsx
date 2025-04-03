
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface EquipmentItemProps {
  label: string;
}

const EquipmentItem: React.FC<EquipmentItemProps> = ({ label }) => {
  return (
    <li className="equipment-item py-1.5 text-base text-gray-700 hover:text-medical-secondary transition-colors duration-300 ease-in-out">
      {label}
    </li>
  );
};

interface EquipmentCardProps {
  title: string;
  items: string[];
  imageSrc: string;
  className?: string;
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({ 
  title, 
  items, 
  imageSrc,
  className
}) => {
  return (
    <Card className={cn(
      "equipment-card h-full bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 animate-scale-in",
      className
    )}>
      <CardHeader className="p-5 pb-0">
        <div className="flex items-center mb-4">
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-20 h-20 object-contain rounded-md"
            loading="lazy"
          />
          <h3 className="text-lg font-medium text-medical-primary ml-4">{title}</h3>
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <ul className="space-y-1">
          {items.map((item, index) => (
            <EquipmentItem key={index} label={item} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default EquipmentCard;
