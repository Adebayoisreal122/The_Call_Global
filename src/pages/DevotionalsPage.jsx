import { useTheme } from '../context/ThemeContext';
import { useMinistry } from '../context/MinistryContext';
import { BookOpen, Calendar } from 'lucide-react';

export default function DevotionalsPage() {
  const { dark } = useTheme();
  const { devotionals } = useMinistry();

  return (
    <div className={`min-h-screen pt-24 pb-20 ${dark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="divider-gold"></div>
          <h1 className={`font-display text-5xl font-bold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
            Daily <span className="gold-text">Devotionals</span>
          </h1>
          <p className={`font-body text-xl max-w-xl mx-auto ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            Start each day anchored in the Word. Fresh insights from our ministry leaders.
          </p>
        </div>

        {devotionals.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen size={48} className="mx-auto text-yellow-500/40 mb-4" />
            <p className={`font-body text-xl ${dark ? 'text-gray-500' : 'text-gray-400'}`}>No devotionals yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {[...devotionals].reverse().map(d => (
              <article key={d.id}
                className={`p-8 rounded-3xl ${dark ? 'bg-white/4 border border-white/8' : 'bg-white border border-gray-100 shadow-sm'}`}>
                <div className="flex items-center gap-3 mb-5">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                    ${dark ? 'bg-yellow-500/15 text-yellow-400' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'}`}>
                    {d.category}
                  </span>
                  <span className={`flex items-center gap-1 text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                    <Calendar size={12} />
                    {new Date(d.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>

                <h2 className={`font-display text-2xl font-bold mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>{d.title}</h2>
                <div className={`font-body text-sm mb-4 italic ${dark ? 'text-yellow-400/80' : 'text-yellow-700'}`}>
                  📖 {d.scripture}
                </div>
                <p className={`font-body text-lg leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{d.content}</p>

                <div className={`mt-6 pt-5 border-t flex items-center gap-3 ${dark ? 'border-white/8' : 'border-gray-100'}`}>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-white text-xs font-bold">
                    {d.author[0]}
                  </div>
                  <span className={`text-sm font-medium ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{d.author}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
