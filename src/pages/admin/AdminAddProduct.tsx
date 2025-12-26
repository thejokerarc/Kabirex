import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { addProduct, getProducts, updateProduct } from "@/data/adminStore";
import { categories } from "@/data/products";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";

const AdminAddProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        name: "",
        category: "smartphones",
        brand: "",
        currentPrice: "",
        originalPrice: "",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
        inStock: true,
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isEditing) {
            const product = getProducts().find(p => p.id === id);
            if (product) {
                setFormData({
                    name: product.name,
                    category: product.category,
                    brand: product.brand,
                    currentPrice: String(product.currentPrice),
                    originalPrice: product.originalPrice ? String(product.originalPrice) : "",
                    image: product.image,
                    inStock: product.inStock,
                });
            }
        }
    }, [id, isEditing]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const payload = {
            ...formData,
            currentPrice: Number(formData.currentPrice),
            originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        };

        setTimeout(() => {
            if (isEditing) {
                updateProduct(id, payload);
                toast({ title: "Produit mis à jour", description: "Les modifications ont été enregistrées." });
            } else {
                addProduct(payload);
                toast({ title: "Produit créé", description: "Le produit a été ajouté au catalogue." });
            }
            setIsLoading(false);
            navigate("/admin/products");
        }, 800);
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate("/admin/products")}
                    className="flex items-center gap-2 text-gray-500 hover:text-[#50B780] mb-6 transition-colors font-medium"
                >
                    <ArrowLeft size={18} />
                    Retour à la liste
                </button>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="text-xl font-bold text-[#3D465A]">
                            {isEditing ? "Modifier le produit" : "Ajouter un nouveau produit"}
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left Column: Basic Info */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Nom du produit</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="ex: iPhone 16 Pro Max"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#50B780]/20"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Prix actuel (CFA)</label>
                                        <input
                                            required
                                            type="number"
                                            placeholder="750000"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#50B780]/20"
                                            value={formData.currentPrice}
                                            onChange={(e) => setFormData({ ...formData, currentPrice: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Prix barré (Optionnel)</label>
                                        <input
                                            type="number"
                                            placeholder="850000"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#50B780]/20"
                                            value={formData.originalPrice}
                                            onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Catégorie</label>
                                        <select
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#50B780]/20 bg-white"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            {categories.map(c => (
                                                <option key={c.id} value={c.slug}>{c.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Marque</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="ex: Apple"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#50B780]/20"
                                            value={formData.brand}
                                            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Image & Stock */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">URL de l'image</label>
                                    <div className="flex gap-2">
                                        <input
                                            required
                                            type="text"
                                            placeholder="Lien de l'image Unsplash ou autre..."
                                            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#50B780]/20"
                                            value={formData.image}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        />
                                        <button type="button" className="p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-400">
                                            <Upload size={20} />
                                        </button>
                                    </div>
                                </div>

                                <div className="aspect-video rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                                    {formData.image ? (
                                        <img src={formData.image} alt="Preview" className="w-full h-full object-contain" />
                                    ) : (
                                        <div className="text-gray-400 text-xs text-center p-4">
                                            Aperçu de l'image
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                    <input
                                        type="checkbox"
                                        id="inStock"
                                        className="w-5 h-5 rounded border-gray-300 text-[#50B780] focus:ring-[#50B780]"
                                        checked={formData.inStock}
                                        onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                                    />
                                    <label htmlFor="inStock" className="text-sm font-bold text-[#3D465A]">
                                        Produit disponible en stock
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate("/admin/products")}
                                disabled={isLoading}
                            >
                                Annuler
                            </Button>
                            <Button
                                type="submit"
                                className="bg-[#50B780] hover:bg-[#45a371] text-white px-8"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Enregistrement...
                                    </>
                                ) : (
                                    isEditing ? "Enregistrer les modifications" : "Créer le produit"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminAddProduct;
