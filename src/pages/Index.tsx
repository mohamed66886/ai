
import { Link } from "react-router-dom";
import { MessageSquare, MapPin, Brain, Clock, Shield, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-50 to-health-50">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            منصّة <span className="medical-gradient bg-clip-text text-transparent">طبيبك في دقهلية</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            ذكاء اصطناعي لمساعدتك على تشخيص الأعراض ومعرفة التخصص الطبي المناسب
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/diagnosis"
              className="bg-medical-500 hover:bg-medical-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2 space-x-reverse"
            >
              <MessageSquare className="w-6 h-6" />
              <span>ابدأ التشخيص الآن</span>
            </Link>
            <Link 
              to="/about"
              className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border-2 border-gray-200 hover:border-medical-300"
            >
              تعرف على المنصة
            </Link>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center medical-card animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            كيف تعمل منصة طبيبك في دقهلية؟
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            منصتنا تستخدم تقنيات الذكاء الاصطناعي المتقدمة لمساعدتك على فهم أعراضك بشكل أفضل. 
            ما عليك سوى وصف الأعراض التي تشعر بها من خلال نظام المحادثة التفاعلي، وسنقوم بتحليلها 
            وإرشادك إلى التخصص الطبي المناسب مع اقتراح أقرب وحدة صحية في محافظة الدقهلية.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-medical-50 p-6 rounded-xl border border-medical-100">
              <MessageSquare className="w-12 h-12 text-medical-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">اوصف أعراضك</h3>
              <p className="text-gray-600 text-sm">تحدث معنا عن الأعراض التي تشعر بها</p>
            </div>
            
            <div className="bg-health-50 p-6 rounded-xl border border-health-100">
              <Brain className="w-12 h-12 text-health-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">تحليل ذكي</h3>
              <p className="text-gray-600 text-sm">نحلل أعراضك بالذكاء الاصطناعي</p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
              <MapPin className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">أقرب وحدة صحية</h3>
              <p className="text-gray-600 text-sm">نرشدك لأقرب مكان للعلاج</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            لماذا تختار منصتنا؟
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            نقدم خدمة مجانية وموثوقة لجميع مواطني محافظة الدقهلية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="medical-card text-center">
            <div className="w-16 h-16 medical-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">متاح 24/7</h3>
            <p className="text-gray-600">
              خدمة متاحة في أي وقت من اليوم لمساعدتك عند الحاجة
            </p>
          </div>

          <div className="medical-card text-center">
            <div className="w-16 h-16 medical-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">آمن ومجاني</h3>
            <p className="text-gray-600">
              خدمة مجانية تماماً مع حماية كاملة لخصوصية بياناتك
            </p>
          </div>

          <div className="medical-card text-center">
            <div className="w-16 h-16 medical-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">لأهل الدقهلية</h3>
            <p className="text-gray-600">
              مصمم خصيصاً لخدمة مواطني محافظة الدقهلية
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="medical-gradient py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            جاهز لتجربة التشخيص الذكي؟
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            ابدأ الآن واكتشف التخصص الطبي المناسب لحالتك مع أقرب وحدة صحية
          </p>
          <Link 
            to="/diagnosis"
            className="bg-white text-medical-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center space-x-2 space-x-reverse"
          >
            <MessageSquare className="w-6 h-6" />
            <span>ابدأ المحادثة الآن</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
