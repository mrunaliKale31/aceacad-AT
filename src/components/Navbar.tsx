import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useAuth } from '@/src/context/AuthContext';

export const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How it Works', href: '#how-it-works' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-white/80 backdrop-blur-md border-b border-slate-200 py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">Academia Ace</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              className="text-slate-600 hover:text-primary font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-4 ml-4">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                >
                  Dashboard
                </motion.button>
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 hover:text-primary font-medium px-4 py-2">
                  Login
                </Link>
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                  >
                    Get Started
                  </motion.button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-6 flex flex-col gap-4 md:hidden shadow-xl"
        >
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-600 font-medium text-lg"
            >
              {link.label}
            </a>
          ))}
          <hr className="border-slate-100" />
          {isAuthenticated ? (
            <Link to="/dashboard" className="bg-primary text-white text-center py-3 rounded-xl font-bold">
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-slate-600 font-medium text-lg">Login</Link>
              <Link to="/register" className="bg-primary text-white text-center py-3 rounded-xl font-bold">
                Get Started
              </Link>
            </>
          )}
        </motion.div>
      )}
    </nav>
  );
};
