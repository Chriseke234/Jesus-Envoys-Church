import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, Camera, MessageSquare, Play, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] translate-y-1/2" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand & About */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl shadow-primary/20 group-hover:rotate-12 transition-transform duration-500">
                JE
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl uppercase tracking-tighter leading-none">Jesus <span className="text-primary italic">Envoys</span></span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Church Collective</span>
              </div>
            </Link>
            <p className="text-white/50 mb-10 leading-relaxed text-lg max-w-md">
              A global community dedicated to radical faith, authentic worship, and the transformative power of the Gospel. Join us in our mission to light up the world.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Globe, label: 'Facebook' },
                { icon: Camera, label: 'Instagram' },
                { icon: MessageSquare, label: 'Twitter' },
                { icon: Play, label: 'Youtube' }
              ].map((social, i) => (
                <a 
                  key={i}
                  href="#" 
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:-translate-y-1 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-8">Navigation</h3>
            <ul className="space-y-4">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Sermons', path: '/sermons' },
                { name: 'Events', path: '/events' },
                { name: 'Ministries', path: '/ministries' },
                { name: 'Give Online', path: '/give' }
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-white/60 hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-8">Get In Touch</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="text-primary" size={20} />
                </div>
                <span className="text-white/60 leading-relaxed pt-1">
                  123 Faith Avenue<br />Cityville, ST 12345
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Phone className="text-primary" size={20} />
                </div>
                <span className="text-white/60">(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mail className="text-primary" size={20} />
                </div>
                <span className="text-white/60">contact@jesusenvoys.org</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-8">Weekly Devotional</h3>
            <p className="text-white/50 mb-6 text-sm leading-relaxed">
              Stay connected with our community. Receive inspiration and updates directly in your inbox.
            </p>
            <div className="space-y-3">
              <Input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white/5 border-white/10 rounded-2xl h-14 focus:ring-primary/20"
              />
              <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-widest gap-2 shadow-xl shadow-primary/20">
                Subscribe <ArrowRight size={18} />
              </Button>
            </div>
          </div>

        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-white/30 text-xs font-bold uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Jesus Envoys Church. Built for the Kingdom.</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
