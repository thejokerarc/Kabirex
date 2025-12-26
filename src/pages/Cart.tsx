import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Trash2, Plus, Minus, ChevronLeft, ShieldCheck } from "lucide-react";

const Cart = () => {
    const { items, totalItems, totalPrice, removeFromCart, updateQuantity } = useCart();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("fr-FR").format(price);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#EAEDED]">
            <Header />

            <main className="flex-1 py-8">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-6">

                        {/* Left Column: Cart Items */}
                        <div className="flex-1 bg-white p-6 shadow-sm rounded-sm">
                            <div className="border-b border-gray-200 pb-4 mb-4 flex justify-between items-end">
                                <h1 className="text-3xl font-medium text-[#0F1111]">Votre panier</h1>
                                <span className="text-sm text-gray-600 hidden md:block">Prix</span>
                            </div>

                            {items.length === 0 ? (
                                <div className="py-20 text-center">
                                    <h2 className="text-xl font-medium mb-4">Votre panier Kabirex est vide</h2>
                                    <p className="text-gray-600 mb-6">
                                        Découvrez nos offres du jour et commencez vos achats !
                                    </p>
                                    <Button asChild variant="default" className="bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] border border-[#FCD200] rounded-lg px-8">
                                        <Link to="/boutique">Continuer mes achats</Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {items.map((item) => (
                                        <div key={item.product.id} className="flex flex-col md:flex-row gap-4 border-b border-gray-200 pb-6 last:border-0">
                                            {/* Product Image */}
                                            <Link to={`/product/${item.product.id}`} className="w-full md:w-44 aspect-square shrink-0 overflow-hidden rounded bg-gray-50 flex items-center justify-center p-2">
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    className="max-w-full max-h-full object-contain"
                                                />
                                            </Link>

                                            {/* Product Info */}
                                            <div className="flex-1 flex flex-col">
                                                <div className="flex justify-between items-start mb-1">
                                                    <Link
                                                        to={`/product/${item.product.id}`}
                                                        className="text-lg font-medium text-[#007185] hover:text-[#C7511F] hover:underline line-clamp-2 md:pr-10"
                                                    >
                                                        {item.product.name}
                                                    </Link>
                                                    <span className="text-lg font-bold text-[#0F1111] whitespace-nowrap hidden md:block">
                                                        {formatPrice(item.product.currentPrice)} CFA
                                                    </span>
                                                </div>

                                                <p className="text-xs text-[#007600] mb-2">En stock</p>
                                                <p className="text-xs text-gray-500 mb-4 whitespace-nowrap">
                                                    Vendu par <span className="text-[#007185]">Kabirex</span>
                                                </p>

                                                <div className="mt-auto flex flex-wrap items-center gap-4">
                                                    {/* Quantity Selector */}
                                                    <div className="flex items-center bg-[#F0F2F2] border border-[#D5D9D9] rounded-lg shadow-sm">
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                            className="p-1 px-3 hover:bg-[#E3E6E6] rounded-l-lg transition-colors border-r border-[#D5D9D9]"
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </button>
                                                        <span className="px-4 text-sm font-medium">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                            className="p-1 px-3 hover:bg-[#E3E6E6] rounded-r-lg transition-colors border-l border-[#D5D9D9]"
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </button>
                                                    </div>

                                                    <div className="h-4 w-px bg-gray-300 mx-1 hidden md:block" />

                                                    <button
                                                        onClick={() => removeFromCart(item.product.id)}
                                                        className="text-xs text-[#007185] hover:underline hover:text-[#C7511F]"
                                                    >
                                                        Supprimer
                                                    </button>

                                                    <div className="h-4 w-px bg-gray-300 mx-1 hidden md:block" />

                                                    <button className="text-xs text-[#007185] hover:underline hover:text-[#C7511F]">
                                                        Mettre de côté
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Mobile Price */}
                                            <div className="md:hidden pt-2 flex justify-end">
                                                <span className="text-lg font-bold text-[#0F1111]">
                                                    {formatPrice(item.product.currentPrice)} CFA
                                                </span>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="flex justify-end pt-4">
                                        <p className="text-lg">
                                            Sous-total ({totalItems} article{totalItems > 1 ? 's' : ''}): <span className="font-bold">{formatPrice(totalPrice)} CFA</span>
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Checkout Summary */}
                        <div className="w-full lg:w-[300px] shrink-0 space-y-4">
                            <div className="bg-white p-5 shadow-sm rounded-sm">
                                <div className="flex items-start gap-2 text-[#067D62] text-xs mb-4">
                                    <div className="mt-0.5 shrink-0 rounded-full bg-[#067D62] p-0.5">
                                        <ShieldCheck className="h-2 w-2 text-white" />
                                    </div>
                                    <span>Votre commande est éligible à la livraison Rapide GRATUITE à Dakar.</span>
                                </div>

                                <div className="mb-6">
                                    <p className="text-lg leading-tight mb-4">
                                        Sous-total ({totalItems} article{totalItems > 1 ? 's' : ''}): <br />
                                        <span className="text-xl font-bold">{formatPrice(totalPrice)} CFA</span>
                                    </p>

                                    <div className="flex items-center gap-2 mb-4">
                                        <input type="checkbox" id="gift" className="rounded border-gray-300" />
                                        <label htmlFor="gift" className="text-sm">Commande contenant un cadeau</label>
                                    </div>

                                    <Button className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] border border-[#FCD200] rounded-lg py-6 font-medium text-base shadow-sm active:shadow-inner active:scale-[0.99] transition-all">
                                        Passer la commande
                                    </Button>
                                </div>
                            </div>

                            {/* Promo Section */}
                            <div className="bg-white p-4 shadow-sm rounded-sm">
                                <h3 className="font-bold text-sm mb-3">Produits consultés récemment</h3>
                                <Link to="/boutique" className="text-xs text-[#007185] hover:underline hover:text-[#C7511F]">
                                    Voir toutes les recommandations
                                </Link>
                            </div>
                        </div>

                    </div>

                    {/* Bottom links */}
                    <div className="mt-8 text-xs text-gray-600 leading-relaxed max-w-4xl">
                        <p>Le prix et la disponibilité des articles sur Kabirex sont sujets à changement. Le panier est un lieu temporaire où est stockée une liste de vos articles et où se reflète le prix le plus récent de chaque article.</p>
                        <p className="mt-2 text-[#007185] hover:underline cursor-pointer">Avez-vous un chèque-cadeau ou un bon de réduction ? Vous nous demanderez de saisir votre code au moment de payer.</p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Cart;
