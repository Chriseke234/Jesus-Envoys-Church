import { Heart, Users, BookOpen, Music, Globe, Cross } from 'lucide-react';

export default function Ministries() {
  const ministries = [
    {
      title: "Kids Ministry",
      icon: <Users className="w-8 h-8" />,
      desc: "Creating a fun, safe, and engaging environment where children learn about God's love and purpose for their lives."
    },
    {
      title: "Youth & Young Adults",
      icon: <Heart className="w-8 h-8" />,
      desc: "Empowering the next generation to stand firm in their faith and impact their world."
    },
    {
      title: "Worship Ministry",
      icon: <Music className="w-8 h-8" />,
      desc: "Leading the congregation in authentic, Spirit-filled worship through music and creative arts."
    },
    {
      title: "Discipleship Groups",
      icon: <BookOpen className="w-8 h-8" />,
      desc: "Small groups dedicated to Bible study, prayer, and building deep relationships."
    },
    {
      title: "Missions & Outreach",
      icon: <Globe className="w-8 h-8" />,
      desc: "Taking the Gospel beyond our walls to serve the local community and global missions."
    },
    {
      title: "Prayer Team",
      icon: <Cross className="w-8 h-8" />,
      desc: "Standing in the gap for our church, city, and nation through dedicated intercession."
    }
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Our Ministries</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Find your place to serve, grow, and connect with others.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministries.map((min, idx) => (
            <div key={idx} className="bg-card border border-border p-8 rounded-xl hover:border-primary/50 transition-colors group">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                {min.icon}
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4">{min.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{min.desc}</p>
              <button className="text-primary font-medium hover:underline">Learn More &rarr;</button>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-muted/30 rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-bold font-heading mb-4">Want to Volunteer?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">We believe everyone has unique gifts and talents. Join a team and start making a difference today!</p>
          <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-md font-medium transition-colors">
            Join a Team
          </button>
        </div>
      </div>
    </div>
  );
}
