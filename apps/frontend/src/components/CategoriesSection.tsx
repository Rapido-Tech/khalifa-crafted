import Image from "next/image";

interface HomeCategory {
  name: string;
  image: string; // local public asset path or remote URL
}

interface CategoriesSectionProps {
  categories: HomeCategory[];
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-marcellus text-3xl md:text-4xl text-foreground cursor-default">
            Our Categories
          </h2>
          <span className="mt-3 block w-12 h-px bg-brand mx-auto" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group relative aspect-[4/5] overflow-hidden cursor-default"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                sizes="(min-width: 768px) 33vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
              <h3 className="absolute bottom-4 left-4 font-marcellus text-lg text-white tracking-wide">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
