
import { supabase } from '../supabase/client';
import { Product } from './products';

export type CartItem = {
  id: string;
  product_id: string;
  user_id: string;
  quantity: number;
  product?: Product;
};

export const getCartItems = async (): Promise<CartItem[]> => {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) return [];

  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      *,
      product:products(
        *,
        images:product_images(id, image_url, is_primary)
      )
    `)
    .eq('user_id', user.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }

  // Use type assertion since we know the structure
  return (data || []) as CartItem[];
};

export const addToCart = async (productId: string, quantity: number = 1): Promise<boolean> => {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) return false;

  // Check if item already exists in cart
  const { data: existingItem } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', user.user.id)
    .eq('product_id', productId)
    .maybeSingle();

  if (existingItem) {
    // Update quantity
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity: existingItem.quantity + quantity })
      .eq('id', existingItem.id);

    if (error) {
      console.error('Error updating cart item:', error);
      return false;
    }
  } else {
    // Add new item
    const { error } = await supabase
      .from('cart_items')
      .insert({
        user_id: user.user.id,
        product_id: productId,
        quantity
      });

    if (error) {
      console.error('Error adding item to cart:', error);
      return false;
    }
  }

  return true;
};

export const updateCartQuantity = async (cartItemId: string, quantity: number): Promise<boolean> => {
  const { error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', cartItemId);

  if (error) {
    console.error('Error updating cart item quantity:', error);
    return false;
  }

  return true;
};

export const removeFromCart = async (cartItemId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', cartItemId);

  if (error) {
    console.error('Error removing item from cart:', error);
    return false;
  }

  return true;
};

export const getCartCount = async (): Promise<number> => {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) return 0;

  const { data, error } = await supabase
    .from('cart_items')
    .select('quantity')
    .eq('user_id', user.user.id);

  if (error) {
    console.error('Error fetching cart count:', error);
    return 0;
  }

  return (data as { quantity: number }[]).reduce((sum, item) => sum + item.quantity, 0);
};
