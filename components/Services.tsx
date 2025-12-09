import React from 'react';
import { Truck, ShieldCheck, Wallet, Clock } from 'lucide-react';
import { Service } from '../types';

const services: Service[] = [
  {
    id: '1',
    title: 'Entrega Relâmpago',
    description: 'Nossa frota está estrategicamente posicionada para chegar até você em tempo recorde, geralmente em menos de 30 minutos.',
    icon: <Truck size={32} />
  },
  {
    id: '2',
    title: 'Preço Justo',
    description: 'Garantimos os melhores preços da região sem abrir mão da qualidade. Promoções especiais para combos de Água + Gás.',
    icon: <Wallet size={32} />
  },
  {
    id: '3',
    title: 'Qualidade Certificada',
    description: 'Todos os botijões passam por rigorosa inspeção de segurança e nossa água provém das melhores fontes minerais.',
    icon: <ShieldCheck size={32} />
  },
  {
    id: '4',
    title: 'Atendimento Estendido',
    description: 'Funcionamos de Domingo a Domingo para garantir que você nunca fique na mão quando mais precisar.',
    icon: <Clock size={32} />
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-dark-900 relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Por que escolher a FastGas?</h2>
          <p className="text-gray-400 text-lg">Mais do que uma entrega, levamos comodidade e segurança para a sua família.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group p-8 rounded-3xl bg-dark-800 border border-white/5 hover:border-primary-500/30 hover:bg-dark-700/50 transition-all duration-300 hover:-translate-y-2 shadow-lg"
            >
              <div className="mb-6 w-14 h-14 rounded-2xl bg-dark-900 border border-white/5 flex items-center justify-center text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;