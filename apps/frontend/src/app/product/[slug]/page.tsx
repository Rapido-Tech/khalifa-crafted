import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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
      <div className="container mx-auto px-4 py-10 md:py-16">
        <Link
          href="/shop"
          className="inline-flex items-center text-sm uppercase tracking-wide text-foreground/70 hover:text-brand transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product images */}
          <div className="space-y-3">
            {mainImage && (
              <div className="relative w-full aspect-square bg-muted">
                <Image
                  src={mainImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {galleryImages.slice(0, 4).map((img, i) => (
                  <div key={i} className="relative aspect-square bg-muted">
                    <Image
                      src={img.url}
                      alt={`${product.name} view ${i + 2}`}
                      fill
                      className="object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      sizes="25vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product details */}
          <div className="space-y-8 lg:pt-2">
            <div>
              <h1 className="font-marcellus text-3xl md:text-4xl text-foreground mb-3">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold text-foreground">
                {formatCurrency(product.price)}
              </p>
              {product.discount && (
                <p className="text-sm text-green-700 mt-1">
                  {product.discount}% off
                </p>
              )}
            </div>

            <div>
              <h3 className="font-marcellus text-lg text-foreground mb-2">
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-marcellus text-lg text-foreground mb-3">
                  Available Sizes
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="px-3 py-1 border border-border text-sm text-foreground/80"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Client-side interactivity: quantity, cart, WhatsApp */}
            <ProductActions product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
