import { useState, useEffect } from 'react';
import { User, Lock, Mail, ArrowRight, Video, Play, Calendar as CalendarIcon, LogOut, Loader2, LayoutDashboard, Settings, Gift, Users, Bell, Search, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function MembersPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsLoggedIn(true);
        fetchProfile(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsLoggedIn(true);
        fetchProfile(session.user.id);
      } else {
        setIsLoggedIn(false);
        setUserProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (data && !error) {
      setUserProfile(data);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLoginView) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: { full_name: fullName }
          }
        });
        if (error) throw error;
        setError("Account created! You are now logged in.");
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (isLoggedIn) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-background flex">
        {/* Modern Sidebar */}
        <div className="hidden lg:flex w-72 flex-col border-r border-primary/5 bg-card/30 backdrop-blur-xl p-6 fixed h-screen">
           <div className="mb-12 flex items-center gap-3 px-2">
              <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-primary/20">JE</div>
              <span className="font-black text-lg tracking-tighter uppercase">Members</span>
           </div>
           
           <nav className="space-y-2 flex-grow">
              <Button variant="secondary" className="w-full justify-start gap-3 py-6 rounded-2xl font-bold bg-primary text-white hover:bg-primary/90">
                 <LayoutDashboard size={20} /> Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 py-6 rounded-2xl font-bold text-muted-foreground hover:bg-muted/50">
                 <Users size={20} /> My Community
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 py-6 rounded-2xl font-bold text-muted-foreground hover:bg-muted/50">
                 <Video size={20} /> Watch Later
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 py-6 rounded-2xl font-bold text-muted-foreground hover:bg-muted/50">
                 <Gift size={20} /> Giving History
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 py-6 rounded-2xl font-bold text-muted-foreground hover:bg-muted/50">
                 <Settings size={20} /> Settings
              </Button>
           </nav>

           <Button variant="ghost" onClick={handleSignOut} className="w-full justify-start gap-3 py-6 rounded-2xl font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors">
              <LogOut size={20} /> Sign Out
           </Button>
        </div>

        {/* Dashboard Content */}
        <div className="flex-grow lg:ml-72 p-6 lg:p-12">
          <div className="container mx-auto max-w-6xl">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
              <div>
                 <motion.h1 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-4xl md:text-5xl font-black font-heading mb-2 uppercase tracking-tighter"
                 >
                    Shalom, <span className="text-primary">{userProfile?.full_name?.split(' ')[0] || 'Envoy'}</span>
                 </motion.h1>
                 <p className="text-muted-foreground font-medium">Welcome to your spiritual growth dashboard.</p>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                 <div className="relative group flex-grow md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
                    <Input placeholder="Search everything..." className="pl-10 rounded-2xl bg-muted/50 border-primary/10" />
                 </div>
                 <Button variant="outline" size="icon" className="w-12 h-12 rounded-2xl relative border-primary/10">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary rounded-full ring-4 ring-background" />
                 </Button>
              </div>
            </header>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Statistics/Overview */}
              <div className="lg:col-span-2 space-y-8">
                 <div className="grid sm:grid-cols-2 gap-6">
                    <Card className="bg-primary/5 border-primary/10 p-8 rounded-[2.5rem] relative overflow-hidden group hover:scale-[1.02] transition-all duration-500">
                       <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full translate-x-1/2 -translate-y-1/2" />
                       <p className="text-primary font-black uppercase text-xs tracking-widest mb-2">Growth Tracker</p>
                       <h3 className="text-4xl font-black mb-1">12</h3>
                       <p className="text-muted-foreground font-medium">Sermons Watched</p>
                    </Card>
                    <Card className="bg-primary/5 border-primary/10 p-8 rounded-[2.5rem] relative overflow-hidden group hover:scale-[1.02] transition-all duration-500">
                       <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full translate-x-1/2 -translate-y-1/2" />
                       <p className="text-primary font-black uppercase text-xs tracking-widest mb-2">Engagements</p>
                       <h3 className="text-4xl font-black mb-1">4</h3>
                       <p className="text-muted-foreground font-medium">Events Attended</p>
                    </Card>
                 </div>

                 {/* Saved Sermons */}
                 <Card className="bg-card/40 backdrop-blur-md border-primary/5 rounded-[3rem] p-4 lg:p-8 shadow-2xl shadow-primary/5">
                    <CardHeader className="flex flex-row items-center justify-between px-4 pb-8">
                       <div>
                          <CardTitle className="text-2xl font-black uppercase tracking-tight">Watch Later</CardTitle>
                          <CardDescription className="font-medium">Continue your spiritual journey where you left off.</CardDescription>
                       </div>
                       <Button variant="ghost" className="font-black text-primary gap-2">VIEW ALL <ChevronRight size={18} /></Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { title: "The Power of Faith", date: "Oct 22, 2023", thumb: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400" },
                        { title: "Walking in Purpose", date: "Oct 15, 2023", thumb: "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?w=400" }
                      ].map((item, idx) => (
                        <motion.div 
                          key={idx} 
                          whileHover={{ scale: 1.01 }}
                          className="flex items-center gap-6 p-4 rounded-[2rem] border border-primary/5 hover:bg-primary/5 transition-all cursor-pointer group"
                        >
                          <div className="w-32 h-20 bg-muted rounded-2xl overflow-hidden shrink-0 relative">
                             <img src={item.thumb} alt="Thumb" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                             <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Play fill="currentColor" className="text-white" size={24} />
                             </div>
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-black text-lg uppercase tracking-tight group-hover:text-primary transition-colors">{item.title}</h4>
                            <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest">{item.date} • Pastor Promise</p>
                          </div>
                          <ChevronRight size={24} className="text-muted-foreground group-hover:text-primary transition-colors" />
                        </motion.div>
                      ))}
                    </CardContent>
                 </Card>
              </div>

              {/* Registered Events & Notifications */}
              <div className="space-y-8">
                 <Card className="bg-primary p-10 rounded-[3rem] shadow-2xl shadow-primary/30 relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl" />
                    <Sparkles className="text-white/40 mb-6" size={40} />
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Your Next Event</h3>
                    <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 mb-8">
                       <h4 className="font-black text-white uppercase tracking-tight mb-1">Night of Worship</h4>
                       <p className="text-white/70 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                          <CalendarIcon size={14} /> Oct 28 • 7:00 PM
                       </p>
                    </div>
                    <Button variant="secondary" className="w-full py-7 rounded-2xl font-black shadow-xl">VIEW TICKET</Button>
                 </Card>

                 <Card className="bg-card/40 border-primary/5 rounded-[3rem] p-8 shadow-xl">
                    <h3 className="text-xl font-black uppercase tracking-tight mb-6">Latest Updates</h3>
                    <div className="space-y-6">
                       {[
                         { msg: "New sermon 'Divine Grace' is now live.", time: "2h ago" },
                         { msg: "You joined the 'Young Adults' group.", time: "1d ago" },
                         { msg: "Next Bible Study is tomorrow at 6PM.", time: "2d ago" }
                       ].map((n, i) => (
                         <div key={i} className="flex gap-4">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                            <div>
                               <p className="text-sm font-bold leading-tight mb-1">{n.msg}</p>
                               <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{n.time}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[500px]"
      >
        <div className="text-center mb-10">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-24 h-24 bg-primary text-white rounded-[2rem] flex items-center justify-center font-black text-4xl mx-auto mb-8 shadow-2xl shadow-primary/30 ring-8 ring-primary/10"
          >
            JE
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black font-heading mb-4 uppercase tracking-tighter">Members <span className="text-primary italic">Portal</span></h1>
          <p className="text-muted-foreground text-lg font-medium">Access your community, grow in faith, and stay connected.</p>
        </div>

        <Card className="bg-card/40 backdrop-blur-xl border-primary/5 p-2 rounded-[3.5rem] shadow-2xl shadow-primary/5 overflow-hidden">
          <div className="flex p-2 bg-muted/50 rounded-[2.5rem] mb-6">
            <button 
              className={`flex-1 py-4 text-sm font-black uppercase tracking-widest rounded-[2rem] transition-all duration-300 ${isLoginView ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setIsLoginView(true)}
            >
              Sign In
            </button>
            <button 
              className={`flex-1 py-4 text-sm font-black uppercase tracking-widest rounded-[2rem] transition-all duration-300 ${!isLoginView ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setIsLoginView(false)}
            >
              Join Us
            </button>
          </div>

          <CardContent className="px-8 pb-10">
            <form className="space-y-6" onSubmit={handleAuth}>
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl text-sm font-bold text-center"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {!isLoginView && (
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-[0.2em] ml-2">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
                    <Input 
                      type="text" 
                      value={fullName} 
                      onChange={e => setFullName(e.target.value)} 
                      required 
                      className="pl-12 py-7 rounded-2xl bg-muted/30 border-transparent group-focus-within:border-primary/30 transition-all font-medium" 
                      placeholder="Promise Eke" 
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-[0.2em] ml-2">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
                  <Input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required 
                    className="pl-12 py-7 rounded-2xl bg-muted/30 border-transparent group-focus-within:border-primary/30 transition-all font-medium" 
                    placeholder="envoy@grace.com" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-2 mr-2">
                  <label className="text-xs font-black uppercase tracking-[0.2em]">Password</label>
                  {isLoginView && <a href="#" className="text-[10px] font-black text-primary uppercase hover:underline">Forgot?</a>}
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
                  <Input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                    className="pl-12 py-7 rounded-2xl bg-muted/30 border-transparent group-focus-within:border-primary/30 transition-all font-medium" 
                    placeholder="••••••••" 
                  />
                </div>
              </div>
              
              <Button type="submit" disabled={loading} className="w-full py-8 text-xl font-black rounded-2xl shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 mt-8 uppercase tracking-widest group">
                {loading ? <Loader2 className="animate-spin" size={24} /> : (isLoginView ? 'Sign Into Faith' : 'Create Account')} 
                {!loading && <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />}
              </Button>
            </form>
            
            <div className="mt-12">
              <div className="relative mb-10 text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-primary/10"></div></div>
                <span className="relative bg-card/40 px-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Or join with</span>
              </div>
              <div className="grid grid-cols-1 gap-4">
                 <Button variant="outline" className="py-7 rounded-2xl border-primary/10 font-black text-xs uppercase tracking-[0.2em] hover:bg-primary/5 hover:border-primary/30 transition-all gap-4">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                    Google Account
                 </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
