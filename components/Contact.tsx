import React from 'react';
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <footer id="contact" className="bg-dark-900 pt-24 border-t border-white/5">
      <div className="container mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-4xl font-display font-bold text-white mb-6">
              Fale com a gente
            </h2>
            <p className="text-gray-400 mb-8 max-w-md text-lg">
              Faça seu pedido agora mesmo. Estamos prontos para te atender pelo WhatsApp, Telefone ou Chat.
            </p>

            <div className="space-y-6">
              <a 
                href="https://wa.me/5548996148333?text=Ol%C3%A1%21+Gostaria+de+fazer+um+pedido" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 group p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
              >
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">WhatsApp (Pedidos Rápido)</p>
                  <p className="text-white text-lg font-medium">(48) 99614-8333</p>
                </div>
              </a>

              <a 
                href="tel:5548996148333"
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400">
                  <Phone size={24} />
                </div>
                <div>
                   <p className="text-xs text-gray-500 uppercase font-bold">Telefone</p>
                   <p className="text-white text-lg font-medium">(48) 99614-8333</p>
                </div>
              </a>

               <div className="flex items-center gap-4 p-4">
                <div className="w-12 h-12 rounded-full bg-secondary-500/20 flex items-center justify-center text-secondary-400">
                  <MapPin size={24} />
                </div>
                <div>
                   <p className="text-xs text-gray-500 uppercase font-bold">Nossa Loja</p>
                   <p className="text-white text-lg font-medium">Av. das Tipuanas, 670 - Palhoça, SC</p>
                   <p className="text-sm text-gray-400">Ao lado da Gaby Farma Associados</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map / Image */}
          <div className="h-full min-h-[400px] bg-dark-800 rounded-3xl border border-white/10 overflow-hidden relative group">
             {/* Abstract Map Placeholder */}
             <div className="absolute inset-0 bg-dark-800 flex items-center justify-center">
                <div className="text-center opacity-30">
                    <MapPin size={64} className="mx-auto mb-2 text-primary-500" />
                    <span className="text-2xl font-display font-bold text-white">Área de Cobertura</span>
                    <p>Palhoça e Região</p>
                </div>
             </div>
             {/* Decorative circles indicating coverage */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="w-64 h-64 border border-primary-500/30 rounded-full animate-pulse"></div>
                 <div className="w-96 h-96 border border-primary-500/10 rounded-full absolute"></div>
             </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/5 py-8 bg-dark-950">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="text-center md:text-left">
                <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} FastGas & Água (JR Domingos). Todos os direitos reservados.</p>
             </div>
             <div className="flex gap-6 text-sm text-gray-500">
                <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
                <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
             </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;