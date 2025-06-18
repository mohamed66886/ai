
import { Brain, Heart, Shield, Users, Zap, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-medical-50">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            عن منصة <span className="medical-gradient bg-clip-text text-transparent">طبيبك في دقهلية</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            منصة ذكية ومجانية تهدف إلى تحسين الخدمات الصحية في محافظة الدقهلية من خلال 
            استخدام تقنيات الذكاء الاصطناعي لمساعدة المواطنين على فهم أعراضهم الصحية بشكل أفضل
          </p>
        </div>
      </section>

      {/* How it Works */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            كيف تعمل المنصة؟
          </h2>
          
          <div className="medical-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  تقنية الذكاء الاصطناعي المتقدمة
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  تستخدم منصتنا خوارزميات الذكاء الاصطناعي المدربة على آلاف الحالات الطبية 
                  لتحليل الأعراض التي يصفها المستخدم وتقديم اقتراحات مفيدة حول التخصص الطبي المناسب.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  النظام يتفاعل مع المستخدم من خلال محادثة ذكية لفهم الأعراض بشكل دقيق 
                  ويقدم توصيات مبنية على البيانات الطبية الموثوقة.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-64 h-64 medical-gradient rounded-full flex items-center justify-center">
                  <Brain className="w-32 h-32 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Service */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            لماذا هذه الخدمة؟
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            نهدف إلى سد الفجوة بين المواطنين والخدمات الصحية المناسبة في محافظة الدقهلية
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="medical-card text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">تحسين الصحة العامة</h3>
              <p className="text-gray-600">
                مساعدة المواطنين على فهم أعراضهم مبكراً والحصول على العلاج المناسب في الوقت المناسب
              </p>
            </div>

            <div className="medical-card text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">توفير الوقت والجهد</h3>
              <p className="text-gray-600">
                تقليل الوقت المطلوب لمعرفة التخصص الطبي المناسب وتجنب الزيارات غير الضرورية
              </p>
            </div>

            <div className="medical-card text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">سهولة الوصول</h3>
              <p className="text-gray-600">
                إرشاد المواطنين إلى أقرب مرفق صحي مناسب في محافظة الدقهلية
              </p>
            </div>

            <div className="medical-card text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">خصوصية وأمان</h3>
              <p className="text-gray-600">
                حماية كاملة لبيانات المستخدمين مع عدم تخزين أي معلومات طبية شخصية
              </p>
            </div>

            <div className="medical-card text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">خدمة مجتمعية</h3>
              <p className="text-gray-600">
                مشروع شبابي غير ربحي يهدف لخدمة جميع شرائح المجتمع في الدقهلية
              </p>
            </div>

            <div className="medical-card text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">ذكاء اصطناعي متطور</h3>
              <p className="text-gray-600">
                استخدام أحدث تقنيات الذكاء الاصطناعي لتوفير تحليل دقيق وموثوق للأعراض
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="medical-gradient py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              رسالتنا
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              نسعى لتمكين مواطني محافظة الدقهلية من اتخاذ قرارات صحية مدروسة من خلال 
              توفير منصة ذكية ومجانية تساعدهم على فهم أعراضهم والوصول إلى الخدمات الصحية المناسبة. 
              نؤمن بأن الصحة حق للجميع ونعمل على جعل الخدمات الصحية أكثر وصولاً وفعالية.
            </p>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-semibold text-white mb-4">تنبيه مهم</h3>
              <p className="text-blue-100 leading-relaxed">
                هذه المنصة لا تغني عن استشارة الطبيب المختص. التشخيص المقدم هو اقتراح أولي 
                قائم على الذكاء الاصطناعي ويجب مراجعة طبيب مختص للحصول على التشخيص النهائي والعلاج المناسب.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            جرب منصتنا الآن
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            ابدأ رحلتك نحو فهم أفضل لصحتك واكتشف التخصص الطبي المناسب لحالتك
          </p>
          <Link 
            to="/diagnosis"
            className="medical-gradient text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg inline-block"
          >
            ابدأ التشخيص الآن
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
