
import { supabase } from '../supabase/client';

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discounted_price: number | null;
  category_id: string;
  brand: string | null;
  sku: string | null;
  in_stock: boolean;
  rating: number | null;
  review_count: number;
  vendor_id: string | null;
  images: {
    id: string;
    image_url: string;
    is_primary: boolean;
  }[];
  specifications?: {
    id: string;
    name: string;
    value: string;
  }[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

export const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data || [];
};

export const getProductsByCategory = async (categorySlug: string): Promise<Product[]> => {
  const { data: categoryData, error: categoryError } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single();

  if (categoryError) {
    console.error('Error fetching category:', categoryError);
    return [];
  }

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      images:product_images(id, image_url, is_primary)
    `)
    .eq('category_id', categoryData.id)
    .order('name');

  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }

  return data || [];
};

export const getProductDetail = async (productId: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      images:product_images(id, image_url, is_primary),
      specifications:product_specifications(id, name, value)
    `)
    .eq('id', productId)
    .single();

  if (error) {
    console.error('Error fetching product detail:', error);
    return null;
  }

  return data;
};

export const getFeaturedProducts = async (limit: number = 6): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      images:product_images(id, image_url, is_primary)
    `)
    .order('rating', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }

  return data || [];
};
