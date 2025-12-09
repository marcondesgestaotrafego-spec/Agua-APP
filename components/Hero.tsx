import React, { useState } from 'react';
import { ArrowRight, Flame, Droplets, Clock, MapPin, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const Hero: React.FC = () => {
  const [availability, setAvailability] = useState<'idle' | 'checking' | 'available' | 'unavailable'>('idle');

  const checkAvailability = () => {
    if (!navigator.geolocation) {
        alert("Geolocalização não suportada.");
        return;
    }
    setAvailability('checking');
    navigator.geolocation.getCurrentPosition(
        (position) => {
            // Simulate API check - 80% chance of being available
            setTimeout(() => {
                setAvailability('available');
            }, 1500);
        },
        (error) => {
            console.error(error);
            setAvailability('idle'); // Reset on error
            alert("Permissão de localização negada.");
        }
    )
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-dark-900">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        {/* Blue Blob (Water) */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-[120px] animate-blob"></div>
        {/* Orange Blob (Gas) */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-in z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-primary-300 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Entregadores disponíveis agora
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] text-white">
            Acabou o gás?<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-secondary-600">
              Chegamos rápido.
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
            Água mineral e gás de cozinha entregues na sua porta em minutos. Preço justo, confiança e agilidade que você precisa.
          </p>

          {/* Location Check */}
          <div className="max-w-md bg-dark-800/50 backdrop-blur border border-white/10 p-4 rounded-2xl">
             <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-primary-500/10 rounded-lg text-primary-400">
                      <MapPin size={20} />
                   </div>
                   <div className="text-sm">
                      <p className="text-gray-300 font-medium">Verificar entrega</p>
                      <p className="text-gray-500 text-xs">Use sua localização</p>
                   </div>
                </div>
                
                {availability === 'idle' && (
                    <button 
                        onClick={checkAvailability}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-xl transition-colors cursor-pointer"
                    >
                        Verificar
                    </button>
                )}
                {availability === 'checking' && (
                    <div className="flex items-center gap-2 px-4 py-2 text-gray-400 text-sm">
                        <Loader2 size={16} className="animate-spin" /> Verificando...
                    </div>
                )}
                {availability === 'available' && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 text-sm font-bold rounded-xl border border-green-500/20">
                        <CheckCircle size={16} /> Região Atendida!
                    </div>
                )}
             </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a href="#products" className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-primary-900/30 cursor-pointer">
              <Droplets size={20} />
              Pedir Água
            </a>
            <a href="#products" className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-secondary-500/30 hover:border-secondary-500 text-white rounded-2xl font-bold text-lg transition-all hover:scale-105 cursor-pointer">
              <Flame size={20} className="text-secondary-500" />
              Pedir Gás
            </a>
          </div>
          
          <div className="pt-8 flex items-center gap-6 border-t border-white/5 text-sm font-medium text-gray-400">
             <div className="flex items-center gap-2">
                <Clock size={16} className="text-primary-400" />
                <span>Entrega média: 30 min</span>
             </div>
             <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
             <div>Pagamento na Entrega</div>
             <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
             <div>Atendimento 24h</div>
          </div>
        </div>

        {/* Visual Showcase */}
        <div className="relative hidden lg:block animate-fade-in delay-200">
           <div className="relative z-10 w-full aspect-square flex items-center justify-center">
              {/* Abstract Representation of Gas and Water */}
              <div className="relative w-[80%] h-[80%]">
                 <div className="absolute top-0 right-0 w-4/5 h-4/5 bg-gradient-to-br from-primary-500 to-blue-600 rounded-[3rem] shadow-2xl shadow-primary-500/30 transform rotate-6 z-10 flex items-center justify-center border border-white/10">
                    <div className="text-center text-white p-8">
                       <Droplets size={64} className="mx-auto mb-4 opacity-80" />
                       <h3 className="text-3xl font-display font-bold">Água Pura</h3>
                       <p className="text-blue-100 mt-2">Fonte Natural</p>
                    </div>
                 </div>
                 <div className="absolute bottom-0 left-0 w-4/5 h-4/5 bg-gradient-to-br from-secondary-500 to-orange-600 rounded-[3rem] shadow-2xl shadow-secondary-500/30 transform -rotate-3 z-20 flex items-center justify-center border border-white/10 backdrop-blur-sm">
                    <div className="text-center text-white p-8">
                       <Flame size={64} className="mx-auto mb-4 opacity-80" />
                       <h3 className="text-3xl font-display font-bold">Gás GLP</h3>
                       <p className="text-orange-100 mt-2">Qualidade Garantida</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;