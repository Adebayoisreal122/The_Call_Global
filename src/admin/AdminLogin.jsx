import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Eye, EyeOff, Sun, Moon, Lock, Mail, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const { login } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const input = `w-full pl-10 pr-4 py-3 rounded-xl text-sm input-navy
    ${dark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`;

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${dark ? 'bg-[#030a2e]' : 'bg-blue-50'}`}>
      {/* Theme toggle */}
      <button
        onClick={toggle}
        className={`fixed top-5 right-5 p-2 rounded-full transition-colors ${dark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:bg-blue-100'}`}
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div className="w-full max-w-md">
        {/* Card */}
        <div className={`rounded-3xl p-8 ${dark ? 'bg-white/4 border border-white/10' : 'bg-white border border-blue-100 shadow-xl shadow-blue-100/50'}`}>
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <img
                  src="/logowhite.png"
                  alt="The Call Global"
                  className={`h-20 w-20 object-contain rounded-full ${dark ? '' : 'hidden'}`}
                />
                <img
                  src="/logo.png"
                  alt="The Call Global"
                  className={`h-20 w-20 object-contain rounded-full ${dark ? 'hidden' : ''}`}
                />
              </div>
            </div>
            <h1 className={`font-display text-2xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>
              Admin Portal
            </h1>
            <p className={`text-sm mt-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
              The Call Global Ministry
            </p>
          </div>

          {/* Error alert */}
          {error && (
            <div className="mb-5 flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
              <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <Mail size={15} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${dark ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="Admin email"
                required
                autoComplete="email"
                className={input}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock size={15} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${dark ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                placeholder="Password"
                required
                autoComplete="current-password"
                className={`${input} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors ${dark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-navy w-full py-3.5 rounded-xl text-sm font-semibold mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In to Admin'
              )}
            </button>
          </form>

          {/* Back to site */}
          <div className="text-center mt-6">
            <a
              href="/"
              className={`text-xs transition-colors ${dark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
            >
              ← Back to The Call Global
            </a>
          </div>
        </div>

        {/* Scripture */}
        <p className={`text-center text-xs mt-6 font-body italic ${dark ? 'text-gray-600' : 'text-blue-300'}`}>
          "Moreover, it is required of stewards that they be found faithful." — 1 Cor 4:2
        </p>
      </div>
    </div>
  );
}
