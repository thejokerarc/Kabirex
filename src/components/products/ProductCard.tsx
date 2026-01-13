import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Tilt from "react-parallax-tilt";

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("fr-SN").format(price);
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const hasDiscount = product.originalPrice && product.originalPrice > product.currentPrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.currentPrice) / product.originalPrice!) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Succès",
      description: `${product.name} ajouté au panier.`,
    });
  };

  const [mouseX, setMouseX] = React.useState(0);
  const [mouseY, setMouseY] = React.useState(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    setMouseX(clientX - left);
    setMouseY(clientY - top);
  }

  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      perspective={1000}
      transitionSpeed={1500}
      scale={1.02}
      className="h-full"
    >
      <motion.article
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="group bg-white rounded-[1.5rem] overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-emerald-500/10 transition-shadow duration-500 flex flex-col h-full relative"
      >
        {/* Spotlight Effect */}
        <div
          className="pointer-events-none absolute -inset-px rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(16, 185, 129, 0.06), transparent 80%)`,
          }}
        />

        <div className="relative z-10 flex flex-col h-full">
          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-4 left-4 z-10 w-12 h-12 bg-red-500 rounded-full flex flex-col items-center justify-center text-white leading-none shadow-lg animate-in zoom-in duration-300">
              <span className="text-[10px] font-black uppercase">-{discountPercent}%</span>
            </div>
          )}

          {/* Floating Actions */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-2 group-hover:translate-x-0">
            <button className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:scale-110 transition-all">
              <Heart className="h-5 w-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-400 hover:text-emerald-500 hover:scale-110 transition-all">
              <Eye className="h-5 w-5" />
            </button>
          </div>

          {/* Image Container */}
          <Link to={`/product/${product.id}`} className="relative aspect-[4/5] overflow-hidden bg-gray-50/50 flex items-center justify-center p-6">
            <motion.img
              whileHover={{ scale: 1.15, rotate: -2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#10B981]/60">
              {product.brand || "Electronique"}
            </div>

            <Link to={`/product/${product.id}`}>
              <h3 className="font-black text-sm md:text-base text-[#3D465A] line-clamp-2 mb-4 min-h-[3rem] group-hover:text-[#10B981] transition-colors leading-tight tracking-tighter">
                {product.name}
              </h3>
            </Link>

            {/* Price Block */}
            <div className="mt-auto mb-6">
              <div className="flex items-center gap-3">
                <span className="text-xl font-black text-[#10B981] tracking-tighter">
                  {formatPrice(product.currentPrice)} F
                </span>
                {hasDiscount && (
                  <span className="text-xs text-gray-400 line-through font-bold">
                    {formatPrice(product.originalPrice!)} F
                  </span>
                )}
              </div>
            </div>

            {/* Quick Add Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] transition-all relative ${product.inStock
                ? "bg-[#3D465A] text-white hover:bg-[#10B981] shadow-lg hover:shadow-emerald-500/20"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
            >
              {product.inStock ? "Ajouter au Panier" : "Rupture"}
            </motion.button>
          </div>
        </div>
      </motion.article>
    </Tilt>
  );
};

export default ProductCard;
