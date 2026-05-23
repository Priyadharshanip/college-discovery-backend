import { useState, useEffect } from 'react';

export default function Home() {
  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState<{ id: string; name: string; token: string } | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');

  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    // Check local storage for user token
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const u = JSON.parse(storedUser);
      setUser(u);
      fetchSaved(u.token);
    }
    fetchColleges();
  }, []);

  const fetchColleges = async (searchQuery = '') => {
    try {
      const url = `/api/colleges?limit=20${searchQuery ? `&search=${searchQuery}` : ''}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setColleges(data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchSaved = async (token: string) => {
    try {
      const res = await fetch('/api/saved', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setSavedIds(data.data.map((item: any) => item.collegeId));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchColleges(search);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const url = authMode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const payload = authMode === 'login' ? { email: authForm.email, password: authForm.password } : authForm;
      
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (!data.success) {
        setAuthError(data.error);
        return;
      }

      if (authMode === 'login') {
        const u = data.data;
        setUser(u);
        localStorage.setItem('user', JSON.stringify(u));
        fetchSaved(u.token);
        setShowAuthModal(false);
      } else {
        // Switch to login after register
        setAuthMode('login');
      }
    } catch (e: any) {
      setAuthError(e.message);
    }
  };

  const toggleSave = async (collegeId: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    
    const isSaved = savedIds.includes(collegeId);
    const method = isSaved ? 'DELETE' : 'POST';

    try {
      const res = await fetch(`/api/saved/${collegeId}`, {
        method,
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await res.json();
      
      if (data.success) {
        if (isSaved) {
          setSavedIds(prev => prev.filter(id => id !== collegeId));
        } else {
          setSavedIds(prev => [...prev, collegeId]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <header className="glass">
        <div className="logo">EduExplore</div>
        <div>
          {user ? (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span>Hi, {user.name}</span>
              <button className="outline" onClick={() => {
                localStorage.removeItem('user');
                setUser(null);
                setSavedIds([]);
              }}>Logout</button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button className="outline" onClick={() => { setAuthMode('register'); setAuthError(''); setShowAuthModal(true); }}>Register</button>
              <button onClick={() => { setAuthMode('login'); setAuthError(''); setShowAuthModal(true); }}>Login</button>
            </div>
          )}
        </div>
      </header>

      <main className="container">
        <form onSubmit={handleSearch} className="search-container">
          <input 
            type="text" 
            placeholder="Search colleges by name or location..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <div className="colleges-grid">
          {colleges.map((college: any) => (
            <div key={college.id} className="college-card glass">
              <h3>{college.name}</h3>
              <div className="location">{college.location}</div>
              
              <div className="stats">
                <span>₹{college.fees.toLocaleString()}/yr</span>
                <span className="rating">★ {college.rating}</span>
              </div>
              
              <button 
                style={{ marginTop: '1.5rem', background: savedIds.includes(college.id) ? 'var(--text-muted)' : 'var(--primary)' }}
                onClick={() => toggleSave(college.id)}
              >
                {savedIds.includes(college.id) ? 'Saved' : 'Save College'}
              </button>
            </div>
          ))}
        </div>
      </main>

      {showAuthModal && (
        <div className="modal-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) setShowAuthModal(false);
        }}>
          <div className="modal glass">
            <h2>{authMode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
            
            <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {authMode === 'register' && (
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  required
                  value={authForm.name}
                  onChange={(e) => setAuthForm({...authForm, name: e.target.value})}
                />
              )}
              <input 
                type="email" 
                placeholder="Email Address" 
                required
                value={authForm.email}
                onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
              />
              <input 
                type="password" 
                placeholder="Password" 
                required
                value={authForm.password}
                onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
              />
              
              {authError && <div className="error-msg">{authError}</div>}
              
              <button type="submit">{authMode === 'login' ? 'Login' : 'Sign Up'}</button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
              {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <span 
                style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              >
                {authMode === 'login' ? 'Sign Up' : 'Login'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
