import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMinistry } from '../context/MinistryContext';
import { Loader2 } from 'lucide-react';

export default function Testimonies() {
  const { dark } = useTheme();
  const { testimonies, loading, submitTestimony } = useMinistry();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', location: '', text: '' });
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await submitTestimony(form);
      setSubmitted(true);
      setForm({ name: '', location: '', text: '' });
      setTimeout(() => { setSubmitted(false); setShowForm(false); }, 3500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section id="testimonies" className={`py-24 ${dark ? 'bg-[#04093a]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="divider-navy"></div>
          <h2 className={`font-display text-4xl font-bold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
            What God Is <span className="brand-text">Doing</span>
          </h2>
          <p className={`font-body text-lg max-w-xl mx-auto ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            Real stories from real people whose lives have been touched by His presence.
          </p>
        </div>

        {loading.testimonies ? (
          <div className="flex justify-center py-12"><Loader2 size={28} className="animate-spin text-blue-500" /></div>
        ) : testimonies.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {testimonies.map((t) => (
              <div key={t._id}
                className={`testimony-card relative p-7 rounded-2xl
                  ${dark ? 'bg-white/4 border border-white/8' : 'bg-gray-50 border border-gray-100'}`}>
                <p className={`font-body text-base leading-relaxed mb-5 mt-4 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0a1a6b] to-[#1e3db5] flex items-center justify-center text-white text-sm font-bold">
                    {t.name?.[0] || '?'}
                  </div>
                  <div>
                    <div className={`font-semibold text-sm ${dark ? 'text-white' : 'text-gray-900'}`}>{t.name}</div>
                    <div className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={`text-center py-8 font-body text-lg ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
            Be the first to share what God has done!
          </p>
        )}

        <div className="text-center">
          {!showForm ? (
            <button onClick={() => setShowForm(true)} className="btn-outline-navy px-7 py-3 rounded-full text-sm">
              Share Your Testimony
            </button>
          ) : (
            <div className={`max-w-lg mx-auto p-8 rounded-2xl text-left
              ${dark ? 'bg-white/4 border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
              {submitted ? (
                <div className="text-center py-6">
                  <div className="text-4xl mb-3">🙌</div>
                  <p className={`font-display text-xl font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>Thank You!</p>
                  <p className={`text-sm mt-2 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Your testimony will be reviewed and published shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className={`font-display text-xl font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>Share Your Story</h3>
                  {error && <p className="text-red-400 text-sm">{error}</p>}
                  <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Your name *" required
                    className={`w-full px-4 py-3 rounded-xl text-sm input-navy ${dark ? 'text-white' : 'text-gray-900'}`} />
                  <input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                    placeholder="Your city / country"
                    className={`w-full px-4 py-3 rounded-xl text-sm input-navy ${dark ? 'text-white' : 'text-gray-900'}`} />
                  <textarea value={form.text} onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                    placeholder="Share what God has done in your life... *" required rows={4}
                    className={`w-full px-4 py-3 rounded-xl text-sm input-navy resize-none ${dark ? 'text-white' : 'text-gray-900'}`} />
                  <div className="flex gap-3">
                    <button type="submit" disabled={saving}
                      className="btn-navy flex-1 py-3 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-60">
                      {saving ? <><Loader2 size={14} className="animate-spin" /> Submitting...</> : 'Submit Testimony'}
                    </button>
                    <button type="button" onClick={() => setShowForm(false)}
                      className={`px-4 rounded-xl text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
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
