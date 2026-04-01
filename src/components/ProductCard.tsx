'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { toast } from 'sonner';
import type { Product } from '@/lib/data';

interface ProductCardProps {
  product: Product;
  onSelect: (id: string) => void;
}

const badgeColorMap: Record<string, string> = {
  HOT: 'bg-red-600 text-white hover:bg-red-600',
  NEW: 'bg-green-600 text-white hover:bg-green-600',
  SALE: 'bg-amber-500 text-white hover:bg-amber-500',
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`size-3.5 ${
            star <= Math.round(rating)
              ? 'fill-amber-400 text-amber-400'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  const addToCart = useStore((s) => s.addItem);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setJustAdded(true);
    toast.success('Added to cart', {
      description: `${product.title} has been added to your cart.`,
    });
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)' }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="cursor-pointer h-full"
    >
      <Card
        className="overflow-hidden h-full flex flex-col gap-0 p-0 border-0 shadow-md hover:shadow-xl transition-shadow rounded-xl group"
        onClick={() => onSelect(product.id)}
      >
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-10">
              <Badge className={badgeColorMap[product.badge] || 'bg-red-600 text-white'}>
                {product.badge === 'SALE' ? `${discountPercent}%OFF` : product.badge}
              </Badge>
            </div>
          )}
          {/* Just added overlay */}
          {justAdded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-[#C62828]/80 backdrop-blur-[2px]"
            >
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg">
                <Check className="size-4 text-green-600" />
                <span className="text-sm font-semibold">Added!</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Product Info */}
        <CardContent className="flex flex-col gap-2 p-4 flex-1">
          <h3 className="font-semibold text-sm leading-snug line-clamp-2 min-h-[2.5rem] text-gray-800">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <StarRating rating={product.rating} />
            <span className="text-xs text-gray-500">
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="text-lg font-bold text-[#C62828]">
              ${product.price.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice!.toLocaleString()}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            className="mt-2 w-full bg-[#C62828] hover:bg-[#B71C1C] text-white rounded-lg"
            size="sm"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="size-4" />
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
