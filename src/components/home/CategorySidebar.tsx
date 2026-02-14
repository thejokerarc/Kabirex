import React from "react";
import {
    Smartphone,
    Tablet,
    Tv,
    Camera,
    Gamepad,
    Laptop,
    Headphones,
    Watch,
    Cpu,
    Home,
    Wifi,
    MoreHorizontal,
    ChevronRight,
    Apple
} from "lucide-react";
import { Link } from "react-router-dom";

interface Category {
    name: string;
    icon: React.ReactNode;
    path: string;
    isSpecial?: boolean;
    hasSub?: boolean;
}

const categories: Category[] = [
    { name: "Apple Zone", icon: <Apple className="h-4 w-4" />, path: "/boutique?brand=Apple", isSpecial: true },
    { name: "Téléphones", icon: <Smartphone className="h-4 w-4" />, path: "/boutique?category=smartphones" },
    { name: "Tablettes", icon: <Tablet className="h-4 w-4" />, path: "/boutique?category=tablets", hasSub: true },
    { name: "TV & Vidéo", icon: <Tv className="h-4 w-4" />, path: "/boutique?category=tv" },
    { name: "Appareils Photo", icon: <Camera className="h-4 w-4" />, path: "/boutique?category=cameras" },
    { name: "Jeux Vidéo", icon: <Gamepad className="h-4 w-4" />, path: "/boutique?category=gaming" },
    { name: "Ordinateurs", icon: <Laptop className="h-4 w-4" />, path: "/boutique?category=ordinateurs" },
    { name: "Audio & Son", icon: <Headphones className="h-4 w-4" />, path: "/boutique?category=audio" },
    { name: "Montres & High-Tech", icon: <Watch className="h-4 w-4" />, path: "/boutique?category=wearables" },
    { name: "PC Gaming", icon: <Cpu className="h-4 w-4" />, path: "/boutique?category=gaming" },
    { name: "Maison Intelligente", icon: <Home className="h-4 w-4" />, path: "/boutique?category=smarthome" },
    { name: "Réseaux & Wifi", icon: <Wifi className="h-4 w-4" />, path: "/boutique?category=networking" },
    { name: "Autres", icon: <MoreHorizontal className="h-4 w-4" />, path: "/boutique" },
];

const CategorySidebar = () => {
    return (
        <aside className="hidden lg:block w-72 bg-white border border-t-0 border-gray-100 rounded-b-xl shadow-xl overflow-hidden">
            <nav className="flex flex-col">
                {categories.map((cat, index) => (
                    <Link
                        key={index}
                        to={cat.path}
                        className={`group flex items-center justify-between px-6 py-4 transition-all border-b border-gray-50 last:border-0 relative overflow-hidden ${cat.isSpecial ? "bg-slate-50/50" : "hover:bg-slate-50"}`}
                    >
                        {cat.isSpecial && (
                            <div className="absolute left-0 top-0 w-1 h-full bg-[#10B981]" />
                        )}
                        <div className="flex items-center gap-4 relative z-10">
                            <span className={`${cat.isSpecial ? "text-[#10B981]" : "text-slate-400"} group-hover:text-[#10B981] transition-colors`}>
                                {cat.icon}
                            </span>
                            <span className={`text-[13px] font-bold ${cat.isSpecial ? "text-slate-900" : "text-slate-600"} group-hover:text-[#10B981] transition-colors tracking-tight`}>
                                {cat.name}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 relative z-10">
                            {cat.isSpecial && <span className="text-[9px] font-black bg-[#10B981]/10 text-[#10B981] px-2 py-0.5 rounded-full uppercase tracking-tighter">Nouveau</span>}
                            {cat.hasSub ? (
                                <ChevronRight className="h-3 w-3 text-slate-300 group-hover:text-[#10B981] transition-transform group-hover:translate-x-0.5" />
                            ) : (
                                <ChevronRight className="h-3.5 w-3.5 text-transparent group-hover:text-[#10B981]/40 transition-all opacity-0 group-hover:opacity-100" />
                            )}
                        </div>
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default CategorySidebar;
