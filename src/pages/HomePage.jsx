import Hero from '../components/Hero';
import Features from '../components/Features';
import About from '../components/About';
import Programs from '../components/Programs';
import Testimonies from '../components/Testimonies';
import Join from '../components/Join';
import Contact from '../components/Contact';
import { useTheme } from '../context/ThemeContext';
import { BookOpen } from 'lucide-react';
import { useMinistry } from '../context/MinistryContext';
import { Link } from 'react-router-dom';

function DailyWordBanner() {
  const { dark } = useTheme();
  const { devotionals } = useMinistry();
  const latest = devotionals[devotionals.length - 1];
  if (!latest) return null;

  return (
    <section className={`py-16 ${dark ? 'bg-navy-800' : 'bg-yellow-50'}`}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 mb-4 text-yellow-600">
          <BookOpen size={18} />
          <span className="text-xs tracking-widest uppercase font-medium">Word For Today</span>
        </div>
        <h2 className={`font-display text-3xl font-bold mb-3 ${dark ? 'text-white' : 'text-gray-900'}`}>{latest.title}</h2>
        <p className={`font-body text-xl italic mb-3 ${dark ? 'text-yellow-400/80' : 'text-yellow-700'}`}>📖 {latest.scripture}</p>
        <p className={`font-body text-lg leading-relaxed max-w-2xl mx-auto mb-6 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{latest.content}</p>
        <Link to="/devotionals" className="btn-outline-gold px-6 py-2 rounded-full text-sm inline-block">
          Read All Devotionals →
        </Link>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <About />
      <DailyWordBanner />
      <Programs />
      <Testimonies />
      <Join />
      <Contact />
    </>
  );
}
