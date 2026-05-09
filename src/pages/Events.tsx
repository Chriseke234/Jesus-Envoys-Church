import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, ArrowRight, Loader2, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('date', { ascending: true })
          .gte('date', new Date().toISOString().split('T')[0]); // Only upcoming
        
        if (data && !error) {
          setEvents(data);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchEvents();
  }, []);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            <Calendar size={14} /> Mark Your Calendar
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">Upcoming Events</h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Get involved, grow in your faith, and connect with our church family.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
           <div className="relative w-full md:w-96 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
              <Input 
                placeholder="Search for events..." 
                className="pl-10 bg-muted/50 border-primary/10 focus:border-primary rounded-full"
              />
           </div>
           <Button variant="outline" className="rounded-full gap-2 px-6">
              <Filter size={18} /> Filter by Category
           </Button>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-32 space-y-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-muted-foreground font-medium animate-pulse">Loading amazing things...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            <AnimatePresence>
              {events.map((event, idx) => (
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border-primary/10 overflow-hidden flex flex-col group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-[2rem] bg-card/50 backdrop-blur-sm">
                    <div className="h-56 overflow-hidden relative">
                      <img 
                        src={event.image_url || `https://images.unsplash.com/photo-1470229722913-7c092bb58269?q=80&w=800&auto=format&fit=crop`} 
                        alt={event.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/90 backdrop-blur-md px-4 py-2 rounded-2xl flex flex-col items-center justify-center shadow-xl">
                         <span className="text-xs font-black uppercase text-primary leading-none">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                         <span className="text-xl font-black leading-none">{new Date(event.date).getDate()}</span>
                      </div>
                    </div>
                    <CardContent className="p-8 flex flex-col flex-grow">
                      <h3 className="text-2xl font-bold font-heading mb-4 group-hover:text-primary transition-colors line-clamp-1">{event.title}</h3>
                      <div className="space-y-3 mb-6 text-sm text-muted-foreground font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                            <Clock size={16} />
                          </div>
                          <span>{event.time || 'TBD'}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                            <MapPin size={16} />
                          </div>
                          <span className="line-clamp-1">{event.location || 'TBD'}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-8 line-clamp-2 text-sm leading-relaxed">{event.description}</p>
                      <div className="mt-auto">
                        <Button className="w-full py-6 rounded-2xl font-bold gap-2 shadow-lg shadow-primary/10 group/btn">
                          Register Now <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
            {events.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-20 bg-muted/20 rounded-[3rem] border border-dashed border-border"
              >
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 text-muted-foreground">
                  <Calendar size={40} />
                </div>
                <h3 className="text-xl font-bold mb-2">No Upcoming Events</h3>
                <p className="text-muted-foreground">Please check back later or subscribe to our newsletter for updates.</p>
              </motion.div>
            )}
          </div>
        )}

        {/* Subscribe Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-primary p-10 md:p-20 rounded-[3rem] text-center shadow-2xl shadow-primary/30 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3 blur-[100px]" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white font-heading mb-6 tracking-tighter uppercase">Never Miss an Event</h2>
            <p className="text-white/80 mb-10 max-w-xl mx-auto text-lg md:text-xl font-light">Subscribe to our monthly newsletter to stay updated on everything happening in our community.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow bg-white dark:bg-black/40 border-transparent py-7 rounded-2xl text-foreground"
              />
              <Button size="lg" variant="secondary" className="px-10 py-7 font-black text-lg rounded-2xl shadow-xl">
                Subscribe
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
