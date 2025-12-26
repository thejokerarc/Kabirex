import { Product } from "@/types/product";
import ProductGrid from "@/components/products/ProductGrid";

interface PromoBannerProps {
  title: string;
  products: Product[];
  bgColor?: string;
}

const PromoBanner = ({ title, products, bgColor }: PromoBannerProps) => {
  return (
    <section className={`py-8 px-4 -mx-4 ${bgColor || ''}`}>
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-primary/10 to-transparent rounded-lg p-4 mb-6">
          <h2 className="font-heading font-bold text-lg md:text-xl text-foreground">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <article className="group bg-card rounded-lg overflow-hidden shadow-card card-hover">
                <div className="relative aspect-square overflow-hidden bg-secondary">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-sm text-card-foreground line-clamp-2 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-foreground">
                    {new Intl.NumberFormat("fr-SN").format(product.currentPrice)} CFA
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
