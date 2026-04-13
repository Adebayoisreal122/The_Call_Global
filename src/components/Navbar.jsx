import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
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
  const hasBg = scrolled || isAdmin;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 nav-glass transition-all duration-300
      ${hasBg
        ? dark
          ? 'bg-[#030a2e]/65 border-b border-white/40 shadow-lg shadow-black/30'
          : 'bg-white/45 border-b border-blue-500 shadow-sm'
        : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={dark || !hasBg ? '/logowhite.png' : '/logo.png'}
            alt="The Call Global"
            className="h-12 w-12 object-contain rounded-full transition-all group-hover:scale-105"
            style={dark || !hasBg ? { filter: 'brightness(2.1)' } : {}}
          />
          <div>
            <div className={`font-display text-lg font-bold leading-tight ${dark || !hasBg ? 'brand-text-light' : 'brand-text'}`}>
              The Call Global
            </div>
            <div className={`text-xs tracking-widest uppercase ${dark || !hasBg ? 'text-blue-200/60' : 'text-blue-400/70'}`}>Ministry</div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(l => (
            <a key={l.label} href={l.href}
              className={`text-sm font-medium transition-colors
                ${dark || !hasBg
                  ? 'text-grey-900 hover:text-blue-600'
                  : 'text-gray-900 hover:text-blue-900'
                }`}>
              {l.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button onClick={toggle}
            className={`p-2 rounded-full transition-all
              ${dark || !hasBg ? 'text-blue-200 hover:bg-white/10' : 'text-blue-600 hover:bg-blue-50'}`}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href="/#join"
            className={`hidden md:inline-flex btn-navy px-5 py-2 rounded-full text-sm`}>
            Join Us
          </a>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2">
            {open
              ? <X size={20} className={dark || !hasBg ? 'text-white' : 'text-gray-800'} />
              : <Menu size={20} className={dark || !hasBg ? 'text-white' : 'text-gray-800'} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className={`md:hidden px-6 pb-6 pt-2 space-y-3 border-t
          ${dark ? 'bg-[#030a2e]/98 border-white/10' : 'bg-white/98 border-blue-100'}`}>
          {navLinks.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}
              className={`block py-2.5 text-sm font-medium border-b border-dashed
                ${dark ? 'text-blue-200 border-white/10' : 'text-gray-600 border-gray-200'}`}>
              {l.label}
            </a>
          ))}
          <a href="/#join" onClick={() => setOpen(false)}
            className="block btn-navy px-5 py-3 rounded-full text-sm text-center mt-4">
            Join The Ministry
          </a>
        </div>
      )}
    </nav>
  );
}
