import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  getProductsByCategory,
  getCategories,
  Category,
  Product,
} from "@/Backend/services/products";

interface CategoryItemProps {
  title: string;
  image: string;
  slug: string;
  items: Product[];
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  title,
  image,
  slug,
  items,
}) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          <img
            src={image}
            alt={title}
            className="w-12 h-12 object-contain rounded-md mr-3"
          />
          <Link to={`/category/${slug}`}>
            <h3 className="font-semibold text-medical-primary hover:underline">
              {title}
            </h3>
          </Link>
        </div>
        <ul className="space-y-1.5">
          {items.slice(0, 4).map((item) => (
            <li
              key={item.id}
              className="text-sm text-gray-700 hover:text-medical-accent flex items-center"
            >
              <ChevronRight className="h-4 w-4 mr-1 text-medical-accent/70" />
              <Link to={`/product/${item.id}`} className="hover:underline">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

interface CategorySectionProps {
  title: string;
  slug: string;
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, slug }) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Get category details
      const categories = await getCategories();
      const categoryData = categories.find((cat) => cat.slug === slug) || null;
      setCategory(categoryData);

      // Get products for this category
      if (categoryData) {
        const productsData = await getProductsByCategory(slug);
        setProducts(productsData);
      }

      setLoading(false);
    };

    fetchData();
  }, [slug]);

  // For image placeholders when no product image is available
  const placeholderImages = [
    "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    "https://images.unsplash.com/photo-1579154341043-e6cc281ec84f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
  ];

  // Group products into 4 cards
  const getProductGroups = () => {
    if (products.length === 0) return [];

    const groups = [];
    const itemsPerGroup = Math.ceil(products.length / 4);

    for (let i = 0; i < 4; i++) {
      const startIndex = i * itemsPerGroup;
      const groupProducts = products.slice(
        startIndex,
        startIndex + itemsPerGroup
      );

      if (groupProducts.length > 0) {
        groups.push({
          id: i,
          title: i === 0 ? title : `${title} - ${i + 1}`,
          slug: slug,
          image: getGroupImage(i),
          items: groupProducts,
        });
      }
    }

    return groups;
  };

  const getGroupImage = (index: number) => {
    // Try to get an image from a product in this group
    const startIndex = index * Math.ceil(products.length / 4);
    const groupProducts = products.slice(
      startIndex,
      startIndex + Math.ceil(products.length / 4)
    );

    for (const product of groupProducts) {
      const primaryImage = product.images?.find(
        (img) => img.is_primary
      )?.image_url;
      if (primaryImage) return primaryImage;
      if (product.images?.[0]?.image_url) return product.images[0].image_url;
    }

    // Fallback to placeholder
    return placeholderImages[index % placeholderImages.length];
  };

  if (loading) {
    return (
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!category || products.length === 0) {
    return null;
  }

  const productGroups = getProductGroups();

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-medical-primary">{title}</h2>
          <Link
            to={`/category/${slug}`}
            className="text-medical-accent hover:underline text-sm flex items-center"
          >
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {productGroups.map((group) => (
            <CategoryItem
              key={group.id}
              title={group.title}
              image={group.image}
              slug={group.slug}
              items={group.items}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
