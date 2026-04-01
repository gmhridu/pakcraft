'use client';

import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import HeroBanner from '@/components/HeroBanner';
import CategoryList from '@/components/CategoryList';
import ProductList from '@/components/ProductList';
import ProductDetail from '@/components/ProductDetail';
import ContactForm from '@/components/ContactForm';
import Testimonials from '@/components/Testimonials';
import { CartDrawer } from '@/components/CartDrawer';
import { SearchDialog } from '@/components/SearchDialog';
import {
  FeaturesSection,
  AboutSection,
  GuideSection,
  TermsSection,
  PrivacySection,
  LegalSection,
  StoreSection,
} from '@/components/Pages';
import { products, categories, testimonials } from '@/lib/data';
import { useStore } from '@/lib/store';

// ─── SSR-safe hash subscription ─────────────────────────────────────────

const hashListeners = new Set<() => void>();

function subscribeToHash(callback: () => void) {
  hashListeners.add(callback);
  if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', callback);
  }
  return () => {
    hashListeners.delete(callback);
    if (typeof window !== 'undefined') {
      window.removeEventListener('hashchange', callback);
    }
  };
}

function getHashSnapshot() {
  return typeof window !== 'undefined' ? window.location.hash || '#home' : '#home';
}

function getServerSnapshot() {
  return '#home';
}

// ─── Page animation variants ────────────────────────────────────────────

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

// ─── Main Page Component ────────────────────────────────────────────────

export default function HomePage() {
  const hash = useSyncExternalStore(subscribeToHash, getHashSnapshot, getServerSnapshot);
  const selectedCategory = useStore((s) => s.selectedCategory);

  // Derive product selection from hash
  const productMatch = useMemo(() => hash.match(/^#product-(.+)$/), [hash]);
  const selectedProductId = productMatch ? productMatch[1] : null;

  // Derive current page from hash (product pages handled separately)
  const page = useMemo(
    () => (selectedProductId ? 'product' : hash.replace('#', '') || 'home'),
    [hash, selectedProductId],
  );

  // Filter products by selected category
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const categoryLabel = useMemo(() => {
    if (!selectedCategory) return null;
    const cat = categories.find((c) => c.slug === selectedCategory);
    return cat?.name ?? null;
  }, [selectedCategory]);

  const handleProductSelect = useCallback((id: string) => {
    window.location.hash = '#product-' + id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackToProducts = useCallback(() => {
    window.location.hash = '#home';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // ─── Render: Product Detail ──────────────────────────────────────────
  if (selectedProductId && page === 'product') {
    const product = products.find((p) => p.id === selectedProductId);
    if (!product) {
      // Invalid product ID — fall through to home page
      return (
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <CartDrawer />
          <SearchDialog />
          <main className="flex-1">
            <div className="mx-auto max-w-7xl px-4 py-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
              <button
                onClick={handleBackToProducts}
                className="text-[#C62828] hover:text-[#B71C1C] font-medium transition-colors"
              >
                ← Back to Home
              </button>
            </div>
          </main>
          <Footer />
        </div>
      );
    }
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <CartDrawer />
        <SearchDialog />
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div key={product.id} variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <ProductDetail product={product} onBack={handleBackToProducts} />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ─── Render: Sub-pages ───────────────────────────────────────────────
  const subPages: Record<string, React.ReactNode> = {
    about: (
      <motion.div key="about" variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <AboutSection />
      </motion.div>
    ),
    contact: (
      <motion.div key="contact" variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </motion.div>
    ),
    guide: (
      <motion.div key="guide" variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <GuideSection />
      </motion.div>
    ),
    terms: (
      <motion.div key="terms" variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <TermsSection />
      </motion.div>
    ),
    privacy: (
      <motion.div key="privacy" variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <PrivacySection />
      </motion.div>
    ),
    legal: (
      <motion.div key="legal" variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <LegalSection />
      </motion.div>
    ),
    store: (
      <motion.div key="store" variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <StoreSection />
      </motion.div>
    ),
  };

  if (page in subPages) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <CartDrawer />
        <SearchDialog />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            {subPages[page]}
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    );
  }

  // ─── Render: Home page (default) ────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartDrawer />
      <SearchDialog />
      <main className="flex-1">
        <div className="space-y-0">
          {/* Hero Banner */}
          <section id="home" className="scroll-mt-20">
            <HeroBanner />
          </section>

          {/* Features */}
          <FeaturesSection />

          {/* Categories */}
          <section id="categories" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <CategoryList categories={categories} />
          </section>

          {/* Products — filtered by category */}
          <section id="product-grid" className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8 scroll-mt-20">
            {/* Active category filter bar */}
            {categoryLabel && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {categoryLabel}
                    </h2>
                    <span className="text-sm text-muted-foreground">
                      ({filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'})
                    </span>
                  </div>
                  <button
                    onClick={() => useStore.getState().clearCategory()}
                    className="text-sm text-[#C62828] hover:text-[#B71C1C] font-medium transition-colors flex items-center gap-1"
                  >
                    <X className="size-4" />
                    Clear
                  </button>
                </div>
              </motion.div>
            )}

            {/* New Arrivals — only show when no category filter */}
            {!selectedCategory && (
              <div className="mb-8">
                <ProductList
                  products={products}
                  title="New Arrivals"
                  onSelect={handleProductSelect}
                />
              </div>
            )}

            {/* Filtered or full product grid */}
            {(selectedCategory || true) && (
              <ProductList
                products={selectedCategory ? filteredProducts : products.filter((p) => p.badge === 'HOT' || p.badge === 'SALE')}
                title={selectedCategory ? undefined : 'Best Sellers'}
                onSelect={handleProductSelect}
              />
            )}
          </section>

          {/* Testimonials */}
          <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <Testimonials testimonials={testimonials} />
          </section>

          {/* CTA Banner */}
          <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#C62828] to-[#8E0000] px-8 py-12 sm:px-12 sm:py-16 text-center text-white"
            >
              <h2 className="text-2xl font-bold sm:text-3xl">
                Discover Handcrafted Pieces That Stand Out
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-white/80 leading-relaxed">
                Be the first to know about new arrivals and exclusive sales. Subscribe to our newsletter for special member-only coupons.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => { window.location.hash = '#home'; }}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-[#C62828] shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  Shop Now
                </button>
                <button
                  onClick={() => { window.location.hash = '#contact'; }}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-white/10"
                >
                  Contact Us
                </button>
              </div>
            </motion.div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
