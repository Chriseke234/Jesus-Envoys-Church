import { Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "Finding Peace in the Midst of the Storm",
      excerpt: "When life throws unexpected challenges our way, where do we turn for comfort and stability? Discover biblical principles for finding true peace.",
      category: "Faith",
      author: "Pastor John Doe",
      date: "Oct 24, 2023",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "The Importance of Authentic Community",
      excerpt: "We were never meant to do life alone. Explore why being part of a local church community is essential for your spiritual growth.",
      category: "Community",
      author: "Jane Smith",
      date: "Oct 18, 2023",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "How to Pray Effectively",
      excerpt: "Prayer is our direct line to God, yet many struggle with it. Learn practical steps to revitalize your prayer life and connect with God deeply.",
      category: "Spiritual Growth",
      author: "David Johnson",
      date: "Oct 10, 2023",
      image: "https://images.unsplash.com/photo-1544604862-23c3b018b321?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Devotionals & Insights</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Encouragement, biblical teaching, and stories of God's grace to fuel your faith journey.</p>
        </div>

        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {["All", "Faith", "Community", "Spiritual Growth", "Family"].map((cat, idx) => (
            <button 
              key={idx}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${idx === 0 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <article key={post.id} className="bg-card border border-border rounded-xl overflow-hidden flex flex-col group hover:shadow-lg transition-shadow">
              <Link to={`/blog/${post.id}`} className="block h-48 overflow-hidden relative">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary flex items-center gap-1">
                  <Tag size={12} /> {post.category}
                </div>
              </Link>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                  <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                </div>
                <Link to={`/blog/${post.id}`}>
                  <h3 className="text-2xl font-bold font-heading mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                </Link>
                <p className="text-muted-foreground mb-6 line-clamp-3">{post.excerpt}</p>
                <div className="mt-auto">
                  <Link to={`/blog/${post.id}`} className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                    Read Article <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
