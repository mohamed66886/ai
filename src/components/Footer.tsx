
import { Link } from "react-router-dom";
import { Heart, Stethoscope } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="text-center md:text-right">
            <div className="flex items-center justify-center md:justify-start space-x-2 space-x-reverse mb-4">
              <div className="w-10 h-10 medical-gradient rounded-lg flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">طبيبك في دقهلية</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              منصة ذكية مجانية تستخدم الذكاء الاصطناعي لمساعدة مواطني محافظة الدقهلية في تشخيص الأعراض ومعرفة التخصص الطبي المناسب
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <div className="space-y-2">
              <Link 
                to="/" 
                className="block text-gray-300 hover:text-medical-400 transition-colors duration-200"
              >
                الرئيسية
              </Link>
              <Link 
                to="/diagnosis" 
                className="block text-gray-300 hover:text-medical-400 transition-colors duration-200"
              >
                ابدأ التشخيص
              </Link>
              <Link 
                to="/about" 
                className="block text-gray-300 hover:text-medical-400 transition-colors duration-200"
              >
                عن المنصة
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
            <div className="space-y-2 text-gray-300">
              <p>محافظة الدقهلية، مصر</p>
              <p>خدمة مجانية للمواطنين</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center space-x-1 space-x-reverse">
            <span>مشروع شبابي لخدمة محافظة الدقهلية</span>
            <Heart className="w-4 h-4 text-red-500" />
          </p>
          <p className="text-gray-500 text-sm mt-2">
            © 2024 طبيبك في دقهلية. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
