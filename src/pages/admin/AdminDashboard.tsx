import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { getProducts } from "@/data/adminStore";
import {
    Package,
    TrendingUp,
    ShoppingCart,
    Users,
    ArrowUpRight,
    TrendingDown,
    Activity
} from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: number;
    isPositive?: boolean;
}

const StatsCard = ({ title, value, icon, trend, isPositive }: StatsCardProps) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-gray-50 rounded-xl text-[#3D465A]">
                {icon}
            </div>
            {trend && (
                <div className={`flex items-center gap-1 text-xs font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {trend}%
                </div>
            )}
        </div>
        <div>
            <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
            <div className="text-2xl font-black text-[#3D465A] mt-1">{value}</div>
        </div>
    </div>
);

const AdminDashboard = () => {
    const products = getProducts();

    const stats = [
        { title: "Produits Actifs", value: products.length, icon: <Package size={24} />, trend: 12, isPositive: true },
        { title: "Commandes (24h)", value: "24", icon: <ShoppingCart size={24} />, trend: 8, isPositive: true },
        { title: "Nouveaux Clients", value: "156", icon: <Users size={24} />, trend: 5, isPositive: false },
        { title: "Revenus (CFA)", value: "1.2M", icon: <TrendingUp size={24} />, trend: 15, isPositive: true },
    ];

    return (
        <AdminLayout>
            <div className="space-y-8">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-[#3D465A] to-[#2D3445] rounded-3xl p-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black font-heading mb-2">Bonjour, Créateur 👋</h2>
                        <p className="text-white/70 max-w-md">
                            Bienvenue sur votre espace de gestion Kabirex. Voici un aperçu des performances de votre boutique aujourd'hui.
                        </p>
                    </div>
                    <Activity className="absolute right-[-20px] top-[-20px] w-64 h-64 text-white/5 rotate-12" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => <StatsCard key={i} {...stat} />)}
                </div>

                {/* Recent Activity Placeholder */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-[#3D465A]">Derniers produits ajoutés</h3>
                            <button className="text-sm font-bold text-[#50B780] hover:underline">Voir tout</button>
                        </div>
                        <div className="p-4 space-y-4">
                            {products.slice(0, 5).map(p => (
                                <div key={p.id} className="flex items-center gap-4 group cursor-pointer p-2 hover:bg-gray-50 rounded-xl transition-colors">
                                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
                                        <img src={p.image} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-bold text-[#3D465A] group-hover:text-[#50B780] transition-colors">{p.name}</div>
                                        <div className="text-xs text-gray-400 uppercase font-bold">{p.category}</div>
                                    </div>
                                    <div className="font-black text-sm text-[#3D465A]">
                                        {new Intl.NumberFormat("fr-SN").format(p.currentPrice)} F
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-[#50B780]/10 rounded-full flex items-center justify-center text-[#50B780] mb-4">
                            <TrendingUp size={32} />
                        </div>
                        <h3 className="font-bold text-[#3D465A] text-lg mb-2">Croissance Stable</h3>
                        <p className="text-sm text-gray-500 max-w-xs mb-6">
                            Votre catalogue a augmenté de <span className="text-[#50B780] font-bold">12%</span> ce mois-ci. Continuez à ajouter des produits pour attirer plus de clients.
                        </p>
                        <div className="w-full h-24 bg-gray-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center">
                            <span className="text-xs text-gray-400 font-mono italic">Graphique de vente bientôt disponible</span>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
