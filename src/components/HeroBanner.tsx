'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroBanner() {
  return (
    <section className="relative w-full min-h-[520px] md:min-h-[600px] flex items-center overflow-hidden rounded-2xl">
      {/* Background Image */}
      <Image
        src="/images/hero-banner.png"
        alt="PakCrafteds Hero Banner"
        fill
        className="object-cover"
        priority
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 px-6 sm:px-10 md:px-16 lg:px-20 max-w-2xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight"
        >
          <span className="block">Handcrafted Quality</span>
          <span className="block mt-1">for Everyday Living</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          className="mt-6 text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-lg"
        >
          Carefully curated artisan goods delivered from around the world
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
          className="mt-8"
        >
          <Button
            asChild
            size="lg"
            className="bg-[#C62828] hover:bg-[#B71C1C] text-white text-base px-8 py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <a href="#home">
              Shop Now
              <ArrowRight className="size-5 ml-1" />
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
