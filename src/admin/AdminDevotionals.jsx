import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMinistry } from '../context/MinistryContext';
import { Plus, Trash2, BookOpen, X, Loader2, AlertCircle } from 'lucide-react';

const emptyForm = { title: '', scripture: '', content: '', author: 'Pastor Emmanuel A.', category: 'Faith', date: new Date().toISOString().split('T')[0] };
const categories = ['Faith', 'Prayer', 'Purpose', 'Identity', 'Missions', 'Worship', 'Grace', 'Prophecy'];

export default function AdminDevotionals() {
  const { dark } = useTheme();
  const { devotionals, loading, addDevotional, removeDevotional } = useMinistry();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [formError, setFormError] = useState('');

  const card = `rounded-2xl p-6 ${dark ? 'bg-white/4 border border-white/8' : 'bg-white border border-gray-100 shadow-sm'}`;
  const input = `w-full px-4 py-3 rounded-xl text-sm input-navy ${dark ? 'text-white' : 'text-gray-900'}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError('');
    try {
      await addDevotional(form);
      setShowForm(false);
      setForm(emptyForm);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this devotional?')) return;
    setDeleting(id);
    try { await removeDevotional(id); }
    catch (err) { alert(err.message); }
    finally { setDeleting(null); }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`font-display text-2xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Devotionals</h2>
          <p className={`text-sm mt-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{devotionals.length} published</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setFormError(''); setShowForm(true); }}
          className="btn-navy px-5 py-2.5 rounded-xl text-sm flex items-center gap-2">
          <Plus size={16} /> Post Devotional
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-y-auto">
          <div className={`w-full max-w-xl rounded-3xl p-7 my-6 relative ${dark ? 'bg-gray-900 border border-white/10' : 'bg-white border border-gray-200'}`}>
            <button onClick={() => setShowForm(false)} className="absolute top-5 right-5 p-1 rounded-full hover:bg-white/10">
              <X size={18} className={dark ? 'text-gray-400' : 'text-gray-500'} />
            </button>
            <h3 className={`font-display text-xl font-semibold mb-5 ${dark ? 'text-white' : 'text-gray-900'}`}>Post Devotional</h3>
            {formError && (
              <div className="mb-4 flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <AlertCircle size={15} className="text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-red-400 text-sm">{formError}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Title *" required className={input} />
              <div className="grid grid-cols-2 gap-3">
                <input value={form.scripture} onChange={(e) => setForm((f) => ({ ...f, scripture: e.target.value }))}
                  placeholder="Scripture (e.g. John 3:16) *" required className={input} />
                <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className={`${input} ${dark ? 'bg-gray-900' : 'bg-white'}`}>
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <textarea value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                placeholder="Write the devotional message... *" required rows={6} className={`${input} resize-none`} />
              <div className="grid grid-cols-2 gap-3">
                <input value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                  placeholder="Author *" required className={input} />
                <input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className={`${input} ${dark ? '[color-scheme:dark]' : ''}`} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving}
                  className="btn-navy flex-1 py-3 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-60">
                  {saving ? <><Loader2 size={14} className="animate-spin" /> Publishing...</> : 'Publish Devotional'}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className={`px-5 rounded-xl text-sm border ${dark ? 'border-white/15 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading.devotionals ? (
        <div className={`${card} flex items-center justify-center py-16`}>
          <Loader2 size={28} className="animate-spin text-blue-500" />
        </div>
      ) : devotionals.length === 0 ? (
        <div className={`${card} text-center py-14`}>
          <BookOpen size={40} className="mx-auto text-blue-500/40 mb-3" />
          <p className={`font-body text-lg ${dark ? 'text-gray-400' : 'text-gray-500'}`}>No devotionals yet. Share the Word!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {devotionals.map((d) => (
            <div key={d._id} className={`${card} flex items-start gap-5`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-xs bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded-full">{d.category}</span>
                  <span className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{d.date}</span>
                </div>
                <h4 className={`font-display text-lg font-semibold mb-1 ${dark ? 'text-white' : 'text-gray-900'}`}>{d.title}</h4>
                <p className={`text-sm italic mb-2 ${dark ? 'text-blue-400/70' : 'text-blue-600'}`}>📖 {d.scripture}</p>
                <p className={`text-sm line-clamp-2 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{d.content}</p>
                <p className={`text-xs mt-2 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>By {d.author}</p>
              </div>
              <button onClick={() => handleDelete(d._id)} disabled={deleting === d._id}
                className="p-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors flex-shrink-0 disabled:opacity-40">
                {deleting === d._id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
