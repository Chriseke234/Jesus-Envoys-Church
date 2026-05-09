import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, Camera, MessageSquare, Play, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-white pt-32 pb-12 relative overflow-hidden border-t border-white/5">
      {/* Premium Gradient Overlays */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 opacity-50" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 opacity-30" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">

          {/* Brand & About */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-4 mb-8 group">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center p-1.5 shadow-xl shadow-primary/10 group-hover:scale-105 transition-all duration-500 overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Jesus Envoys Church Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl uppercase tracking-tighter leading-none">
                  Jesus Envoys <span className="text-primary font-black">Church</span>
                </span>
              </div>
            </Link>
            <p className="text-white/40 mb-10 leading-relaxed text-lg max-w-md font-medium">
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
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:-translate-y-1 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon size={20} className="group-hover:scale-110 transition-transform text-white/70 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary/80 mb-10">Navigation</h3>
            <ul className="space-y-5">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Sermons', path: '/sermons' },
                { name: 'Events', path: '/events' },
                { name: 'Give Online', path: '/give' }
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-white/50 hover:text-white transition-all flex items-center gap-3 group font-bold text-sm uppercase tracking-wider">
                    <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-150 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary/80 mb-10">Get In Touch</h3>
            <ul className="space-y-8">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                  <MapPin className="text-primary/70" size={18} />
                </div>
                <span className="text-white/40 leading-relaxed pt-0.5 font-medium text-sm">
                  Jesus Envoy's Church<br />Beside GGSS Kuje, Abuja
                </span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                  <Phone className="text-primary/70" size={18} />
                </div>
                <span className="text-white/40 font-medium text-sm">(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                  <Mail className="text-primary/70" size={18} />
                </div>
                <span className="text-white/40 font-medium text-sm">contact@church.org</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary/80 mb-10">Weekly Devotional</h3>
            <p className="text-white/40 mb-8 text-sm leading-relaxed font-medium max-w-sm">
              Stay connected with our community. Receive inspiration and updates directly in your inbox.
            </p>
            <div className="flex flex-col gap-3">
              <Input
                type="email"
                placeholder="Email Address"
                className="bg-white/5 border-white/10 rounded-xl h-14 focus:ring-primary/20 placeholder:text-white/20 text-white w-full"
              />
              <Button className="h-14 px-8 rounded-xl font-black uppercase tracking-widest gap-2 shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all w-full">
                Subscribe <ArrowRight size={18} />
              </Button>
            </div>
          </div>

        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
          <p>&copy; {new Date().getFullYear()} Jesus Envoys Church. Built for the Kingdom.</p>
          <div className="flex gap-10">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
