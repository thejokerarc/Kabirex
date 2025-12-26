import { useState } from "react";
import { MessageCircle, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Inscription réussie!",
        description: "Vous recevrez bientôt nos dernières offres.",
      });
      setEmail("");
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Bonjour! Je souhaite en savoir plus sur vos produits.");
    window.open(`https://wa.me/221778000030?text=${message}`, "_blank");
  };

  return (
    <section className="bg-[#10B981] py-16 md:py-24 text-white overflow-hidden relative">
      {/* Decorative background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-32 -right-32 w-96 h-96 bg-white rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.03, 0.08, 0.03]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-widest mb-6 border border-white/20">
            <Sparkles className="h-3 w-3 text-emerald-300" />
            Join the Community
          </div>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-white mb-6 leading-tight tracking-tighter">
            Restez connecté. <br /> Rejoignez la <span className="text-emerald-300">Tech Gang</span> !
          </h2>
          <p className="text-white/70 text-sm md:text-base font-medium">
            Soyez les premiers informés des nouveaux arrivages Apple, Samsung et plus encore à Dakar.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-4xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWhatsApp}
            className="flex items-center gap-3 px-8 py-5 bg-white text-[#0056fb] rounded-full font-black uppercase text-xs tracking-widest hover:text-[#0046CC] transition-colors shadow-2xl group"
          >
            <MessageCircle className="h-5 w-5 transition-transform group-hover:rotate-12" />
            Support WhatsApp
          </motion.button>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col sm:flex-row gap-3 w-full max-w-lg bg-white/5 p-2 rounded-[2rem] backdrop-blur-md border border-white/10"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email"
              className="flex-1 h-14 px-6 rounded-full bg-transparent text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 font-medium transition-all"
              required
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="h-14 px-10 bg-emerald-400 text-slate-900 rounded-full font-black uppercase text-xs tracking-widest hover:bg-emerald-300 transition-colors shadow-xl"
            >
              S'abonner
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
