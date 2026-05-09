import { useState, useEffect } from 'react';
import { User, Lock, Mail, ArrowRight, Video, Calendar as CalendarIcon, LogOut, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

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
    // Check active session
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
        // Optionally show a message "Check your email for confirmation"
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
      <div className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h1 className="text-4xl font-bold font-heading mb-2">Welcome Back, {userProfile?.full_name?.split(' ')[0] || 'User'}</h1>
              <p className="text-muted-foreground">Manage your account, view saved content, and more.</p>
            </div>
            <button 
              onClick={handleSignOut}
              className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors font-medium"
            >
              <LogOut size={18} /> Sign Out
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                    <User size={32} />
                  </div>
                  <div>
                    <h3 className="font-bold">{userProfile?.full_name || 'Member'}</h3>
                    <p className="text-sm text-muted-foreground">{userProfile ? 'Verified Account' : 'Loading...'}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  <li><button className="w-full text-left px-4 py-2 bg-primary/10 text-primary font-medium rounded-md">Dashboard</button></li>
                  <li><button className="w-full text-left px-4 py-2 text-foreground hover:bg-muted font-medium rounded-md transition-colors">Profile Settings</button></li>
                  <li><button className="w-full text-left px-4 py-2 text-foreground hover:bg-muted font-medium rounded-md transition-colors">Giving History</button></li>
                  <li><button className="w-full text-left px-4 py-2 text-foreground hover:bg-muted font-medium rounded-md transition-colors">My Cell Group</button></li>
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Saved Sermons */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2">
                  <Video className="text-primary" /> Saved Sermons
                </h2>
                <div className="space-y-4">
                  {[1, 2].map((item) => (
                    <div key={item} className="flex gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="w-24 h-16 bg-gray-200 rounded overflow-hidden shrink-0 relative">
                         <img src={`https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=200&auto=format&fit=crop&sig=${item}`} alt="Thumb" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold leading-tight mb-1">The Power of Faith</h4>
                        <p className="text-xs text-muted-foreground">Oct 22, 2023 • Pastor John</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Registered Events */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2">
                  <CalendarIcon className="text-primary" /> My Events
                </h2>
                <div className="space-y-4">
                   <div className="flex items-center justify-between p-4 border border-primary/20 bg-primary/5 rounded-lg">
                      <div>
                        <h4 className="font-bold text-primary mb-1">Night of Worship</h4>
                        <p className="text-sm text-muted-foreground">Oct 28, 2023 at 7:00 PM</p>
                      </div>
                      <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider">
                        Registered
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-heading font-bold text-3xl mx-auto mb-4 shadow-lg shadow-primary/30">
            JE
          </div>
          <h1 className="text-3xl font-bold font-heading mb-2">Members Portal</h1>
          <p className="text-muted-foreground">Sign in to access your saved content and manage your account.</p>
        </div>

        <div className="bg-card border border-border p-8 rounded-2xl shadow-xl">
          <div className="flex mb-8 bg-muted rounded-lg p-1">
            <button 
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${isLoginView ? 'bg-white dark:bg-black shadow text-foreground' : 'text-muted-foreground'}`}
              onClick={() => setIsLoginView(true)}
            >
              Sign In
            </button>
            <button 
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${!isLoginView ? 'bg-white dark:bg-black shadow text-foreground' : 'text-muted-foreground'}`}
              onClick={() => setIsLoginView(false)}
            >
              Create Account
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleAuth}>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            {!isLoginView && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-muted-foreground" size={18} />
                  <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:border-primary transition-colors" placeholder="you@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Password</label>
                {isLoginView && <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:border-primary transition-colors" placeholder="••••••••" />
              </div>
            </div>
            
            <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-md transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 mt-4 disabled:opacity-70">
              {loading ? <Loader2 className="animate-spin" size={18} /> : (isLoginView ? 'Sign In' : 'Create Account')} 
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>
          
          {/* Supabase OAuth Placeholders */}
          <div className="mt-8">
            <div className="relative mb-6 text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
              <span className="relative bg-card px-2 text-xs text-muted-foreground uppercase tracking-wider">Or continue with</span>
            </div>
            <button className="w-full py-2 border border-border rounded-md font-medium text-sm hover:bg-muted transition-colors flex items-center justify-center gap-2">
               Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
