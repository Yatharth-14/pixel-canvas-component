
import IndiamartLanding from '../../components/landing/IndiamartLanding';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <IndiamartLanding />
      
      {/* Quick links to demo pages */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Demo Pages</h2>
          <p className="mb-6 text-gray-700">Check out our demo pages:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Button 
              asChild
              className="w-full h-12 bg-blue-600 hover:bg-blue-700"
            >
              <Link to="/product/123">
                View Medical Thermometer
              </Link>
            </Button>
            <Button 
              asChild
              className="w-full h-12 bg-green-600 hover:bg-green-700"
            >
              <Link to="/my-products">
                Manage My Products
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
