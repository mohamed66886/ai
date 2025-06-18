import { useState, useRef, useEffect } from "react";
import { Send, Mic, RotateCcw, Bot, User, Stethoscope } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { medicalAI, type AIResponse } from "@/services/aiService";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'analysis' | 'diagnosis' | 'question' | 'normal';
}

const DiagnosisChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "مرحباً! أنا طبيبك الذكي 👨‍⚕️\n\nأنا هنا لمساعدتك في تحليل الأعراض وتقديم التوجيه الطبي المناسب.\n\nاكتب أعراضك بالتفصيل وسأقوم بتحليلها فوراً!",
      isUser: false,
      timestamp: new Date(),
      type: 'normal'
    }
  ]);
  
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, isUser: boolean, type: Message['type'] = 'normal') => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      isUser,
      timestamp: new Date(),
      type
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isTyping) return;
    
    const userMessage = currentMessage.trim();
    addMessage(userMessage, true);
    setCurrentMessage("");
    setIsTyping(true);
    
    try {
      const response: AIResponse = await medicalAI.processMessage(userMessage);
      addMessage(response.message, false, response.type);
    } catch (error) {
      addMessage("عذراً، حدث خطأ تقني. يرجى المحاولة مرة أخرى.", false, 'normal');
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: 1,
        text: "مرحباً مرة أخرى! أنا جاهز لمساعدتك في تحليل أعراض جديدة.",
        isUser: false,
        timestamp: new Date(),
        type: 'normal'
      }
    ]);
    medicalAI.reset();
  };

  const getMessageStyle = (type: Message['type'], isUser: boolean) => {
    if (isUser) return "bg-blue-500 text-white";
    
    switch (type) {
      case 'analysis':
        return "bg-green-50 border-l-4 border-green-400 text-green-800";
      case 'diagnosis':
        return "bg-blue-50 border-l-4 border-blue-400 text-blue-800";
      case 'question':
        return "bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header />
      
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-6">
        {/* Chat Header */}
        <div className="bg-white rounded-t-2xl shadow-lg p-6 border-b border-gray-200">
          <div className="flex items-center justify-center space-x-3 space-x-reverse">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">الطبيب الذكي</h1>
              <p className="text-gray-600 text-sm">تشخيص ذكي • استشارة فورية</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 bg-white shadow-lg overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[60vh]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} items-end space-x-2 space-x-reverse`}
              >
                {/* Avatar */}
                {!message.isUser && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                
                {/* Message Bubble */}
                <div className={`max-w-xs sm:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
                  message.isUser 
                    ? 'bg-blue-500 text-white rounded-br-md' 
                    : `${getMessageStyle(message.type, message.isUser)} rounded-bl-md`
                }`}>
                  <div className="prose prose-sm max-w-none">
                    {message.text.includes('##') ? (
                      // Render markdown-like content
                      <div className="space-y-2">
                        {message.text.split('\n').map((line, index) => {
                          if (line.startsWith('## ')) {
                            return <h3 key={index} className="text-lg font-bold">{line.replace('## ', '')}</h3>;
                          } else if (line.startsWith('### ')) {
                            return <h4 key={index} className="text-base font-semibold mt-3">{line.replace('### ', '')}</h4>;
                          } else if (line.startsWith('**') && line.endsWith('**')) {
                            return <p key={index} className="font-semibold">{line.replace(/\*\*/g, '')}</p>;
                          } else if (line.trim() !== '') {
                            return <p key={index} className="text-sm leading-relaxed">{line}</p>;
                          }
                          return null;
                        })}
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                    )}
                  </div>
                  
                  <p className={`text-xs mt-2 opacity-70 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString('ar-EG', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>

                {/* User Avatar */}
                {message.isUser && (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start items-end space-x-2 space-x-reverse">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white animate-pulse" />
                </div>
                <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex space-x-1 items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    <span className="text-xs text-gray-600 mr-2">يحلل الأعراض...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-2xl">
            <div className="flex items-end space-x-3 space-x-reverse">
              <button
                onClick={resetChat}
                className="p-2 text-gray-400 hover:text-blue-500 transition-colors rounded-full hover:bg-blue-50"
                title="محادثة جديدة"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              
              <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors rounded-full hover:bg-blue-50">
                <Mic className="w-5 h-5" />
              </button>
              
              <div className="flex-1 relative">
                <textarea
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="اكتب أعراضك هنا... (مثال: أشعر بصداع شديد مع حمى منذ يومين)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm max-h-32"
                  rows={1}
                  disabled={isTyping}
                  style={{ minHeight: '48px' }}
                />
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || isTyping}
                className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DiagnosisChat;
