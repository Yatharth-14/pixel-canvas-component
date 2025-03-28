
import React from "react";
import AddProductForm from "../components/forms/AddProductForm";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AddProduct = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link 
            to="/my-products" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Products
          </Link>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Add New Product</h1>
            <p className="text-gray-500">Fill in the details to list your product</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <AddProductForm />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
