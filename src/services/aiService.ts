// خدمة الذكاء الاصطناعي الطبي المتقدم
export interface AIResponse {
  message: string;
  type: 'analysis' | 'diagnosis' | 'question' | 'normal';
  diagnosis?: {
    condition: string;
    confidence: number;
    severity: 'منخفض' | 'متوسط' | 'عالي' | 'عاجل';
    specialty: string;
    recommendations: string[];
  };
}

class MedicalAI {
  private conversationHistory: string[] = [];
  private symptomsDetected: string[] = [];
  
  // قاعدة بيانات الأعراض والأمراض
  private medicalKnowledge = {
    symptoms: {
      'صداع': ['رأس', 'دماغ', 'وجع راس', 'صداع'],
      'حمى': ['حرارة', 'سخونة', 'حمى', 'ارتفاع درجة الحرارة'],
      'سعال': ['كحة', 'سعال', 'بلغم'],
      'ألم صدر': ['صدر', 'قلب', 'ألم صدر'],
      'ضيق تنفس': ['نفس', 'تنفس', 'نهجان'],
      'غثيان': ['غثيان', 'استفراغ', 'قيء'],
      'ألم بطن': ['بطن', 'معدة', 'مغص'],
      'إسهال': ['إسهال', 'براز سائل']
    },
    
    conditions: {
      'نزلة برد': {
        symptoms: ['صداع', 'حمى', 'سعال'],
        confidence: 85,
        severity: 'منخفض' as const,
        specialty: 'طب الأسرة',
        recommendations: [
          'الراحة في المنزل لمدة 3-5 أيام',
          'شرب السوائل الدافئة بكثرة',
          'تناول فيتامين سي',
          'استخدام البخار لتنظيف الجيوب الأنفية'
        ]
      },
      'التهاب الجهاز التنفسي': {
        symptoms: ['سعال', 'حمى', 'ألم صدر'],
        confidence: 78,
        severity: 'متوسط' as const,
        specialty: 'طب الباطنة',
        recommendations: [
          'مراجعة الطبيب خلال 24-48 ساعة',
          'تجنب المجهود البدني',
          'شرب كمية كافية من السوائل',
          'مراقبة درجة الحرارة'
        ]
      },
      'مشاكل قلبية': {
        symptoms: ['ألم صدر', 'ضيق تنفس'],
        confidence: 92,
        severity: 'عاجل' as const,
        specialty: 'طب القلب - طوارئ',
        recommendations: [
          'التوجه فوراً للطوارئ',
          'الاتصال بالإسعاف 123',
          'عدم القيادة بنفسك',
          'تجنب أي مجهود'
        ]
      }
    }
  };

  async processMessage(userMessage: string): Promise<AIResponse> {
    this.conversationHistory.push(userMessage);
    
    // محاكاة وقت المعالجة
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    // التحقق من الردود الطبيعية أولاً
    const naturalResponse = this.handleNaturalConversation(userMessage);
    if (naturalResponse) {
      return naturalResponse;
    }
    
    const detectedSymptoms = this.detectSymptoms(userMessage);
    
    if (detectedSymptoms.length === 0) {
      return this.askForMoreDetails();
    }
    
    this.symptomsDetected = [...new Set([...this.symptomsDetected, ...detectedSymptoms])];
    
    if (this.symptomsDetected.length >= 2) {
      return this.provideDiagnosis();
    } else {
      return this.askFollowUpQuestions(detectedSymptoms);
    }
  }

  private handleNaturalConversation(message: string): AIResponse | null {
    const lowerMessage = message.toLowerCase().trim();
    
    // التحيات والسلامات
    if (this.matchesAny(lowerMessage, ['سلام', 'السلام عليكم', 'مرحبا', 'مرحباً', 'اهلا', 'أهلاً', 'هاي', 'هلو'])) {
      const greetings = [
        "وعليكم السلام ورحمة الله وبركاته! 😊\n\nأهلاً وسهلاً بك، أنا طبيبك الذكي وسأساعدك في تحليل أعراضك الطبية.\n\nكيف يمكنني مساعدتك اليوم؟",
        "مرحباً بك! 👋\n\nسعيد برؤيتك هنا. أنا مساعدك الطبي الذكي، جاهز لتحليل أي أعراض تشعر بها.\n\nما الذي يقلقك صحياً اليوم؟",
        "أهلاً وسهلاً! 🌟\n\nتشرفت بلقائك. أنا هنا لأساعدك في فهم الأعراض وتقديم النصائح الطبية.\n\nحدثني عن حالتك الصحية."
      ];
      return {
        message: greetings[Math.floor(Math.random() * greetings.length)],
        type: 'normal'
      };
    }

    // أسئلة عن الوقت والتاريخ
    if (this.matchesAny(lowerMessage, ['الساعة كام', 'كام الساعة', 'الوقت', 'الساعه كام'])) {
      const now = new Date();
      const timeString = now.toLocaleTimeString('ar-EG', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      return {
        message: `🕐 الساعة الآن ${timeString}\n\nكيف يمكنني مساعدتك طبياً؟ هل تشعر بأي أعراض؟`,
        type: 'normal'
      };
    }

    if (this.matchesAny(lowerMessage, ['انهارده كام', 'النهارده كام', 'اليوم كام', 'التاريخ', 'تاريخ اليوم'])) {
      const today = new Date();
      const arabicDate = today.toLocaleDateString('ar-EG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      return {
        message: `📅 اليوم هو ${arabicDate}\n\nآمل أن تكون بخير! هل تحتاج مساعدة طبية؟`,
        type: 'normal'
      };
    }

    // أسئلة عن الحال
    if (this.matchesAny(lowerMessage, ['ازيك', 'إزيك', 'كيفك', 'ايه اخبارك', 'اخبارك', 'كيف حالك', 'إيه أخبارك'])) {
      const responses = [
        "الحمد لله، أنا بخير وجاهز لمساعدتك! 😊\n\nوأنت كيف حالك؟ هل تشعر بخير أم هناك شيء يقلقك صحياً؟",
        "بخير والحمد لله! شكراً لسؤالك 💙\n\nالأهم هو صحتك أنت. كيف تشعر اليوم؟",
        "أنا تمام وفي أفضل حال لخدمتك! 🌟\n\nما أخبارك الصحية؟ هل كل شيء على ما يرام؟"
      ];
      return {
        message: responses[Math.floor(Math.random() * responses.length)],
        type: 'normal'
      };
    }

    // أسئلة عن الطقس
    if (this.matchesAny(lowerMessage, ['الطقس', 'الجو', 'الجو ايه', 'الطقس إيه'])) {
      return {
        message: "أعتذر، لا أستطيع معرفة حالة الطقس حالياً 🌤️\n\nلكن يمكنني مساعدتك في شيء أهم - صحتك!\n\nهل تشعر بأي أعراض قد تكون متعلقة بتغيرات الطقس مثل الصداع أو احتقان الأنف؟",
        type: 'normal'
      };
    }

    // شكر وتقدير
    if (this.matchesAny(lowerMessage, ['شكرا', 'شكراً', 'متشكر', 'تسلم', 'الله يعطيك العافية', 'جزاك الله خير'])) {
      const thanks = [
        "العفو! سعيد جداً أنني ساعدتك 😊\n\nصحتك أهم شيء، لا تتردد في سؤالي عن أي أعراض أخرى.",
        "وإياك! الله يعافيك ويشفيك 🤲\n\nأنا موجود دائماً لمساعدتك طبياً.",
        "تسلم! دي وظيفتي وأنا سعيد بخدمتك 💙\n\nاعتني بصحتك واتصل بي إذا احتجت أي مساعدة."
      ];
      return {
        message: thanks[Math.floor(Math.random() * thanks.length)],
        type: 'normal'
      };
    }

    // أسئلة عامة عن الخدمة
    if (this.matchesAny(lowerMessage, ['انت مين', 'أنت مين', 'ايه اللي بتعمله', 'إيه شغلك', 'وظيفتك ايه'])) {
      return {
        message: "أنا مساعدك الطبي الذكي! 👨‍⚕️🤖\n\n**وظيفتي:**\n• تحليل الأعراض الطبية\n• تقديم التوجيه الأولي\n• مساعدتك في فهم حالتك\n• توجيهك للتخصص المناسب\n\n**كيف أعمل:**\nأحلل الأعراض التي تصفها وأقدم تقييماً أولياً مع التوصيات المناسبة.\n\n💡 **تذكر:** أنا مساعد وليس بديل عن الطبيب المختص!\n\nهل تود البدء في وصف أعراضك؟",
        type: 'normal'
      };
    }

    // تحية المغادرة
    if (this.matchesAny(lowerMessage, ['مع السلامة', 'باي', 'وداعا', 'وداعاً', 'تصبح على خير', 'سلام'])) {
      const farewells = [
        "مع السلامة! اعتني بصحتك جيداً 🌟\n\nأتمنى لك الصحة والعافية، وأنا موجود إذا احتجتني.",
        "وداعاً! أتمنى أن أكون ساعدتك 💙\n\nلا تتردد في العودة إذا شعرت بأي أعراض.",
        "تصبح على خير! الله يشفيك ويعافيك 🤲\n\nصحتك أمانة، اعتني بها."
      ];
      return {
        message: farewells[Math.floor(Math.random() * farewells.length)],
        type: 'normal'
      };
    }

    // أسئلة عشوائية أو غير طبية
    if (this.matchesAny(lowerMessage, ['اكل ايه', 'فين', 'ازاي', 'امتى', 'مين', 'ليه']) && 
        !this.containsMedicalTerms(lowerMessage)) {
      return {
        message: "أعتذر، أنا مختص في المساعدة الطبية فقط 👨‍⚕️\n\nيمكنني مساعدتك في:\n• تحليل الأعراض\n• التوجيه الطبي\n• النصائح الصحية\n• معلومات عن الأمراض\n\nهل لديك أي أعراض تريد مناقشتها؟",
        type: 'normal'
      };
    }

    return null; // لا يوجد رد طبيعي، المتابعة مع التحليل الطبي
  }

  private matchesAny(message: string, patterns: string[]): boolean {
    return patterns.some(pattern => message.includes(pattern));
  }

  private containsMedicalTerms(message: string): boolean {
    const medicalTerms = ['صداع', 'ألم', 'وجع', 'حمى', 'سعال', 'مرض', 'دواء', 'طبيب', 'مستشفى', 'أعراض'];
    return medicalTerms.some(term => message.includes(term));
  }

  private detectSymptoms(message: string): string[] {
    const detected: string[] = [];
    const lowerMessage = message.toLowerCase();
    
    Object.entries(this.medicalKnowledge.symptoms).forEach(([symptom, keywords]) => {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        detected.push(symptom);
      }
    });
    
    return detected;
  }

  private askForMoreDetails(): AIResponse {
    return {
      message: `مرحباً! أنا طبيبك الذكي هنا لمساعدتك. 👨‍⚕️

لم أتمكن من تحديد أعراض واضحة من رسالتك. يرجى وصف الأعراض بتفصيل أكثر:

🔍 **مثال على الوصف الجيد:**
• "أشعر بصداع شديد في مقدمة الرأس منذ يومين"
• "لدي ألم في الصدر مع صعوبة في التنفس"
• "أعاني من حمى 38 درجة مع سعال"

📝 **معلومات مهمة:**
• مكان الألم تحديداً
• شدة الألم (من 1-10)
• متى بدأ وكم يستمر
• أي عوامل تزيد أو تقلل منه`,
      type: 'question'
    };
  }

  private askFollowUpQuestions(symptoms: string[]): AIResponse {
    return {
      message: `تم تحليل الأعراض بنجاح! 📊

🎯 **الأعراض المكتشفة:** ${symptoms.join(', ')}

للحصول على تشخيص دقيق، أحتاج لمعرفة المزيد:

❓ **أسئلة مهمة:**
• منذ متى بدأت هذه الأعراض؟
• هل تزداد سوءاً مع الوقت؟
• هل تتناول أي أدوية حالياً؟
• هل لديك أمراض مزمنة؟
• ما عمرك تقريباً؟

كلما زادت التفاصيل، كان التشخيص أدق! 🎯`,
      type: 'analysis'
    };
  }

  private provideDiagnosis(): AIResponse {
    // البحث عن أفضل تطابق
    let bestMatch: { name: string; symptoms: string[]; confidence: number; severity: 'منخفض' | 'متوسط' | 'عالي' | 'عاجل'; specialty: string; recommendations: string[] } | null = null;
    let highestScore = 0;

    Object.entries(this.medicalKnowledge.conditions).forEach(([condition, data]) => {
      const matchingSymptoms = data.symptoms.filter(s => this.symptomsDetected.includes(s));
      const score = (matchingSymptoms.length / data.symptoms.length) * 100;
      
      if (score > highestScore) {
        highestScore = score;
        bestMatch = { name: condition, ...data };
      }
    });

    if (!bestMatch) {
      return {
        message: "عذراً، لا أستطيع تحديد تشخيص دقيق بناءً على الأعراض المتاحة. يُنصح بمراجعة طبيب مختص.",
        type: 'normal'
      };
    }

    const severityEmoji = {
      'منخفض': '🟢',
      'متوسط': '🟡', 
      'عالي': '🟠',
      'عاجل': '🔴'
    };

    return {
      message: `## 🎯 نتيجة التحليل الطبي

**الحالة المحتملة:** ${bestMatch.name}
**مستوى الأولوية:** ${severityEmoji[bestMatch.severity]} ${bestMatch.severity}
**التخصص المناسب:** ${bestMatch.specialty}
**دقة التحليل:** ${bestMatch.confidence}%

### 📋 التوصيات الطبية:
${bestMatch.recommendations.map((rec: string, index: number) => `${index + 1}. ${rec}`).join('\n')}

${bestMatch.severity === 'عاجل' ? '🚨 **تحذير:** يُنصح بمراجعة الطوارئ فوراً!' : ''}

⚠️ **تنبيه مهم:** هذا تحليل مساعد ولا يغني عن استشارة طبيب مختص.`,
      type: 'diagnosis',
      diagnosis: {
        condition: bestMatch.name,
        confidence: bestMatch.confidence,
        severity: bestMatch.severity,
        specialty: bestMatch.specialty,
        recommendations: bestMatch.recommendations
      }
    };
  }

  reset(): void {
    this.conversationHistory = [];
    this.symptomsDetected = [];
  }
}

export const medicalAI = new MedicalAI();
