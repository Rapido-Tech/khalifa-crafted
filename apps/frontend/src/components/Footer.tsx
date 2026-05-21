import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-amber-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Link href="/">
              <Image
                src="/assets/khalidLogo.png"
                alt="Khalifa Crafted"
                width={100}
                height={66}
                className="mb-4 brightness-0 invert"
              />
            </Link>
            <p className="text-amber-200 text-sm leading-relaxed">
              Handcrafted leather goods made with passion and precision in Nairobi, Kenya. Each piece is built to last a lifetime.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="text-amber-200 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="text-amber-200 hover:text-white transition-colors">Shipping &amp; Returns</Link></li>
              <li><Link href="/care" className="text-amber-200 hover:text-white transition-colors">Care Instructions</Link></li>
              <li><Link href="/custom" className="text-amber-200 hover:text-white transition-colors">Custom Orders</Link></li>
              <li><Link href="/about" className="text-amber-200 hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2 text-sm text-amber-200">
              <p>
                <a href="mailto:info@khalifacrafted.com" className="hover:text-white transition-colors">
                  info@khalifacrafted.com
                </a>
              </p>
              <p>+254 123 456 789</p>
              <p>Nairobi, Kenya</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-amber-800 text-center text-sm text-amber-300">
          <p>&copy; {new Date().getFullYear()} Khalifa Crafted. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
