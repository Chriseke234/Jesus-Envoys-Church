import { motion } from 'framer-motion';
import { ArrowRight, Play, Calendar, Users, Heart, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

export default function Home() {
  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-24">
        {/* Background Image & Overlay with Parallax effect simulation */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000&auto=format&fit=crop)' }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/40 to-background" />
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 md:px-6 relative z-20 text-center">

          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-white mb-8 tracking-tighter"
          >
            Empowered to <span className="text-primary">Transform</span><br/> Your World
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Join a vibrant community of believers passionate about encountering God, growing in faith, and making a lasting global impact.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
          >
            <Button size="lg" asChild className="px-10 py-8 text-lg font-bold rounded-xl shadow-2xl shadow-primary/40 group">
              <Link to="/about" className="flex items-center gap-2">
                Plan a Visit <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="px-10 py-8 text-lg font-bold rounded-xl backdrop-blur-md bg-white/5 border-white/20 text-white hover:bg-white/10 transition-all gap-3">
              <Link to="/live">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-pulse">
                  <Play size={14} fill="white" className="ml-0.5" />
                </div>
                Watch Live
              </Link>
            </Button>
          </motion.div>

          {/* Quick Info Bar - Moved here */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-card/80 backdrop-blur-2xl border border-white/10 text-card-foreground py-10 rounded-3xl shadow-2xl flex flex-col md:flex-row justify-around items-center gap-8 px-12 max-w-5xl mx-auto mt-12"
          >
            <div className="text-center md:text-left flex items-center gap-5 group cursor-default">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Calendar size={28} />
              </div>
              <div>
                <h3 className="font-heading font-black text-xl uppercase tracking-tight">Sunday Services</h3>
                <p className="text-muted-foreground font-bold">9:00 AM & 11:30 AM</p>
              </div>
            </div>
            
            <div className="w-px h-16 bg-border hidden md:block" />
            
            <div className="text-center md:text-left flex items-center gap-5 group cursor-default">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Users size={28} />
              </div>
              <div>
                <h3 className="font-heading font-black text-xl uppercase tracking-tight">Midweek Service</h3>
                <p className="text-muted-foreground font-bold">Wednesdays at 6:30 PM</p>
              </div>
            </div>

            <div className="w-px h-16 bg-border hidden md:block" />

            <div className="text-center md:text-left flex items-center gap-5 group cursor-default">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Heart size={28} />
              </div>
              <div>
                <h3 className="font-heading font-black text-xl uppercase tracking-tight">Give Online</h3>
                <p className="text-muted-foreground font-bold">Support the mission</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-primary/5 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-secondary/5 rounded-full blur-[120px] -z-10" />
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-6 bg-gradient-to-br from-primary/30 to-secondary/30 blur-3xl rounded-[3rem] opacity-50" />
              <img 
                src="https://images.unsplash.com/photo-1543616991-75a2c125ff5b?q=80&w=1000&auto=format&fit=crop" 
                alt="Worship service" 
                className="relative z-10 rounded-[2.5rem] shadow-2xl object-cover h-[600px] w-full border-4 border-white/10"
              />
              <div className="absolute -bottom-10 -right-10 bg-white dark:bg-black p-8 rounded-3xl shadow-2xl z-20 hidden md:block border border-white/10 backdrop-blur-xl">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                      <Zap size={24} />
                    </div>
                    <div>
                      <p className="text-2xl font-black font-heading">10k+</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Lives Impacted</p>
                    </div>
                 </div>
                 <p className="text-sm font-medium text-muted-foreground max-w-[200px]">Spreading the message of hope across the globe.</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-widest mb-8">
                <Shield size={14} /> Our Mission
              </div>
              <h2 className="text-4xl md:text-6xl font-bold font-heading mb-8 leading-[1.1]">A Place to <span className="text-primary underline decoration-primary/30 underline-offset-8">Belong</span>, A Place to Grow</h2>
              <p className="text-muted-foreground text-xl mb-10 leading-relaxed font-light">
                At Jesus Envoys Church, we believe that everyone has a unique purpose. Whether you're exploring faith for the first time or looking for a church community to call home, there's a space prepared specifically for you.
              </p>
              <div className="space-y-6 mb-12">
                {[
                  { title: "Passionate Worship", desc: "Encountering the presence of God together." },
                  { title: "Authentic Community", desc: "Finding friends who feel like family." },
                  { title: "Practical Teaching", desc: "Bible-based wisdom for everyday life." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 hover:bg-muted/50 rounded-2xl transition-colors group">
                    <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0 mt-1 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Heart size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button size="lg" variant="link" asChild className="px-0 text-primary text-lg font-black group h-auto">
                <Link to="/about" className="flex items-center gap-3">
                  DISCOVER MORE <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Sections (Latest Blog/Sermon) */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-4">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                 <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">Latest Updates</h2>
                 <p className="text-muted-foreground text-lg">Stay connected with our latest messages and stories of faith.</p>
              </div>
              <Button variant="outline" asChild className="rounded-full px-8">
                 <Link to="/blog">View All Posts</Link>
              </Button>
           </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { id: 1, tag: "Faith", title: "Walking in Divine Purpose", desc: "Discover how to identify and walk in the specific calling God has for your life this season.", img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop" },
                { id: 2, tag: "Prayer", title: "The Power of Secret Prayer", desc: "Learning the art of intimacy with God in the secret place and seeing the public results of his grace.", img: "https://images.unsplash.com/photo-1515023115689-589c33041d3c?q=80&w=800&auto=format&fit=crop" },
                { id: 3, tag: "Growth", title: "Deepening Your Roots", desc: "Practical steps to ensure your spiritual foundation is strong enough to weather any storm life brings.", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop" }
              ].map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl group">
                    <div className="h-56 bg-gray-200 relative overflow-hidden">
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-primary/20">
                        {item.tag}
                      </div>
                    </div>
                    <CardContent className="p-8">
                      <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-3">Spiritual Insights</p>
                      <h3 className="text-xl font-bold font-heading mb-4 line-clamp-2 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed">{item.desc}</p>
                      <Button variant="link" className="p-0 text-primary font-bold h-auto hover:no-underline group/btn">
                        READ MORE <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
        </div>
      </section>
    </div>
  );
}
