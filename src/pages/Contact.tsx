import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('prayer_requests')
        .insert([
          { 
            first_name: formData.firstName, 
            last_name: formData.lastName,
            email: formData.email,
            subject: formData.subject,
            message: formData.message
          }
        ]);
        
      if (error) throw error;
      setSuccess(true);
      setFormData({ firstName: '', lastName: '', email: '', subject: 'General Inquiry', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">Contact Us</h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            We'd love to hear from you. Whether you have a question, a prayer request, or want to get involved, we are here for you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-primary/10 shadow-xl overflow-hidden group">
              <div className="h-2 bg-primary w-full" />
              <CardHeader>
                <CardTitle className="text-2xl font-bold font-heading">Get In Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8 pt-4">
                <div className="flex items-start gap-4 group/item">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0 group-hover/item:bg-primary group-hover/item:text-white transition-colors duration-300">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Our Location</h3>
                    <p className="text-muted-foreground leading-relaxed">123 Faith Avenue<br />Cityville, ST 12345</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group/item">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0 group-hover/item:bg-primary group-hover/item:text-white transition-colors duration-300">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone Number</h3>
                    <p className="text-muted-foreground leading-relaxed">(555) 123-4567<br />(Mon-Fri, 9am - 5pm)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group/item">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0 group-hover/item:bg-primary group-hover/item:text-white transition-colors duration-300">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email Address</h3>
                    <p className="text-muted-foreground leading-relaxed">hello@jesusenvoys.org<br />prayer@jesusenvoys.org</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold font-heading flex items-center gap-2">
                  <Clock className="text-primary" /> Service Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {[
                    { label: "Sunday First Service", time: "9:00 AM" },
                    { label: "Sunday Second Service", time: "11:30 AM" },
                    { label: "Wednesday Midweek", time: "6:30 PM" }
                  ].map((service, i) => (
                    <li key={i} className="flex justify-between items-center border-b border-border last:border-0 pb-4 last:pb-0">
                      <span className="font-medium">{service.label}</span>
                      <span className="text-primary font-bold">{service.time}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-3 border-primary/10 shadow-2xl overflow-hidden">
            <div className="h-2 bg-primary w-full" />
            <CardHeader>
              <CardTitle className="text-2xl font-bold font-heading">Send a Message</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {success && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-4 rounded-xl mb-8 font-medium border border-green-200 dark:border-green-800"
                >
                  Your message has been sent successfully. Thank you for reaching out!
                </motion.div>
              )}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold tracking-tight">First Name</label>
                    <Input 
                      required 
                      value={formData.firstName} 
                      onChange={e => setFormData({...formData, firstName: e.target.value})} 
                      placeholder="e.g. John" 
                      className="bg-muted/30 border-primary/10 focus:border-primary py-6"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold tracking-tight">Last Name</label>
                    <Input 
                      required 
                      value={formData.lastName} 
                      onChange={e => setFormData({...formData, lastName: e.target.value})} 
                      placeholder="e.g. Doe" 
                      className="bg-muted/30 border-primary/10 focus:border-primary py-6"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold tracking-tight">Email Address</label>
                  <Input 
                    type="email" 
                    required 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                    placeholder="e.g. john@example.com" 
                    className="bg-muted/30 border-primary/10 focus:border-primary py-6"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold tracking-tight">Subject</label>
                  <select 
                    value={formData.subject} 
                    onChange={e => setFormData({...formData, subject: e.target.value})} 
                    className="w-full bg-muted/30 border border-primary/10 rounded-md px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground h-12"
                  >
                    <option>General Inquiry</option>
                    <option>Prayer Request</option>
                    <option>Testimony</option>
                    <option>Join a Cell Group</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold tracking-tight">Message</label>
                  <textarea 
                    required 
                    rows={5} 
                    value={formData.message} 
                    onChange={e => setFormData({...formData, message: e.target.value})} 
                    className="w-full bg-muted/30 border border-primary/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm" 
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full py-7 text-lg font-bold gap-3 shadow-xl shadow-primary/20"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : 'Send Message'} 
                  {!loading && <Send size={20} />}
                </Button>
              </form>
            </CardContent>
          </Card>

        </div>

        {/* Map Placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-muted rounded-2xl h-96 flex items-center justify-center border border-primary/10 overflow-hidden relative shadow-2xl group"
        >
          <div className="absolute inset-0 bg-[url('https://maps.wikimedia.org/osm-intl/13/4232/3039.png')] bg-cover bg-center opacity-60 grayscale group-hover:scale-110 transition-transform duration-700"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="relative z-10 bg-white dark:bg-black p-6 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/20 backdrop-blur-xl">
             <div className="bg-primary/10 p-3 rounded-full text-primary">
               <MapPin size={32} />
             </div>
             <div>
               <p className="font-bold font-heading text-xl">Jesus Envoys Church</p>
               <p className="text-sm text-muted-foreground">123 Faith Avenue, Cityville</p>
               <Button variant="link" className="px-0 h-auto text-primary text-xs font-bold mt-1">Get Directions</Button>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
