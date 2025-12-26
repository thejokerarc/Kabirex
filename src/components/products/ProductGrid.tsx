import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ProductGridProps {
  title: string;
  products: Product[];
  showViewAll?: boolean;
  viewAllLink?: string;
}

const ProductGrid = ({ title, products, showViewAll = false, viewAllLink = "/boutique" }: ProductGridProps) => {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground">
          {title}
        </h2>
        {showViewAll && (
          <Link 
            to={viewAllLink}
            className="flex items-center gap-1 text-sm text-primary font-medium hover:underline transition-colors"
          >
            Voir tout
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, index) => (
          <div 
            key={product.id} 
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
