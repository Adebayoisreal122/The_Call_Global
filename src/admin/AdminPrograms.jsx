import { useState, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMinistry } from '../context/MinistryContext';
import {
  Plus, Trash2, Edit3, Calendar, Clock, MapPin,
  X, Loader2, AlertCircle, ImagePlus, Image
} from 'lucide-react';

const emptyForm = {
  title: '', type: 'Worship', date: '', time: '',
  location: '', description: '', upcoming: true, image: '',
};
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
  const [imagePreview, setImagePreview] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const fileInputRef = useRef(null);

  const card = `rounded-2xl p-6 ${dark ? 'bg-white/4 border border-white/8' : 'bg-white border border-gray-100 shadow-sm'}`;
  const input = `w-full px-4 py-3 rounded-xl text-sm input-navy ${dark ? 'text-white' : 'text-gray-900'}`;

  const openNew = () => {
    setForm(emptyForm);
    setEditing(null);
    setFormError('');
    setImagePreview('');
    setShowForm(true);
  };

  const openEdit = (p) => {
    setForm({
      title: p.title, type: p.type, date: p.date,
      time: p.time, location: p.location,
      description: p.description, upcoming: p.upcoming,
      image: p.image || '',
    });
    setEditing(p._id);
    setFormError('');
    setImagePreview(p.image || '');
    setShowForm(true);
  };

  // Convert uploaded file to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setFormError('Please upload a valid image file (JPG, PNG, WebP, etc.)');
      return;
    }

    // Validate file size — max 2MB
    if (file.size > 2 * 1024 * 1024) {
      setFormError('Image must be smaller than 2MB. Please compress it first.');
      return;
    }

    setImageLoading(true);
    setFormError('');

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setImagePreview(base64);
      setForm((f) => ({ ...f, image: base64 }));
      setImageLoading(false);
    };
    reader.onerror = () => {
      setFormError('Failed to read image. Please try another file.');
      setImageLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview('');
    setForm((f) => ({ ...f, image: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

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
      setImagePreview('');
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`font-display text-2xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Programs</h2>
          <p className={`text-sm mt-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{programs.length} total</p>
        </div>
        <button onClick={openNew} className="btn-navy px-5 py-2.5 rounded-xl text-sm flex items-center gap-2">
          <Plus size={16} /> Add Program
        </button>
      </div>

      {/* ── Form Modal ──────────────────────────────────────────────────────── */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-y-auto">
          <div className={`w-full max-w-lg rounded-3xl p-7 my-6 relative ${dark ? 'bg-gray-900 border border-white/10' : 'bg-white border border-gray-200'}`}>
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-white/10 transition-colors"
            >
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
              {/* Program Title */}
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Program Title *"
                required
                className={input}
              />

              {/* Type + Date */}
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={form.type}
                  onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                  className={`${input} ${dark ? 'bg-gray-900' : 'bg-white'}`}
                >
                  {types.map((t) => <option key={t}>{t}</option>)}
                </select>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  required
                  className={`${input} ${dark ? '[color-scheme:dark]' : ''}`}
                />
              </div>

              {/* Time + Location */}
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={form.time}
                  onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                  placeholder="Time (e.g. 10:00 AM)"
                  className={input}
                />
                <input
                  value={form.location}
                  onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                  placeholder="Location"
                  className={input}
                />
              </div>

              {/* Description */}
              <textarea
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Description..."
                rows={3}
                className={`${input} resize-none`}
              />

              {/* ── Image Upload ── */}
              <div>
                <label className={`block text-xs font-medium mb-2 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Program Image <span className={`font-normal ${dark ? 'text-gray-600' : 'text-gray-400'}`}>(optional · max 2MB)</span>
                </label>

                {imagePreview ? (
                  /* Image preview */
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                    />
                    {/* Overlay with remove button */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium border border-white/30 hover:bg-white/30 transition-colors"
                      >
                        <ImagePlus size={13} /> Change
                      </button>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/80 backdrop-blur-sm text-white text-xs font-medium hover:bg-red-500 transition-colors"
                      >
                        <Trash2 size={13} /> Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Upload dropzone */
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={imageLoading}
                    className={`w-full h-36 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all
                      ${dark
                        ? 'border-white/15 hover:border-blue-500/50 hover:bg-blue-500/5 text-gray-500 hover:text-blue-400'
                        : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50/50 text-gray-400 hover:text-blue-500'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {imageLoading ? (
                      <><Loader2 size={22} className="animate-spin" /><span className="text-xs">Processing image...</span></>
                    ) : (
                      <>
                        <ImagePlus size={22} />
                        <span className="text-xs font-medium">Click to upload image</span>
                        <span className="text-xs opacity-60">JPG, PNG, WebP · Max 2MB</span>
                      </>
                    )}
                  </button>
                )}

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {/* Upcoming toggle */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.upcoming}
                  onChange={(e) => setForm((f) => ({ ...f, upcoming: e.target.checked }))}
                  className="w-4 h-4 accent-blue-600"
                />
                <span className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Show as Upcoming on site
                </span>
              </label>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving || imageLoading}
                  className="btn-navy flex-1 py-3 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {saving
                    ? <><Loader2 size={14} className="animate-spin" /> Saving...</>
                    : editing ? 'Update Program' : 'Create Program'
                  }
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className={`px-5 rounded-xl text-sm border ${dark ? 'border-white/15 text-gray-400' : 'border-gray-200 text-gray-500'}`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Programs List ────────────────────────────────────────────────── */}
      {loading.programs ? (
        <div className={`${card} flex items-center justify-center py-16`}>
          <Loader2 size={28} className="animate-spin text-blue-500" />
        </div>
      ) : programs.length === 0 ? (
        <div className={`${card} text-center py-14`}>
          <Calendar size={40} className="mx-auto text-blue-500/40 mb-3" />
          <p className={`font-body text-lg ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            No programs yet. Create your first one!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {programs.map((p) => (
            <div key={p._id} className={`${card} flex items-start gap-4`}>

              {/* Program image thumbnail */}
              <div className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center
                ${dark ? 'bg-white/5' : 'bg-gray-100'}`}>
                {p.image ? (
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <Image size={24} className={dark ? 'text-gray-600' : 'text-gray-300'} />
                )}
              </div>

              {/* Program details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded-full font-medium">
                    {p.type}
                  </span>
                  {p.upcoming && (
                    <span className="text-xs bg-green-500/15 text-green-400 px-2 py-0.5 rounded-full">
                      Upcoming
                    </span>
                  )}
                  {p.image && (
                    <span className="text-xs bg-violet-500/15 text-violet-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Image size={10} /> Has image
                    </span>
                  )}
                </div>
                <h4 className={`font-display text-lg font-semibold mb-1 ${dark ? 'text-white' : 'text-gray-900'}`}>
                  {p.title}
                </h4>
                <p className={`text-sm mb-3 line-clamp-2 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {p.description}
                </p>
                <div className={`flex flex-wrap gap-4 text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} className="text-blue-400" /> {p.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-blue-400" /> {p.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-blue-400" /> {p.location}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => openEdit(p)}
                  className={`p-2 rounded-xl transition-colors ${dark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
                  title="Edit"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  disabled={deleting === p._id}
                  className="p-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-40"
                  title="Delete"
                >
                  {deleting === p._id
                    ? <Loader2 size={16} className="animate-spin" />
                    : <Trash2 size={16} />
                  }
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
