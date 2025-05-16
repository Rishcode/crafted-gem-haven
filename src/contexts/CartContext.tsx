
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/utils/types';
import { useToast } from '@/hooks/use-toast';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { toast } = useToast();
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('kalaConnectCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('kalaConnectCart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('kalaConnectCart');
    }
    
    // Calculate totals
    const items = cart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalItems(items);
    
    const price = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotalPrice(price);
  }, [cart]);
  
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Product exists, update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        toast({
          title: "Cart updated",
          description: `${product.name} quantity increased to ${updatedCart[existingItemIndex].quantity}`,
        });
        return updatedCart;
      } else {
        // Add new item to cart
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart`,
        });
        return [...prevCart, { ...product, quantity }];
      }
    });
  };
  
  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      if (updatedCart.length !== prevCart.length) {
        toast({
          title: "Removed from cart",
          description: "Item has been removed from your cart",
        });
      }
      return updatedCart;
    });
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setCart([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };
  
  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
