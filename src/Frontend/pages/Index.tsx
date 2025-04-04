
import IndiamartLanding from '../../components/landing/IndiamartLanding';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <IndiamartLanding />
      
      {/* Quick links to demo pages */}
      {/* <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-4 mb-8">
          <h2 className="text-xl font-semibold mb-4">Demo Pages</h2>
          <p className="mb-4 text-gray-700">Check out our demo pages:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link 
              to="/product/123" 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block text-center"
            >
              View Medical Thermometer
            </Link>
            <Link 
              to="/my-products" 
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 inline-block text-center"
            >
              Manage My Products
            </Link>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Index;
