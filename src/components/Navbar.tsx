import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Globe, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';

const links = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Events', path: '/events' },
  { name: 'Ministries', path: '/ministries' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-500 border-b',
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl py-3 border-border/50 shadow-xl'
          : 'bg-black/20 backdrop-blur-sm py-5 border-white/5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-start gap-8 md:gap-16">
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="relative w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl md:rounded-2xl flex items-center justify-center p-1.5 shadow-lg group-hover:scale-105 transition-transform duration-300 ring-1 ring-black/5 overflow-hidden">
            <img 
              src="/logo.png" 
              alt="Jesus Envoys Church Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className={cn(
              "font-black text-xl md:text-2xl leading-none tracking-tighter uppercase transition-colors whitespace-nowrap",
              isScrolled ? "text-foreground" : "text-white"
            )}>
              Jesus Envoys <span className="text-primary">Church</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-2 ml-auto">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'relative px-5 py-2 text-xs font-black uppercase tracking-widest transition-all duration-300 rounded-xl',
                isScrolled 
                  ? 'text-foreground/70 hover:text-primary hover:bg-primary/5' 
                  : 'text-white/80 hover:text-white hover:bg-white/10',
                location.pathname === link.path && (
                  isScrolled 
                    ? 'text-primary bg-primary/10' 
                    : 'text-white bg-white/20 shadow-lg shadow-black/20'
                )
              )}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div 
                   layoutId="nav-pill"
                   className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(234,23,73,0.6)]"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4 ml-4">
           <Link to="/portal">
              <Button variant="ghost" size="icon" className={cn(
                "w-10 h-10 rounded-xl",
                isScrolled ? "text-foreground" : "text-white hover:bg-white/10"
              )}>
                 <User size={18} />
              </Button>
           </Link>
           <Button className="rounded-xl px-6 h-11 text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/20 gap-2">
              <Heart size={14} fill="currentColor" /> Give
           </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={cn(
            "lg:hidden ml-auto w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
            isScrolled ? "text-foreground bg-primary/5" : "text-white bg-white/10 backdrop-blur-md"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-card/95 backdrop-blur-2xl border-b border-primary/5 shadow-2xl overflow-hidden lg:hidden"
          >
            <div className="container mx-auto p-8 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center justify-between text-2xl font-black uppercase tracking-tighter py-4 px-6 rounded-[2rem] transition-all',
                    location.pathname === link.path
                      ? 'bg-primary text-white shadow-xl shadow-primary/20'
                      : 'text-foreground hover:bg-primary/5'
                  )}
                >
                  {link.name}
                  {location.pathname === link.path && <Globe size={24} className="opacity-50" />}
                </Link>
              ))}
              <div className="pt-8 border-t border-primary/5 grid grid-cols-2 gap-4">
                 <Link to="/portal" className="col-span-1">
                    <Button variant="outline" className="w-full rounded-2xl py-8 font-black uppercase tracking-widest">Portal</Button>
                 </Link>
                 <Button className="col-span-1 rounded-2xl py-8 font-black uppercase tracking-widest">Give</Button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
