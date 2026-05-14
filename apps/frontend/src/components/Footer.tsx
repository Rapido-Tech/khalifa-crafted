import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-amber-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">aboutUs</h3>
            <p className="text-amber-200">aboutUsDescription</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">quickLinks</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-amber-200 hover:text-white">
                  faq
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-amber-200 hover:text-white"
                >
                  shippingReturns
                </Link>
              </li>
              <li>
                <Link href="/care" className="text-amber-200 hover:text-white">
                  careInstructions
                </Link>
              </li>
              <li>
                <Link
                  href="/custom"
                  className="text-amber-200 hover:text-white"
                >
                  customOrders
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">contactUs</h3>
            <p className="text-amber-200">email: info@khalifacrafted.com</p>
            <p className="text-amber-200">phone: +254 123 456 789</p>
          </div>
        </div>
        <div className="mt-8 text-center text-amber-200">
          <p>copyright</p>
        </div>
      </div>
    </footer>
  );
}
