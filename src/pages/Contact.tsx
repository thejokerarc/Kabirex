import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Newsletter from "@/components/layout/Newsletter";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé!",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main id="main-content" className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-8">
            Contactez-nous
          </h1>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading font-semibold text-xl text-foreground mb-4">
                  Bienvenue chez KABIREX
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Votre destination unique pour les smartphones et la technologie de pointe au Sénégal. 
                  Notre équipe est à votre disposition pour répondre à toutes vos questions.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-heading font-semibold text-lg text-foreground">
                  Service Client
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a href="mailto:contact@kabirex.com" className="text-foreground hover:text-primary transition-colors">
                        contact@kabirex.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Téléphone</p>
                      <a href="tel:+221778000030" className="text-foreground hover:text-primary transition-colors">
                        +221 77 800 00 30
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Adresse</p>
                      <p className="text-foreground">
                        123 Avenue Cheikh Anta Diop<br />
                        Dakar, Sénégal
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Horaires</p>
                      <p className="text-foreground">
                        Lundi - Dimanche: 8h30 - 23h00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-3">
                  Réseaux Sociaux
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Facebook</li>
                  <li>• Instagram</li>
                  <li>• TikTok</li>
                </ul>
              </div>

              <div className="bg-primary/5 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  Passez nous voir en magasin pour découvrir nos smartphones et bénéficier 
                  de conseils personnalisés de notre équipe d'experts.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-xl shadow-card p-6 md:p-8">
              <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
                Laissez-nous un message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Votre email"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Votre message"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer
                </Button>
              </form>
            </div>
          </div>
        </div>

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
