import { useState, useEffect } from 'react';
import { Play, Calendar, Video, Headphones, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold font-heading mb-4">Latest Sermons</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">Catch up on recent messages and teachings. Filter by series or topic.</p>
          </div>
          <div className="flex gap-4">
            <select className="bg-card border border-border text-foreground px-4 py-2 rounded-md focus:outline-none focus:border-primary">
              <option>All Series</option>
              <option>Unshakable</option>
              <option>Foundations</option>
            </select>
            <select className="bg-card border border-border text-foreground px-4 py-2 rounded-md focus:outline-none focus:border-primary">
              <option>Recent</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>

        {/* Featured Sermon */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm mb-12 flex flex-col md:flex-row group cursor-pointer hover:shadow-lg transition-all">
          <div className="md:w-1/2 relative bg-gray-200">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
            <img src="https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?q=80&w=1000&auto=format&fit=crop" alt="Featured Sermon" className="w-full h-full object-cover min-h-[300px]" />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <Play className="ml-1" size={32} />
              </div>
            </div>
          </div>
          <div className="p-8 md:w-1/2 flex flex-col justify-center">
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4">
              Featured
            </div>
            <h2 className="text-3xl font-bold font-heading mb-3 group-hover:text-primary transition-colors">The Spirit of the Envoy</h2>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1"><Calendar size={14} /> This Sunday</span>
              <span className="flex items-center gap-1"><Video size={14} /> Video</span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Discover what it truly means to be an envoy for Christ in today's world. A powerful message on identity, purpose, and mission.
            </p>
            <button className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all">
              Watch Now <Play size={16} />
            </button>
          </div>
        </div>

        {/* Sermons Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sermons.map(sermon => (
              <div key={sermon.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow group cursor-pointer">
                <div className="h-48 relative bg-gray-200 overflow-hidden">
                  <img src={sermon.thumbnail_url || `https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=500&auto=format&fit=crop&sig=${sermon.id}`} alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="text-white" size={40} />
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs font-semibold text-primary mb-2 tracking-wider uppercase">{sermon.series || 'Special Message'}</div>
                  <h3 className="text-xl font-bold font-heading mb-2 group-hover:text-primary transition-colors">{sermon.title}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(sermon.date).toLocaleDateString()}</span>
                    {sermon.video_url ? <Video size={16} /> : <Headphones size={16} />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <button className="px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white rounded-md font-medium transition-colors">
            Load More Sermons
          </button>
        </div>
      </div>
    </div>
  );
}
