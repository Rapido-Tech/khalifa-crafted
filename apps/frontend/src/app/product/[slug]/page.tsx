import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star } from "lucide-react";
import { getProducts, getProduct } from "@/lib/api";
import { formatCurrency } from "@/utils/formatCurrency";
import ProductActions from "@/components/ProductActions";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Pre-build all product pages at build time
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p._id }));
}

// Per-product metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const imageUrl = product.thumbnail?.url;

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: imageUrl ? [{ url: imageUrl, alt: product.name }] : [],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const mainImage = product.thumbnail?.url ?? product.images[0]?.url ?? "";
  const galleryImages = product.images.filter((img) => img.url !== mainImage);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/shop"
          className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product images */}
          <div className="space-y-4">
            {mainImage && (
              <div className="relative w-full h-96">
                <Image
                  src={mainImage}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg shadow-lg"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {galleryImages.slice(0, 4).map((img, i) => (
                  <div key={i} className="relative h-20">
                    <Image
                      src={img.url}
                      alt={`${product.name} view ${i + 2}`}
                      fill
                      className="object-cover rounded cursor-pointer hover:opacity-75 transition-opacity"
                      sizes="25vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-amber-900 mb-2 font-neoteric">
                {product.name}
              </h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
              <p className="text-3xl font-bold text-amber-800">
                {formatCurrency(product.price)}
              </p>
              {product.discount && (
                <p className="text-sm text-green-600 mt-1">
                  {product.discount}% off
                </p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-amber-900">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-amber-900">
                  Available Sizes
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="px-3 py-1 border border-amber-600 text-sm"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold mb-2 text-amber-900">
                Features
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>100% genuine leather</li>
                <li>Handcrafted by skilled artisans</li>
                <li>Durable construction</li>
                <li>Develops beautiful patina over time</li>
              </ul>
            </div>

            {/* Client-side interactivity: quantity, cart, WhatsApp */}
            <ProductActions product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
