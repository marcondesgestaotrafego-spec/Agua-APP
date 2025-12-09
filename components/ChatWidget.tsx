import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, ShoppingBag, MapPin, ExternalLink } from 'lucide-react';
import { ChatMessage, LoadingState } from '../types';
import { sendMessageToGemini, updateChatLocation } from '../services/geminiService';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Olá! Bem-vindo à FastGas & Água. 🚚 Precisa de um gás ou água agora? Estou aqui para ajudar!',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleShareLocation = () => {
    if (!navigator.geolocation) {
      alert("Seu navegador não suporta geolocalização.");
      return;
    }

    setLocationStatus('loading');
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        updateChatLocation(latitude, longitude);
        setLocationStatus('success');
        
        // Auto-send a message about location
        const userMsg: ChatMessage = {
          id: Date.now().toString(),
          role: 'user',
          text: "📍 Minha localização atual.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);
        setLoadingState(LoadingState.LOADING);

        try {
            const response = await sendMessageToGemini("Acabei de compartilhar minha localização exata via GPS. Por favor, verifique se atendem minha região e me dê uma referência próxima usando o Google Maps.");
            const botMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: response.text,
                groundingChunks: response.groundingChunks,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
            setLoadingState(LoadingState.SUCCESS);
        } catch (error) {
            setLoadingState(LoadingState.ERROR);
        }
      },
      (error) => {
        console.error(error);
        setLocationStatus('error');
        alert("Não foi possível obter sua localização. Verifique as permissões do navegador.");
      }
    );
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || loadingState === LoadingState.LOADING) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setLoadingState(LoadingState.LOADING);

    try {
      const response = await sendMessageToGemini(userMsg.text);
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text,
        groundingChunks: response.groundingChunks,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMsg]);
      setLoadingState(LoadingState.SUCCESS);
    } catch (error) {
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[90vw] sm:w-[380px] h-[500px] bg-dark-800 border border-dark-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in ring-1 ring-white/10">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-primary-700 to-secondary-600 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-md border border-white/20">
                <ShoppingBag size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Atendente Virtual</h3>
                <p className="text-xs text-white/80">
                  {locationStatus === 'success' ? '📍 Localização Ativa' : 'Online agora • Responde rápido'}
                </p>
              </div>
            </div>
            <button onClick={toggleChat} className="text-white/70 hover:text-white transition-colors cursor-pointer">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark-900/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary-600 text-white rounded-br-none shadow-md'
                      : 'bg-dark-700 text-gray-200 rounded-bl-none border border-white/5 shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
                
                {/* Google Maps Grounding Sources */}
                {msg.groundingChunks && msg.groundingChunks.length > 0 && (
                  <div className="mt-2 max-w-[85%] space-y-2">
                    {msg.groundingChunks.map((chunk, idx) => {
                      if (chunk.web?.uri) {
                        return (
                          <a 
                            key={idx} 
                            href={chunk.web.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs bg-dark-800/80 hover:bg-dark-700 border border-white/10 p-2 rounded-lg text-primary-300 transition-colors"
                          >
                            <ExternalLink size={12} />
                            <span>{chunk.web.title || 'Fonte no Google'}</span>
                          </a>
                        )
                      }
                      if (chunk.maps?.uri) {
                         return (
                          <a 
                            key={idx} 
                            href={chunk.maps.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs bg-dark-800/80 hover:bg-dark-700 border border-white/10 p-2 rounded-lg text-secondary-300 transition-colors"
                          >
                            <MapPin size={12} />
                            <span>Abrir no Google Maps</span>
                          </a>
                        )
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
            ))}
            {loadingState === LoadingState.LOADING && (
              <div className="flex justify-start">
                <div className="bg-dark-700 p-3 rounded-2xl rounded-bl-none border border-white/5 flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-primary-400" />
                  <span className="text-xs text-gray-400">Digitando...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-dark-800 border-t border-white/5 flex flex-col gap-2">
            {locationStatus !== 'success' && (
                <button 
                    onClick={handleShareLocation}
                    disabled={locationStatus === 'loading'}
                    className="flex items-center justify-center gap-2 text-xs text-primary-400 hover:text-primary-300 hover:bg-white/5 py-1.5 rounded-lg transition-colors border border-dashed border-primary-500/30 w-full cursor-pointer"
                >
                    {locationStatus === 'loading' ? <Loader2 size={12} className="animate-spin" /> : <MapPin size={12} />}
                    {locationStatus === 'loading' ? 'Obtendo GPS...' : 'Enviar minha localização para entrega precisa'}
                </button>
            )}
            <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ex: Qual o preço do gás?"
                className="flex-1 bg-dark-900 border border-dark-600 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 placeholder-gray-500"
                />
                <button
                type="submit"
                disabled={!inputValue.trim() || loadingState === LoadingState.LOADING}
                className="p-2 bg-primary-600 text-white rounded-xl hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                <Send size={18} />
                </button>
            </form>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={toggleChat}
        className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-primary-600 to-primary-500 text-white shadow-xl shadow-primary-900/40 hover:scale-110 transition-all duration-300 cursor-pointer"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-dark-900 animate-pulse"></span>
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>
    </div>
  );
};

export default ChatWidget;