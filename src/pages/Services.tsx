import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Wrench, Settings, Smartphone, Monitor, ShieldCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Services = () => {
    const services = [
        {
            icon: <Smartphone className="h-8 w-8 text-[#50B780]" />,
            title: "Réparation Smartphone",
            description: "Écran cassé, batterie déchargée ou problème logiciel ? Nos experts réparent votre téléphone en un temps record."
        },
        {
            icon: <Monitor className="h-8 w-8 text-[#50B780]" />,
            title: "Maintenance Ordinateur",
            description: "Nettoyage système, remplacement de composants et optimisation de performances pour PC et Mac."
        },
        {
            icon: <Wrench className="h-8 w-8 text-[#50B780]" />,
            title: "Installation à Domicile",
            description: "Besoin d'aide pour installer votre nouveau téléviseur ou système de sécurité ? Nous nous déplaçons chez vous."
        },
        {
            icon: <ShieldCheck className="h-8 w-8 text-[#50B780]" />,
            title: "Garantie Kabirex",
            description: "Tous nos services sont couverts par une garantie de satisfaction totale pour votre tranquillité d'esprit."
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-gray-50 py-16 border-b border-gray-100">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-[#3D465A] mb-4 uppercase tracking-tight">
                            Nos <span className="text-[#50B780]">Services</span>
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Plus qu'une boutique, Kabirex est votre partenaire technologique de confiance à Dakar.
                        </p>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {services.map((service, index) => (
                                <div key={index} className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                                    <div className="mb-6 bg-[#50B780]/10 p-4 rounded-full">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-[#3D465A] mb-3 uppercase tracking-tighter">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-[#3D465A] text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-6">Besoin d'une assistance immédiate ?</h2>
                        <p className="text-white/80 mb-8 max-w-xl mx-auto">
                            Contactez notre service technique directement via WhatsApp ou par téléphone pour un devis gratuit.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button className="bg-[#50B780] hover:bg-[#45a371] text-white px-8 py-6 rounded-full font-bold uppercase tracking-widest h-auto">
                                WhatsApp SAV
                            </Button>
                            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 rounded-full font-bold uppercase tracking-widest h-auto">
                                Appeler le +221 77 800 00 31
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Services;
