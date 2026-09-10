import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-marcellus text-brand text-7xl md:text-8xl">404</p>
      <h1 className="font-marcellus mt-4 text-3xl md:text-4xl text-foreground">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-foreground/70">
        The page you&apos;re looking for doesn&apos;t exist or may have been
        moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/shop">Browse Shop</Link>
        </Button>
      </div>
    </div>
  );
}
