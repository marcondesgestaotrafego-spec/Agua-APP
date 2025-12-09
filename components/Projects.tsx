import React from 'react';
import { ShoppingCart, Flame, Droplets } from 'lucide-react';
import { Product } from '../types';

const products: Product[] = [
  {
    id: '1',
    title: 'Gás de Cozinha P13',
    price: 115.00,
    type: 'gas',
    image: 'https://images.unsplash.com/photo-1625651520677-789c02607174?q=80&w=600&auto=format&fit=crop', // Imagem ilustrativa de gás
    description: 'Botijão padrão para uso residencial. Alta durabilidade e chama azul garantida.',
    features: ['Instalação Grátis', 'Selo INMETRO', 'Peso Correto']
  },
  {
    id: '2',
    title: 'Água Mineral 20L',
    price: 15.00,
    type: 'water',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=600&auto=format&fit=crop', // Imagem ilustrativa de água
    description: 'Água mineral natural, leve e pura. Ideal para o dia a dia da sua família.',
    features: ['pH 7.5', 'Baixo Sódio', 'Galão Higienizado']
  },
  {
    id: '3',
    title: 'Gás Industrial P45',
    price: 420.00,
    type: 'gas',
    image: 'https://images.unsplash.com/photo-1585203597405-24c6f9660249?q=80&w=600&auto=format&fit=crop',
    description: 'Solução ideal para comércios, restaurantes e condomínios com alto consumo.',
    features: ['Entrega Agendada', 'Nota Fiscal', 'Suporte Técnico']
  },
    {
    id: '4',
    title: 'Fardo Água 500ml',
    price: 25.00,
    type: 'water',
    image: 'https://images.unsplash.com/photo-1616118132534-381148898bb8?q=80&w=600&auto=format&fit=crop',
    description: 'Pacote com 12 unidades de 500ml. Praticidade para eventos ou para levar na bolsa.',
    features: ['12 Unidades', 'Com/Sem Gás', 'Refrescante']
  }
];

const Products: React.FC = () => {
  return (
    <section id="products" className="py-24 bg-dark-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
           <div className="max-w-xl">
             <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Nossos Produtos</h2>
             <p className="text-gray-400">Qualidade garantida e entrega rápida. Selecione o que você precisa.</p>
           </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-dark-900 rounded-3xl overflow-hidden border border-white/5 hover:border-primary-500/50 shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1">
              {/* Badge */}
              <div className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white ${product.type === 'gas' ? 'bg-secondary-500' : 'bg-primary-500'}`}>
                {product.type === 'gas' ? 'Gás GLP' : 'Água Mineral'}
              </div>

              {/* Image Area */}
              <div className="aspect-[4/3] overflow-hidden relative">
                 <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60 z-10"></div>
                 {/* Product Image */}
                 <img 
                    src={product.image} 
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                 />
              </div>
              
              {/* Content */}
              <div className="p-6 relative z-20">
                <h3 className="text-xl font-bold text-white mb-1">{product.title}</h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2 h-10">{product.description}</p>
                
                <ul className="mb-6 space-y-1">
                  {product.features.map(feature => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-gray-500">
                      <div className={`w-1.5 h-1.5 rounded-full ${product.type === 'gas' ? 'bg-secondary-500' : 'bg-primary-500'}`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between mt-auto">
                    <div>
                        <span className="text-xs text-gray-400 block">A partir de</span>
                        <span className="text-2xl font-display font-bold text-white">R$ {product.price.toFixed(2)}</span>
                    </div>
                    <button className={`p-3 rounded-xl text-white transition-all shadow-lg hover:scale-105 cursor-pointer ${product.type === 'gas' ? 'bg-secondary-600 hover:bg-secondary-500 shadow-secondary-900/30' : 'bg-primary-600 hover:bg-primary-500 shadow-primary-900/30'}`}>
                        <ShoppingCart size={20} />
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;