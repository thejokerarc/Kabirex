import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { getProducts, updateProduct, deleteProduct, addProduct } from "@/data/adminStore";
import { Product } from "@/types/product";
import {
    Trash2,
    Edit3,
    Search,
    MoreVertical,
    ChevronRight,
    Package,
    CheckCircle2,
    XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const AdminProducts = () => {
    const [products, setProducts] = useState(getProducts());
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: string) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
            deleteProduct(id);
            setProducts(getProducts());
            toast({
                title: "Produit supprimé",
                description: "Le produit a été retiré du catalogue."
            });
        }
    };

    const toggleStock = (id: string, currentStatus: boolean) => {
        updateProduct(id, { inStock: !currentStatus });
        setProducts(getProducts());
        toast({
            title: "Statut mis à jour",
            description: `Disponibilité modifiée.`
        });
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Search & Stats */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Rechercher par nom ou catégorie..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#50B780]/20"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span>{products.filter(p => p.inStock).length} En stock</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <span>{products.filter(p => !p.inStock).length} En rupture</span>
                        </div>
                    </div>
                </div>

                {/* Product Table */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Produit</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Catégorie</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Prix</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase text-center">Statut</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 border-b border-gray-100 transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                                                    <img src={product.image} alt="" className="w-full h-full object-contain" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-[#3D465A] text-sm group-hover:text-[#50B780] transition-colors line-clamp-1">
                                                        {product.name}
                                                    </div>
                                                    <div className="text-[10px] text-gray-400 font-mono">ID: {product.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="px-2 py-1 bg-gray-100 rounded text-[10px] font-bold uppercase text-gray-600 tracking-wider">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-bold text-sm text-[#3D465A]">
                                                {new Intl.NumberFormat("fr-SN").format(product.currentPrice)} F
                                            </div>
                                            {product.originalPrice && (
                                                <div className="text-[10px] text-gray-400 line-through">
                                                    {new Intl.NumberFormat("fr-SN").format(product.originalPrice)} F
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => toggleStock(product.id, product.inStock)}
                                                className={`mx-auto flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold transition-all ${product.inStock
                                                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                    : "bg-red-100 text-red-700 hover:bg-red-200"
                                                    }`}
                                            >
                                                {product.inStock ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                                                {product.inStock ? "DISPONIBLE" : "EN RUPTURE"}
                                            </button>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link to={`/admin/products/edit/${product.id}`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50">
                                                        <Edit3 size={16} />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50"
                                                    onClick={() => handleDelete(product.id)}
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredProducts.length === 0 && (
                        <div className="py-20 flex flex-col items-center text-gray-400 bg-white">
                            <Package size={48} className="mb-4 opacity-20" />
                            <p className="font-medium">Aucun produit trouvé</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminProducts;
