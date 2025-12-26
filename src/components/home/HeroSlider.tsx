import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
    "/images/products/iphone16-black.png",
    "/images/products/iphone16-blue.png",
    "/images/products/iphone16-pink.png",
    "/images/products/iphone16-teal.png",
    "/images/products/samsung-a07-black.png",
];

const HeroSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-[2.5rem] mt-4 bg-slate-900 shadow-2xl">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    {/* Background Image with Gradient Overlay */}
                    <div
                        className="absolute inset-0 bg-center bg-no-repeat bg-contain md:bg-cover transition-all"
                        style={{
                            backgroundImage: `url(${images[currentIndex]})`,
                            filter: "brightness(0.6) contrast(1.1)"
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40" />
                </motion.div>
            </AnimatePresence>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="space-y-6 max-w-2xl"
                >
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter drop-shadow-2xl leading-[0.9]">
                        Bienvenue chez <span className="text-emerald-400">Kabirex</span>
                    </h1>
                    <p className="text-white/80 text-xs md:text-base lg:text-lg max-w-xl mx-auto font-medium tracking-wide leading-relaxed">
                        L'excellence technologique à portée de main. Découvrez notre sélection exclusive de produits premium au Sénégal.
                    </p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="pt-4"
                    >
                        <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest px-8 py-4 rounded-full transition-all shadow-xl shadow-emerald-900/40">
                            Découvrir
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1.5 transition-all duration-500 rounded-full ${index === currentIndex ? "w-10 bg-emerald-400" : "w-6 bg-white/30 hover:bg-white/50"
                            }`}
                    />
                ))}
            </div>

            {/* Decorative Blur Orbs */}
            <div className="absolute top-0 -left-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 -right-20 w-80 h-80 bg-emerald-400/10 rounded-full blur-[120px] pointer-events-none" />
        </div>
    );
};

export default HeroSlider;

