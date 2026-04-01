'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Star, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useStore } from '@/lib/store';
import { products } from '@/lib/data';

export function SearchDialog() {
  const { isSearchOpen, closeSearch } = useStore();
  const [query, setQuery] = useState('');
  const [previousOpenState, setPreviousOpenState] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim().length >= 2
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  // Reset query when dialog closes (derived from open state change)
  if (isSearchOpen !== previousOpenState) {
    if (!isSearchOpen) {
      // This runs during render when dialog transitions from open → closed
      // We track the previous state to detect transitions
    }
    setPreviousOpenState(isSearchOpen);
    if (!isSearchOpen) {
      setQuery('');
    }
  }

  // Auto-focus input when dialog opens
  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  return (
    <Dialog open={isSearchOpen} onOpenChange={(open) => { if (!open) closeSearch(); }}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden rounded-2xl max-h-[80vh]">
        {/* Search Input */}
        <div className="flex items-center gap-3 border-b px-4 py-3">
          <Search className="size-5 text-muted-foreground flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="flex size-6 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-gray-700 transition-colors"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {/* Results */}
        <div className="overflow-y-auto max-h-[60vh] custom-scrollbar">
          {query.trim().length < 2 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <Search className="size-10 text-gray-200 mb-3" />
              <p className="text-sm text-muted-foreground">
                Type at least 2 characters to search
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['Leather', 'Kitchen', 'Denim', 'Incense', 'Wood', 'Canvas'].map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setQuery(suggestion)}
                      className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground hover:bg-[#C62828]/10 hover:text-[#C62828] transition-colors"
                    >
                      {suggestion}
                    </button>
                  ),
                )}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <Search className="size-10 text-gray-200 mb-3" />
              <p className="text-sm font-medium text-gray-700">
                No results for &quot;{query}&quot;
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Try a different search term
              </p>
            </div>
          ) : (
            <div className="py-2">
              <p className="px-4 pb-2 text-xs font-medium text-muted-foreground">
                {results.length} {results.length === 1 ? 'result' : 'results'}
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={query}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  {results.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        closeSearch();
                        setQuery('');
                        // Navigate to product detail
                        window.location.hash = '#product-' + product.id;
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-muted/60 transition-colors group"
                    >
                      {/* Thumbnail */}
                      <div className="relative h-14 w-14 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={56}
                          height={56}
                          className="object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-[#C62828] transition-colors">
                          {product.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`size-3 ${
                                  star <= Math.round(product.rating)
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'fill-gray-200 text-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            ({product.reviewCount})
                          </span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex-shrink-0 text-right">
                        <span className="text-sm font-bold text-[#C62828]">
                          ${product.price.toLocaleString()}
                        </span>
                        <ArrowRight className="size-4 text-gray-300 group-hover:text-[#C62828] ml-1 transition-colors" />
                      </div>
                    </button>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
