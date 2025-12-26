import { Link } from "react-router-dom";
import { brands } from "@/data/products";

const BrandCloud = () => {
  return (
    <section className="py-8">
      <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-6">
        Nos Marques
      </h2>
      
      <div className="bg-card rounded-lg p-6 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-3">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              to={`/boutique?brand=${brand.slug}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors py-1"
            >
              {brand.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCloud;
