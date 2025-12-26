import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Newsletter from "@/components/layout/Newsletter";
import ProductCard from "@/components/products/ProductCard";
import { getProducts } from "@/data/adminStore";
import { useSearchParams } from "react-router-dom";

const Boutique = () => {
  const products = getProducts();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search")?.toLowerCase() || "";
  const category = searchParams.get("category")?.toLowerCase() || "";
  const brand = searchParams.get("brand")?.toLowerCase() || "";

  const filteredProducts = products.filter(p => {
    const matchesSearch = !search ||
      p.name.toLowerCase().includes(search) ||
      p.category.toLowerCase().includes(search) ||
      p.brand.toLowerCase().includes(search);

    const matchesCategory = !category || p.category.toLowerCase() === category;
    const matchesBrand = !brand || p.brand.toLowerCase() === brand;

    return matchesSearch && matchesCategory && matchesBrand;
  });

  const pageTitle = search
    ? `Résultats pour "${search}"`
    : brand
      ? `${brand.charAt(0).toUpperCase() + brand.slice(1)} Zone`
      : category
        ? `Catégorie: ${category}`
        : "Notre Catalogue";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main id="main-content" className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <h1 className="font-heading font-black text-3xl md:text-5xl text-slate-900 tracking-tighter">
              {pageTitle}
            </h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest bg-slate-50 px-5 py-2 rounded-full border border-slate-100">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 px-4 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
              <div className="text-6xl mb-6 grayscale opacity-20">🔎</div>
              <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tighter">Aucun produit trouvé</h2>
              <p className="text-slate-400 font-medium">Découvrez nos autres catégories ou réessayez avec d'autres mots-clés.</p>
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-20">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`w-12 h-12 rounded-2xl text-sm font-black transition-all ${page === 1
                  ? "bg-[#0056fb] text-white shadow-xl shadow-blue-200"
                  : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                  }`}
              >
                {page}
              </button>
            ))}
            <span className="text-slate-300 font-bold px-2">...</span>
            <button className="w-12 h-12 rounded-2xl text-sm font-black bg-slate-50 text-slate-400 hover:bg-slate-100">
              9
            </button>
          </div>
        </div>

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
};

export default Boutique;
