import { motion } from 'framer-motion';
import { Heart, Shield, Zap, Gift, ArrowRight, CreditCard, Landmark, DollarSign } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const givingOptions = [
  {
    title: "General Fund",
    description: "Support our daily operations, staff, and core ministries.",
    icon: DollarSign,
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Missions",
    description: "Help us spread the Gospel locally and internationally through our outreach programs.",
    icon: Gift,
    color: "from-emerald-500 to-teal-500"
  },
  {
    title: "Building Project",
    description: "Invest in our future as we expand our facilities to serve the community better.",
    icon: Landmark,
    color: "from-amber-500 to-orange-500"
  }
];

const Give = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-screen bg-primary/5 -skew-x-12 translate-x-1/3 -z-10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-primary/5 rounded-full -translate-x-1/2 translate-y-1/2 -z-10 blur-3xl" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
              Generosity <br />
              <span className="text-primary italic">Changes</span> Lives
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg">
              Your faithful giving enables us to reach the lost, feed the hungry, and build a lasting legacy for the next generation.
            </p>
            <div className="flex flex-wrap gap-6">
               <div className="flex items-center gap-3 bg-card px-6 py-4 rounded-3xl border border-primary/10 shadow-lg">
                  <Shield className="text-primary" />
                  <span className="font-bold text-sm uppercase tracking-widest">Secure Giving</span>
               </div>
               <div className="flex items-center gap-3 bg-card px-6 py-4 rounded-3xl border border-primary/10 shadow-lg">
                  <Zap className="text-primary" />
                  <span className="font-bold text-sm uppercase tracking-widest">Instant Impact</span>
               </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
             <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-[4rem] -z-10" />
             <Card className="rounded-[3rem] border-primary/10 overflow-hidden shadow-2xl">
                <CardContent className="p-10 md:p-16">
                   <div className="space-y-8">
                      <div className="flex flex-col gap-2">
                         <label className="font-black uppercase tracking-widest text-xs text-primary">Select Amount</label>
                         <div className="grid grid-cols-3 gap-4">
                            {['$25', '$50', '$100', '$250', '$500', 'Custom'].map((amount) => (
                               <button 
                                  key={amount}
                                  className="py-4 rounded-2xl border-2 border-primary/5 hover:border-primary hover:bg-primary/5 font-black transition-all active:scale-95"
                               >
                                  {amount}
                               </button>
                            ))}
                         </div>
                      </div>

                      <div className="flex flex-col gap-2">
                         <label className="font-black uppercase tracking-widest text-xs text-primary">Giving Type</label>
                         <select className="w-full bg-primary/5 border-none rounded-2xl p-4 font-bold focus:ring-2 ring-primary/20 outline-none appearance-none">
                            <option>General Fund</option>
                            <option>Missions</option>
                            <option>Building Fund</option>
                         </select>
                      </div>

                      <Button className="w-full py-8 rounded-[2rem] font-black uppercase tracking-[0.2em] text-lg shadow-2xl shadow-primary/30 gap-3 group">
                         <CreditCard /> Give Now <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                      </Button>

                      <p className="text-center text-xs text-muted-foreground font-medium">
                         Payments are securely processed via Stripe. <br />
                         Jesus Envoys Church is a registered 501(c)(3) non-profit.
                      </p>
                   </div>
                </CardContent>
             </Card>
          </motion.div>
        </div>

        {/* Impact Areas */}
        <div className="space-y-16">
           <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Where Your <span className="text-primary">Seed</span> Goes</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto font-medium">Every contribution, no matter the size, fuels a movement of hope and restoration.</p>
           </div>

           <div className="grid md:grid-cols-3 gap-8">
              {givingOptions.map((option, i) => (
                 <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                 >
                    <Card className="h-full rounded-[2.5rem] border-primary/5 hover:border-primary/20 transition-all group hover:-translate-y-2">
                       <CardContent className="p-10 space-y-6">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                             <option.icon size={32} />
                          </div>
                          <h3 className="text-2xl font-black uppercase tracking-tight">{option.title}</h3>
                          <p className="text-muted-foreground leading-relaxed font-medium">
                             {option.description}
                          </p>
                       </CardContent>
                    </Card>
                 </motion.div>
              ))}
           </div>
        </div>

        {/* FAQ Section */}
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="mt-40 max-w-4xl mx-auto bg-card rounded-[4rem] border border-primary/10 p-12 md:p-20 shadow-xl"
        >
           <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                 <Heart className="text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Giving <span className="text-primary italic">FAQ</span></h2>
           </div>

           <div className="grid gap-10">
              {[
                 { q: "Is my donation tax-deductible?", a: "Yes, all donations are tax-deductible. You will receive an annual contribution statement for your records." },
                 { q: "Can I set up recurring giving?", a: "Absolutely. When you click 'Give Now', you'll have the option to make your gift a one-time or recurring contribution." },
                 { q: "How can I give by check?", a: "Please make checks payable to 'Jesus Envoys Church' and mail to 123 Faith Avenue, Cityville, ST 12345." }
              ].map((faq, i) => (
                 <div key={i} className="space-y-3">
                    <h4 className="text-lg font-black uppercase tracking-tight text-primary">{faq.q}</h4>
                    <p className="text-muted-foreground leading-relaxed font-medium">{faq.a}</p>
                 </div>
              ))}
           </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Give;
