import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Globe, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';

const links = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Sermons', path: '/sermons' },
  { name: 'Events', path: '/events' },
  { name: 'Ministries', path: '/ministries' },
  { name: 'Blog', path: '/blog' },
  { name: 'Live', path: '/live' },
  { name: 'Contact', path: '/contact' },
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
        'fixed top-0 w-full z-50 transition-all duration-500',
        isScrolled
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] py-3 border-b border-primary/5'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl shadow-primary/20 group-hover:scale-110 transition-all duration-500 ring-4 ring-primary/10">
            JE
          </div>
          <div className="flex flex-col">
            <span className={cn(
              "font-black text-xl md:text-2xl leading-none tracking-tighter uppercase transition-colors",
              isScrolled ? "text-foreground" : "text-white drop-shadow-lg"
            )}>
              Jesus <span className="text-primary italic">Envoys</span>
            </span>
            <span className={cn(
              "text-[10px] font-black uppercase tracking-[0.3em] transition-colors",
              isScrolled ? "text-muted-foreground" : "text-white/60"
            )}>
              Church Collective
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'relative px-4 py-2 text-xs font-black uppercase tracking-widest transition-all duration-300 rounded-full hover:bg-primary/5',
                isScrolled ? 'text-foreground' : 'text-white/90 hover:text-white',
                location.pathname === link.path && 'text-primary bg-primary/5'
              )}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div 
                   layoutId="nav-pill"
                   className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
           <Link to="/portal">
              <Button variant="ghost" size="icon" className={cn(
                "w-12 h-12 rounded-2xl",
                isScrolled ? "text-foreground" : "text-white hover:bg-white/10"
              )}>
                 <User size={20} />
              </Button>
           </Link>
           <Button className="rounded-2xl px-8 font-black uppercase tracking-widest shadow-xl shadow-primary/20 gap-2">
              <Heart size={16} fill="currentColor" /> Give
           </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={cn(
            "lg:hidden w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
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
