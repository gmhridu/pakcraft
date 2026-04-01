'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import type { Category } from '@/lib/data';

interface CategoryListProps {
  categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  const selectedCategory = useStore((s) => s.selectedCategory);
  const setCategory = useStore((s) => s.setCategory);

  const handleSelectCategory = (slug: string) => {
    if (selectedCategory === slug) {
      setCategory(null); // deselect
    } else {
      setCategory(slug);
    }
    // Scroll to products section
    const el = document.getElementById('product-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Mobile: horizontal scrollable */}
      <div className="flex gap-4 overflow-x-auto pb-4 md:hidden scrollbar-hide snap-x snap-mandatory">
        {categories.map((category) => {
          const isActive = selectedCategory === category.slug;
          return (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex-shrink-0 snap-start"
            >
              <button
                onClick={() => handleSelectCategory(category.slug)}
                className="relative w-44 h-44 rounded-2xl overflow-hidden cursor-pointer group shadow-md"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute inset-0 ring-2 ring-[#C62828] ring-offset-2 rounded-2xl z-10" />
                )}
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t transition-colors duration-200 ${isActive ? 'from-[#C62828]/90 via-[#C62828]/40' : 'from-black/70 via-black/20'} to-transparent`} />
                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-[5]">
                  <h3 className="font-bold text-base">{category.name}</h3>
                  <p className="text-xs text-white/80 mt-0.5">
                    {category.productCount} items
                  </p>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => {
          const isActive = selectedCategory === category.slug;
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)' }}
            >
              <button
                onClick={() => handleSelectCategory(category.slug)}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-md w-full"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute inset-0 ring-2 ring-[#C62828] ring-offset-2 rounded-2xl z-10" />
                )}
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t transition-colors duration-200 ${isActive ? 'from-[#C62828]/90 via-[#C2828]/40' : 'from-black/70 via-black/20'} to-transparent`} />
                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-[5]">
                  <h3 className="font-bold text-sm">{category.name}</h3>
                  <p className="text-xs text-white/80 mt-0.5">
                    {category.productCount} items
                  </p>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
