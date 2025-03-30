
import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Phone, Mail, Clock, Shield, Award, CheckCircle, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import VendorProductsList from "@/components/vendor/VendorProductsList";
import VendorReviews from "@/components/vendor/VendorReviews";
import VendorGallery from "@/components/vendor/VendorGallery";

// Mock vendor data
const vendorData = {
  id: "v123",
  name: "MediTech Instruments",
  tagline: "Leading Provider of Medical Equipment & Supplies",
  rating: 4.5,
  reviewCount: 128,
  verified: true,
  premium: true,
  memberSince: "2019",
  address: "123 Healthcare Avenue, Medical District, Mumbai, Maharashtra 400001",
  phone: "+91 98765 43210",
  email: "contact@meditechinstruments.in",
  website: "www.meditechinstruments.in",
  businessHours: "Mon - Sat: 9:00 AM - 6:00 PM",
  about: "MediTech Instruments is a leading supplier of high-quality medical equipment and healthcare supplies to hospitals, clinics, and healthcare professionals across India. With over 15 years of experience in the medical industry, we pride ourselves on offering cutting-edge technology and reliable medical solutions at competitive prices.",
  specialization: [
    "Digital Medical Devices",
    "Diagnostic Equipment",
    "Surgical Instruments",
    "Patient Monitoring Systems",
    "Laboratory Equipment"
  ],
  certifications: [
    "ISO 13485:2016",
    "CE Certified",
    "FDA Approved"
  ],
  coverImage: "/lovable-uploads/5b25fda1-45e3-4ff4-b1a4-b067322379de.png",
  logo: "https://images.unsplash.com/photo-1612354082161-8895f87b8e65?w=500&h=500&fit=crop",
  galleryImages: [
    "https://images.unsplash.com/photo-1583912086296-be5b665036d3",
    "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b",
    "https://images.unsplash.com/photo-1583911860204-108ba6046803",
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    "https://images.unsplash.com/photo-1576671194576-05785fb8300d"
  ]
};

const VendorProfile = () => {
  const { vendorId } = useParams();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Cover Image Section */}
      <div className="relative h-64 md:h-80 bg-medical-primary">
        <img 
          src={vendorData.coverImage} 
          alt={`${vendorData.name} cover`} 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-medical-primary to-medical-primary/80"></div>
        
        <div className="container mx-auto px-4 absolute inset-x-0 bottom-0 pb-4">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="text-white hover:text-gray-200 flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
            
            <Link to={`/vendor/${vendorId}/edit`}>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Vendor Profile Header */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:mr-6 mb-4 md:mb-0 flex-shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border-4 border-white shadow">
                <img 
                  src={vendorData.logo} 
                  alt={vendorData.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                      {vendorData.name}
                    </h1>
                    {vendorData.verified && (
                      <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-600 border-blue-200">
                        <CheckCircle className="w-3 h-3 mr-1" /> Verified
                      </Badge>
                    )}
                    {vendorData.premium && (
                      <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-600 border-yellow-200">
                        <Award className="w-3 h-3 mr-1" /> Premium
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-500 mt-1">{vendorData.tagline}</p>
                  
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(vendorData.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : i < vendorData.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {vendorData.rating} ({vendorData.reviewCount} reviews)
                    </span>
                    <div className="mx-2 h-4 border-r border-gray-300"></div>
                    <span className="text-sm text-gray-600">
                      Member since {vendorData.memberSince}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-2 flex flex-col md:flex-row">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Inquiry
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="ml-2 text-sm text-gray-600">{vendorData.address}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  <span className="ml-2 text-sm text-gray-600">{vendorData.phone}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  <span className="ml-2 text-sm text-gray-600">{vendorData.businessHours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs Section */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="w-full md:w-auto bg-white border mb-6 rounded-lg p-1 shadow-sm">
            <TabsTrigger value="about" className="rounded-md text-sm">About</TabsTrigger>
            <TabsTrigger value="products" className="rounded-md text-sm">Products</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-md text-sm">Reviews</TabsTrigger>
            <TabsTrigger value="gallery" className="rounded-md text-sm">Photo Gallery</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">About {vendorData.name}</h2>
                <p className="text-gray-700 mb-6">{vendorData.about}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Specialization</h3>
                    <ul className="space-y-2">
                      {vendorData.specialization.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Certifications</h3>
                    <ul className="space-y-2">
                      {vendorData.certifications.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <Shield className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="ml-2">
                      <h3 className="text-sm font-medium text-gray-900">Address</h3>
                      <p className="text-sm text-gray-600">{vendorData.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="ml-2">
                      <h3 className="text-sm font-medium text-gray-900">Phone</h3>
                      <p className="text-sm text-gray-600">{vendorData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="ml-2">
                      <h3 className="text-sm font-medium text-gray-900">Email</h3>
                      <p className="text-sm text-gray-600">{vendorData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="ml-2">
                      <h3 className="text-sm font-medium text-gray-900">Business Hours</h3>
                      <p className="text-sm text-gray-600">{vendorData.businessHours}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="products">
            <VendorProductsList vendorId={vendorData.id} />
          </TabsContent>
          
          <TabsContent value="reviews">
            <VendorReviews vendorId={vendorData.id} />
          </TabsContent>
          
          <TabsContent value="gallery">
            <VendorGallery images={vendorData.galleryImages} vendorName={vendorData.name} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VendorProfile;
