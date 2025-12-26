import { useParams, Link, useNavigate } from "react-router-dom";
import { getProducts } from "@/data/adminStore";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Newsletter from "@/components/layout/Newsletter";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, ArrowLeft, Star, Heart, Share2, ShieldCheck, Truck, RefreshCcw, Eye, Flame, ChevronRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const products = getProducts();
    const product = products.find((p) => p.id === id);
    const { addToCart } = useCart();
    const [activeImage, setActiveImage] = useState(0);
    const [activeTab, setActiveTab] = useState("description");

    // Variant Selection State
    const [selectedColor, setSelectedColor] = useState<string>(product?.colors?.[0] || "");
    const [selectedStorage, setSelectedStorage] = useState<string>(product?.storageOptions?.[0] || "");

    // Dynamic Stats
    const [viewers, setViewers] = useState(Math.floor(Math.random() * 20) + 15);
    const [soldCount, setSoldCount] = useState(Math.floor(Math.random() * 8) + 3);

    useEffect(() => {
        const interval = setInterval(() => {
            setViewers(prev => Math.max(10, prev + (Math.random() > 0.5 ? 1 : -1)));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (product) {
            if (product.colors && product.colors.length > 0) setSelectedColor(product.colors[0]);
            if (product.storageOptions && product.storageOptions.length > 0) setSelectedStorage(product.storageOptions[0]);
        }
    }, [product]);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-black font-heading uppercase tracking-tighter mb-4">Produit Non Trouvé</h1>
                <Link to="/" className="text-primary flex items-center gap-2 font-bold decoration-2 underline-offset-4 hover:underline">
                    <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
                </Link>
            </div>
        );
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("fr-SN").format(price);
    };

    const handleAddToCart = () => {
        addToCart({
            ...product,
            name: `${product.name} ${selectedStorage ? `(${selectedStorage})` : ''} ${selectedColor ? '-' : ''} ${selectedColor ? 'Couleur Sélectionnée' : ''}`
        });
        toast({
            title: "Ajouté au panier !",
            description: `${product.name} (${selectedStorage || 'Standard'}) a été ajouté.`,
        });
    };

    const calculatedPrice = product.currentPrice + ((product.storageOptions?.indexOf(selectedStorage) || 0) * 50000);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            <main className="flex-1">
                <div className="container mx-auto px-4 py-8 md:py-12">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 overflow-x-auto whitespace-nowrap pb-2">
                        <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
                        <ChevronRight className="h-3 w-3" />
                        <Link to="/boutique" className="hover:text-primary transition-colors">Boutique</Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-slate-900">{product.name}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        {/* 1. Gallery Section (7 cols) */}
                        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-6">
                            {/* Vertical Thumbnails */}
                            <div className="flex md:flex-col gap-4 shrink-0 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                                {product.colors && product.colors.map((color, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setActiveImage(i);
                                            setSelectedColor(color);
                                        }}
                                        className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl border-2 transition-all p-3 bg-slate-50 relative overflow-hidden group ${activeImage === i ? 'border-primary ring-4 ring-primary/10' : 'border-slate-100 hover:border-slate-300'}`}
                                    >
                                        <img
                                            src={product.colorImages?.[color] || product.image}
                                            alt={`Color ${i + 1}`}
                                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform"
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Main Display (3D Model or Image) */}
                            <div className="flex-1 relative aspect-square md:aspect-auto md:h-[600px] bg-slate-50 rounded-[3rem] border border-slate-100 flex items-center justify-center overflow-hidden group shadow-sm p-8">
                                {product.category === 'smartphones' ? (
                                    <img
                                        src={product.colorImages?.[selectedColor] || product.image}
                                        alt={product.name}
                                        className="w-full h-full object-contain mix-blend-multiply transition-all duration-700 ease-out transform group-hover:scale-105"
                                        key={selectedColor}
                                    />
                                ) : (
                                    <img
                                        src={product.colorImages?.[selectedColor] || product.image}
                                        alt={product.name}
                                        className="w-full h-full object-contain mix-blend-multiply transition-all duration-500 animate-in fade-in zoom-in"
                                        key={selectedColor} // Force re-render on color change for animation
                                    />
                                )}

                                <div className="absolute top-8 right-8 flex flex-col gap-3 pointer-events-none">
                                    <Button variant="ghost" size="icon" className="pointer-events-auto rounded-full bg-white shadow-xl hover:bg-slate-50 text-slate-400 hover:text-red-500 transition-all active:scale-90 h-12 w-12">
                                        <Heart className="h-6 w-6" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="pointer-events-auto rounded-full bg-white shadow-xl hover:bg-slate-50 text-slate-400 hover:text-primary transition-all active:scale-90 h-12 w-12">
                                        <Share2 className="h-6 w-6" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* 2. Content Section (5 cols) */}
                        <div className="lg:col-span-5 space-y-8">
                            <div>
                                <h1 className="text-3xl md:text-5xl font-black font-heading text-slate-900 mb-4 leading-tight tracking-tighter">
                                    {product.name}
                                </h1>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex text-yellow-400">
                                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
                                    </div>
                                    <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full uppercase tracking-widest">En Stock</span>
                                </div>
                                <div className="text-5xl font-black text-primary tracking-tighter mb-2">
                                    {formatPrice(calculatedPrice)} <span className="text-xl">FCFA</span>
                                </div>
                            </div>

                            {/* Storage Options */}
                            {product.storageOptions && product.storageOptions.length > 0 && (
                                <div className="space-y-3">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Stockage</span>
                                    <div className="flex flex-wrap gap-3">
                                        {product.storageOptions.map((storage) => (
                                            <button
                                                key={storage}
                                                onClick={() => setSelectedStorage(storage)}
                                                className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest border-2 transition-all ${selectedStorage === storage
                                                    ? 'border-primary bg-primary text-white shadow-lg shadow-green-200'
                                                    : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200'}`}
                                            >
                                                {storage}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Color Options */}
                            {product.colors && product.colors.length > 0 && (
                                <div className="space-y-3">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Couleur</span>
                                    <div className="flex flex-wrap gap-3">
                                        {product.colors.map((color, index) => (
                                            <button
                                                key={color}
                                                onClick={() => {
                                                    setSelectedColor(color);
                                                    setActiveImage(index);
                                                }}
                                                className={`w-12 h-12 rounded-full border-2 transition-all flex items-center justify-center ${selectedColor === color
                                                    ? 'border-primary shadow-lg shadow-green-100 scale-110'
                                                    : 'border-transparent hover:scale-105'}`}
                                                style={{ backgroundColor: color }}
                                            >
                                                {selectedColor === color && <div className="w-4 h-4 rounded-full bg-white shadow-sm" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Availability Status */}
                            <div className="bg-emerald-50 rounded-[2.5rem] p-6 border border-emerald-100">
                                <div className="flex items-center gap-3">
                                    <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                                    <span className="text-sm font-black uppercase tracking-widest text-emerald-700">
                                        Disponibilité: En Stock
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-4 pt-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!product.inStock}
                                    className={`w-full flex items-center justify-center gap-4 py-7 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all transform active:scale-95 shadow-2xl shadow-blue-200/50 ${product.inStock
                                        ? "bg-primary text-white hover:bg-black"
                                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    {product.inStock ? "Ajouter au Panier" : "Rupture de Stock"}
                                </button>

                                <div className="grid grid-cols-3 gap-4 pt-6">
                                    <div className="flex flex-col items-center text-center gap-2">
                                        <Truck className="h-6 w-6 text-slate-400" />
                                        <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Livraison Rapide</span>
                                    </div>
                                    <div className="flex flex-col items-center text-center gap-2">
                                        <ShieldCheck className="h-6 w-6 text-slate-400" />
                                        <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Garantie 12 Mois</span>
                                    </div>
                                    <div className="flex flex-col items-center text-center gap-2">
                                        <RefreshCcw className="h-6 w-6 text-slate-400" />
                                        <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Retours Faciles</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className="mt-32">
                        <div className="flex justify-center gap-12 border-b border-slate-100 mb-16">
                            <button
                                onClick={() => setActiveTab("description")}
                                className={`pb-8 text-sm font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === "description" ? "text-[#0056fb]" : "text-slate-400 hover:text-slate-900"}`}
                            >
                                Description
                                {activeTab === "description" && <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#0056fb] rounded-full" />}
                            </button>
                            <button
                                onClick={() => setActiveTab("specs")}
                                className={`pb-8 text-sm font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === "specs" ? "text-[#0056fb]" : "text-slate-400 hover:text-slate-900"}`}
                            >
                                Spécifications
                                {activeTab === "specs" && <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-primary rounded-full" />}
                            </button>
                        </div>

                        <div className="max-w-4xl mx-auto bg-slate-50 rounded-[3rem] p-12 md:p-20 border border-slate-50 min-h-[400px]">
                            {activeTab === "description" ? (
                                <div className="space-y-8 text-slate-500 text-lg leading-relaxed font-medium">
                                    <p>{product.description || `Découvrez l'excellence avec le ${product.name}. Conçu pour les utilisateurs exigeants, ce produit allie design révolutionnaire et performances de pointe. Chaque détail a été pensé pour offrir une expérience utilisateur fluide et immersive.`}</p>
                                    {!product.description && <p>Que ce soit pour le travail ou le divertissement, le {product.name} s'adapte à tous vos besoins avec une polyvalence inégalée. Profitez de la qualité signature de {product.brand} au meilleur prix chez Kabirex.</p>}
                                </div>
                            ) : (
                                <div className="space-y-12">
                                    <h3 className="text-2xl font-black text-slate-900 mb-8 font-heading text-center">Fiche Technique</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-bold text-xs uppercase tracking-widest">
                                        <div className="space-y-6">
                                            <div className="flex justify-between border-b border-slate-200 pb-4">
                                                <span className="text-slate-400">Marque</span>
                                                <span className="text-slate-900">{product.brand}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-slate-200 pb-4">
                                                <span className="text-slate-400">Catégorie</span>
                                                <span className="text-slate-900">{product.category}</span>
                                            </div>
                                            {product.specs?.ram && (
                                                <div className="flex justify-between border-b border-slate-200 pb-4">
                                                    <span className="text-slate-400">RAM</span>
                                                    <span className="text-slate-900">{product.specs.ram}</span>
                                                </div>
                                            )}
                                            {product.specs?.processor && (
                                                <div className="flex justify-between border-b border-slate-200 pb-4">
                                                    <span className="text-slate-400">Processeur</span>
                                                    <span className="text-slate-900">{product.specs.processor}</span>
                                                </div>
                                            )}
                                            {product.specs?.screen && (
                                                <div className="flex justify-between border-b border-slate-200 pb-4">
                                                    <span className="text-slate-400">Écran</span>
                                                    <span className="text-slate-900">{product.specs.screen}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-6">
                                            {product.specs?.weight && (
                                                <div className="flex justify-between border-b border-slate-200 pb-4">
                                                    <span className="text-slate-400">Poids</span>
                                                    <span className="text-slate-900">{product.specs.weight}</span>
                                                </div>
                                            )}
                                            {product.specs?.battery && (
                                                <div className="flex justify-between border-b border-slate-200 pb-4">
                                                    <span className="text-slate-400">Batterie</span>
                                                    <span className="text-slate-900">{product.specs.battery}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between border-b border-slate-200 pb-4">
                                                <span className="text-slate-400">Garantie</span>
                                                <span className="text-slate-900">12 Mois</span>
                                            </div>
                                            <div className="flex justify-between border-b border-slate-200 pb-4">
                                                <span className="text-slate-400">Livraison</span>
                                                <span className="text-slate-900">24-48h</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Newsletter />
            <Footer />
        </div>
    );
};

export default ProductDetail;
