'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const inquiryTypes = [
  { value: 'product', label: 'About a Product' },
  { value: 'order', label: 'About an Order' },
  { value: 'shipping', label: 'Shipping Inquiry' },
  { value: 'return', label: 'Returns & Exchanges' },
  { value: 'other', label: 'Other' },
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 600));

    toast.success('Inquiry Received', {
      description: 'Our team will get back to you shortly.',
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  }

  return (
    <section id="contact" className="w-full">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            Full Name <span className="text-[#C62828]">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            required
            className="h-11 rounded-lg"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address <span className="text-[#C62828]">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            required
            className="h-11 rounded-lg"
          />
        </div>

        {/* Inquiry Type */}
        <div className="space-y-2">
          <Label htmlFor="inquiry-type" className="text-sm font-medium text-gray-700">
            Inquiry Type <span className="text-[#C62828]">*</span>
          </Label>
          <Select name="inquiry-type" required>
            <SelectTrigger className="h-11 w-full rounded-lg">
              <SelectValue placeholder="Please select" />
            </SelectTrigger>
            <SelectContent>
              {inquiryTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm font-medium text-gray-700">
            Message <span className="text-[#C62828]">*</span>
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Please describe your inquiry in detail"
            required
            rows={6}
            className="rounded-lg resize-none"
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#C62828] hover:bg-[#B71C1C] text-white px-8 py-5 rounded-lg text-base font-semibold w-full sm:w-auto"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </section>
  );
}
