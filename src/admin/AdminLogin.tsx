import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '@/context/ContentContext';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useContent();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay for security
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = login(username, password);
    
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-4">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-display text-2xl tracking-[0.15em] text-off-white mb-2">
            GADAPA GAYATHRI
          </h1>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-off-white/50">
            Admin Portal
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-charcoal/50 border border-off-white/10 p-8 backdrop-blur-sm">
          <h2 className="font-display text-lg tracking-[0.1em] text-off-white mb-6 text-center">
            SIGN IN
          </h2>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-off-white/40" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full bg-transparent border border-off-white/20 py-3 pl-10 pr-4 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                  placeholder="Enter username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-mono text-[10px] tracking-[0.15em] uppercase text-off-white/50 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-off-white/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent border border-off-white/20 py-3 pl-10 pr-12 text-off-white text-sm focus:border-gold focus:outline-none transition-colors"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-off-white/40 hover:text-off-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-gold py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Back to site link */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-xs text-off-white/50 hover:text-gold transition-colors"
            >
              ← Back to website
            </a>
          </div>
        </div>

        {/* Default credentials hint */}
        <div className="mt-6 text-center">
          <p className="font-mono text-[9px] tracking-wide text-off-white/30">
            Default: admin / gayathri2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
