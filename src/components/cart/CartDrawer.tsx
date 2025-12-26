import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-SN").format(price);
};

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
    const { items, totalItems, totalPrice, removeFromCart, updateQuantity } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="h-6 w-6 text-[#10B981]" />
                                <h2 className="text-xl font-black text-[#3D465A] tracking-tighter">Votre Panier</h2>
                                <span className="bg-emerald-100 text-[#10B981] text-[10px] font-black px-2 py-0.5 rounded-full">
                                    {totalItems}
                                </span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="h-6 w-6 text-gray-400" />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                                        <ShoppingBag className="h-10 w-10 text-gray-200" />
                                    </div>
                                    <h3 className="font-bold text-gray-900">Votre panier est vide</h3>
                                    <p className="text-gray-400 text-sm">Commencez vos achats pour voir vos articles ici.</p>
                                    <Link to="/cart" onClick={onClose}>
                                        <Button className="rounded-full bg-[#3D465A] hover:bg-[#10B981] text-white">
                                            Continuer mes achats
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <motion.div
                                        layout
                                        key={item.product.id}
                                        className="flex gap-4 group"
                                    >
                                        <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center p-2 border border-gray-100">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="w-full h-full object-contain transition-transform group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <h4 className="text-sm font-bold text-[#3D465A] line-clamp-1 mb-1">
                                                {item.product.name}
                                            </h4>
                                            <p className="text-xs text-gray-400 mb-3">
                                                {item.product.currentPrice.toLocaleString()} CFA
                                            </p>

                                            <div className="mt-auto flex items-center justify-between">
                                                <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-full px-2 py-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                        className="p-1 hover:text-[#10B981] transition-colors"
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </button>
                                                    <span className="text-xs font-black min-w-[1rem] text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                        className="p-1 hover:text-[#10B981] transition-colors"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.product.id)}
                                                    className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-4">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Sous-total</span>
                                    <span className="text-2xl font-black text-[#3D465A] tracking-tighter">
                                        {formatPrice(totalPrice)} F
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    <Link to="/cart" onClick={onClose}>
                                        <Button className="w-full py-7 rounded-2xl bg-[#10B981] text-white hover:bg-[#059669] shadow-lg shadow-emerald-200 font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 group mb-3">
                                            Passer la commande
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </Link>
                                    <Link to="/cart" onClick={onClose}>
                                        <Button variant="outline" className="w-full py-7 rounded-2xl border-2 border-gray-200 text-[#3D465A] hover:bg-white hover:border-[#3D465A] font-black uppercase text-xs tracking-widest">
                                            Voir le panier complet
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
