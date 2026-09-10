"use client";

import { useEffect, useRef, useState } from "react";
import { ShoppingCart, Search, Menu, X, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/lib/store";
import { selectCartCount } from "@/lib/features/cartSlice";
import { formatCurrency } from "@/utils/formatCurrency";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const cartCount = useAppSelector(selectCartCount);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(target)
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <header className="transition-all duration-300 ease-in-out shadow-sm relative bg-background">
      {/* Promo banner */}
      <div className="bg-charcoal text-charcoal-foreground py-2 text-center">
        <p className="text-[11px] md:text-xs uppercase tracking-[0.2em]">
          Free shipping from {formatCurrency(20000)}
        </p>
      </div>
      <div className="container mx-auto px-4 py-1 ">
        <div className="flex justify-between items-center flex-col md:flex-row">
          {/* Logo and Hamburger */}

          <div className="flex items-center justify-between space-x-5 w-full md:w-max">
            <Link href="/" className="text-2xl font-bold">
              <Image
                src="/assets/khalidLogo.png"
                alt="Khalifa Crafted Logo"
                width={120}
                height={58}
                priority
              />
            </Link>
            <Button
              ref={toggleButtonRef}
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="lg:hidden"
            >
              {isMenuOpen ? (
                <X className="size-10" />
              ) : (
                <Menu className="size-10" />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <nav
            ref={menuRef}
            className={`
              flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-10 w-full lg:w-auto overflow-hidden transition-all duration-300 ease-in-out
              ${isMenuOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"}
              lg:opacity-100 lg:max-h-none lg:py-0
            `}
          >
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                onClick={handleCloseMenu}
                className="group relative inline-block w-fit py-2 lg:py-0 text-sm uppercase tracking-[0.15em] text-foreground transition-colors hover:text-brand"
              >
                {label}
                <span className="absolute -bottom-1 left-0 hidden h-px w-0 bg-brand transition-all duration-300 group-hover:w-full lg:block" />
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="md:flex items-center space-x-4 hidden">
            <Search className="h-5 w-5 text-foreground/70 transition-colors hover:text-brand" />
            <User2 className="h-5 w-5 text-foreground/70 transition-colors hover:text-brand" />
            <Link href="/cart" className="relative" aria-label="Cart">
              <ShoppingCart className="h-5 w-5 text-foreground/70 transition-colors hover:text-brand" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand text-brand-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
