import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-primary/10 py-20 text-center px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold font-heading text-primary mb-6"
          >
            Our Story & Vision
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            Founded on the unwavering truth of the Gospel, Jesus Envoys Church exists to see lives transformed, families restored, and communities impacted by the love of Christ.
          </motion.p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Our Core Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">The principles that guide everything we do as a church family.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Word-Centered", desc: "We believe the Bible is the ultimate authority for our lives and the foundation of our faith." },
              { title: "Spirit-Led", desc: "We rely on the Holy Spirit's guidance, power, and presence in our daily lives and worship." },
              { title: "Authentic Community", desc: "We are committed to building deep, meaningful relationships where everyone is known and loved." },
              { title: "Passionate Worship", desc: "We desire to encounter God through heartfelt, Spirit-filled worship." },
              { title: "Global Mission", desc: "We are called to be envoys of Christ, sharing His love locally and globally." },
              { title: "Excellence", desc: "We strive to honor God by giving our best in everything we do." }
            ].map((val, idx) => (
              <div key={idx} className="bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-xl mb-6">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold font-heading mb-3">{val.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Meet Our Leadership</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Dedicated to serving you and guiding our church family.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { name: "Pastor John Doe", role: "Lead Pastor", img: "https://i.pravatar.cc/300?img=11" },
              { name: "Pastor Jane Smith", role: "Worship Pastor", img: "https://i.pravatar.cc/300?img=5" },
              { name: "Michael Johnson", role: "Youth Pastor", img: "https://i.pravatar.cc/300?img=8" },
            ].map((leader, i) => (
              <div key={i} className="text-center">
                <div className="relative mb-6 mx-auto w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img src={leader.img} alt={leader.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold font-heading mb-1">{leader.name}</h3>
                <p className="text-primary font-medium">{leader.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
