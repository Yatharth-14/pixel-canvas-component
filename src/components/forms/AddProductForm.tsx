
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

// Define form schema with Zod
const formSchema = z.object({
  name: z.string().min(5, "Product name must be at least 5 characters"),
  price: z.coerce.number().positive("Price must be a positive number"),
  discountPrice: z.coerce.number().positive("Discounted price must be a positive number").optional(),
  category: z.string().min(2, "Category is required"),
  stock: z.coerce.number().int().nonnegative("Stock must be a non-negative integer"),
  brandName: z.string().min(2, "Brand name is required"),
  sku: z.string().min(2, "SKU is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  inStock: z.boolean().default(true),
});

type ProductFormValues = z.infer<typeof formSchema>;

const AddProductForm = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<{ url: string; file?: File }[]>([]);
  const [bulletPoints, setBulletPoints] = useState<string[]>([""]);
  const [specifications, setSpecifications] = useState<{ name: string; value: string }[]>([
    { name: "", value: "" },
  ]);

  // Initialize form
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      discountPrice: undefined,
      category: "",
      stock: 0,
      brandName: "",
      sku: "",
      description: "",
      inStock: true,
    },
  });

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Limit to 5 images total
    if (images.length + files.length > 5) {
      toast.error("You can upload a maximum of 5 images");
      return;
    }

    Array.from(files).forEach((file) => {
      const imageUrl = URL.createObjectURL(file);
      setImages((prev) => [...prev, { url: imageUrl, file }]);
    });

    // Reset the input
    e.target.value = "";
  };

  // Remove image
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Add a new bullet point field
  const addBulletPoint = () => {
    setBulletPoints([...bulletPoints, ""]);
  };

  // Update a bullet point
  const updateBulletPoint = (index: number, value: string) => {
    const newBulletPoints = [...bulletPoints];
    newBulletPoints[index] = value;
    setBulletPoints(newBulletPoints);
  };

  // Remove a bullet point
  const removeBulletPoint = (index: number) => {
    if (bulletPoints.length > 1) {
      setBulletPoints(bulletPoints.filter((_, i) => i !== index));
    }
  };

  // Add a new specification field
  const addSpecification = () => {
    setSpecifications([...specifications, { name: "", value: "" }]);
  };

  // Update a specification
  const updateSpecification = (index: number, field: "name" | "value", value: string) => {
    const newSpecifications = [...specifications];
    newSpecifications[index][field] = value;
    setSpecifications(newSpecifications);
  };

  // Remove a specification
  const removeSpecification = (index: number) => {
    if (specifications.length > 1) {
      setSpecifications(specifications.filter((_, i) => i !== index));
    }
  };

  // Form submission
  const onSubmit = (values: ProductFormValues) => {
    // Validate required data
    if (images.length === 0) {
      toast.error("Please upload at least one product image");
      return;
    }

    if (bulletPoints.filter(Boolean).length === 0) {
      toast.error("Please add at least one product feature");
      return;
    }

    if (specifications.filter(spec => spec.name && spec.value).length === 0) {
      toast.error("Please add at least one product specification");
      return;
    }

    // Create the product object with all data
    const productData = {
      ...values,
      images: images.map(img => img.url), // In a real app, you'd upload these to a server
      bulletPoints: bulletPoints.filter(Boolean),
      specifications: specifications.filter(spec => spec.name && spec.value),
    };

    // In a real app, you would send this to your API
    console.log("Product data to save:", productData);
    
    // Show success message
    toast.success("Product successfully added!");
    
    // Navigate back to products page
    navigate("/my-products");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Product Images Section */}
        <div className="space-y-3">
          <div className="text-lg font-medium">Product Images</div>
          <div className="text-sm text-gray-500 mb-2">
            Upload up to 5 images. First image will be the main product image.
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {/* Image preview area */}
            {images.map((image, index) => (
              <div key={index} className="relative aspect-square bg-gray-100 rounded-md overflow-hidden border">
                <img 
                  src={image.url} 
                  alt={`Product preview ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
                {index === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white text-xs py-1 text-center">
                    Main Image
                  </div>
                )}
              </div>
            ))}

            {/* Image upload button */}
            {images.length < 5 && (
              <div className="aspect-square border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer">
                <label htmlFor="image-upload" className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Upload Image</span>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Basic Product Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brandName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter brand name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category*</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Medical Devices" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter unique product code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (₹)*</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discountPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discounted Price (₹)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    placeholder="0.00" 
                    {...field} 
                    value={field.value === undefined ? "" : field.value}
                    onChange={(e) => {
                      const value = e.target.value === "" ? undefined : parseFloat(e.target.value);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock Quantity*</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="1" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="inStock"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2 pt-8">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Product is available for sale</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Product Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description*</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your product in detail..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bullet Points */}
        <div className="space-y-3">
          <div className="text-lg font-medium">Product Features</div>
          <div className="text-sm text-gray-500 mb-2">
            Add key product features or bullet points
          </div>

          {bulletPoints.map((point, index) => (
            <div key={`bullet-${index}`} className="flex items-center gap-2">
              <Input
                value={point}
                onChange={(e) => updateBulletPoint(index, e.target.value)}
                placeholder="Enter a product feature"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeBulletPoint(index)}
                disabled={bulletPoints.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addBulletPoint}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Feature
          </Button>
        </div>

        {/* Specifications */}
        <div className="space-y-3">
          <div className="text-lg font-medium">Product Specifications</div>
          <div className="text-sm text-gray-500 mb-2">
            Add technical specifications for your product
          </div>

          {specifications.map((spec, index) => (
            <div key={`spec-${index}`} className="flex items-center gap-2">
              <Input
                value={spec.name}
                onChange={(e) => updateSpecification(index, "name", e.target.value)}
                placeholder="Specification name"
                className="flex-1"
              />
              <Input
                value={spec.value}
                onChange={(e) => updateSpecification(index, "value", e.target.value)}
                placeholder="Specification value"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeSpecification(index)}
                disabled={specifications.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addSpecification}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Specification
          </Button>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/my-products")}
          >
            Cancel
          </Button>
          <Button type="submit">Save Product</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddProductForm;
