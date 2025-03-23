
import React from 'react';
import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-medical-primary text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">IndiaMart</h3>
            <p className="text-gray-300 mb-4">India's largest online B2B marketplace, connecting buyers with suppliers.</p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Building Materials</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Industrial Machinery</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Medical Supplies</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Electronics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Chemical Products</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Join As Supplier</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Help & Support</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-300" />
                <span className="text-gray-300">+91 9876543210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-300" />
                <span className="text-gray-300">contact@indiamart.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2023 IndiaMart. All rights reserved.
            </div>
            <div className="flex space-x-4 text-sm">
              <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms of Use</a>
              <a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
