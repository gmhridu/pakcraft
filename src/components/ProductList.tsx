'use client';

import ProductCard from '@/components/ProductCard';
import type { Product } from '@/lib/data';

interface ProductListProps {
  products: Product[];
  title?: string;
  onSelect: (id: string) => void;
}

export default function ProductList({ products, title, onSelect }: ProductListProps) {
  if (products.length === 0) return null;

  return (
    <section className="w-full">
      {title && (
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}
