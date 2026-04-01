'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useStore } from '@/lib/store';

const navLinks = [
  { label: 'Home', hash: '#home' },
  { label: 'Categories', hash: '#categories' },
  { label: 'New Arrivals', hash: '#new' },
  { label: 'Contact', hash: '#contact' },
  { label: 'Guide', hash: '#guide' },
];

function subscribeToHash(callback: () => void) {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
}

function getHashSnapshot() {
  return window.location.hash || '#home';
}

function getServerSnapshot() {
  return '#home';
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeHash = useSyncExternalStore(subscribeToHash, getHashSnapshot, getServerSnapshot);
  const cartCount = useStore((s) => s.cartItems.reduce((sum, i) => sum + i.quantity, 0));
  const openCart = useStore((s) => s.openCart);
  const openSearch = useStore((s) => s.openSearch);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navigate = (hash: string) => {
    window.location.hash = hash;
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/80 backdrop-blur-lg supports-[backdrop-filter]:bg-white/70">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <button
            onClick={() => navigate('#home')}
            className="flex flex-col items-start gap-0 transition-opacity hover:opacity-80"
          >
            <span className="text-xl font-bold tracking-tight text-[#C62828] leading-tight">
              PakCrafteds
            </span>
            <span className="text-[10px] font-medium text-[#757575] tracking-wide leading-tight">
              Handcrafted Goods
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-1">
            {navLinks.map((link) => {
              const isActive = activeHash === link.hash;
              return (
                <button
                  key={link.hash}
                  onClick={() => navigate(link.hash)}
                  className={cn(
                    'relative px-3 py-2 text-sm font-medium transition-colors rounded-md',
                    isActive
                      ? 'text-[#C62828]'
                      : 'text-[#212121] hover:text-[#C62828] hover:bg-[#C62828]/5'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-indicator"
                      className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-[#C62828]"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {/* Search Button */}
            <button
              onClick={openSearch}
              className="flex size-9 items-center justify-center rounded-md text-[#212121] transition-colors hover:bg-[#C62828]/5 hover:text-[#C62828]"
              aria-label="Search"
            >
              <Search className="size-5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative flex size-9 items-center justify-center rounded-md text-[#212121] transition-colors hover:bg-[#C62828]/5 hover:text-[#C62828]"
              aria-label="Cart"
            >
              <ShoppingCart className="size-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex size-4.5 items-center justify-center rounded-full bg-[#C62828] text-[10px] font-bold text-white leading-none">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex size-9 items-center justify-center rounded-md text-[#212121] transition-colors hover:bg-[#C62828]/5 hover:text-[#C62828] lg:hidden"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay + Slide-in Panel */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                onClick={() => setIsMenuOpen(false)}
              />

              {/* Slide-in Panel from Right */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 z-50 h-full w-[280px] bg-white shadow-2xl lg:hidden"
              >
                {/* Panel Header */}
                <div className="flex items-center justify-between border-b border-border px-4 py-4">
                  <span className="text-lg font-bold text-[#C62828]">Menu</span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="flex size-8 items-center justify-center rounded-md text-[#212121] transition-colors hover:bg-gray-100 hover:text-[#C62828]"
                    aria-label="Close"
                  >
                    <X className="size-5" />
                  </button>
                </div>

                {/* Panel Nav Links */}
                <nav className="flex flex-col gap-1 p-4">
                  {navLinks.map((link) => {
                    const isActive = activeHash === link.hash;
                    return (
                      <button
                        key={link.hash}
                        onClick={() => navigate(link.hash)}
                        className={cn(
                          'flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors text-left',
                          isActive
                            ? 'bg-[#C62828]/10 text-[#C62828]'
                            : 'text-[#212121] hover:bg-gray-50 hover:text-[#C62828]'
                        )}
                      >
                        {link.label}
                        {isActive && (
                          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#C62828]" />
                        )}
                      </button>
                    );
                  })}
                </nav>

                {/* Panel Footer */}
                <div className="mt-auto border-t border-border px-4 py-4">
                  <button
                    onClick={() => { setIsMenuOpen(false); openSearch(); }}
                    className="flex items-center gap-3 text-xs text-[#757575] w-full"
                  >
                    <Search className="size-4" />
                    <span>Search</span>
                  </button>
                  <button
                    onClick={() => { setIsMenuOpen(false); openCart(); }}
                    className="flex items-center gap-3 text-xs text-[#757575] w-full mt-2"
                  >
                    <ShoppingCart className="size-4" />
                    <span>Cart ({cartCount})</span>
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
