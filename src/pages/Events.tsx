import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

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
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Upcoming Events</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Get involved, grow in your faith, and connect with our church family.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {events.map(event => (
              <div key={event.id} className="bg-card border border-border rounded-xl overflow-hidden flex flex-col group hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={event.image_url || `https://images.unsplash.com/photo-1470229722913-7c092bb58269?q=80&w=600&auto=format&fit=crop&sig=${event.id}`} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-3">
                    <Calendar size={16} />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-2xl font-bold font-heading mb-3">{event.title}</h3>
                  <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-400" />
                      <span>{event.time || 'TBD'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span>{event.location || 'TBD'}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6 line-clamp-2">{event.description}</p>
                  <div className="mt-auto">
                    <button className="w-full py-3 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-md font-semibold transition-colors flex items-center justify-center gap-2">
                      Register Now <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {events.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No upcoming events found. Please check back later.
              </div>
            )}
          </div>
        )}

        {/* Subscribe Section */}
        <div className="bg-primary text-white rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold font-heading mb-4">Never Miss an Event</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">Subscribe to our newsletter to receive weekly updates on church events, volunteer opportunities, and more.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-md text-foreground focus:outline-none"
            />
            <button className="px-6 py-3 bg-black text-white hover:bg-gray-800 rounded-md font-medium transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
