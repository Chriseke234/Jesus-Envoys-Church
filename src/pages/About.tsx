import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Shield, Users, Heart, Zap, Globe, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-background">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-full blur-[120px] -z-10" />
        <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.2em] mb-8"
          >
            Since 2010 • Our Journey
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black font-heading mb-8 tracking-tight"
          >
            Our Story & <span className="text-primary italic">Vision</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-light"
          >
            Founded on the unwavering truth of the Gospel, Jesus Envoys Church exists to see lives transformed, families restored, and communities impacted by the love of Christ.
          </motion.p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">Our Core Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">The principles that guide everything we do as a church family.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Word-Centered", desc: "We believe the Bible is the ultimate authority for our lives and the foundation of our faith." },
              { icon: Zap, title: "Spirit-Led", desc: "We rely on the Holy Spirit's guidance, power, and presence in our daily lives and worship." },
              { icon: Users, title: "Authentic Community", desc: "We are committed to building deep, meaningful relationships where everyone is known and loved." },
              { icon: Heart, title: "Passionate Worship", desc: "We desire to encounter God through heartfelt, Spirit-filled worship." },
              { icon: Globe, title: "Global Mission", desc: "We are called to be envoys of Christ, sharing His love locally and globally." },
              { icon: Sparkles, title: "Excellence", desc: "We strive to honor God by giving our best in everything we do." }
            ].map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full border-primary/10 hover:border-primary/30 transition-all duration-500 shadow-xl hover:shadow-primary/5 group bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden">
                  <div className="h-1.5 w-full bg-primary/20 group-hover:bg-primary transition-colors" />
                  <CardHeader className="pt-8 px-8">
                    <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <val.icon size={28} />
                    </div>
                    <CardTitle className="text-2xl font-bold font-heading">{val.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 pb-8">
                    <p className="text-muted-foreground leading-relaxed text-sm">{val.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-32 bg-background relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">Meet Our Leadership</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Dedicated to serving you and guiding our church family with wisdom and passion.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            {[
              { name: "Pastor Promise Eke", role: "Lead Pastor", img: "https://i.pravatar.cc/400?img=12", bio: "A visionary leader with a heart for global transformation." },
              { name: "Pastor Grace Eke", role: "Worship Pastor", img: "https://i.pravatar.cc/400?img=5", bio: "Leading our community into deeper encounters through worship." },
              { name: "Michael Johnson", role: "Youth Pastor", img: "https://i.pravatar.cc/400?img=8", bio: "Empowering the next generation to lead with faith and courage." },
            ].map((leader, i) => (
              <motion.div 
                key={i} 
                className="group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="relative mb-8 mx-auto w-64 h-64 rounded-[3rem] overflow-hidden shadow-2xl group-hover:-translate-y-4 transition-transform duration-500">
                  <img src={leader.img} alt={leader.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-center">
                   <h3 className="text-2xl font-black font-heading mb-2 uppercase tracking-tighter">{leader.name}</h3>
                   <p className="text-primary font-bold uppercase tracking-widest text-xs mb-4">{leader.role}</p>
                   <p className="text-muted-foreground text-sm max-w-[250px] mx-auto italic">"{leader.bio}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-5xl">
           <Card className="bg-primary p-12 md:p-20 text-center rounded-[3rem] shadow-2xl shadow-primary/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
              <div className="relative z-10">
                 <h2 className="text-4xl md:text-5xl font-black text-white font-heading mb-8 uppercase tracking-tighter">Ready to join our community?</h2>
                 <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto font-light">We can't wait to meet you and hear your story. Plan your visit today.</p>
                 <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Button size="lg" variant="secondary" className="px-12 py-8 text-lg font-bold rounded-2xl shadow-xl">
                       Get Directions
                    </Button>
                    <Button size="lg" variant="outline" className="px-12 py-8 text-lg font-bold rounded-2xl border-white/20 text-white hover:bg-white hover:text-primary">
                       Contact Us
                    </Button>
                 </div>
              </div>
           </Card>
        </div>
      </section>
    </div>
  );
}
