import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMinistry } from '../context/MinistryContext';
import { Plus, Trash2, BookOpen, X } from 'lucide-react';

const emptyForm = { title: '', scripture: '', content: '', author: 'Pastor Emmanuel A.', category: 'Faith', date: new Date().toISOString().split('T')[0] };
const categories = ['Faith', 'Prayer', 'Purpose', 'Identity', 'Missions', 'Worship', 'Grace', 'Prophecy'];

export default function AdminDevotionals() {
  const { dark } = useTheme();
  const { devotionals, addDevotional, deleteDevotional } = useMinistry();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const card = `rounded-2xl p-6 ${dark ? 'bg-white/4 border border-white/8' : 'bg-white border border-gray-100 shadow-sm'}`;
  const input = `w-full px-4 py-3 rounded-xl text-sm input-navy ${dark ? 'text-white' : 'text-gray-900'}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    addDevotional(form);
    setShowForm(false);
    setForm(emptyForm);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`font-display text-2xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Devotionals</h2>
          <p className={`text-sm mt-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{devotionals.length} devotionals published</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-navy px-5 py-2.5 rounded-xl text-sm flex items-center gap-2">
          <Plus size={16} /> Post Devotional
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-y-auto">
          <div className={`w-full max-w-xl rounded-3xl p-7 my-6 relative ${dark ? 'bg-gray-900 border border-white/10' : 'bg-white border border-gray-200'}`}>
            <button onClick={() => setShowForm(false)} className="absolute top-5 right-5 p-1 rounded-full hover:bg-white/10">
              <X size={18} className={dark ? 'text-gray-400' : 'text-gray-500'} />
            </button>
            <h3 className={`font-display text-xl font-semibold mb-6 ${dark ? 'text-white' : 'text-gray-900'}`}>Post New Devotional</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Devotional Title *" required className={input} />
              <div className="grid grid-cols-2 gap-3">
                <input value={form.scripture} onChange={e => setForm(f => ({ ...f, scripture: e.target.value }))}
                  placeholder="Scripture (e.g. John 3:16) *" required className={input} />
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className={`${input} ${dark ? 'bg-gray-900' : 'bg-white'}`}>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                placeholder="Write the devotional message here... *" required rows={6}
                className={`${input} resize-none`} />
              <div className="grid grid-cols-2 gap-3">
                <input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                  placeholder="Author *" required className={input} />
                <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  className={`${input} ${dark ? 'bg-gray-900 [color-scheme:dark]' : ''}`} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-navy flex-1 py-3 rounded-xl text-sm">Publish Devotional</button>
                <button type="button" onClick={() => setShowForm(false)}
                  className={`px-5 rounded-xl text-sm border ${dark ? 'border-white/15 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* List */}
      {devotionals.length === 0 ? (
        <div className={`${card} text-center py-14`}>
          <BookOpen size={40} className="mx-auto text-blue-500/40 mb-3" />
          <p className={`font-body text-lg ${dark ? 'text-gray-400' : 'text-gray-500'}`}>No devotionals yet. Share the Word!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {[...devotionals].reverse().map(d => (
            <div key={d.id} className={`${card} flex items-start gap-5`}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-blue-500/15 text-blue-500 px-2 py-0.5 rounded-full">{d.category}</span>
                  <span className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{d.date}</span>
                </div>
                <h4 className={`font-display text-lg font-semibold mb-1 ${dark ? 'text-white' : 'text-gray-900'}`}>{d.title}</h4>
                <p className={`text-sm italic mb-2 ${dark ? 'text-blue-400/70' : 'text-yellow-700'}`}>📖 {d.scripture}</p>
                <p className={`text-sm line-clamp-2 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{d.content}</p>
                <p className={`text-xs mt-2 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>By {d.author}</p>
              </div>
              <button onClick={() => deleteDevotional(d.id)}
                className="p-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors flex-shrink-0">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
