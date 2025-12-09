import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Products from './components/Projects'; // Using existing file repurposed as Products
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 font-sans selection:bg-primary-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Products />
      </main>
      <Contact />
      <ChatWidget />
    </div>
  );
};

export default App;