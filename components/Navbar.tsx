import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Produtos', href: '#products' },
    { name: 'Vantagens', href: '#services' },
    { name: 'Contato', href: '#contact' },
  ];

  const whatsappMessage = encodeURIComponent("Olá, gostaria de fazer um pedido!");
  const whatsappLink = `https://wa.me/5511999999999?text=${whatsappMessage}`;
  const phoneLink = "tel:08001234567";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-dark-900/90 backdrop-blur-md border-white/5 py-3 shadow-lg'
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center relative z-[61]">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform">
            F
          </div>
          <span className="text-2xl font-display font-bold tracking-tight text-white">
            Fast<span className="text-secondary-500">Gas</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white hover:text-primary-400 transition-colors cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="h-4 w-px bg-white/10 mx-2"></div>
          <div className="flex gap-3">
             <a 
               href={phoneLink}
               className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium text-white cursor-pointer"
             >
                <Phone size={16} className="text-primary-400" />
                <span className="hidden lg:inline">Ligar Agora</span>
             </a>
             <a 
               href={whatsappLink}
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-600 hover:bg-green-500 text-white transition-all shadow-lg shadow-green-900/20 hover:shadow-green-900/40 text-sm font-bold animate-fade-in cursor-pointer"
             >
                <MessageCircle size={18} />
                Pedir no Zap
             </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2 cursor-pointer hover:text-primary-400 transition-colors active:scale-95 z-[62]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[59] bg-dark-900 pt-28 px-6 flex flex-col gap-4 animate-fade-in overflow-y-auto h-screen w-screen">
           {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-300 hover:text-primary-400 py-4 border-b border-white/5 cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            <div className="mt-6 flex flex-col gap-4">
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-green-600 text-white font-bold hover:bg-green-500 transition-colors shadow-lg cursor-pointer"
              >
                  <MessageCircle size={20} />
                  Pedir pelo WhatsApp
              </a>
              <a 
                href={phoneLink}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors cursor-pointer"
              >
                  <Phone size={20} className="text-primary-400" />
                  Ligar Agora
              </a>
            </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;