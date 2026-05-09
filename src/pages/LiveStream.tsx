import { useState, useEffect } from 'react';
import { Calendar, Clock, Bell, Share2, MessageSquare, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

export default function LiveStream() {
  const [isLive, setIsLive] = useState(false);
  
  // Dummy countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 30,
    seconds: 45
  });

  useEffect(() => {
    // Simple countdown logic for demonstration
    if (isLive) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        
        setIsLive(true);
        clearInterval(timer);
        return prev;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isLive]);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background flex flex-col items-center">
      <div className="container mx-auto px-4 max-w-6xl w-full">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold font-heading">Sunday Service</h1>
              <AnimatePresence>
                {isLive && (
                  <motion.span 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse"
                  >
                    <div className="w-2 h-2 bg-white rounded-full"></div> LIVE
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <p className="text-muted-foreground text-lg">Join our global community in worship and the Word.</p>
          </div>
          
          <div className="flex gap-3">
            {!isLive && (
              <Button variant="outline" className="gap-2">
                <Bell size={18} /> Remind Me
              </Button>
            )}
            <Button variant="secondary" className="gap-2">
              <Share2 size={18} /> Share
            </Button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Video Player Area */}
          <div className="lg:col-span-3 space-y-6">
            <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative flex items-center justify-center border border-primary/20 ring-1 ring-white/10">
              {isLive ? (
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              ) : (
                <div className="text-center text-white relative z-10 p-8 glass rounded-2xl mx-4 max-w-lg border border-white/20 shadow-2xl backdrop-blur-xl">
                  <h2 className="text-2xl md:text-3xl font-heading mb-8 font-bold text-primary">Next Live Stream</h2>
                  <div className="flex justify-center gap-4 md:gap-6">
                    {[
                      { label: "Days", value: timeLeft.days },
                      { label: "Hrs", value: timeLeft.hours },
                      { label: "Min", value: timeLeft.minutes },
                      { label: "Sec", value: timeLeft.seconds }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/20 border border-primary/30 rounded-xl flex items-center justify-center text-2xl md:text-3xl font-bold font-heading mb-2">
                          {item.value.toString().padStart(2, '0')}
                        </div>
                        <span className="text-[10px] md:text-xs uppercase tracking-widest text-primary font-bold">{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-8 text-gray-300 text-sm md:text-base">
                    While you wait, explore our <a href="/sermons" className="text-primary hover:underline font-semibold">sermon archive</a>.
                  </p>
                  
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsLive(true)}
                    className="mt-6 text-white/40 hover:text-white"
                  >
                    (Force Live Demo)
                  </Button>
                </div>
              )}
              
              {!isLive && (
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-40 grayscale-[0.5]"
                  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?q=80&w=1000&auto=format&fit=crop)' }}
                />
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-primary/10 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <BookOpen className="text-primary" size={20} /> Sermon Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">Follow along with today's message. Download the PDF for deeper study.</p>
                  <div className="h-32 bg-muted/50 rounded-xl flex items-center justify-center border border-dashed border-border text-muted-foreground group hover:bg-muted transition-colors cursor-pointer">
                    <span className="group-hover:text-primary transition-colors">Available when stream begins</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/10 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Calendar className="text-primary" size={20} /> Related Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-4 items-center">
                      <div className="bg-primary/10 p-2 rounded-lg text-primary">
                        <Clock size={16} />
                      </div>
                      <div>
                        <p className="font-bold text-sm">Prayer Vigil</p>
                        <p className="text-xs text-muted-foreground">This Friday, 9:00 PM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Chat Area */}
          <Card className="lg:col-span-1 h-[600px] flex flex-col border-primary/10 shadow-2xl overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-border py-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageSquare className="text-primary" size={18} /> Live Community
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-hide">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Moderator</span>
                <div className="bg-primary/10 p-3 rounded-2xl rounded-tl-none text-sm leading-relaxed">
                  Welcome to Jesus Envoys Church! Feel free to share your prayer requests.
                </div>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Sarah M.</span>
                <div className="bg-muted p-3 rounded-2xl rounded-tr-none text-sm leading-relaxed">
                  Watching from Lagos! God bless you all.
                </div>
              </div>
            </CardContent>
            <div className="p-4 border-t border-border bg-background">
              <div className="flex gap-2">
                <Input 
                  placeholder="Type a message..." 
                  disabled={!isLive}
                  className="flex-grow"
                />
                <Button size="icon" disabled={!isLive}>
                  <Share2 size={18} />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
