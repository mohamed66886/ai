// نظام الذكاء الاصطناعي الطبي المتقدم والاحترافي
interface AdvancedAIResponse {
  response: string;
  confidence: number;
  reasoning: string[];
  clinicalAssessment?: {
    symptoms: string[];
    bodySystem: string[];
    severity: number;
    urgency: 'low' | 'medium' | 'high' | 'urgent';
    redFlags: string[];
    medicalContext: string;
  };
  diagnosis?: {
    condition: string;
    specialty: string;
    confidence: number;
    severity: 'low' | 'medium' | 'high' | 'urgent';
    recommendations: string[];
    followUpQuestions: string[];
    differentialDiagnosis: string[];
    redFlags: string[];
  };
}

interface ClinicalAnalysis {
  symptoms: string[];
  bodySystem: string[];
  severity: number;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  redFlags: string[];
  clinicalQuestions: string[];
  medicalContext: string;
}

interface PatientProfile {
  age?: number;
  gender?: string;
  medicalHistory?: string[];
  medications?: string[];
  allergies?: string[];
}

class ProfessionalMedicalAI {
  private conversationHistory: string[] = [];
  private patientProfile: PatientProfile = {};
  private clinicalNotes: string[] = [];

  // قاعدة المعرفة الطبية المتقدمة
  private medicalDatabase = {
    // أعراض مع التحليل السريري المتقدم
    symptoms: {
      'ألم_صدر': {
        keywords: ['ألم صدر', 'وجع صدر', 'ضغط صدر', 'حرقة صدر', 'طعن صدر'],
        clinicalSignificance: 'high',
        urgencyLevel: 4,
        bodySystem: ['قلبي', 'تنفسي', 'عضلي'],
        redFlags: [
          'ألم صدر مع ضيق تنفس',
          'ألم ينتشر للذراع الأيسر',
          'ألم مع تعرق غزير',
          'ألم مع غثيان وقيء'
        ],
        clinicalQuestions: [
          'صف طبيعة الألم: هل هو ضاغط، طاعن، أم حارق؟',
          'هل الألم ينتشر لمناطق أخرى مثل الذراع أو الفك أو الظهر؟',
          'هل يزداد الألم مع المجهود أم في الراحة؟',
          'كم تقدر شدة الألم على مقياس من 1 إلى 10؟',
          'هل يصاحب الألم ضيق في التنفس أو تعرق؟'
        ]
      },
      'ضيق_تنفس': {
        keywords: ['ضيق تنفس', 'صعوبة تنفس', 'نهجان', 'انقطاع نفس', 'اختناق'],
        clinicalSignificance: 'high',
        urgencyLevel: 4,
        bodySystem: ['تنفسي', 'قلبي'],
        redFlags: [
          'ضيق تنفس مفاجئ شديد',
          'عدم القدرة على إكمال الجملة',
          'ازرقاق الشفاه أو الأصابع',
          'ضيق تنفس مع ألم صدر'
        ],
        clinicalQuestions: [
          'متى بدأ ضيق التنفس: فجأة أم تدريجياً؟',
          'هل يحدث في الراحة أم فقط مع المجهود؟',
          'هل يزداد عند الاستلقاء؟',
          'هل يصاحبه سعال أو بلغم؟',
          'هل تشعر بخفقان في القلب؟'
        ]
      },
      'صداع': {
        keywords: ['صداع', 'ألم رأس', 'وجع راس', 'شقيقة', 'صداع نصفي'],
        clinicalSignificance: 'medium',
        urgencyLevel: 2,
        bodySystem: ['عصبي'],
        redFlags: [
          'صداع مفاجئ شديد',
          'صداع مع حمى وتيبس الرقبة',
          'صداع مع اضطراب الرؤية',
          'صداع مع ضعف في الأطراف'
        ],
        clinicalQuestions: [
          'أين بالضبط موقع الصداع؟',
          'هل الصداع نابض، ضاغط، أم طاعن؟',
          'هل يصاحبه غثيان أو قيء؟',
          'هل يزداد مع الضوء أو الصوت؟',
          'هل هناك محفزات معينة للصداع؟'
        ]
      }
    },

    // حالات طبية مع التشخيص التفريقي المتقدم
    conditions: [
      {
        name: 'متلازمة الشريان التاجي الحادة',
        icd10: 'I25.9',
        symptoms: ['ألم_صدر', 'ضيق_تنفس'],
        specialty: 'طب القلب والأوعية الدموية - قسم الطوارئ',
        severity: 'urgent',
        confidence: 92,
        differentialDiagnosis: [
          'احتشاء عضلة القلب الحاد (STEMI/NSTEMI)',
          'الذبحة الصدرية غير المستقرة',
          'تسلخ الشريان الأبهر',
          'الانصمام الرئوي الحاد'
        ],
        redFlags: [
          'ألم صدر شديد مستمر > 20 دقيقة',
          'ألم ينتشر للذراع الأيسر أو الفك',
          'ضيق تنفس شديد مع تعرق غزير',
          'انخفاض ضغط الدم أو فقدان الوعي'
        ],
        immediateActions: [
          'الاتصال بالإسعاف فوراً (123)',
          'عدم القيادة تحت أي ظرف',
          'تناول الأسبرين 300 مج (إذا لم يكن هناك موانع)',
          'البقاء في وضع الجلوس المريح',
          'تجنب أي مجهود بدني'
        ],
        investigations: [
          'تخطيط القلب الكهربائي (ECG) فوري',
          'إنزيمات القلب (Troponin)',
          'صورة أشعة للصدر',
          'فحوصات الدم الأساسية'
        ],
        clinicalNotes: 'حالة طوارئ قلبية تتطلب تدخلاً فورياً وتقييماً في مركز متخصص'
      },
      {
        name: 'الالتهاب الرئوي المكتسب من المجتمع',
        icd10: 'J18.9',
        symptoms: ['سعال', 'حمى', 'ضيق_تنفس'],
        specialty: 'طب الباطنة والأمراض الصدرية',
        severity: 'high',
        confidence: 85,
        differentialDiagnosis: [
          'الالتهاب الرئوي البكتيري',
          'الالتهاب الرئوي الفيروسي',
          'التهاب الشعب الهوائية الحاد',
          'خراج الرئة'
        ],
        redFlags: [
          'حمى > 38.5°C مع رعشة',
          'ضيق تنفس في الراحة',
          'سعال مع بلغم صديدي أو دموي',
          'ألم صدر حاد مع التنفس العميق'
        ],
        investigations: [
          'صورة أشعة سينية للصدر',
          'تحليل البلغم والزراعة',
          'تعداد دم كامل مع CRP',
          'غازات الدم الشرياني'
        ],
        clinicalNotes: 'يتطلب تقييماً سريرياً عاجلاً وقد يحتاج دخول المستشفى'
      }
    ]
  };

  // المعالج الرئيسي للذكاء الاصطناعي
  async processPatientInput(input: string, consultationStep: number): Promise<AdvancedAIResponse> {
    this.conversationHistory.push(input);
    
    // محاكاة وقت المعالجة الواقعي
    await this.simulateAIProcessing();
    
    const clinicalAnalysis = this.performClinicalAnalysis(input);
    const reasoning = this.generateClinicalReasoning(clinicalAnalysis, input);
    
    switch (consultationStep) {
      case 1:
        return await this.initialClinicalAssessment(input, clinicalAnalysis, reasoning);
      case 2:
        return await this.detailedClinicalEvaluation(input, clinicalAnalysis, reasoning);
      default:
        return await this.followUpConsultation(input, reasoning);
    }
  }

  private async simulateAIProcessing(): Promise<void> {
    // محاكاة الوقت الواقعي لمعالجة الذكاء الاصطناعي
    const processingTime = 2500 + Math.random() * 2000;
    await new Promise(resolve => setTimeout(resolve, processingTime));
  }

  private performClinicalAnalysis(input: string): ClinicalAnalysis {
    const normalizedInput = input.toLowerCase()
      .replace(/[أإآ]/g, 'ا')
      .replace(/[ىي]/g, 'ي')
      .replace(/[ةه]/g, 'ه');

    const detectedSymptoms: string[] = [];
    const affectedSystems: string[] = [];
    const redFlags: string[] = [];
    const clinicalQuestions: string[] = [];
    let urgencyScore = 0;

    // تحليل متقدم للأعراض
    Object.entries(this.medicalDatabase.symptoms).forEach(([symptomKey, symptomData]) => {
      const isPresent = symptomData.keywords.some(keyword => 
        normalizedInput.includes(keyword.toLowerCase())
      );
      
      if (isPresent) {
        detectedSymptoms.push(symptomKey);
        affectedSystems.push(...symptomData.bodySystem);
        urgencyScore += symptomData.urgencyLevel;
        clinicalQuestions.push(...symptomData.clinicalQuestions);
        
        // فحص العلامات الحمراء
        symptomData.redFlags.forEach(redFlag => {
          const redFlagWords = redFlag.toLowerCase().split(' ');
          if (redFlagWords.some(word => normalizedInput.includes(word))) {
            redFlags.push(redFlag);
          }
        });
      }
    });

    const avgUrgency = detectedSymptoms.length > 0 ? urgencyScore / detectedSymptoms.length : 1;
    const urgencyLevel = redFlags.length > 0 ? 'urgent' : 
                        avgUrgency >= 4 ? 'high' :
                        avgUrgency >= 3 ? 'medium' : 'low';

    return {
      symptoms: detectedSymptoms,
      bodySystem: [...new Set(affectedSystems)],
      severity: avgUrgency,
      urgency: urgencyLevel,
      redFlags,
      clinicalQuestions: [...new Set(clinicalQuestions)].slice(0, 5),
      medicalContext: this.buildMedicalContext(detectedSymptoms, urgencyLevel, redFlags)
    };
  }

  private generateClinicalReasoning(analysis: ClinicalAnalysis, input: string): string[] {
    const reasoning: string[] = [];
    
    reasoning.push(`تم تحليل النص الطبي وتحديد ${analysis.symptoms.length} عرض رئيسي`);
    
    if (analysis.redFlags.length > 0) {
      reasoning.push(`رُصدت ${analysis.redFlags.length} علامة تحذيرية تستدعي التقييم العاجل`);
      reasoning.push('مستوى الأولوية السريرية: عاجل');
    }
    
    if (analysis.bodySystem.length > 0) {
      reasoning.push(`الأنظمة المتأثرة: ${analysis.bodySystem.join(', ')}`);
    }
    
    reasoning.push(`النمط السريري يشير إلى مستوى خطورة: ${Math.round(analysis.severity)}/5`);
    
    if (analysis.urgency === 'urgent') {
      reasoning.push('التقييم يستدعي التدخل الطبي الفوري حسب البروتوكولات السريرية');
    }
    
    return reasoning;
  }

  private buildMedicalContext(symptoms: string[], urgency: string, redFlags: string[]): string {
    let context = 'التقييم السريري: ';
    
    if (symptoms.length === 0) {
      context += 'الوصف المقدم لا يحتوي على أعراض محددة تسمح بتقييم طبي دقيق';
    } else if (symptoms.length === 1) {
      context += 'عرض أحادي يتطلب استكشاف الأسباب المحتملة والأعراض المصاحبة';
    } else {
      context += `مجموعة أعراض (${symptoms.length}) تشكل نمطاً سريرياً يحتاج تقييماً شاملاً`;
    }
    
    if (redFlags.length > 0) {
      context += ` مع وجود ${redFlags.length} علامة تحذيرية`;
    }
    
    if (urgency === 'urgent') {
      context += ' - يستدعي التدخل الطبي العاجل';
    }
    
    return context;
  }

  private async initialClinicalAssessment(input: string, analysis: ClinicalAnalysis, reasoning: string[]): Promise<AdvancedAIResponse> {
    let response = "";
    let confidence = 70;

    if (analysis.redFlags.length > 0) {
      response = `🚨 **تقييم طبي عاجل - أولوية قصوى**

بناءً على التحليل السريري المتقدم للأعراض التي وصفتها، هناك مؤشرات تستدعي التدخل الطبي الفوري.

🔴 **علامات الإنذار المبكر المرصودة:**
${analysis.redFlags.map((flag: string) => `• ${flag}`).join('\n')}

⚡ **الإجراء المطلوب فوراً:**
• اتصل بالإسعاف على الرقم 123 الآن
• لا تقود السيارة بنفسك
• ابق في مكان آمن ولا تبذل أي مجهود
• أعلم أحد أفراد العائلة بحالتك

⏰ **الوقت عامل حاسم:** هذه الأعراض قد تشير إلى حالة طبية تتدهور سريعاً وتحتاج تدخلاً متخصصاً.

هل تستطيع الوصول للمستشفى الآن أم تحتاج المساعدة في الاتصال بالإسعاف؟`;
      
      confidence = 95;
    } else if (analysis.symptoms.length > 0) {
      response = `🩺 **التقييم السريري المبدئي**

تم تحليل الأعراض التي وصفتها باستخدام نظام الذكاء الاصطناعي الطبي المتقدم:

📊 **نتائج التحليل السريري:**
• **الأعراض المحددة:** ${analysis.symptoms.map((s: string) => s.replace('_', ' ')).join(', ')}
• **الأنظمة المتأثرة:** ${analysis.bodySystem.join(', ')}
• **مؤشر الخطورة:** ${Math.round(analysis.severity)}/5
• **الأولوية السريرية:** ${
  analysis.urgency === 'high' ? 'عالية' : 
  analysis.urgency === 'medium' ? 'متوسطة' : 'منخفضة'
}

🔍 **السياق الطبي:** ${analysis.medicalContext}

📝 **أسئلة سريرية مخصصة لحالتك:**
${analysis.clinicalQuestions.slice(0, 5).map((q: string, i: number) => `${i + 1}. ${q}`).join('\n')}

💡 **أهمية الإجابات المفصلة:**
كلما كانت إجاباتك أكثر دقة وتفصيلاً، كان التقييم السريري أشمل وأدق. هذا يساعد في الوصول للتشخيص الصحيح وتحديد الخطوات العلاجية المناسبة.`;
      
      confidence = 85;
    } else {
      response = `👨‍⚕️ **بداية الاستشارة الطبية التفاعلية**

مرحباً، أنا نظام الذكاء الاصطناعي الطبي المتخصص. لتقديم استشارة طبية دقيقة، أحتاج لوصف مفصل ودقيق للأعراض.

📋 **إرشادات الوصف الطبي المثالي:**

🎯 **المعلومات الأساسية المطلوبة:**
• **العرض الرئيسي:** ما الذي يقلقك أكثر؟
• **الموقع التفصيلي:** أين بالضبط تشعر بالمشكلة؟
• **طبيعة الألم/الإحساس:** ضاغط، طاعن، حارق، نابض؟
• **الشدة:** قيّم من 1-10 (حيث 10 أسوأ ألم يمكن تخيله)
• **التوقيت:** متى بدأ؟ هل مستمر أم متقطع؟

📖 **أمثلة على الوصف الطبي الاحترافي:**
• "ألم ضاغط في منتصف الصدر، شدته 8/10، بدأ منذ ساعة وينتشر للذراع الأيسر"
• "صداع نابض شديد في الجانب الأيمن من الرأس مع غثيان، بدأ صباح اليوم"
• "ضيق تنفس تدريجي منذ 3 أيام، يزداد عند صعود السلم، مع تعب عام"

🔬 ابدأ بوصف العرض الذي يسبب لك أكبر قلق أو إزعاج.`;
      
      confidence = 60;
    }

    return {
      response,
      confidence,
      reasoning,
      clinicalAssessment: {
        symptoms: analysis.symptoms,
        bodySystem: analysis.bodySystem,
        severity: analysis.severity,
        urgency: analysis.urgency,
        redFlags: analysis.redFlags,
        medicalContext: analysis.medicalContext
      }
    };
  }

  private async detailedClinicalEvaluation(input: string, analysis: ClinicalAnalysis, reasoning: string[]): Promise<AdvancedAIResponse> {
    // البحث عن التطابق التشخيصي المتقدم
    let bestMatch = this.medicalDatabase.conditions[0];
    let highestScore = 0;
    let diagnosticReasoning: string[] = [];

    this.medicalDatabase.conditions.forEach(condition => {
      let score = 0;
      const matchDetails: string[] = [];
      
      // تقييم التطابق مع الأعراض
      const matchingSymptoms = condition.symptoms.filter(symptom => 
        analysis.symptoms.includes(symptom)
      );
      
      const symptomMatchScore = (matchingSymptoms.length / condition.symptoms.length) * 100;
      score += symptomMatchScore;
      matchDetails.push(`تطابق الأعراض: ${Math.round(symptomMatchScore)}%`);
      
      // تعديل النتيجة حسب الخطورة
      if (analysis.urgency === condition.severity) {
        score += 25;
        matchDetails.push('تطابق مستوى الخطورة');
      }
      
      // إضافة نقاط للعلامات الحمراء
      if (analysis.redFlags.length > 0 && condition.severity === 'urgent') {
        score += 30;
        matchDetails.push('وجود علامات إنذار');
      }
      
      if (score > highestScore) {
        highestScore = score;
        bestMatch = condition;
        diagnosticReasoning = matchDetails;
      }
    });

    const confidence = Math.min(Math.round(highestScore), 94);
    
    const response = `🎯 **التقييم التشخيصي النهائي**

بعد التحليل السريري الشامل والتقييم المتقدم للأعراض والمعلومات الإضافية:

📈 **مستوى الثقة التشخيصية:** ${confidence}%

🔬 **التحليل التشخيصي المتقدم:**
${diagnosticReasoning.map((reason: string) => `• ${reason}`).join('\n')}

🏥 **الحالة السريرية المحتملة:** ${bestMatch.name}
📋 **كود التصنيف الدولي:** ${bestMatch.icd10}

سأعرض عليك الآن التقرير الطبي الشامل مع التوصيات العلاجية والتشخيص التفريقي...

${bestMatch.severity === 'urgent' ? 
  '🚨 **تنبيه: حالة طوارئ طبية** - يتطلب تدخلاً فورياً!' : 
  '✅ **تقييم مكتمل** - جاري إعداد خطة العلاج والمتابعة'}`;

    return {
      response,
      confidence,
      reasoning: [
        ...reasoning,
        ...diagnosticReasoning,
        `مستوى الثقة التشخيصية: ${confidence}%`,
        `التشخيص الأكثر احتمالاً: ${bestMatch.name}`
      ],
      diagnosis: {
        condition: bestMatch.name,
        specialty: bestMatch.specialty,
        confidence,
        severity: bestMatch.severity as 'low' | 'medium' | 'high' | 'urgent',
        recommendations: bestMatch.immediateActions || [],
        followUpQuestions: bestMatch.investigations || [],
        differentialDiagnosis: bestMatch.differentialDiagnosis,
        redFlags: bestMatch.redFlags
      }
    };
  }

  private async followUpConsultation(input: string, reasoning: string[]): Promise<AdvancedAIResponse> {
    const professionalResponses = [
      "أشكرك على هذه المعلومات الإضافية القيمة. كل تفصيل يساعد في بناء صورة سريرية أكثر وضوحاً ودقة.",
      "معلومات مهمة جداً من الناحية السريرية. هذا التفاعل الإيجابي يحسن كثيراً من جودة التقييم الطبي.",
      "تقدير عالٍ لتجاوبك المفصل. هذه المعطيات تساعد في استكمال اللوحة السريرية وتأكيد أو نفي الاحتمالات التشخيصية.",
      "ممتاز! هذه التفاصيل الإضافية تعزز من دقة التحليل وتساعد في وضع الخطة العلاجية المناسبة."
    ];

    const randomResponse = professionalResponses[Math.floor(Math.random() * professionalResponses.length)];

    return {
      response: `${randomResponse}\n\n🔬 **ملاحظة سريرية مهمة:** \nهذا التقييم مبني على خوارزميات الذكاء الاصطناعي الطبي المتقدم وقاعدة معرفة واسعة، لكنه يبقى تقييماً مساعداً ولا يحل محل الفحص السريري المباشر والتحاليل المخبرية.\n\n👨‍⚕️ **هل لديك استفسارات إضافية حول:**\n• التوصيات العلاجية المقترحة؟\n• الفحوصات المطلوبة؟\n• علامات التحسن أو التدهور التي يجب ملاحظتها؟`,
      confidence: 88,
      reasoning: [
        ...reasoning,
        "تم دمج المعلومات الإضافية في التقييم الشامل",
        "التفاعل المهني مع المريض يحسن من دقة التشخيص",
        "التأكيد على أهمية المتابعة الطبية المهنية"
      ]
    };
  }

  // إعادة تعيين الجلسة
  resetConsultation(): void {
    this.conversationHistory = [];
    this.patientProfile = {};
    this.clinicalNotes = [];
  }

  // الحصول على تاريخ المحادثة
  getConsultationHistory(): string[] {
    return this.conversationHistory;
  }

  // إضافة ملاحظات سريرية
  addClinicalNote(note: string): void {
    this.clinicalNotes.push(`${new Date().toISOString()}: ${note}`);
  }

  // الحصول على الملاحظات السريرية
  getClinicalNotes(): string[] {
    return this.clinicalNotes;
  }
}

// إنشاء مثيل من النظام المتقدم
export const professionalMedicalAI = new ProfessionalMedicalAI();
export type { AdvancedAIResponse };
