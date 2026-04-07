import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Cross } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Programs', href: '/#programs' },
  { label: 'Devotionals', href: '/devotionals' },
  { label: 'Testimonies', href: '/#testimonies' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const { dark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 nav-glass transition-all duration-300
      ${scrolled || isAdmin
        ? dark ? 'bg-navy-900/95 border-b border-gold-600/20' : 'bg-white/95 border-b border-gold-500/20 shadow-sm'
        : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg group-hover:shadow-yellow-500/30 transition-shadow">
            <span className="text-white text-lg font-bold font-display">✞</span>
          </div>
          <div>
            <div className="font-display text-lg font-bold leading-tight gold-text">The Call Global</div>
            <div className={`text-xs tracking-widest uppercase ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Ministry</div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(l => (
            <a key={l.label} href={l.href}
              className={`text-sm font-medium transition-colors hover:text-yellow-500 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button onClick={toggle}
            className={`p-2 rounded-full transition-all hover:bg-yellow-500/10 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to="/#join"
            className="hidden md:inline-flex btn-gold px-5 py-2 rounded-full text-sm">
            Join Us
          </Link>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2">
            {open ? <X size={20} className={dark ? 'text-white' : 'text-gray-800'} />
              : <Menu size={20} className={dark ? 'text-white' : 'text-gray-800'} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className={`md:hidden px-6 pb-6 pt-2 space-y-3 border-t ${dark ? 'bg-navy-900/98 border-yellow-600/20' : 'bg-white/98 border-yellow-500/20'}`}>
          {navLinks.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}
              className={`block py-2 text-sm font-medium border-b border-dashed ${dark ? 'text-gray-300 border-white/10' : 'text-gray-600 border-gray-200'}`}>
              {l.label}
            </a>
          ))}
          <Link to="/#join" onClick={() => setOpen(false)}
            className="block btn-gold px-5 py-3 rounded-full text-sm text-center mt-4">
            Join The Ministry
          </Link>
        </div>
      )}
    </nav>
  );
}
