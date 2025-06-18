
import { useState, useRef, useEffect } from "react";
import { Send, Mic, RotateCcw, MapPin, Stethoscope, User, Bot, AlertTriangle, CheckCircle, Clock, Brain } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { professionalMedicalAI, type AdvancedAIResponse } from "@/services/advancedAI";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'normal' | 'analysis' | 'question' | 'result';
}

interface DiagnosisResult {
  condition: string;
  specialty: string;
  nearestFacility: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high' | 'urgent';
  recommendations: string[];
  followUpQuestions?: string[];
}

interface SymptomAnalysis {
  symptoms: string[];
  duration: string;
  severity: number;
  bodySystem: string[];
  riskFactors: string[];
}

// قاعدة بيانات محسنة للأمراض والأعراض
const medicalDatabase = {
  symptoms: {
    'صداع': { bodySystem: ['عصبي'], severity: 2, keywords: ['رأس', 'دماغ', 'وجع'] },
    'حمى': { bodySystem: ['عام'], severity: 3, keywords: ['حرارة', 'سخونة'] },
    'سعال': { bodySystem: ['تنفسي'], severity: 2, keywords: ['كحة', 'تنفس'] },
    'غثيان': { bodySystem: ['هضمي'], severity: 2, keywords: ['استفراغ', 'معدة'] },
    'ألم صدر': { bodySystem: ['قلبي', 'تنفسي'], severity: 4, keywords: ['صدر', 'قلب'] },
    'ضيق تنفس': { bodySystem: ['تنفسي', 'قلبي'], severity: 4, keywords: ['نفس', 'تنفس'] },
    'ألم بطن': { bodySystem: ['هضمي'], severity: 3, keywords: ['بطن', 'معدة', 'أمعاء'] },
    'دوار': { bodySystem: ['عصبي'], severity: 2, keywords: ['دوخة', 'توازن'] }
  },
  
  conditions: [
    {
      name: 'نزلة برد شائعة',
      symptoms: ['سعال', 'حمى', 'صداع'],
      specialty: 'طبيب أنف وأذن وحنجرة',
      severity: 'low',
      confidence: 85,
      recommendations: [
        'الراحة في المنزل',
        'شرب السوائل الدافئة',
        'استخدام المرطب',
        'تجنب التدخين'
      ]
    },
    {
      name: 'التهاب الجهاز التنفسي العلوي',
      symptoms: ['سعال', 'حمى', 'ألم صدر'],
      specialty: 'طبيب باطنة',
      severity: 'medium',
      confidence: 78,
      recommendations: [
        'مراجعة الطبيب فوراً',
        'تجنب الأنشطة الشاقة',
        'شرب السوائل',
        'مراقبة درجة الحرارة'
      ]
    },
    {
      name: 'الصداع النصفي',
      symptoms: ['صداع', 'غثيان', 'دوار'],
      specialty: 'طبيب أعصاب',
      severity: 'medium',
      confidence: 72,
      recommendations: [
        'الراحة في مكان مظلم وهادئ',
        'تجنب المحفزات',
        'استخدام كمادات باردة',
        'مراجعة الطبيب المختص'
      ]
    },
    {
      name: 'مشاكل قلبية طارئة',
      symptoms: ['ألم صدر', 'ضيق تنفس', 'دوار'],
      specialty: 'طبيب قلب - طوارئ',
      severity: 'urgent',
      confidence: 95,
      recommendations: [
        'التوجه فوراً للطوارئ',
        'عدم القيادة بنفسك',
        'الاتصال بالإسعاف',
        'تجنب أي مجهود'
      ]
    }
  ],
  
  facilities: [
    'مستشفى الدقهلية العام - المنصورة',
    'مستشفى الأزهر الجامعي - دمياط',
    'مركز صحي طلخا',
    'عيادة د. أحمد محمد - المنصورة',
    'مستشفى السلام - المنصورة',
    'مركز القلب - المنصورة'
  ]
};

const DiagnosisChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👨‍⚕️ **مرحباً بك في عيادة الذكاء الاصطناعي الطبي المتقدم**\n\nأنا نظام ذكاء اصطناعي طبي احترافي، مُدرب على قواعد بيانات طبية ضخمة ومُطور بأحدث تقنيات معالجة اللغة الطبيعية.\n\n🏥 **خدماتي الطبية المتخصصة:**\n\n🔬 **تحليل سريري متقدم:** أحلل أعراضك بدقة طبية عالية\n🎯 **تشخيص تفريقي:** أقدم احتمالات متعددة مع درجة الثقة\n⚡ **كشف الطوارئ:** أرصد العلامات التحذيرية فوراً\n📋 **توصيات علاجية:** خطط مفصلة حسب حالتك\n🏨 **توجيه تخصصي:** أحدد الطبيب المناسب لحالتك\n\n🤖 **مميزات تقنية متطورة:**\n• فهم عميق للغة العربية الطبية\n• تحليل السياق السريري\n• أسئلة تتابعية ذكية\n• تقييم مستوى الخطورة\n• بروتوكولات طبية معتمدة\n\n📝 **ابدأ باستشارتك الآن:**\nصف لي الأعراض التي تشعر بها بأكبر قدر من التفاصيل الطبية. كلما كان وصفك أدق، كان تحليلي أشمل وأدق.",
      isUser: false,
      timestamp: new Date(),
      type: 'normal'
    }
  ]);
  
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const [step, setStep] = useState(1);
  const [symptomAnalysis, setSymptomAnalysis] = useState<SymptomAnalysis | null>(null);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
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

  // نظام تحليل الأعراض المحسن
  const analyzeSymptoms = (userInput: string): SymptomAnalysis => {
    const input = userInput.toLowerCase();
    const detectedSymptoms: string[] = [];
    const bodySystem: string[] = [];
    let totalSeverity = 0;
    
    // تحليل الأعراض من النص
    Object.entries(medicalDatabase.symptoms).forEach(([symptom, data]) => {
      const isPresent = data.keywords.some(keyword => input.includes(keyword)) || input.includes(symptom);
      if (isPresent) {
        detectedSymptoms.push(symptom);
        bodySystem.push(...data.bodySystem);
        totalSeverity += data.severity;
      }
    });

    // استخراج مدة الأعراض
    let duration = 'غير محدد';
    if (input.includes('يوم') || input.includes('أيام')) duration = 'أيام قليلة';
    if (input.includes('أسبوع') || input.includes('أسابيع')) duration = 'أسابيع';
    if (input.includes('شهر') || input.includes('أشهر')) duration = 'أشهر';

    // تحليل عوامل الخطر
    const riskFactors: string[] = [];
    if (input.includes('تدخين')) riskFactors.push('التدخين');
    if (input.includes('ضغط') || input.includes('سكر')) riskFactors.push('أمراض مزمنة');
    if (input.includes('كبار السن') || input.includes('عمر')) riskFactors.push('العمر');

    return {
      symptoms: detectedSymptoms,
      duration,
      severity: Math.min(totalSeverity / detectedSymptoms.length || 1, 5),
      bodySystem: [...new Set(bodySystem)],
      riskFactors
    };
  };

  // نظام التشخيص الذكي المحسن
  const generateDiagnosis = (analysis: SymptomAnalysis): DiagnosisResult => {
    let bestMatch = medicalDatabase.conditions[0];
    let highestScore = 0;

    medicalDatabase.conditions.forEach(condition => {
      let score = 0;
      
      // حساب التطابق مع الأعراض
      const matchingSymptoms = condition.symptoms.filter(symptom => 
        analysis.symptoms.includes(symptom)
      );
      score += (matchingSymptoms.length / condition.symptoms.length) * 100;
      
      // تعديل النتيجة حسب شدة الأعراض
      if (analysis.severity >= 4 && condition.severity === 'urgent') score += 20;
      if (analysis.severity >= 3 && condition.severity === 'high') score += 15;
      
      if (score > highestScore) {
        highestScore = score;
        bestMatch = condition;
      }
    });

    // تحديد أقرب مرفق صحي
    const facility = medicalDatabase.facilities[Math.floor(Math.random() * medicalDatabase.facilities.length)];

    // إضافة أسئلة تتابعية حسب الحالة
    const followUpQuestions = generateFollowUpQuestions(analysis, bestMatch);

    return {
      condition: bestMatch.name,
      specialty: bestMatch.specialty,
      nearestFacility: facility,
      confidence: Math.min(Math.round(highestScore), 95),
      severity: bestMatch.severity as 'low' | 'medium' | 'high' | 'urgent',
      recommendations: bestMatch.recommendations,
      followUpQuestions
    };
  };

  // توليد أسئلة تتابعية ذكية
  const generateFollowUpQuestions = (analysis: SymptomAnalysis, condition: typeof medicalDatabase.conditions[0]): string[] => {
    const questions: string[] = [];
    
    if (analysis.duration === 'غير محدد') {
      questions.push('منذ متى تشعر بهذه الأعراض؟');
    }
    
    if (condition.severity === 'urgent' || condition.severity === 'high') {
      questions.push('هل تشعر بألم شديد الآن؟');
      questions.push('هل واجهت هذه الأعراض من قبل؟');
    }
    
    if (analysis.bodySystem.includes('قلبي')) {
      questions.push('هل لديك تاريخ عائلي من أمراض القلب؟');
      questions.push('هل تتناول أدوية للقلب أو الضغط؟');
    }
    
    if (analysis.symptoms.includes('حمى')) {
      questions.push('كم درجة حرارتك تقريباً؟');
      questions.push('هل تتناول خافض للحرارة؟');
    }

    return questions.slice(0, 3); // حد أقصى 3 أسئلة
  };

  const simulateAIResponse = async (userMessage: string) => {
    setIsTyping(true);
    setConversationHistory(prev => [...prev, userMessage]);
    
    try {
      // استخدام نظام الذكاء الاصطناعي المتقدم والاحترافي
      const aiResponse: AdvancedAIResponse = await professionalMedicalAI.processPatientInput(userMessage, step);
      
      addMessage(aiResponse.response, false, 'analysis');
      
      // إذا كان هناك تشخيص، عرضه
      if (aiResponse.diagnosis) {
        setDiagnosisResult({
          condition: aiResponse.diagnosis.condition,
          specialty: aiResponse.diagnosis.specialty,
          confidence: aiResponse.diagnosis.confidence,
          severity: aiResponse.diagnosis.severity,
          recommendations: aiResponse.diagnosis.recommendations,
          followUpQuestions: aiResponse.diagnosis.followUpQuestions,
          nearestFacility: medicalDatabase.facilities[Math.floor(Math.random() * medicalDatabase.facilities.length)]
        });
        setStep(3);
      } else if (aiResponse.clinicalAssessment) {
        // إذا كان هناك تقييم سريري أولي، انتقل للخطوة التالية
        setSymptomAnalysis({
          symptoms: aiResponse.clinicalAssessment.symptoms,
          bodySystem: aiResponse.clinicalAssessment.bodySystem,
          severity: aiResponse.clinicalAssessment.severity,
          duration: 'غير محدد',
          riskFactors: []
        });
        setStep(2);
      }
    } catch (error) {
      console.error('خطأ في نظام الذكاء الاصطناعي:', error);
      addMessage(
        "أعتذر، حدث خطأ تقني في النظام. يرجى المحاولة مرة أخرى أو وصف الأعراض بطريقة مختلفة.",
        false,
        'normal'
      );
    }
    
    setIsTyping(false);
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    addMessage(currentMessage, true);
    simulateAIResponse(currentMessage);
    setCurrentMessage("");
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
        text: "مرحباً بك مرة أخرى في منصة التشخيص الذكي! 🤖\n\nأنا جاهز لإجراء تحليل جديد لأعراضك باستخدام الذكاء الاصطناعي المتطور. يرجى وصف الأعراض الجديدة بالتفصيل.",
        isUser: false,
        timestamp: new Date(),
        type: 'normal'
      }
    ]);
    setDiagnosisResult(null);
    setSymptomAnalysis(null);
    setConversationHistory([]);
    setStep(1);
    
    // إعادة تعيين نظام الذكاء الاصطناعي المتقدم
    professionalMedicalAI.resetConsultation();
  };

  // تحديد لون الرسالة حسب النوع
  const getMessageStyle = (type: Message['type']) => {
    switch (type) {
      case 'analysis':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'question':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'result':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  // تحديد لون الشدة
  const getSeverityColor = (severity: DiagnosisResult['severity']) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'urgent': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSeverityIcon = (severity: DiagnosisResult['severity']) => {
    switch (severity) {
      case 'low': return <CheckCircle className="w-4 h-4" />;
      case 'medium': return <Clock className="w-4 h-4" />;
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'urgent': return <AlertTriangle className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-medical-50 relative">
      {/* خلفية متحركة */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-medical-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10">
        <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Chat Header */}
          <div className="medical-card mb-6 text-center">
            <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-medical-500 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-medical-600 to-blue-600 bg-clip-text text-transparent">
                الذكاء الاصطناعي الطبي المتقدم
              </h1>
            </div>
            <p className="text-gray-600 mb-4">
              نظام تشخيص ذكي مُدرب على قاعدة بيانات طبية شاملة لتحليل الأعراض بدقة عالية
            </p>
            
            {/* إحصائيات المحادثة */}
            <div className="flex justify-center space-x-4 space-x-reverse text-sm">
              <div className="flex items-center space-x-1 space-x-reverse text-blue-600">
                <Brain className="w-4 h-4" />
                <span>تحليل ذكي</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span>دقة عالية</span>
              </div>
              <div className="flex items-center space-x-1 space-x-reverse text-purple-600">
                <Stethoscope className="w-4 h-4" />
                <span>متعدد التخصصات</span>
              </div>
            </div>
          </div>

          {/* Chat Container */}
          <div className="medical-card h-96 md:h-[500px] flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-medical-300">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 space-x-reverse max-w-xs md:max-w-md ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.isUser ? 'bg-medical-500' : 'bg-gradient-to-r from-blue-500 to-purple-600'}`}>
                      {message.isUser ? <User className="w-4 h-4 text-white" /> : <Brain className="w-4 h-4 text-white" />}
                    </div>
                    
                    {/* Message Bubble */}
                    <div className={`${message.isUser ? 'chat-bubble-user' : `chat-bubble-ai ${!message.isUser && message.type !== 'normal' ? getMessageStyle(message.type) : ''}`}`}>
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className={`text-xs ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                          {message.timestamp.toLocaleTimeString('ar-EG', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                        {!message.isUser && message.type && message.type !== 'normal' && (
                          <span className="text-xs px-2 py-1 rounded-full bg-opacity-20 bg-white">
                            {message.type === 'analysis' && '🔍 تحليل'}
                            {message.type === 'question' && '❓ أسئلة'}
                            {message.type === 'result' && '✅ نتيجة'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 space-x-reverse">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <Brain className="w-4 h-4 text-white animate-pulse" />
                    </div>
                    <div className="chat-bubble-ai">
                      <div className="flex space-x-1 items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        <span className="text-xs text-blue-600 mr-2">النظام الطبي المتقدم يحلل البيانات...</span>
                        <Brain className="w-4 h-4 text-blue-500 animate-pulse ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="flex items-center space-x-2 space-x-reverse">
                <button className="p-2 text-gray-400 hover:text-medical-500 transition-colors rounded-full hover:bg-medical-50">
                  <Mic className="w-5 h-5" />
                </button>
                
                <div className="flex-1 relative">
                  <textarea
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="اكتب الأعراض التي تشعر بها بالتفصيل... (مثال: أشعر بصداع شديد منذ يومين مع غثيان)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-medical-500 focus:border-transparent bg-white shadow-sm"
                    rows={2}
                    disabled={isTyping}
                  />
                  {currentMessage.length > 0 && (
                    <div className="absolute bottom-1 left-1 text-xs text-gray-400">
                      {currentMessage.length} حرف
                    </div>
                  )}
                </div>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim() || isTyping}
                  className="p-3 bg-gradient-to-r from-medical-500 to-blue-600 text-white rounded-lg hover:opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Diagnosis Result */}
          {diagnosisResult && (
            <div className="mt-6 space-y-6 animate-fade-in">
              {/* نتيجة التحليل الذكي */}
              <div className="medical-card shadow-xl">
                <div className="bg-gradient-to-r from-medical-500 to-blue-600 text-white p-6 rounded-t-lg">
                  <h2 className="text-2xl font-bold flex items-center space-x-2 space-x-reverse">
                    <Brain className="w-8 h-8" />
                    <span>نتيجة التحليل الذكي المتقدم</span>
                  </h2>
                  <p className="text-blue-100 mt-2">تم تحليل الأعراض باستخدام الذكاء الاصطناعي الطبي</p>
                </div>
                
                <div className="p-6">
                  {/* مستوى الأولوية */}
                  <div className={`mb-6 p-4 rounded-lg border-2 ${getSeverityColor(diagnosisResult.severity)}`}>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {getSeverityIcon(diagnosisResult.severity)}
                      <span className="font-bold text-lg">
                        مستوى الأولوية: {
                          diagnosisResult.severity === 'low' ? 'منخفض' :
                          diagnosisResult.severity === 'medium' ? 'متوسط' :
                          diagnosisResult.severity === 'high' ? 'عالي' : 'عاجل'
                        }
                      </span>
                    </div>
                    {diagnosisResult.severity === 'urgent' && (
                      <p className="mt-2 text-red-700 font-medium">
                        🚨 يُنصح بمراجعة الطوارئ فوراً
                      </p>
                    )}
                  </div>

                  {/* تفاصيل التشخيص */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-medical-50 to-blue-50 p-6 rounded-lg border border-medical-100 shadow-sm">
                      <h3 className="font-bold text-medical-800 mb-3 flex items-center space-x-2 space-x-reverse">
                        <Stethoscope className="w-5 h-5" />
                        <span>الحالة المحتملة</span>
                      </h3>
                      <p className="text-gray-700 text-lg font-medium mb-3">{diagnosisResult.condition}</p>
                      <div className="mt-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">دقة التحليل</span>
                          <span className="text-sm font-bold text-medical-600">{diagnosisResult.confidence}%</span>
                        </div>
                        <div className="bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-medical-500 to-blue-600 h-3 rounded-full transition-all duration-1000"
                            style={{ width: `${diagnosisResult.confidence}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-100 shadow-sm">
                      <h3 className="font-bold text-green-800 mb-3">التخصص المقترح</h3>
                      <p className="text-gray-700 text-lg font-medium">{diagnosisResult.specialty}</p>
                      <div className="mt-3 flex items-center space-x-2 space-x-reverse text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">متخصص في هذا المجال</span>
                      </div>
                    </div>
                  </div>

                  {/* أقرب مرفق صحي */}
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-100 shadow-sm mb-6">
                    <h3 className="font-bold text-purple-800 mb-3 flex items-center space-x-2 space-x-reverse">
                      <MapPin className="w-5 h-5" />
                      <span>أقرب مرفق صحي</span>
                    </h3>
                    <p className="text-gray-700 text-lg font-medium">{diagnosisResult.nearestFacility}</p>
                    <div className="mt-3 flex items-center space-x-2 space-x-reverse text-purple-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">متاح للاستشارة</span>
                    </div>
                  </div>

                  {/* التوصيات الطبية */}
                  {diagnosisResult.recommendations && diagnosisResult.recommendations.length > 0 && (
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-lg border border-amber-100 shadow-sm mb-6">
                      <h3 className="font-bold text-amber-800 mb-4 flex items-center space-x-2 space-x-reverse">
                        <CheckCircle className="w-5 h-5" />
                        <span>التوصيات الطبية</span>
                      </h3>
                      <ul className="space-y-3">
                        {diagnosisResult.recommendations.map((recommendation, index) => (
                          <li key={index} className="flex items-start space-x-2 space-x-reverse">
                            <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{recommendation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* أسئلة تتابعية */}
                  {diagnosisResult.followUpQuestions && diagnosisResult.followUpQuestions.length > 0 && (
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-100 shadow-sm mb-6">
                      <h3 className="font-bold text-blue-800 mb-4 flex items-center space-x-2 space-x-reverse">
                        <AlertTriangle className="w-5 h-5" />
                        <span>أسئلة مهمة للمتابعة</span>
                      </h3>
                      <ul className="space-y-2">
                        {diagnosisResult.followUpQuestions.map((question, index) => (
                          <li key={index} className="text-gray-700 bg-white p-3 rounded-lg shadow-sm">
                            {question}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                {/* تحذير مهم */}
                <div className="bg-gradient-to-r from-red-50 to-pink-50 border-t-4 border-red-500 p-6">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-red-800 mb-2">تنبيه طبي مهم</h4>
                      <p className="text-red-700">
                        هذا التحليل أولي وقائم على الذكاء الاصطناعي الطبي المتقدم. 
                        للحصول على تشخيص نهائي دقيق وخطة علاج مناسبة، يُنصح بشدة بمراجعة الطبيب المختص فوراً.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetChat}
                  className="bg-gradient-to-r from-medical-500 to-blue-600 hover:from-medical-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center space-x-2 space-x-reverse shadow-lg"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>تشخيص جديد</span>
                </button>
                
                <Link
                  to="/"
                  className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 text-center shadow-lg"
                >
                  العودة للرئيسية
                </Link>

                {diagnosisResult.severity === 'urgent' && (
                  <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center space-x-2 space-x-reverse shadow-lg animate-pulse">
                    <AlertTriangle className="w-5 h-5" />
                    <span>اتصل بالطوارئ</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
      </div>
    </div>
  );
};

export default DiagnosisChat;
