import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Search, ChevronDown, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import CartDrawer from "@/components/cart/CartDrawer";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const isActive = (path: string) => location.pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/boutique?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="w-full bg-white z-50 relative">
      <div className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-[60]">
        <div className="container mx-auto px-4">
          <div className="flex h-16 md:h-20 items-center justify-between gap-4">

            {/* 1. Left: Menu Trigger + Logo (Menu FIRST) */}
            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-slate-900 text-white rounded-xl transition-all hover:bg-black shadow-md group"
                aria-label="Menu des catégories"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 md:h-6 md:w-6 animate-in spin-in-90 duration-300" />
                ) : (
                  <Menu className="h-5 w-5 md:h-6 md:w-6 animate-in fade-in duration-300" />
                )}
              </motion.button>

              <Link to="/" className="flex items-center shrink-0">
                <img src="/images/logo.png" alt="Kabirex Logo" className="h-6 md:h-8 w-auto object-contain transition-transform hover:scale-105" />
              </Link>
            </div>

            {/* 2. Center: Navbar Navigation Links (French) */}
            <nav className="hidden md:flex items-center flex-1 justify-center gap-6 lg:gap-10">
              {['Accueil', 'Collections', 'Services', 'Contact'].map((item, idx) => {
                const path = item === 'Accueil' ? '/' : item === 'Collections' ? '/boutique' : `/${item.toLowerCase()}`;
                const active = isActive(path);
                return (
                  <Link
                    key={idx}
                    to={path}
                    className={`text-sm font-bold transition-all relative group ${active ? 'text-[#10B981]' : 'text-slate-700 hover:text-[#10B981]'}`}
                  >
                    {item}
                    <motion.span
                      initial={false}
                      animate={{ scaleX: active ? 1 : 0 }}
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#10B981] origin-left transition-transform"
                    />
                  </Link>
                );
              })}
            </nav>

            {/* 3. Right: Action Icons */}
            <div className="flex items-center gap-1 md:gap-4">
              {/* Mobile Search Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 rounded-full transition-all md:hidden ${isSearchOpen ? 'bg-emerald-50 text-[#10B981]' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {isSearchOpen ? <X className="h-6 w-6" /> : <Search className="h-6 w-6" />}
              </motion.button>

              {/* Desktop Search (Hidden on Mobile) */}
              <form onSubmit={handleSearch} className="hidden md:flex relative group">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-4 pr-10 py-2.5 w-64 rounded-full bg-slate-50 border border-transparent focus:bg-white focus:border-green-200 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-sm font-medium text-slate-600 placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                  aria-label="Rechercher"
                >
                  <Search className="h-5 w-5 text-slate-400 group-focus-within:text-[#10B981] transition-colors" />
                </button>
              </form>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 text-slate-600 hover:bg-slate-100 rounded-full transition-all group"
              >
                <ShoppingCart className="h-6 w-6 group-hover:text-[#10B981]" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-1 right-1 h-4 w-4 rounded-full bg-[#10B981] text-[9px] flex items-center justify-center text-white font-black shadow-sm"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <Link to="/login" className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-full transition-all hover:text-[#10B981]">
                <User className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Megamenu / Slide-down area (French Categories) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 z-50 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#10B981] underline underline-offset-8">Zones Spéciales</h3>
                    <nav className="flex flex-col gap-3">
                      <Link to="/boutique?brand=Apple" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold text-slate-900 hover:text-[#10B981] transition-colors flex items-center gap-2 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] group-hover:scale-150 transition-transform" /> Apple Zone
                      </Link>
                    </nav>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 underline underline-offset-8">Mobilité</h3>
                    <nav className="flex flex-col gap-3">
                      <Link to="/boutique?category=smartphones" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold text-slate-500 hover:text-[#10B981] transition-colors">Téléphones</Link>
                      <Link to="/boutique?category=tablets" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold text-slate-500 hover:text-[#10B981] transition-colors">Tablettes</Link>
                      <Link to="/boutique?category=wearables" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold text-slate-500 hover:text-[#10B981] transition-colors">Montres Connectées</Link>
                    </nav>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 underline underline-offset-8">Informatique</h3>
                    <nav className="flex flex-col gap-3">
                      <Link to="/boutique?category=ordinateurs" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold text-slate-500 hover:text-[#10B981] transition-colors">Ordinateurs</Link>
                      <Link to="/boutique?category=gaming" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold text-slate-500 hover:text-[#10B981] transition-colors">Gaming & PC</Link>
                      <Link to="/boutique?category=networking" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold text-slate-500 hover:text-[#10B981] transition-colors">Wifi & Réseaux</Link>
                    </nav>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 underline underline-offset-8">Maison & Son</h3>
                    <nav className="flex flex-col gap-3">
                      <Link to="/boutique?category=tv" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold text-slate-500 hover:text-[#10B981] transition-colors">TV & Vidéo</Link>
                      <Link to="/boutique?category=audio" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold text-slate-500 hover:text-[#10B981] transition-colors">Audio & Son</Link>
                      <Link to="/boutique?category=smarthome" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold text-slate-500 hover:text-[#10B981] transition-colors">Maison Intelligente</Link>
                    </nav>
                  </div>
                  <div className="col-span-1 md:col-span-1 lg:col-span-2 bg-[#0056fb] rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative group text-white">
                    <div className="relative z-10">
                      <h4 className="text-2xl font-black mb-2 leading-tight">Membre Exclusif <br /> Kabirex Tech</h4>
                      <p className="text-sm text-white/70 mb-6 max-w-[200px]">Rejoignez-nous pour des offres privées hebdomadaires.</p>
                      <Link to="/login" onClick={() => setIsMenuOpen(false)} className="inline-block bg-white text-primary font-bold text-xs px-6 py-3 rounded-full hover:scale-105 transition-transform active:scale-95">S'inscrire</Link>
                    </div>
                    <Search className="absolute -bottom-10 -right-10 h-48 w-48 text-white/5 group-hover:text-white/10 transition-all duration-700" />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Search Bar (Collapsible) */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden px-4 pb-4 overflow-hidden bg-white"
          >
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#10B981] focus:ring-2 focus:ring-emerald-100 outline-none text-sm font-medium transition-all"
                autoFocus
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search className="h-5 w-5 text-slate-400" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
