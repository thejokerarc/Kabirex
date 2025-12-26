import { Link } from "react-router-dom";
import { categories } from "@/data/products";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1 }
};

const CategoryTiles = () => {
  return (
    <section className="py-8 border-b border-gray-100 overflow-x-auto no-scrollbar scroll-smooth">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex justify-start md:justify-between items-center gap-6 md:gap-8 min-w-max pb-6 px-4"
      >
        {categories.map((category) => (
          <motion.div key={category.id} variants={item}>
            <Link
              to={`/boutique?category=${category.slug}`}
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-50 flex items-center justify-center text-3xl transition-all duration-500 group-hover:bg-[#10B981]/10 group-hover:scale-110 border-2 border-transparent group-hover:border-[#10B981]/30 shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-emerald-500/10 transition-all duration-500" />
                <span className="relative z-10 transition-transform duration-500 group-hover:rotate-12">{category.icon}</span>
              </div>
              <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#3D465A] group-hover:text-[#10B981] transition-colors">
                {category.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default CategoryTiles;
