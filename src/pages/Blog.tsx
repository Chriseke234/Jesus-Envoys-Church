import { Calendar, User, Tag, ArrowRight, Search, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "Finding Peace in the Midst of the Storm",
      excerpt: "When life throws unexpected challenges our way, where do we turn for comfort and stability? Discover biblical principles for finding true peace.",
      category: "Faith",
      author: "Pastor Promise Eke",
      date: "Oct 24, 2023",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "The Importance of Authentic Community",
      excerpt: "We were never meant to do life alone. Explore why being part of a local church community is essential for your spiritual growth.",
      category: "Community",
      author: "Jane Smith",
      date: "Oct 18, 2023",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "How to Pray Effectively",
      excerpt: "Prayer is our direct line to God, yet many struggle with it. Learn practical steps to revitalize your prayer life and connect with God deeply.",
      category: "Spiritual Growth",
      author: "David Johnson",
      date: "Oct 10, 2023",
      image: "https://images.unsplash.com/photo-1544604862-23c3b018b321?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            <TrendingUp size={14} /> Devotionals & Insights
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">Our Blog</h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Encouragement, biblical teaching, and stories of God's grace to fuel your faith journey.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {["All", "Faith", "Community", "Spiritual Growth", "Family"].map((cat, idx) => (
              <Button 
                key={idx}
                variant={idx === 0 ? "default" : "secondary"}
                size="sm"
                className="rounded-full px-6"
              >
                {cat}
              </Button>
            ))}
          </div>
          
          <div className="relative w-full md:w-72 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
            <Input 
              placeholder="Search articles..." 
              className="pl-10 bg-muted/50 border-primary/10 focus:border-primary rounded-full"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full border-primary/10 overflow-hidden flex flex-col group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 border-b-4 hover:border-b-primary">
                <Link to={`/blog/${post.id}`} className="block h-56 overflow-hidden relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 left-4 bg-primary text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-lg shadow-primary/20">
                    <Tag size={12} /> {post.category}
                  </div>
                </Link>
                <CardContent className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground mb-4 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary" /> {post.date}</span>
                    <span className="w-1 h-1 bg-border rounded-full" />
                    <span className="flex items-center gap-1.5"><User size={14} className="text-primary" /> {post.author}</span>
                  </div>
                  <Link to={`/blog/${post.id}`}>
                    <h3 className="text-2xl font-bold font-heading mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight">{post.title}</h3>
                  </Link>
                  <p className="text-muted-foreground mb-8 line-clamp-3 text-sm leading-relaxed">{post.excerpt}</p>
                  <div className="mt-auto pt-6 border-t border-border">
                    <Link to={`/blog/${post.id}`} className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all text-sm uppercase tracking-widest">
                      Read Article <ArrowRight size={18} />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </div>
        
        {/* Newsletter Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 glass p-10 md:p-16 rounded-3xl text-center border border-white/20 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Never Miss a Message</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">Subscribe to our newsletter to receive weekly devotionals and updates directly in your inbox.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <Input 
                placeholder="Your email address" 
                className="flex-grow bg-white dark:bg-black/40 border-primary/10 py-6"
              />
              <Button size="lg" className="px-8 shadow-xl shadow-primary/20">Subscribe</Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
