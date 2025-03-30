
import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowLeft, Save, X, Upload, Clock, MapPin, Phone, Mail, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TagInput from "@/components/vendor/TagInput";

// Mock vendor data - same as in VendorProfile
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

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  tagline: z.string().min(5, "Tagline must be at least 5 characters"),
  about: z.string().min(20, "About must be at least 20 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  phone: z.string().min(5, "Phone must be at least 5 characters"),
  email: z.string().email("Please enter a valid email"),
  website: z.string().optional(),
  businessHours: z.string().min(5, "Business hours must be at least 5 characters"),
  specialization: z.array(z.string()).min(1, "At least one specialization is required"),
  certifications: z.array(z.string()).optional(),
  logo: z.string().optional(),
  coverImage: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const EditVendorProfile = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();

  // Initialize form with vendor data
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: vendorData.name,
      tagline: vendorData.tagline,
      about: vendorData.about,
      address: vendorData.address,
      phone: vendorData.phone,
      email: vendorData.email,
      website: vendorData.website,
      businessHours: vendorData.businessHours,
      specialization: vendorData.specialization,
      certifications: vendorData.certifications,
      logo: vendorData.logo,
      coverImage: vendorData.coverImage,
    },
  });

  // Handle form submission
  const onSubmit = (values: FormValues) => {
    console.log("Form values:", values);
    
    // In a real app, you would send this data to your backend
    // For now, we'll just display a success toast
    toast.success("Profile updated successfully");
    
    // Redirect to vendor profile page
    navigate(`/vendor/${vendorId}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Header */}
      <div className="bg-medical-primary text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to={`/vendor/${vendorId}`} className="flex items-center text-white hover:text-gray-200">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Profile
            </Link>
            <h1 className="text-xl font-semibold">Edit Vendor Profile</h1>
            <div className="w-24"></div> {/* For layout balance */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full md:w-auto grid-cols-3 bg-white border mb-6 rounded-lg p-1 shadow-sm">
                <TabsTrigger value="basic" className="rounded-md text-sm">Basic Info</TabsTrigger>
                <TabsTrigger value="details" className="rounded-md text-sm">Details</TabsTrigger>
                <TabsTrigger value="images" className="rounded-md text-sm">Images</TabsTrigger>
              </TabsList>
              
              {/* Basic Info Tab */}
              <TabsContent value="basic" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your company name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="tagline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tagline</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="A short description of your business" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="about"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>About</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Detailed description of your business" 
                              className="min-h-[150px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Details Tab */}
              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2" />
                                Address
                              </div>
                            </FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Your business address" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-2" />
                                Phone
                              </div>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your contact number" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <div className="flex items-center">
                                <Mail className="h-4 w-4 mr-2" />
                                Email
                              </div>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your business email" 
                                type="email"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <div className="flex items-center">
                                <Globe className="h-4 w-4 mr-2" />
                                Website
                              </div>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your business website" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator className="my-4" />
                    
                    <FormField
                      control={form.control}
                      name="businessHours"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              Business Hours
                            </div>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="E.g., Mon - Sat: 9:00 AM - 6:00 PM" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Specialization & Certifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="specialization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specialization</FormLabel>
                          <FormControl>
                            <TagInput 
                              placeholder="Enter specialization and press Enter"
                              tags={field.value}
                              setTags={(newTags) => field.onChange(newTags)}
                              icon={<Shield className="h-4 w-4" />}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="certifications"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Certifications</FormLabel>
                          <FormControl>
                            <TagInput 
                              placeholder="Enter certification and press Enter"
                              tags={field.value || []}
                              setTags={(newTags) => field.onChange(newTags)}
                              icon={<Shield className="h-4 w-4" />}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Images Tab */}
              <TabsContent value="images" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Images</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <FormLabel>Logo Image</FormLabel>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
                          <img 
                            src={vendorData.logo} 
                            alt="Logo preview" 
                            className="w-40 h-40 object-cover rounded-lg mb-4"
                          />
                          <Button variant="outline" className="flex items-center">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload New Logo
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <FormLabel>Cover Image</FormLabel>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
                          <div className="w-full h-32 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                            <img 
                              src={vendorData.coverImage} 
                              alt="Cover preview" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <Button variant="outline" className="flex items-center">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload New Cover
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-4">
                      <FormLabel>Gallery Images</FormLabel>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {vendorData.galleryImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <img 
                              src={image} 
                              alt={`Gallery image ${index + 1}`} 
                              className="w-full aspect-square object-cover rounded-lg border border-gray-200"
                            />
                            <button className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        <div className="w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                          <div className="flex flex-col items-center text-gray-500">
                            <Upload className="h-8 w-8 mb-2" />
                            <span className="text-sm">Add Image</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate(`/vendor/${vendorId}`)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditVendorProfile;
