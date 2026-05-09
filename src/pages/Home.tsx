import { motion } from 'framer-motion';
import { ArrowRight, Play, Calendar, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?q=80&w=2000&auto=format&fit=crop)' }}
        />
        <div className="absolute inset-0 z-10 bg-black/60 dark:bg-black/80" />
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 md:px-6 relative z-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-white mb-6"
          >
            Empowered to <span className="text-primary">Transform</span><br/> Your World
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto"
          >
            Join a vibrant community of believers passionate about encountering God, growing in faith, and making a difference.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/about" className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-md font-medium transition-all shadow-lg hover:shadow-primary/50 w-full sm:w-auto">
              Plan a Visit
            </Link>
            <Link to="/sermons" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-md font-medium transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
              <Play size={18} />
              Watch Latest Sermon
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-secondary text-secondary-foreground py-8 relative z-30 -mt-10 mx-4 md:mx-auto max-w-5xl rounded-xl shadow-xl flex flex-col md:flex-row justify-around items-center gap-6 px-8">
        <div className="text-center md:text-left flex items-center gap-4">
          <Calendar className="w-10 h-10 text-primary" />
          <div>
            <h3 className="font-heading font-bold text-lg">Sunday Services</h3>
            <p className="text-sm opacity-90">9:00 AM & 11:30 AM</p>
          </div>
        </div>
        <div className="w-px h-12 bg-black/10 hidden md:block" />
        <div className="text-center md:text-left flex items-center gap-4">
          <Users className="w-10 h-10 text-primary" />
          <div>
            <h3 className="font-heading font-bold text-lg">Midweek Service</h3>
            <p className="text-sm opacity-90">Wednesdays at 6:30 PM</p>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl rounded-[2rem] z-0" />
              <img 
                src="https://images.unsplash.com/photo-1543616991-75a2c125ff5b?q=80&w=1000&auto=format&fit=crop" 
                alt="Worship service" 
                className="relative z-10 rounded-2xl shadow-2xl object-cover h-[500px] w-full"
              />
            </div>
            <div>
              <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                Welcome Home
              </div>
              <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">A Place to Belong,<br/> A Place to Grow</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                At Jesus Envoys Church, we believe that everyone has a unique purpose. Whether you're exploring faith for the first time or looking for a church community to call home, there's a place for you here.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Passionate Worship & Authentic Community",
                  "Bible-based, practical teachings",
                  "Programs for children and youth of all ages"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                    <Heart className="text-primary w-5 h-5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/about" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                Read Our Story <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Add placeholders for Latest Sermons, Events, etc. */}
      
    </div>
  );
}
