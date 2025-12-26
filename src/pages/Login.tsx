import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, Lock, User, ShieldCheck } from "lucide-react";

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen flex flex-col bg-[#EAEDED]">
            <Header />

            <main className="flex-1 flex flex-col items-center py-12 px-4">
                {/* Brand Logo for Authentication */}
                <div className="mb-8">
                    <Link to="/">
                        <img
                            src="/images/logo.png"
                            alt="KABIREX Logo"
                            className="h-10 w-auto object-contain"
                        />
                    </Link>
                </div>

                <div className="w-full max-w-[350px] bg-white p-8 border border-gray-300 rounded-lg shadow-sm">
                    <h1 className="text-2xl font-medium mb-6 text-gray-900 leading-tight">
                        {isLogin ? "S'identifier" : "Créer un compte"}
                    </h1>

                    <form className="space-y-4">
                        {!isLogin && (
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-700">Votre nom</label>
                                <input
                                    type="text"
                                    placeholder="Nom et prénom"
                                    className="w-full h-8 px-3 rounded-[3px] border border-gray-400 focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-all text-sm"
                                />
                            </div>
                        )}

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-700">E-mail ou numéro de téléphone portable</label>
                            <input
                                type="email"
                                className="w-full h-8 px-3 rounded-[3px] border border-gray-400 focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-all text-sm"
                            />
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold text-gray-700">Mot de passe</label>
                                {isLogin && (
                                    <Link to="#" className="text-xs text-[#0066c0] hover:text-[#c45500] hover:underline">
                                        Mot de passe oublié ?
                                    </Link>
                                )}
                            </div>
                            <input
                                type="password"
                                placeholder={!isLogin ? "Au moins 6 caractères" : ""}
                                className="w-full h-8 px-3 rounded-[3px] border border-gray-400 focus:outline-none focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] transition-all text-sm"
                            />
                            {!isLogin && (
                                <div className="flex items-start gap-1 text-[11px] text-gray-600 mt-1">
                                    <ShieldCheck className="h-3 w-3 text-[#0066c0] mt-0.5" />
                                    <span>Les mots de passe doivent comporter au moins 6 caractères.</span>
                                </div>
                            )}
                        </div>

                        <Button className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 border border-[#FCD200] rounded-[3px] py-1 h-8 text-sm shadow-sm active:shadow-inner mt-2">
                            {isLogin ? "Continuer" : "Vérifier l'adresse e-mail"}
                        </Button>
                    </form>

                    <div className="mt-6 text-[11px] text-gray-600 leading-normal">
                        En continuant, vous acceptez les <Link to="#" className="text-[#0066c0] hover:text-[#c45500] hover:underline">conditions d'utilisation</Link> et la <Link to="#" className="text-[#0066c0] hover:text-[#c45500] hover:underline">notice Protection de vos informations personnelles</Link> de Kabirex.
                    </div>

                    {isLogin && (
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-px bg-gray-200 flex-1"></div>
                                <span className="text-xs text-gray-500">Nouveau chez Kabirex ?</span>
                                <div className="h-px bg-gray-200 flex-1"></div>
                            </div>
                            <Button
                                onClick={() => setIsLogin(false)}
                                variant="outline"
                                className="w-full bg-[#f0f2f2] hover:bg-[#e3e6e6] text-gray-900 border border-gray-300 rounded-[3px] py-1 h-8 text-sm shadow-sm"
                            >
                                Créer votre compte Kabirex
                            </Button>
                        </div>
                    )}

                    {!isLogin && (
                        <div className="mt-6 pt-6 border-t border-gray-100 text-xs text-gray-900">
                            Vous avez déjà un compte ? <button onClick={() => setIsLogin(true)} className="text-[#0066c0] hover:text-[#c45500] hover:underline font-bold">Identifiez-vous</button>
                        </div>
                    )}
                </div>

                {/* Support area for customers who want to sell */}
                <div className="mt-10 max-w-[350px] text-center space-y-4">
                    <div className="p-4 bg-white border border-[#50B780]/20 rounded-lg">
                        <h3 className="text-sm font-bold text-[#3D465A] mb-2 uppercase tracking-wide">Devenir Vendeur ?</h3>
                        <p className="text-xs text-gray-600 italic">
                            "Comme précisé par le client, cette zone sera bientôt activée pour vous permettre de vendre vos produits tech sur Kabirex."
                        </p>
                    </div>

                    <Link
                        to="/admin/login"
                        className="inline-block text-[10px] text-gray-400 hover:text-[#50B780] transition-colors uppercase font-bold tracking-widest"
                    >
                        Accès Admin
                    </Link>
                </div>
            </main>

            <footer className="py-8 bg-[#EAEDED] flex flex-col items-center gap-4 text-[11px] text-[#0066c0]">
                <div className="flex gap-6">
                    <Link to="#" className="hover:text-[#c45500] hover:underline">Conditions d'utilisation</Link>
                    <Link to="#" className="hover:text-[#c45500] hover:underline">Aide</Link>
                </div>
                <span className="text-gray-600">© 2024 Kabirex.com, Inc. ou ses filiales</span>
            </footer>
        </div>
    );
};

export default Login;
