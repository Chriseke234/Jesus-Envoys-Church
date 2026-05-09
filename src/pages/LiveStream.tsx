import { useState, useEffect } from 'react';
import { Calendar, Clock, Bell } from 'lucide-react';

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
      <div className="container mx-auto px-4 max-w-5xl w-full">
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold font-heading">Sunday Service</h1>
              {isLive && (
                <span className="flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                  <div className="w-2 h-2 bg-white rounded-full"></div> LIVE
                </span>
              )}
            </div>
            <p className="text-muted-foreground">Join us in worship and hear the Word of God.</p>
          </div>
          
          {!isLive && (
            <button className="flex items-center gap-2 bg-secondary/10 text-secondary-foreground hover:bg-secondary/20 px-4 py-2 rounded-md transition-colors font-medium">
              <Bell size={18} /> Remind Me
            </button>
          )}
        </div>

        {/* Video Player Area */}
        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative flex items-center justify-center border border-border">
          {isLive ? (
            // Placeholder for actual embed iframe
            <div className="w-full h-full flex flex-col items-center justify-center text-white">
              <p className="text-xl mb-4 font-heading text-gray-400">YouTube Embed Placeholder</p>
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="text-center text-white relative z-10 p-6 glass rounded-xl mx-4">
              <h2 className="text-2xl font-heading mb-6">Our Next Live Stream Begins In:</h2>
              <div className="flex justify-center gap-4 md:gap-8">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-white/10 rounded-lg flex items-center justify-center text-3xl md:text-5xl font-bold font-heading mb-2">
                      {item.value.toString().padStart(2, '0')}
                    </div>
                    <span className="text-sm uppercase tracking-wider text-gray-300">{item.label}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-gray-300 max-w-md mx-auto">
                While you wait, feel free to browse our <a href="/sermons" className="text-primary hover:underline">past sermons</a> or learn more about our <a href="/ministries" className="text-primary hover:underline">ministries</a>.
              </p>
              
              {/* For Demo Purposes */}
              <button 
                onClick={() => setIsLive(true)}
                className="mt-6 text-xs text-gray-500 hover:text-white underline"
              >
                (Demo: Force Live)
              </button>
            </div>
          )}
          
          {!isLive && (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 z-0"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?q=80&w=1000&auto=format&fit=crop)' }}
            />
          )}
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-card border border-border p-6 rounded-xl">
            <h3 className="text-xl font-bold font-heading mb-4">Sermon Notes</h3>
            <p className="text-muted-foreground mb-4">Sermon notes will be available here once the stream begins. You can follow along with the scriptures and take your own notes.</p>
            <div className="h-48 bg-muted rounded flex items-center justify-center border border-dashed border-border text-muted-foreground">
              Notes are currently unavailable
            </div>
          </div>
          <div className="bg-card border border-border p-6 rounded-xl">
            <h3 className="text-xl font-bold font-heading mb-4">Live Chat</h3>
            <p className="text-sm text-muted-foreground mb-4">Join the conversation with other viewers.</p>
            <div className="h-48 bg-muted rounded mb-4 overflow-y-auto p-4 space-y-3">
              <div className="text-sm"><span className="font-bold">Moderator:</span> Welcome to Jesus Envoys Church online service!</div>
              <div className="text-sm"><span className="font-bold">Sarah:</span> Good morning everyone!</div>
            </div>
            <input type="text" placeholder="Say hello..." className="w-full bg-background border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-primary" disabled={!isLive} />
          </div>
        </div>
      </div>
    </div>
  );
}
