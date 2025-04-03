
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for categories
const categoryData: Record<string, { 
  title: string;
  description: string;
  products: Array<{ 
    id: string; 
    name: string; 
    image: string; 
    price: string;
    description: string;
  }>
}> = {
  'building-construction': {
    title: 'Building & Construction',
    description: 'Find all your building and construction supplies here',
    products: [
      { id: '1', name: 'Cement', image: '/placeholder.svg', price: '₹350/bag', description: 'High quality cement for construction' },
      { id: '2', name: 'Steel Bars', image: '/placeholder.svg', price: '₹45,000/ton', description: 'Durable steel bars for reinforcement' },
      { id: '3', name: 'Bricks', image: '/placeholder.svg', price: '₹7/piece', description: 'Standard size red bricks' },
    ]
  },
  'electronics-electrical': {
    title: 'Electronics & Electrical',
    description: 'Browse our range of electronics and electrical equipment',
    products: [
      { id: '4', name: 'LED Bulbs', image: '/placeholder.svg', price: '₹120/piece', description: 'Energy-efficient LED bulbs' },
      { id: '5', name: 'Switches', image: '/placeholder.svg', price: '₹45/piece', description: 'High-quality electrical switches' },
      { id: '6', name: 'Wires', image: '/placeholder.svg', price: '₹1,200/roll', description: 'Copper wires for electrical wiring' },
    ]
  },
  'industrial-supplies': {
    title: 'Industrial Supplies',
    description: 'Everything you need for industrial applications',
    products: [
      { id: '7', name: 'Safety Helmets', image: '/placeholder.svg', price: '₹450/piece', description: 'Industrial safety helmets' },
      { id: '8', name: 'Industrial Gloves', image: '/placeholder.svg', price: '₹180/pair', description: 'Heat-resistant industrial gloves' },
      { id: '9', name: 'Tool Kit', image: '/placeholder.svg', price: '₹2,500/set', description: 'Complete industrial tool kit' },
    ]
  },
  'pharmaceutical': {
    title: 'Pharmaceutical',
    description: 'Medical and pharmaceutical products for healthcare',
    products: [
      { id: '10', name: 'Digital Thermometer', image: '/placeholder.svg', price: '₹350/piece', description: 'Accurate digital thermometer' },
      { id: '11', name: 'Surgical Masks', image: '/placeholder.svg', price: '₹250/box', description: '3-ply surgical masks, box of 50' },
      { id: '12', name: 'Hand Sanitizer', image: '/placeholder.svg', price: '₹120/bottle', description: '500ml hand sanitizer' },
    ]
  },
  'agriculture': {
    title: 'Agriculture',
    description: 'Agricultural products and farming equipment',
    products: [
      { id: '13', name: 'Fertilizers', image: '/placeholder.svg', price: '₹800/bag', description: 'NPK fertilizers for crops' },
      { id: '14', name: 'Seeds', image: '/placeholder.svg', price: '₹150/packet', description: 'High-yield vegetable seeds' },
      { id: '15', name: 'Sprayers', image: '/placeholder.svg', price: '₹1,800/piece', description: 'Agricultural sprayers' },
    ]
  },
  'food-beverages': {
    title: 'Food & Beverages',
    description: 'Food products and beverages for wholesale',
    products: [
      { id: '16', name: 'Rice', image: '/placeholder.svg', price: '₹60/kg', description: 'Premium quality Basmati rice' },
      { id: '17', name: 'Spices', image: '/placeholder.svg', price: '₹450/kg', description: 'Assorted spices for cooking' },
      { id: '18', name: 'Cooking Oil', image: '/placeholder.svg', price: '₹125/liter', description: 'Refined cooking oil' },
    ]
  }
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  // Default to building-construction if no category is found
  const category = categoryData[categoryId || ''] || categoryData['building-construction'];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" />Back to Home</Link>
        </Button>
        <h1 className="text-2xl font-bold text-medical-primary">{category.title}</h1>
        <p className="text-gray-600">{category.description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.products.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gray-200">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription className="text-medical-primary font-semibold">{product.price}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{product.description}</p>
            </CardContent>
            <CardFooter>
              <Button size="sm" className="bg-medical-primary hover:bg-medical-primary/90 w-full">
                Contact Supplier
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
