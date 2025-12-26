import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Newsletter from "@/components/layout/Newsletter";
import ProductGrid from "@/components/products/ProductGrid";
import CategoryTiles from "@/components/home/CategoryTiles";
import HeroSlider from "@/components/home/HeroSlider";
import CategorySidebar from "@/components/home/CategorySidebar";
import { motion } from "framer-motion";
import { getProducts } from "@/data/adminStore";

const Index = () => {
  const products = getProducts();
  const weeklyDeals = products.filter(p => p.originalPrice && p.originalPrice > p.currentPrice);

  // Split products for different sections
  const smartphones = products.filter(p => p.category === "smartphones");
  const allProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] relative">
      {/* Premium Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.4]"
        style={{ backgroundImage: "radial-gradient(#10B98110 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <Header />

      <main id="main-content" className="flex-1 relative z-10">
        <div className="container mx-auto px-4 md:px-8">

          <div className="flex flex-col lg:flex-row gap-0 md:gap-8 items-start mb-8">
            {/* Left: Dedicated Sidebar (Large screens) */}
            <div className="hidden lg:block shrink-0 h-full order-1">
              <CategorySidebar />
            </div>

            {/* Right: Main Content (Hero) */}
            <div className="flex-1 w-full min-w-0 order-2">
              <div className="mt-4 md:mt-0 relative">
                {/* Background Glows (Aceternity style) */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100/30 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/50 rounded-full blur-[120px] pointer-events-none" />

                <HeroSlider />
              </div>
            </div>
          </div>

          {/* Quick Categories for Mobile */}
          <div className="lg:hidden mb-8">
            <CategoryTiles />
          </div>

          {/* Weekly Deals / Storepify Style */}
          <div className="py-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-4 md:p-8 shadow-sm border border-gray-100 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <ProductGrid
                title="Offres du Jour"
                products={weeklyDeals.slice(0, 4)}
                showViewAll
                viewAllLink="/boutique"
              />
            </motion.div>
          </div>

          {/* Promo Feature */}
          <section className="py-12">
            <div className="bg-[#10B981] rounded-[3rem] p-8 md:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative shadow-2xl shadow-emerald-200/50">
              <div className="relative z-10 max-w-xl">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-md inline-block px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-white/20"
                >
                  OFFRE EXCLUSIVE
                </motion.div>
                <h2 className="text-5xl md:text-7xl font-black font-heading mb-8 leading-[0.9] tracking-tighter">
                  L'élite de <br /> <span className="text-emerald-950/40 font-outline-2">la technologie</span>
                </h2>
                <p className="text-white/80 mb-12 max-w-sm text-lg font-medium leading-relaxed">
                  Élevez votre quotidien avec des produits certifiés premium. Jusqu'à <span className="font-black text-white px-2 bg-emerald-800/40 rounded-lg">-30%</span> sur les grandes marques.
                </p>
                <Link to="/boutique">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 25px 30px -5px rgb(0 0 0 / 0.1)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-emerald-600 font-black uppercase text-xs tracking-widest px-14 py-7 rounded-2xl transition-all shadow-2xl"
                  >
                    Explorer le catalogue
                  </motion.button>
                </Link>
              </div>

              {/* Product Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 10, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
                className="relative z-10 w-full md:w-1/2 flex justify-center md:justify-end"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-400 rounded-full blur-[80px] opacity-30" />
                  <img
                    src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=800&auto=format&fit=crop"
                    alt="Premium Phone"
                    className="w-72 md:w-96 h-auto drop-shadow-[0_45px_45px_rgba(0,0,0,0.6)] transform -rotate-[15deg] hover:rotate-0 transition-transform duration-1000 ease-out"
                  />
                </div>
              </motion.div>

              {/* Decorative Background Elements */}
              <div className="absolute right-0 top-0 w-2/3 h-full bg-white/5 skew-x-12 translate-x-32 hidden md:block" />
              <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/10 rounded-full blur-[100px]" />

              {/* Moving Beam Effect (Aceternity style) */}
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 pointer-events-none"
              />
            </div>
          </section>

          {/* Featured Sections */}
          <div className="py-12">
            <ProductGrid
              title="Nouveaux Mobiles"
              products={smartphones.slice(0, 4)}
            />
          </div>

          <div className="py-12">
            <ProductGrid
              title="Notre Catalogue"
              products={allProducts}
              showViewAll
            />
          </div>
        </div>

        {/* Newsletter */}
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
