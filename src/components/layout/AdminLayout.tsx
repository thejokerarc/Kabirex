import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    PlusCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: "Tableau de bord", path: "/admin/dashboard" },
        { icon: <Package size={20} />, label: "Produits", path: "/admin/products" },
        { icon: <Users size={20} />, label: "Clients", path: "/admin/customers" },
        { icon: <Settings size={20} />, label: "Paramètres", path: "/admin/settings" },
    ];

    const handleLogout = () => {
        // Simple mock logout
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? "w-64" : "w-20"
                    } bg-[#3D465A] text-white transition-all duration-300 flex flex-col fixed h-full z-50`}
            >
                <div className="p-4 flex items-center justify-between border-b border-white/10 h-20">
                    {isSidebarOpen && (
                        <div className="font-heading font-black text-xl tracking-tighter">
                            KABIREX <span className="text-[#50B780]">ADMIN</span>
                        </div>
                    )}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-4 p-3 rounded-lg transition-all ${location.pathname === item.path
                                    ? "bg-[#50B780] text-white"
                                    : "text-white/70 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            {item.icon}
                            {isSidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 p-3 w-full text-white/70 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all"
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="font-medium text-sm">Déconnexion</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
                <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40">
                    <h1 className="text-xl font-bold text-[#3D465A]">
                        {menuItems.find(i => i.path === location.pathname)?.label || "Administration"}
                    </h1>
                    <div className="flex items-center gap-4">
                        <Link to="/admin/products/new">
                            <Button className="bg-[#50B780] hover:bg-[#45a371] text-white gap-2">
                                <PlusCircle size={18} />
                                Nouveau Produit
                            </Button>
                        </Link>
                    </div>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
