import { Heart, Users, BookOpen, Music, Globe, Cross, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function Ministries() {
  const ministries = [
    {
      title: "Kids Ministry",
      icon: Users,
      desc: "Creating a fun, safe, and engaging environment where children learn about God's love and purpose for their lives.",
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      title: "Youth & Young Adults",
      icon: Heart,
      desc: "Empowering the next generation to stand firm in their faith and impact their world with boldness.",
      color: "from-crimson-500/20 to-crimson-600/20"
    },
    {
      title: "Worship Ministry",
      icon: Music,
      desc: "Leading the congregation in authentic, Spirit-filled worship through music and creative arts.",
      color: "from-amber-500/20 to-amber-600/20"
    },
    {
      title: "Discipleship Groups",
      icon: BookOpen,
      desc: "Small groups dedicated to Bible study, prayer, and building deep, life-long relationships.",
      color: "from-emerald-500/20 to-emerald-600/20"
    },
    {
      title: "Missions & Outreach",
      icon: Globe,
      desc: "Taking the Gospel beyond our walls to serve the local community and global missions.",
      color: "from-cyan-500/20 to-cyan-600/20"
    },
    {
      title: "Prayer Team",
      icon: Cross,
      desc: "Standing in the gap for our church, city, and nation through dedicated intercession and fasting.",
      color: "from-purple-500/20 to-purple-600/20"
    }
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.2em] mb-6">
            <Sparkles size={14} /> Our Community
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-heading mb-8 tracking-tighter uppercase">Our <span className="text-primary italic">Ministries</span></h1>
          <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
            Find your place to serve, grow, and connect with others in our diverse and vibrant community.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {ministries.map((min, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full border-primary/5 bg-card/40 backdrop-blur-md rounded-[2.5rem] p-4 group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden relative">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${min.color} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-[1.25rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <min.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-black font-heading mb-4 uppercase tracking-tight">{min.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-8 font-medium">
                    {min.desc}
                  </p>
                  <Button variant="ghost" className="p-0 h-auto font-black text-primary hover:bg-transparent hover:text-primary/70 group/link">
                    LEARN MORE <ArrowRight size={18} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Volunteer CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[4rem] overflow-hidden bg-primary p-12 md:p-24 text-center shadow-2xl shadow-primary/30"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white font-heading mb-8 uppercase tracking-tighter">Want to make an impact?</h2>
            <p className="text-white/80 text-xl md:text-2xl max-w-3xl mx-auto mb-12 font-light leading-relaxed">
              We believe everyone has unique gifts and talents. Join a team and start making a difference in the lives of others today!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
               <Button size="lg" variant="secondary" className="px-12 py-8 text-xl font-bold rounded-2xl shadow-2xl hover:scale-105 transition-transform">
                  Join a Team
               </Button>
               <Button size="lg" variant="outline" className="px-12 py-8 text-xl font-bold rounded-2xl border-white/20 text-white hover:bg-white hover:text-primary hover:scale-105 transition-transform">
                  Contact Us
               </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
