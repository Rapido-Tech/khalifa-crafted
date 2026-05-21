"use client";

import { useEffect, useRef, useState } from "react";
import { ShoppingCart, Search, Menu, X, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/lib/store";
import { selectCartCount } from "@/lib/features/cartSlice";
import { formatCurrency } from "@/utils/formatCurrency";

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
    <header className="transition-all duration-300 ease-in-out shadow-sm relative">
      {/* Promo banner */}
      <div className="bg-black text-white py-2 text-center">
        <p className="text-xs text-amber-600 md:text-base">
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
                alt="Khalid Crafted Logo"
                width={120}
                height={80}
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
              lg:flex items-center space-x-8 w-full md:w-max overflow-hidden transition-all duration-300 ease-in-out
              ${
                isMenuOpen
                  ? "max-h-96 opacity-100 translate-y-0 py-4"
                  : "max-h-0 opacity-0 -translate-y-4 py-0"
              }
              lg:opacity-100 lg:translate-y-0 lg:max-h-none lg:py-0 lg:relative lg:top-0 lg:p-0 
            `}
          >
            {[
              { href: "/", label: "HOME" },
              { href: "/shop", label: "SHOP" },
              { href: "/about", label: "ABOUT" },
              { href: "/about", label: "GALLERY" },
              { href: "/contact", label: "CONTACT" },
            ].map(({ href, label }) => (
              <div className="hidden md:block" key={label}>
                <Link
                  key={label}
                  href={href}
                  onClick={handleCloseMenu}
                  className=" h-[28px] flex items-center text-black no-underline group"
                >
                  <span className="relative p-0 h-5 overflow-hidden">
                    <div className="transition-transform duration-400 ease-in-out group-hover:-translate-y-[20px]">
                      <span className="block text-lg font-bold leading-5 transition-transform duration-400 ease-in-out origin-[right_center] group-hover:rotate-[20deg]">
                        {label}
                      </span>
                      <span className="block text-lg font-bold leading-5 transition-transform duration-400 ease-in-out origin-[left_center] rotate-[20deg] group-hover:rotate-0">
                        {label}
                      </span>
                    </div>
                  </span>
                </Link>
              </div>
            ))}

            {[
              { href: "/", label: "HOME" },
              { href: "/shop", label: "SHOP" },
              { href: "/about", label: "ABOUT" },
              { href: "/about", label: "GALLERY" },
              { href: "/contact", label: "CONTACT" },
            ].map(({ href, label }) => (
              <div className="md:hidden " key={label}>
                <Link
                  key={label}
                  href={href}
                  onClick={handleCloseMenu}
                  className="group"
                >
                  <div className="py-2 text-lg">{label}</div>
                </Link>
              </div>
            ))}
          </nav>

          {/* Icons */}
          <div className="md:flex items-center space-x-4 hidden">
            <Search className="h-5.5 w-5.5" />
            <User2 className="h-5.5 w-5.5" />
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5.5 w-5.5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
