import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

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
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">We'd love to hear from you. Whether you have a question, a prayer request, or want to get involved.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold font-heading mb-6">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Our Location</h3>
                    <p className="text-muted-foreground">123 Faith Avenue<br />Cityville, ST 12345</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone Number</h3>
                    <p className="text-muted-foreground">(555) 123-4567<br />(Mon-Fri, 9am - 5pm)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email Address</h3>
                    <p className="text-muted-foreground">hello@jesusenvoys.org<br />prayer@jesusenvoys.org</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2">
                <Clock className="text-primary" /> Service Times
              </h2>
              <ul className="space-y-4">
                <li className="flex justify-between items-center border-b border-border pb-4">
                  <span className="font-medium">Sunday First Service</span>
                  <span className="text-muted-foreground">9:00 AM</span>
                </li>
                <li className="flex justify-between items-center border-b border-border pb-4">
                  <span className="font-medium">Sunday Second Service</span>
                  <span className="text-muted-foreground">11:30 AM</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-medium">Wednesday Midweek</span>
                  <span className="text-muted-foreground">6:30 PM</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold font-heading mb-6">Send a Message</h2>
            {success && (
              <div className="bg-green-50 text-green-700 p-4 rounded-md mb-6 font-medium">
                Your message has been sent successfully. Thank you for reaching out!
              </div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <input type="text" required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <input type="text" required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <select value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-primary transition-colors text-foreground">
                  <option>General Inquiry</option>
                  <option>Prayer Request</option>
                  <option>Testimony</option>
                  <option>Join a Cell Group</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea required rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-background border border-border rounded-md px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="How can we help you?"></textarea>
              </div>
              
              <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
                {loading ? <Loader2 className="animate-spin" size={18} /> : 'Send Message'} 
                {!loading && <Send size={18} />}
              </button>
            </form>
          </div>

        </div>

        {/* Map Placeholder */}
        <div className="mt-16 bg-muted rounded-xl h-96 flex items-center justify-center border border-border overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://maps.wikimedia.org/osm-intl/13/4232/3039.png')] bg-cover bg-center opacity-50 grayscale"></div>
          <div className="relative z-10 bg-white dark:bg-black p-4 rounded-lg shadow-lg flex items-center gap-3">
             <MapPin className="text-primary" size={32} />
             <div>
               <p className="font-bold font-heading">Jesus Envoys Church</p>
               <p className="text-sm text-muted-foreground">Click to view on Google Maps</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
