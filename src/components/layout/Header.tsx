"use client";

import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Balancer } from 'react-wrap-balancer';

const navLinks = [
  { href: '/', label: 'Create Blessing' },
  { href: '/chain', label: 'Blessing Chain' },
  { href: '/explore', label: 'Explore Blessings' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            <Balancer>Digital Blessing Chain</Balancer>
          </span>
        </Link>
        <nav className="hidden items-center space-x-6 text-lg md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'font-medium transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
