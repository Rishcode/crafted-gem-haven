
import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from "@/contexts/CartContext";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-6 w-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[10px] font-medium flex items-center justify-center text-primary-foreground">
              {totalItems}
            </span>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader className="space-y-2.5">
          <SheetTitle className="flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </SheetTitle>
          <SheetDescription>
            Review and manage items in your shopping cart.
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-12">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/50" />
            <div className="text-xl font-medium">Your cart is empty</div>
            <p className="text-muted-foreground text-center max-w-xs">
              Looks like you haven't added anything to your cart yet.
            </p>
            <SheetClose asChild>
              <Button asChild>
                <Link to="/all-products">Continue Shopping</Link>
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-2">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-start py-4">
                    <div className="h-16 w-16 rounded-md overflow-hidden bg-secondary/20">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1 space-y-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium line-clamp-1">{item.name}</h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 -mt-1 -mr-2 text-muted-foreground"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 rounded-full p-0"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <span className="text-sm w-4 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 rounded-full p-0"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 mt-auto pt-4">
              <Separator />
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <SheetFooter className="flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0 pt-2">
                <SheetClose asChild>
                  <Button variant="outline" size="sm" className="sm:w-1/2">
                    Continue Shopping
                  </Button>
                </SheetClose>
                <Button size="sm" className="sm:w-1/2">
                  Checkout
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
