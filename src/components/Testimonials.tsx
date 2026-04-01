'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Testimonial } from '@/lib/data';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`size-4 ${
            star <= rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

function getInitials(name: string) {
  return name.charAt(0);
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  if (testimonials.length === 0) return null;

  return (
    <section className="w-full">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {testimonials.map((testimonial) => (
          <motion.div key={testimonial.id} variants={itemVariants}>
            <Card className="h-full py-0 p-0 gap-0 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col gap-4 h-full">
                {/* Quote icon */}
                <Quote className="size-8 text-[#C62828]/20 flex-shrink-0" />

                {/* Review text */}
                <p className="text-sm leading-relaxed text-gray-700 flex-1">
                  {testimonial.text}
                </p>

                {/* Rating */}
                <StarRating rating={testimonial.rating} />

                {/* Author info */}
                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                  {/* Avatar fallback */}
                  <div className="w-10 h-10 rounded-full bg-[#C62828] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {getInitials(testimonial.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {testimonial.date}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
