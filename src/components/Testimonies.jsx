import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMinistry } from '../context/MinistryContext';

export default function Testimonies() {
  const { dark } = useTheme();
  const { testimonies, addTestimony } = useMinistry();
  const approved = testimonies.filter(t => t.approved);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', location: '', text: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.text) return;
    addTestimony({ ...form, date: new Date().toISOString().split('T')[0] });
    setSubmitted(true);
    setForm({ name: '', location: '', text: '' });
    setTimeout(() => { setSubmitted(false); setShowForm(false); }, 3000);
  };

  return (
    <section id="testimonies" className={`py-24 ${dark ? 'bg-navy-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="divider-gold"></div>
          <h2 className={`font-display text-4xl font-bold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
            What God Is <span className="gold-text">Doing</span>
          </h2>
          <p className={`font-body text-lg max-w-xl mx-auto ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            Real stories from real people whose lives have been touched by His presence.
          </p>
        </div>

        {approved.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {approved.map(t => (
              <div key={t.id}
                className={`testimony-card relative p-7 rounded-2xl
                  ${dark ? 'bg-white/4 border border-white/8' : 'bg-gray-50 border border-gray-100'}`}>
                <p className={`font-body text-base leading-relaxed mb-5 mt-4 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0a1a6b] to-[#1e3db5] flex items-center justify-center text-white text-sm font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className={`font-semibold text-sm ${dark ? 'text-white' : 'text-gray-900'}`}>{t.name}</div>
                    <div className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Share testimony */}
        <div className="text-center">
          {!showForm ? (
            <button onClick={() => setShowForm(true)}
              className="btn-outline-navy px-7 py-3 rounded-full text-sm">
              Share Your Testimony
            </button>
          ) : (
            <div className={`max-w-lg mx-auto p-8 rounded-2xl text-left ${dark ? 'bg-white/4 border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
              {submitted ? (
                <div className="text-center py-6">
                  <div className="text-4xl mb-3">🙌</div>
                  <p className={`font-display text-xl font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>Thank You!</p>
                  <p className={`text-sm mt-2 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Your testimony will be reviewed and published shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className={`font-display text-xl font-semibold mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>Share Your Story</h3>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your name *" required
                    className={`w-full px-4 py-3 rounded-xl text-sm input-navy ${dark ? 'text-white' : 'text-gray-900'}`} />
                  <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                    placeholder="Your city / country"
                    className={`w-full px-4 py-3 rounded-xl text-sm input-navy ${dark ? 'text-white' : 'text-gray-900'}`} />
                  <textarea value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                    placeholder="Share what God has done in your life... *" required rows={4}
                    className={`w-full px-4 py-3 rounded-xl text-sm input-navy resize-none ${dark ? 'text-white' : 'text-gray-900'}`} />
                  <div className="flex gap-3">
                    <button type="submit" className="btn-navy flex-1 py-3 rounded-xl text-sm">Submit Testimony</button>
                    <button type="button" onClick={() => setShowForm(false)}
                      className={`px-4 rounded-xl text-sm ${dark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
