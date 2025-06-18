
import { Link } from "react-router-dom";
import { Menu, X, Stethoscope } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 space-x-reverse">
            <div className="w-10 h-10 medical-gradient rounded-lg flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">طبيبك في دقهلية</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-medical-600 transition-colors duration-200 font-medium"
            >
              الرئيسية
            </Link>
            <Link 
              to="/diagnosis" 
              className="text-gray-700 hover:text-medical-600 transition-colors duration-200 font-medium"
            >
              ابدأ التشخيص
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-medical-600 transition-colors duration-200 font-medium"
            >
              عن المنصة
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 animate-slide-up">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-medical-600 transition-colors duration-200 font-medium px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                الرئيسية
              </Link>
              <Link 
                to="/diagnosis" 
                className="text-gray-700 hover:text-medical-600 transition-colors duration-200 font-medium px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                ابدأ التشخيص
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-medical-600 transition-colors duration-200 font-medium px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                عن المنصة
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
