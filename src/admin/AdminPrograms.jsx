import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMinistry } from '../context/MinistryContext';
import { Plus, Trash2, Edit3, Calendar, Clock, MapPin, X, Loader2, AlertCircle } from 'lucide-react';

const emptyForm = { title: '', type: 'Worship', date: '', time: '', location: '', description: '', upcoming: true };
const types = ['Worship', 'Prayer', 'Conference', 'Training', 'Outreach', 'Youth', 'Special'];

export default function AdminPrograms() {
  const { dark } = useTheme();
  const { programs, loading, addProgram, editProgram, removeProgram } = useMinistry();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [formError, setFormError] = useState('');

  const card = `rounded-2xl p-6 ${dark ? 'bg-white/4 border border-white/8' : 'bg-white border border-gray-100 shadow-sm'}`;
  const input = `w-full px-4 py-3 rounded-xl text-sm input-navy ${dark ? 'text-white' : 'text-gray-900'}`;

  const openNew = () => { setForm(emptyForm); setEditing(null); setFormError(''); setShowForm(true); };
  const openEdit = (p) => { setForm({ title: p.title, type: p.type, date: p.date, time: p.time, location: p.location, description: p.description, upcoming: p.upcoming }); setEditing(p._id); setFormError(''); setShowForm(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError('');
    try {
      if (editing) await editProgram(editing, form);
      else await addProgram(form);
      setShowForm(false);
      setEditing(null);
      setForm(emptyForm);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this program?')) return;
    setDeleting(id);
    try { await removeProgram(id); }
    catch (err) { alert(err.message); }
    finally { setDeleting(null); }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`font-display text-2xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Programs</h2>
          <p className={`text-sm mt-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{programs.length} total</p>
        </div>
        <button onClick={openNew} className="btn-navy px-5 py-2.5 rounded-xl text-sm flex items-center gap-2">
          <Plus size={16} /> Add Program
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-y-auto">
          <div className={`w-full max-w-lg rounded-3xl p-7 my-6 relative ${dark ? 'bg-gray-900 border border-white/10' : 'bg-white border border-gray-200'}`}>
            <button onClick={() => setShowForm(false)} className="absolute top-5 right-5 p-1 rounded-full hover:bg-white/10">
              <X size={18} className={dark ? 'text-gray-400' : 'text-gray-500'} />
            </button>
            <h3 className={`font-display text-xl font-semibold mb-5 ${dark ? 'text-white' : 'text-gray-900'}`}>
              {editing ? 'Edit Program' : 'New Program'}
            </h3>
            {formError && (
              <div className="mb-4 flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <AlertCircle size={15} className="text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-red-400 text-sm">{formError}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Program Title *" required className={input} />
              <div className="grid grid-cols-2 gap-3">
                <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                  className={`${input} ${dark ? 'bg-gray-900' : 'bg-white'}`}>
                  {types.map((t) => <option key={t}>{t}</option>)}
                </select>
                <input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  required className={`${input} ${dark ? '[color-scheme:dark]' : ''}`} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input value={form.time} onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                  placeholder="Time (e.g. 10:00 AM)" className={input} />
                <input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                  placeholder="Location" className={input} />
              </div>
              <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Description..." rows={3} className={`${input} resize-none`} />
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.upcoming}
                  onChange={(e) => setForm((f) => ({ ...f, upcoming: e.target.checked }))}
                  className="w-4 h-4 accent-blue-600" />
                <span className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Show as Upcoming on site</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving}
                  className="btn-navy flex-1 py-3 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-60">
                  {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : editing ? 'Update Program' : 'Create Program'}
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

      {/* List */}
      {loading.programs ? (
        <div className={`${card} flex items-center justify-center py-16`}>
          <Loader2 size={28} className="animate-spin text-blue-500" />
        </div>
      ) : programs.length === 0 ? (
        <div className={`${card} text-center py-14`}>
          <Calendar size={40} className="mx-auto text-blue-500/40 mb-3" />
          <p className={`font-body text-lg ${dark ? 'text-gray-400' : 'text-gray-500'}`}>No programs yet. Create your first one!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {programs.map((p) => (
            <div key={p._id} className={`${card} flex items-start gap-5`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded-full font-medium">{p.type}</span>
                  {p.upcoming && <span className="text-xs bg-green-500/15 text-green-400 px-2 py-0.5 rounded-full">Upcoming</span>}
                </div>
                <h4 className={`font-display text-lg font-semibold mb-1 ${dark ? 'text-white' : 'text-gray-900'}`}>{p.title}</h4>
                <p className={`text-sm mb-3 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{p.description}</p>
                <div className={`flex flex-wrap gap-4 text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                  <span className="flex items-center gap-1"><Calendar size={12} className="text-blue-400" /> {p.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} className="text-blue-400" /> {p.time}</span>
                  <span className="flex items-center gap-1"><MapPin size={12} className="text-blue-400" /> {p.location}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(p)}
                  className={`p-2 rounded-xl transition-colors ${dark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                  <Edit3 size={16} />
                </button>
                <button onClick={() => handleDelete(p._id)} disabled={deleting === p._id}
                  className="p-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-40">
                  {deleting === p._id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
