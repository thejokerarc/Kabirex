import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Lock, User, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Mock authentication
        setTimeout(() => {
            if (username === "admin" && password === "kabirex2024") {
                toast({
                    title: "Connexion réussie",
                    description: "Bienvenue sur le panel d'administration.",
                });
                navigate("/admin/dashboard");
            } else {
                toast({
                    variant: "destructive",
                    title: "Échec de connexion",
                    description: "Identifiants incorrects.",
                });
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#3D465A] flex flex-col items-center justify-center p-4">
            <div className="mb-8 flex flex-col items-center">
                <div className="h-16 w-16 bg-[#50B780] rounded-2xl flex items-center justify-center text-white mb-4 shadow-xl">
                    <ShieldCheck size={32} />
                </div>
                <h1 className="text-white font-black text-2xl tracking-tighter uppercase font-heading">
                    KABIREX <span className="text-[#50B780]">ADMIN</span>
                </h1>
                <p className="text-white/40 text-xs mt-2 uppercase tracking-widest font-bold">Secure Access Only</p>
            </div>

            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-8">
                <div className="space-y-2 text-center">
                    <h2 className="text-xl font-bold text-[#3D465A]">Identifiez-vous</h2>
                    <p className="text-gray-400 text-sm">Entrez vos accès privilégiés pour continuer</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Nom d'utilisateur</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                <input
                                    required
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="admin"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#50B780]/20 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Mot de passe</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                <input
                                    required
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#50B780]/20 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <Button
                        className="w-full bg-[#50B780] hover:bg-[#45a371] text-white py-6 rounded-xl font-bold text-base shadow-lg shadow-[#50B780]/20 transition-all active:scale-95"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            "Se connecter"
                        )}
                    </Button>
                </form>

                <button
                    onClick={() => navigate("/")}
                    className="w-full text-center text-gray-400 text-sm hover:text-[#3D465A] transition-colors flex items-center justify-center gap-2"
                >
                    <ArrowLeft size={14} /> Retour à la boutique
                </button>
            </div>

            <div className="mt-8 text-white/20 text-[10px] uppercase font-bold tracking-widest">
                System Version 2.0.4 | encrypted communication
            </div>
        </div>
    );
};

export default AdminLogin;
