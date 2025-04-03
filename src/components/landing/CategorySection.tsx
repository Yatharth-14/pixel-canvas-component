
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface CategoryItemProps {
  title: string;
  image: string;
  items: string[];
}

const CategoryItem: React.FC<CategoryItemProps> = ({ title, image, items }) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          <img 
            src={image} 
            alt={title} 
            className="w-12 h-12 object-contain rounded-md mr-3" 
          />
          <h3 className="font-semibold text-medical-primary">{title}</h3>
        </div>
        <ul className="space-y-1.5">
          {items.map((item, index) => (
            <li key={index} className="text-sm text-gray-700 hover:text-medical-accent flex items-center">
              <ChevronRight className="h-4 w-4 mr-1 text-medical-accent/70" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

interface CategorySectionProps {
  title: string;
  categories: CategoryItemProps[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, categories }) => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-medical-primary">{title}</h2>
          <a href="#" className="text-medical-accent hover:underline text-sm flex items-center">
            View All <ChevronRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <CategoryItem 
              key={index}
              title={category.title}
              image={category.image}
              items={category.items}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
