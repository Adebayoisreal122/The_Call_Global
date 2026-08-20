import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { fetchBooks, createBook, updateBook, deleteBook } from '../services/api';
import {
  Plus, Trash2, Edit3, X, Loader2, AlertCircle,
  ImagePlus, FileText, BookOpen, Upload, Eye, EyeOff,
} from 'lucide-react';

const categories = ['Faith', 'Prayer', 'Leadership', 'Purpose', 'Healing', 'Prophecy', 'Devotional', 'Biography', 'Other'];

const emptyForm = {
  title: '', author: '', description: '', category: 'Faith',
  price: '', pages: '', coverImage: '', pdfFile: '', pdfFileName: '',
  isAvailable: true,
  paymentAccountName: '', paymentAccountNumber: '', paymentBankName: '',
};

export default function AdminBooks() {
  const { dark } = useTheme();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [formError, setFormError] = useState('');
  const [coverPreview, setCoverPreview] = useState('');
  const [pdfName, setPdfName] = useState('');
  const [coverLoading, setCoverLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const coverInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  const card = `rounded-2xl p-6 ${dark ? 'bg-white/4 border border-white/8' : 'bg-white border border-gray-100 shadow-sm'}`;
  const input = `w-full px-4 py-3 rounded-xl text-sm input-navy ${dark ? 'text-white' : 'text-gray-900'}`;
  const label = `block text-xs font-medium mb-1.5 uppercase tracking-wider ${dark ? 'text-gray-400' : 'text-gray-600'}`;

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchBooks();
      setBooks(res.data || []);
    } catch (e) { setBooks([]); }
    finally { setLoading(false); }
  };

  const openNew = () => {
    setForm(emptyForm); setEditing(null); setFormError('');
    setCoverPreview(''); setPdfName(''); setShowPaymentDetails(false);
    setShowForm(true);
  };

  const openEdit = (book) => {
    setForm({
      title: book.title, author: book.author, description: book.description,
      category: book.category, price: book.price, pages: book.pages || '',
      coverImage: book.coverImage || '', pdfFile: '',
      pdfFileName: book.pdfFileName || '',
      isAvailable: book.isAvailable,
      paymentAccountName: book.paymentAccountName || '',
      paymentAccountNumber: book.paymentAccountNumber || '',
      paymentBankName: book.paymentBankName || '',
    });
    setEditing(book._id);
    setCoverPreview(book.coverImage || '');
    setPdfName(book.pdfFileName ? `Current: ${book.pdfFileName}` : '');
    setFormError(''); setShowPaymentDetails(true);
    setShowForm(true);
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setFormError('Cover must be an image file.'); return; }
    if (file.size > 3 * 1024 * 1024) { setFormError('Cover image must be under 3MB.'); return; }
    setCoverLoading(true); setFormError('');
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverPreview(reader.result);
      setForm(f => ({ ...f, coverImage: reader.result }));
      setCoverLoading(false);
    };
    reader.onerror = () => { setFormError('Failed to read cover image.'); setCoverLoading(false); };
    reader.readAsDataURL(file);
  };

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'application/pdf') { setFormError('Please upload a PDF file.'); return; }
    if (file.size > 20 * 1024 * 1024) { setFormError('PDF must be under 20MB.'); return; }
    setPdfLoading(true); setFormError('');
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(f => ({ ...f, pdfFile: reader.result, pdfFileName: file.name }));
      setPdfName(file.name);
      setPdfLoading(false);
    };
    reader.onerror = () => { setFormError('Failed to read PDF file.'); setPdfLoading(false); };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editing && !form.pdfFile) { setFormError('Please upload a PDF file.'); return; }
    setSaving(true); setFormError('');
    try {
      const payload = { ...form, price: Number(form.price), pages: Number(form.pages) || 0 };
      if (editing && !form.pdfFile) delete payload.pdfFile; // keep existing PDF if not changed
      if (editing) await updateBook(editing, payload);
      else await createBook(payload);
      setShowForm(false); setEditing(null); setForm(emptyForm);
      setCoverPreview(''); setPdfName('');
      load();
    } catch (err) { setFormError(err.message || 'Failed to save book.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this book and all its orders? This cannot be undone.')) return;
    setDeleting(id);
    try { await deleteBook(id); setBooks(b => b.filter(x => x._id !== id)); }
    catch (err) { alert(err.message); }
    finally { setDeleting(null); }
  };

  const formatPrice = (p) => `₦${Number(p).toLocaleString()}`;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`font-display text-2xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Books Store</h2>
          <p className={`text-sm mt-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{books.length} books published</p>
        </div>
        <button onClick={openNew} className="btn-navy px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 font-semibold">
          <Plus size={16} /> Add Book
        </button>
      </div>

      {/* ── Form Modal ── */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/70 overflow-y-auto flex items-start justify-center p-4">
          <div className={`w-full max-w-2xl my-6 rounded-3xl overflow-hidden ${dark ? 'bg-gray-900 border border-white/10' : 'bg-white border border-gray-200'}`}>
            {/* Header */}
            <div className={`flex items-center justify-between px-7 py-5 border-b ${dark ? 'border-white/8' : 'border-gray-100'}`}>
              <h3 className={`font-display text-xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>
                {editing ? 'Edit Book' : 'Add New Book'}
              </h3>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
                <X size={17} className={dark ? 'text-gray-400' : 'text-gray-500'} />
              </button>
            </div>

            <div className="p-7 overflow-y-auto" style={{ maxHeight: '80vh' }}>
              {formError && (
                <div className="mb-5 flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                  <AlertCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-400 text-sm">{formError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title + Author */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={label}>Book Title *</label>
                    <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                      placeholder="e.g. Walking in Purpose" required className={input} />
                  </div>
                  <div>
                    <label className={label}>Author *</label>
                    <input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                      placeholder="Author name" required className={input} />
                  </div>
                </div>

                {/* Category + Price + Pages */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className={label}>Category</label>
                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                      className={`${input} ${dark ? 'bg-gray-800' : 'bg-white'}`}>
                      {categories.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={label}>Price (₦) *</label>
                    <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                      placeholder="0" required min="0" className={input} />
                  </div>
                  <div>
                    <label className={label}>Pages</label>
                    <input type="number" value={form.pages} onChange={e => setForm(f => ({ ...f, pages: e.target.value }))}
                      placeholder="0" min="0" className={input} />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className={label}>Description</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    rows={3} placeholder="Brief description of the book..." className={`${input} resize-none`} />
                </div>

                {/* Availability */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.isAvailable}
                    onChange={e => setForm(f => ({ ...f, isAvailable: e.target.checked }))}
                    className="w-4 h-4 accent-blue-600" />
                  <span className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Available for purchase</span>
                </label>

                {/* Cover Image Upload */}
                <div>
                  <label className={label}>Cover Image</label>
                  {coverPreview ? (
                    <div className="relative rounded-xl overflow-hidden h-48 group">
                      <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button type="button" onClick={() => coverInputRef.current?.click()}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs border border-white/30 hover:bg-white/30 transition-colors">
                          <ImagePlus size={12} /> Change
                        </button>
                        <button type="button" onClick={() => { setCoverPreview(''); setForm(f => ({ ...f, coverImage: '' })); }}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-red-500/80 text-white text-xs hover:bg-red-500 transition-colors">
                          <X size={12} /> Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button type="button" onClick={() => coverInputRef.current?.click()} disabled={coverLoading}
                      className={`w-full h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all
                        ${dark ? 'border-white/15 hover:border-blue-500/50 hover:bg-blue-500/5 text-gray-500 hover:text-blue-400'
                          : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-400 hover:text-blue-500'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}>
                      {coverLoading
                        ? <><Loader2 size={20} className="animate-spin" /><span className="text-xs">Processing...</span></>
                        : <><ImagePlus size={20} /><span className="text-xs font-medium">Upload Cover Image (JPG, PNG · max 3MB)</span></>
                      }
                    </button>
                  )}
                  <input ref={coverInputRef} type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                </div>

                {/* PDF Upload */}
                <div>
                  <label className={label}>PDF File {!editing && '*'}</label>
                  <button type="button" onClick={() => pdfInputRef.current?.click()} disabled={pdfLoading}
                    className={`w-full rounded-xl border-2 border-dashed flex items-center gap-4 px-5 py-4 transition-all
                      ${pdfName
                        ? dark ? 'border-green-500/40 bg-green-500/5' : 'border-green-400/40 bg-green-50'
                        : dark ? 'border-white/15 hover:border-blue-500/50 hover:bg-blue-500/5' : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}>
                    {pdfLoading ? (
                      <Loader2 size={20} className="animate-spin text-blue-400" />
                    ) : pdfName ? (
                      <FileText size={20} className="text-green-400 flex-shrink-0" />
                    ) : (
                      <Upload size={20} className={dark ? 'text-gray-500' : 'text-gray-400'} />
                    )}
                    <div className="text-left">
                      <div className={`text-sm font-medium ${pdfName ? 'text-green-400' : dark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {pdfLoading ? 'Processing PDF...' : pdfName || 'Click to upload PDF file'}
                      </div>
                      <div className={`text-xs mt-0.5 ${dark ? 'text-gray-600' : 'text-gray-400'}`}>
                        {editing && !pdfName ? 'Leave empty to keep existing PDF' : 'PDF format only · max 20MB'}
                      </div>
                    </div>
                  </button>
                  <input ref={pdfInputRef} type="file" accept="application/pdf" onChange={handlePdfUpload} className="hidden" />
                </div>

                {/* Payment Details */}
                <div>
                  <button type="button" onClick={() => setShowPaymentDetails(s => !s)}
                    className={`flex items-center gap-2 text-sm font-medium mb-3 ${dark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} transition-colors`}>
                    {showPaymentDetails ? <EyeOff size={14} /> : <Eye size={14} />}
                    {showPaymentDetails ? 'Hide' : 'Set'} Payment Account Details
                  </button>

                  {showPaymentDetails && (
                    <div className={`p-4 rounded-xl border space-y-3 ${dark ? 'border-white/8 bg-white/3' : 'border-gray-200 bg-gray-50'}`}>
                      <p className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                        Buyers will be shown these account details to make payment. Leave blank to use the ministry's default account.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={label}>Bank Name</label>
                          <input value={form.paymentBankName} onChange={e => setForm(f => ({ ...f, paymentBankName: e.target.value }))}
                            placeholder="e.g. GTBank" className={input} />
                        </div>
                        <div>
                          <label className={label}>Account Number</label>
                          <input value={form.paymentAccountNumber} onChange={e => setForm(f => ({ ...f, paymentAccountNumber: e.target.value }))}
                            placeholder="0123456789" className={input} />
                        </div>
                      </div>
                      <div>
                        <label className={label}>Account Name</label>
                        <input value={form.paymentAccountName} onChange={e => setForm(f => ({ ...f, paymentAccountName: e.target.value }))}
                          placeholder="The Call Global Ministry" className={input} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit */}
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving || coverLoading || pdfLoading}
                    className="btn-navy flex-1 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60">
                    {saving
                      ? <><Loader2 size={14} className="animate-spin" /> Saving...</>
                      : editing ? 'Update Book' : 'Publish Book'
                    }
                  </button>
                  <button type="button" onClick={() => setShowForm(false)}
                    className={`px-5 rounded-xl text-sm border ${dark ? 'border-white/15 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ── Books List ── */}
      {loading ? (
        <div className={`${card} flex items-center justify-center py-16`}>
          <Loader2 size={28} className="animate-spin text-blue-500" />
        </div>
      ) : books.length === 0 ? (
        <div className={`${card} text-center py-14`}>
          <BookOpen size={40} className="mx-auto text-blue-500/40 mb-3" />
          <p className={`font-body text-lg ${dark ? 'text-gray-400' : 'text-gray-500'}`}>No books yet. Add your first inspirational book!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {books.map(book => (
            <div key={book._id} className={`${card} flex items-start gap-5`}>
              {/* Cover thumbnail */}
              <div className={`w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center ${dark ? 'bg-white/5' : 'bg-gray-100'}`}>
                {book.coverImage ? (
                  <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                ) : (
                  <BookOpen size={22} className={dark ? 'text-gray-600' : 'text-gray-300'} />
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded-full font-medium">{book.category}</span>
                  {!book.isAvailable && <span className="text-xs bg-red-500/15 text-red-400 px-2 py-0.5 rounded-full">Unavailable</span>}
                  {book.pdfFileName && (
                    <span className="text-xs bg-green-500/15 text-green-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <FileText size={10} /> PDF Ready
                    </span>
                  )}
                </div>
                <h4 className={`font-display text-lg font-semibold mb-0.5 ${dark ? 'text-white' : 'text-gray-900'}`}>{book.title}</h4>
                <p className={`text-xs mb-2 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>by {book.author} {book.pages > 0 && `· ${book.pages} pages`}</p>
                {book.description && (
                  <p className={`text-sm line-clamp-2 mb-2 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{book.description}</p>
                )}
                <div className="flex items-center gap-4">
                  <span className={`font-display text-xl font-bold ${dark ? 'text-blue-400' : 'text-blue-600'}`}>
                    ₦{Number(book.price).toLocaleString()}
                  </span>
                  {book.totalSales > 0 && (
                    <span className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{book.totalSales} sold</span>
                  )}
                  {book.paymentBankName && (
                    <span className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                      💳 {book.paymentBankName}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(book)}
                  className={`p-2 rounded-xl transition-colors ${dark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}
                  title="Edit">
                  <Edit3 size={16} />
                </button>
                <button onClick={() => handleDelete(book._id)} disabled={deleting === book._id}
                  className="p-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-40"
                  title="Delete">
                  {deleting === book._id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
