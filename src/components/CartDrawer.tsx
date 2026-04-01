'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useStore } from '@/lib/store';
import { toast } from 'sonner';

export function CartDrawer() {
  const {
    cartItems,
    removeItem,
    updateQuantity,
    clearCart,
    isCartOpen,
    closeCart,
  } = useStore();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/40"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div className="flex items-center gap-3">
                <ShoppingBag className="size-5 text-[#C62828]" />
                <h2 className="text-lg font-bold text-gray-900">
                  Your Cart
                </h2>
                <span className="text-sm text-muted-foreground">
                  ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                </span>
              </div>
              <button
                onClick={closeCart}
                className="flex size-8 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                aria-label="Close cart"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag className="size-16 text-gray-200" />
                  <div>
                    <p className="font-semibold text-gray-700">Your cart is empty</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Browse our collection and add items you love.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="mt-2 border-[#C62828] text-[#C62828] hover:bg-[#C62828]/5"
                    onClick={closeCart}
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 rounded-xl border bg-gray-50/50 p-3"
                    >
                      {/* Image */}
                      <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                        {item.product.badge && (
                          <span className="absolute top-1 left-1 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded leading-none">
                            {item.product.badge}
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex flex-1 flex-col justify-between min-w-0">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
                            {item.product.title}
                          </h4>
                          <p className="text-sm font-bold text-[#C62828] mt-1">
                            ${item.product.price.toLocaleString()}
                          </p>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="flex size-8 items-center justify-center text-gray-500 hover:text-[#C62828] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="flex size-8 items-center justify-center text-gray-500 hover:text-[#C62828] transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                          <button
                            onClick={() => {
                              removeItem(item.product.id);
                              toast.success('Item removed', {
                                description: `${item.product.title} was removed from your cart.`,
                              });
                            }}
                            className="flex size-8 items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t px-6 py-5 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-lg font-bold text-gray-900">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Shipping & taxes calculated at checkout.
                </p>
                <Button
                  className="w-full bg-[#C62828] hover:bg-[#B71C1C] text-white rounded-xl py-5 text-base font-semibold"
                  onClick={() => {
                    toast.success('Order placed!', {
                      description: `Total: $${totalPrice.toLocaleString()} — Thank you for shopping!`,
                    });
                    clearCart();
                    closeCart();
                  }}
                >
                  <ShoppingBag className="size-5 mr-2" />
                  Checkout — ${totalPrice.toLocaleString()}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-muted-foreground hover:text-gray-900"
                  onClick={() => {
                    clearCart();
                    toast.success('Cart cleared');
                  }}
                >
                  Clear Cart
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
