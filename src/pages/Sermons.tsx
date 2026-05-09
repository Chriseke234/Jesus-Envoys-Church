import { useState, useEffect } from 'react';
import { Play, Calendar, Video, Headphones, Loader2, Search, Filter, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function Sermons() {
  const [sermons, setSermons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSermons() {
      try {
        const { data, error } = await supabase
          .from('sermons')
          .select('*')
          .order('date', { ascending: false });
        
        if (data && !error) {
          setSermons(data);
        }
      } catch (err) {
        console.error("Error fetching sermons:", err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchSermons();
  }, []);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
              <Video size={14} /> Media Archive
            </div>
            <h1 className="text-4xl md:text-6xl font-black font-heading mb-6 tracking-tight uppercase">Latest <span className="text-primary italic">Sermons</span></h1>
            <p className="text-muted-foreground text-lg md:text-xl font-light">Catch up on recent messages and teachings. Find inspiration for your spiritual journey.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
             <div className="relative group flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                <Input placeholder="Search messages..." className="pl-10 rounded-2xl bg-muted/50 border-primary/10" />
             </div>
             <Button variant="outline" className="rounded-2xl gap-2 px-6">
                <Filter size={18} /> Filter
             </Button>
          </div>
        </motion.div>

        {/* Featured Sermon */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-card border-primary/10 rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/5 mb-24 group cursor-pointer hover:border-primary/30 transition-all duration-700">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-3/5 relative overflow-hidden h-[400px] lg:h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=1200&auto=format&fit=crop" 
                  alt="Featured Sermon" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center justify-center">
                  <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500 ring-8 ring-primary/20">
                    <Play className="ml-1" size={40} fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="p-10 lg:p-16 lg:w-2/5 flex flex-col justify-center bg-muted/20 backdrop-blur-md">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-white text-[10px] font-black uppercase rounded-lg mb-6 tracking-widest w-fit">
                  Latest Message
                </div>
                <h2 className="text-4xl md:text-5xl font-black font-heading mb-6 group-hover:text-primary transition-colors leading-tight uppercase tracking-tighter">The Spirit of the Envoy</h2>
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8 font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-2"><Calendar size={16} className="text-primary" /> May 12, 2026</span>
                  <span className="flex items-center gap-2"><Video size={16} className="text-primary" /> Video Available</span>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed mb-10 font-light italic">
                  "Discover what it truly means to be an envoy for Christ in today's complex world. A powerful message on identity, purpose, and mission."
                </p>
                <Button className="w-full py-8 text-xl font-black rounded-2xl gap-3 shadow-xl shadow-primary/20 group/btn">
                  WATCH FULL MESSAGE <ChevronRight size={24} className="group-hover/btn:translate-x-2 transition-transform" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Sermons Grid */}
        <div className="mb-12 flex items-center justify-between">
           <h3 className="text-2xl font-black uppercase tracking-tight font-heading">Recent Messages</h3>
           <div className="h-px flex-grow mx-8 bg-border" />
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-32 space-y-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-muted-foreground font-medium">Archiving grace...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence>
              {sermons.map((sermon, idx) => (
                <motion.div 
                  key={sermon.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="h-full border-primary/5 bg-card/50 backdrop-blur-sm rounded-[2.5rem] overflow-hidden group cursor-pointer hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500">
                    <div className="h-56 relative overflow-hidden">
                      <img 
                        src={sermon.thumbnail_url || `https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=800&auto=format&fit=crop`} 
                        alt="Thumbnail" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white ring-4 ring-white/10">
                          <Play fill="currentColor" size={24} />
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-bold">
                        42:15
                      </div>
                    </div>
                    <CardContent className="p-8">
                      <div className="text-[10px] font-black text-primary mb-3 tracking-[0.2em] uppercase">{sermon.series || 'Global Impact'}</div>
                      <h3 className="text-2xl font-black font-heading mb-4 group-hover:text-primary transition-colors line-clamp-1 uppercase tracking-tight">{sermon.title}</h3>
                      <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        <span className="flex items-center gap-2"><Calendar size={14} className="text-primary" /> {new Date(sermon.date).toLocaleDateString()}</span>
                        <div className="flex items-center gap-3">
                           {sermon.video_url && <Video size={16} className="hover:text-primary transition-colors" />}
                           <Headphones size={16} className="hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
        
        <div className="text-center mt-20">
          <Button variant="outline" size="lg" className="px-12 py-8 text-xl font-black rounded-2xl border-primary/20 hover:border-primary hover:bg-primary/5 transition-all">
            LOAD MORE SERMONS
          </Button>
        </div>
      </div>
    </div>
  );
}
