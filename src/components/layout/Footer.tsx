import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white border-t border-white/5">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Link to="/" className="inline-block">
              <span className="text-3xl font-black tracking-tighter text-white">
                KABIREX<span className="text-emerald-400">.</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Votre hub technologique au Sénégal. Excellence, innovation et service premium pour tous vos besoins tech.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ scale: 1.2, color: "#10B981" }}
                  href="#"
                  className="text-slate-500 transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-emerald-400 mb-8">Contact</h3>
            <div className="space-y-4 text-sm text-slate-400">
              <p className="flex flex-col">
                <span className="text-white font-bold mb-1">Adresse</span>
                123 Avenue Cheikh Anta Diop, Dakar
              </p>
              <p className="flex flex-col">
                <span className="text-white font-bold mb-1">Service Client</span>
                <a href="tel:+221778000030" className="hover:text-emerald-400 transition-colors">+221 77 800 00 30</a>
              </p>
              <p className="flex flex-col">
                <span className="text-white font-bold mb-1">Email Support</span>
                <a href="mailto:contact@kabirex.sn" className="hover:text-emerald-400 transition-colors">contact@kabirex.sn</a>
              </p>
            </div>
          </motion.div>

          {/* Useful Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-emerald-400 mb-8">Navigation</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              {['Collections', 'Nouveautés', 'Promotions', 'FAQ', 'Conditions'].map((link) => (
                <li key={link}>
                  <Link to="/boutique" className="hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-px bg-slate-700 group-hover:w-3 border group-hover:border-emerald-400 transition-all" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Opening Hours Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-emerald-400 mb-8">Disponibilité</h3>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Lun - Dim</span>
                <span className="font-bold">08:30 - 23:00</span>
              </div>
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-widest">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Ouvert les jours fériés
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          <p>© 2024 KABIREX TECH SÉNÉGAL. TOUS DROITS RÉSERVÉS.</p>
          <div className="flex items-center gap-8">
            <Link to="/cgu" className="hover:text-white transition-colors">CGU / CGV</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
