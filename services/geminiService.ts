import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Você é o atendente virtual inteligente da "FastGas & Água", uma distribuidora de bebidas e gás de cozinha moderna e rápida.

Suas responsabilidades:
1. Atender clientes de forma educada, rápida e proativa.
2. Tirar dúvidas sobre preços e produtos.
3. Se o cliente compartilhar a localização, use a ferramenta Google Maps para verificar onde ele está e confirme que a entrega é rápida para aquela região.
4. Incentivar o pedido pelo WhatsApp ou diretamente pelo chat (simulando).

Nossos Produtos e Preços (Use como referência):
- Gás de Cozinha P13: R$ 115,00 (Dinheiro/Pix) ou R$ 120,00 (Cartão).
- Gás Industrial P45: R$ 420,00.
- Água Mineral 20L (Galão): R$ 15,00 (Com o casco: R$ 40,00).
- Fardo Água 500ml (12 unidades): R$ 25,00.

Informações de Serviço:
- Horário: Segunda a Sábado das 08h às 20h. Domingo das 08h às 14h.
- Tempo médio de entrega: 30 minutos.
- Formas de Pagamento: Pix, Cartão de Crédito/Débito (levamos maquininha), Dinheiro.
- Região de Entrega: Atendemos num raio de 10km do Centro. Use o Maps para dar referências próximas ao cliente se ele compartilhar a localização.

Personalidade:
- Seja prestativo e use emojis ocasionais (🔥, 💧, 🚚, 📍).
- Se perguntarem algo fora do contexto, traga gentilmente de volta para "Posso te enviar uma água geladinha ou um gás novo?".
- Respostas curtas e diretas, ideais para chat rápido.

Exemplo de interação com localização:
Cliente: [Compartilha Localização]
Você: "Vi que você está perto do [Ponto de Referência do Maps]. Ótima notícia! Nossos entregadores estão nessa região. O tempo estimado é de 20 minutos. Vai querer um gás ou água?"
`;

let chatSession: Chat | null = null;
let currentLocation: { lat: number; lng: number } | null = null;

export const updateChatLocation = (lat: number, lng: number) => {
  currentLocation = { lat, lng };
  // Reset session to apply new config with location
  chatSession = null;
};

export const getChatSession = (): Chat => {
  if (!chatSession) {
    const config: any = {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    };

    // If location is available, enable Google Maps grounding with the user's location
    if (currentLocation) {
        config.tools = [{ googleMaps: {} }];
        config.toolConfig = {
            retrievalConfig: {
                latLng: {
                    latitude: currentLocation.lat,
                    longitude: currentLocation.lng
                }
            }
        };
    }

    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config
    });
  }
  return chatSession;
};

export interface GeminiResponse {
    text: string;
    groundingChunks?: any[];
}

export const sendMessageToGemini = async (message: string): Promise<GeminiResponse> => {
  try {
    const chat = getChatSession();
    const result: GenerateContentResponse = await chat.sendMessage({
        message
    });
    
    return {
        text: result.text || "Desculpe, estou verificando o estoque. Pode repetir?",
        groundingChunks: result.candidates?.[0]?.groundingMetadata?.groundingChunks
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "Nosso sistema está com uma breve instabilidade. Pode nos chamar no WhatsApp? (Link no topo da página)" };
  }
};