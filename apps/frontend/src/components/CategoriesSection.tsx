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
    <section className="md:py-12">
      <div className="container mx-auto px-4 border-b pb-8 border-amber-600">
        <h2 className="text-xl md:text-4xl font-extrabold font-neoteric tracking-wider text-center py-8 cursor-default">
          Our Categories
        </h2>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex gap-2 flex-col items-center group pb-2 cursor-default"
            >
              <div className="size-24 rounded-full border-2 border-amber-600 overflow-hidden mb-2 hover:scale-110 transition-transform duration-300 ease-in-out">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={96}
                  height={96}
                  priority
                  className="w-full h-full aspect-square object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out"
                />
              </div>
              <h3 className="text-sm font-semibold tracking-widest text-center font-neoteric group-hover:scale-110 transition-transform duration-300 ease-in-out">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
