'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, ArrowLeft, Truck, RotateCcw, Shield, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/lib/data';
import { useStore } from '@/lib/store';
import { toast } from 'sonner';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`size-4 ${
              star <= Math.round(rating)
                ? 'fill-amber-400 text-amber-400'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-gray-500">
        {rating} ({count} reviews)
      </span>
    </div>
  );
}

const badgeColorMap: Record<string, string> = {
  HOT: 'bg-red-600 text-white',
  NEW: 'bg-green-600 text-white',
  SALE: 'bg-amber-500 text-white',
};

export default function ProductDetail({ product, onBack }: ProductDetailProps) {
  const addToCart = useStore((s) => s.addItem);
  const [justAdded, setJustAdded] = useState(false);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#C62828] transition-colors mb-6 group"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
            <Image
              src={product.image}
              alt={product.title}
              width={600}
              height={600}
              className="object-cover w-full h-full"
            />
            {product.badge && (
              <div className="absolute top-4 left-4">
                <Badge className={badgeColorMap[product.badge] || 'bg-red-600 text-white'}>
                  {product.badge === 'SALE' ? `${discountPercent}%OFF` : product.badge}
                </Badge>
              </div>
            )}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col"
        >
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="mt-3">
            <StarRating rating={product.rating} count={product.reviewCount} />
          </div>

          {/* Price */}
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-[#C62828]">
              ${product.price.toLocaleString()}
            </span>
            {hasDiscount && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  ${product.originalPrice!.toLocaleString()}
                </span>
                <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                  {discountPercent}%OFF
                </Badge>
              </>
            )}
            <span className="text-sm text-gray-500">Tax incl.</span>
          </div>

          {/* Stock Status */}
          <div className="mt-4 flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm text-gray-600">
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Divider */}
          <div className="my-6 h-px bg-gray-200" />

          {/* Description */}
          <h2 className="text-sm font-semibold text-gray-900 mb-2">Product Description</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Divider */}
          <div className="my-6 h-px bg-gray-200" />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              className="flex-1 bg-[#C62828] hover:bg-[#B71C1C] text-white py-6 rounded-xl text-base font-semibold"
              disabled={!product.inStock}
              onClick={() => {
                addToCart(product);
                setJustAdded(true);
                toast.success('Added to cart', { description: product.title + ' has been added to your cart.' });
                setTimeout(() => setJustAdded(false), 1200);
              }}
            >
              <ShoppingCart className="size-5 mr-2" />
              {justAdded ? 'Added!' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
              {justAdded && <Check className="size-5 ml-2" />}
            </Button>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-2 text-center p-3 rounded-xl bg-gray-50">
              <Truck className="size-5 text-[#C62828]" />
              <span className="text-xs text-gray-600">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center p-3 rounded-xl bg-gray-50">
              <RotateCcw className="size-5 text-[#C62828]" />
              <span className="text-xs text-gray-600">30-Day Returns</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center p-3 rounded-xl bg-gray-50">
              <Shield className="size-5 text-[#C62828]" />
              <span className="text-xs text-gray-600">Authentic Guarantee</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
