import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Send, Bot, User, Briefcase, Shield } from "lucide-react";
import { GTSStyles } from "../utils/gts-styles";

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  text?: string;
  card?: {
    title: string;
    price: string;
    image: string;
    features: string[];
  };
}

interface GTSHeroSectionProps {
  onLogin?: () => void;
}

export function GTSHeroSection({ onLogin }: GTSHeroSectionProps = {}) {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      text: "Добро пожаловать в Grand Tour Sochi. Какой вид техники вас интересует?"
    }
  ]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      text: chatInput
    };
    
    setMessages(prev => [...prev, userMessage]);
    setChatInput("");
    
    // Simulate bot response with equipment card
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: "Отличный выбор! Вот что у нас есть:",
        card: {
          title: "Yamaha 252S",
          price: "от 25,000₽/день",
          image: "https://images.unsplash.com/photo-1749411536879-1a66536c2256?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMHByZW1pdW0lMjBib2F0fGVufDF8fHx8MTc1NjEzNjEyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          features: ["12 пассажиров", "320 л.с.", "Премиум интерьер"]
        }
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-black">
      {/* Video Background Placeholder */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1749411536879-1a66536c2256?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMHByZW1pdW0lMjBib2F0fGVufDF8fHx8MTc1NjEzNjEyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="GTS Premium Experience"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen pt-20 lg:pt-32 pb-6 lg:pb-8">
        {/* Hero Text */}
        <div className="flex-1 flex items-center justify-center px-4 lg:px-6">
          <div className="text-center text-white max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-8xl font-light mb-6 lg:mb-8 tracking-wider">
              GRAND TOUR
              <span className="block text-[#91040C] font-normal">SOCHI</span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-white/80 mb-8 lg:mb-12 max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
              Премиальный клуб активного отдыха.<br />
              <span className="hidden sm:inline">Аренда техники, экспедиции, маршруты<br />
              и закрытые клубные привилегии.</span>
              <span className="sm:hidden">Техника, экспедиции и VIP-привилегии.</span>
            </p>
            
            {/* Login Buttons */}
            {onLogin && (
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 lg:mb-12">
                <Button
                  onClick={onLogin}
                  size="lg"
                  className={`${GTSStyles.buttons.primary} px-8 py-4 text-lg tracking-wide`}
                >
                  Войти в систему
                </Button>
                <Button
                  onClick={onLogin}
                  variant="outline"
                  size="lg"
                  className="border-[#91040C] text-[#91040C] hover:bg-[#91040C] hover:text-white px-6 py-4 text-lg tracking-wide bg-black/50 backdrop-blur-sm"
                >
                  <Briefcase className="w-5 h-5 mr-2" />
                  Executive Panel
                </Button>
              </div>
            )}

          </div>
        </div>

        {/* AI Chat Block */}
        <div className="max-w-4xl mx-auto w-full px-4 lg:px-6">
          <Card className="bg-black/70 backdrop-blur-sm border-white/10 p-4 lg:p-6">
            <div className="flex items-center mb-3 lg:mb-4">
              <Bot className={`${GTSStyles.icons.small} lg:${GTSStyles.icons.medium} text-[#91040C] mr-2`} />
              <span className="text-white text-xs lg:text-sm font-medium tracking-wide">AI КОНСУЛЬТАНТ</span>
            </div>
            
            {/* Chat Messages */}
            <div className="space-y-3 lg:space-y-4 mb-3 lg:mb-4 max-h-24 lg:max-h-32 overflow-y-auto">
              {messages.map((message) => (
                <div key={message.id} className="space-y-2">
                  <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start space-x-2 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-5 h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user' ? 'bg-white' : 'bg-[#91040C]'}`}>
                        {message.type === 'user' ? 
                          <User className="w-3 h-3 stroke-2 text-black" /> : 
                          <Bot className="w-3 h-3 stroke-2 text-white" />
                        }
                      </div>
                      <div className={`p-2 lg:p-3 rounded-lg text-xs lg:text-sm leading-relaxed ${message.type === 'user' ? 'bg-white text-black' : 'bg-white/10 text-white'}`}>
                        {message.text}
                      </div>
                    </div>
                  </div>
                  
                  {/* Equipment Card */}
                  {message.card && (
                    <div className="ml-7 lg:ml-8">
                      <Card className="bg-white/5 border-white/10 p-3 lg:p-4">
                        <div className="flex space-x-2 lg:space-x-3">
                          <ImageWithFallback
                            src={message.card.image}
                            alt={message.card.title}
                            className="w-12 h-12 lg:w-16 lg:h-16 object-cover rounded flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-medium text-xs lg:text-sm truncate">{message.card.title}</h4>
                            <p className="text-[#91040C] text-xs lg:text-sm font-medium">{message.card.price}</p>
                            <p className="text-white/60 text-xs mt-1 line-clamp-1">
                              {message.card.features.join(" • ")}
                            </p>
                            <Button 
                              size="sm" 
                              className={`${GTSStyles.buttons.primary} mt-2 h-6 lg:h-7 px-2 lg:px-3 text-xs`}
                            >
                              Забронировать
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Input */}
            <div className="flex space-x-2">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Напишите ваш запрос..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-xs lg:text-sm h-8 lg:h-10"
              />
              <Button 
                onClick={handleSendMessage}
                size="sm"
                className={`${GTSStyles.buttons.primary} px-2 lg:px-3 h-8 lg:h-10`}
              >
                <Send className={GTSStyles.icons.small} />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}