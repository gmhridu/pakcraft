'use client';

import { Twitter, Instagram, Facebook } from 'lucide-react';
import { footerLinks, companyInfo } from '@/lib/data';

function navigateToHash(hash: string) {
  window.location.hash = hash;
}

export function Footer() {
  const columns = [
    {
      title: 'Shop',
      links: footerLinks.shop,
    },
    {
      title: 'Categories',
      links: footerLinks.categories,
    },
    {
      title: 'Support',
      links: footerLinks.support,
    },
    {
      title: 'Company',
      links: footerLinks.company,
    },
  ];

  return (
    <footer className="mt-auto bg-[#212121] text-gray-300">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:gap-12">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-sm font-semibold tracking-wide text-white uppercase">
                {column.title}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => navigateToHash(link.hash)}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-white/10" />

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
          {/* Logo & Description */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="flex flex-col items-start">
              <span className="text-lg font-bold text-white leading-tight">
                PakCrafteds
              </span>
              <span className="text-[10px] font-medium text-gray-500 tracking-wide leading-tight">
                Handcrafted Goods
              </span>
            </div>
            <p className="mt-2 max-w-xs text-xs text-gray-500 leading-relaxed">
              {companyInfo.description}
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-9 items-center justify-center rounded-full bg-white/10 text-gray-400 transition-colors hover:bg-[#C62828] hover:text-white"
              aria-label="Twitter"
            >
              <Twitter className="size-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-9 items-center justify-center rounded-full bg-white/10 text-gray-400 transition-colors hover:bg-[#C62828] hover:text-white"
              aria-label="Instagram"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-9 items-center justify-center rounded-full bg-white/10 text-gray-400 transition-colors hover:bg-[#C62828] hover:text-white"
              aria-label="Facebook"
            >
              <Facebook className="size-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-center text-xs text-gray-600 sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <span>&copy; {new Date().getFullYear()} {companyInfo.name}. All rights reserved.</span>
          <span>{companyInfo.address}</span>
        </div>
      </div>
    </footer>
  );
}
