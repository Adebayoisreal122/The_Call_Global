import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { fetchBooks, fetchBook, submitPurchase, checkOrderStatus } from '../services/api';
import {
  BookOpen, X, Loader2, AlertCircle, CheckCircle2,
  Upload, FileText, CreditCard, Download, Search,
  ChevronDown,
} from 'lucide-react';

const categories = ['All', 'Faith', 'Prayer', 'Leadership', 'Purpose', 'Healing', 'Prophecy', 'Devotional', 'Biography', 'Other'];

export default function BooksPage() {
  const { dark } = useTheme();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  // Purchase modal state
  const [selectedBook, setSelectedBook] = useState(null);
  const [step, setStep] = useState('info'); // info | payment | proof | success
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [proofFile, setProofFile] = useState(null);
  const [proofPreview, setProofPreview] = useState('');
  const [proofBase64, setProofBase64] = useState('');
  const [proofLoading, setProofLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [orderResult, setOrderResult] = useState(null);
  const proofInputRef = useRef(null);

  // Check order tab
  const [checkEmail, setCheckEmail] = useState('');
  const [checkBookId, setCheckBookId] = useState('');
  const [checkLoading, setCheckLoading] = useState(false);
  const [checkOrders, setCheckOrders] = useState([]);
  const [checkError, setCheckError] = useState('');
  const [showCheckTab, setShowCheckTab] = useState(false);

  useEffect(() => {
    fetchBooks()
      .then(r => setBooks(r.data || []))
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = books.filter(b => {
    const matchSearch = search === '' ||
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || b.category === category;
    return matchSearch && matchCat;
  });

  const openBook = async (book) => {
    setSelectedBook(book);
    setStep('info');
    setForm({ name: '', email: '', phone: '' });
    setProofFile(null); setProofPreview(''); setProofBase64('');
    setFormError(''); setOrderResult(null);
  };

  const closeModal = () => {
    setSelectedBook(null);
    setStep('info');
    setFormError('');
  };

  const handleProofUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const isImage = file.type.startsWith('image/');
    const isPdf = file.type === 'application/pdf';
    if (!isImage && !isPdf) { setFormError('Please upload an image or PDF of your payment receipt.'); return; }
    if (file.size > 5 * 1024 * 1024) { setFormError('File must be under 5MB.'); return; }
    setProofLoading(true); setFormError('');
    const reader = new FileReader();
    reader.onloadend = () => {
      setProofBase64(reader.result);
      if (isImage) setProofPreview(reader.result);
      else setProofPreview('');
      setProofFile(file);
      setProofLoading(false);
    };
    reader.onerror = () => { setFormError('Failed to read file.'); setProofLoading(false); };
    reader.readAsDataURL(file);
  };

  const handleSubmitPurchase = async (e) => {
    e.preventDefault();
    if (!proofBase64) { setFormError('Please upload your payment proof (screenshot or receipt).'); return; }
    setSubmitting(true); setFormError('');
    try {
      const res = await submitPurchase(selectedBook._id, {
        buyerName: form.name,
        buyerEmail: form.email,
        buyerPhone: form.phone,
        paymentProof: proofBase64,
        paymentProofFileName: proofFile?.name || 'proof',
      });
      setOrderResult(res);
      setStep('success');
    } catch (err) {
      setFormError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCheckOrders = async (e) => {
    e.preventDefault();
    if (!checkEmail) { setCheckError('Please enter your email address.'); return; }
    setCheckLoading(true); setCheckError(''); setCheckOrders([]);
    try {
      const res = await checkOrderStatus(checkEmail, checkBookId);
      setCheckOrders(res.data || []);
      if ((res.data || []).length === 0) setCheckError('No orders found for this email.');
    } catch (err) {
      setCheckError(err.message || 'Failed to check orders.');
    } finally {
      setCheckLoading(false);
    }
  };

  const downloadPdf = async (token, title) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/books/download/${token}`);
      const data = await res.json();
      if (!data.success) { alert(data.message || 'Download failed.'); return; }
      // Convert base64 PDF to blob and trigger download
      const base64 = data.data.pdf;
      const byteString = atob(base64.split(',')[1]);
      const mimeType = 'application/pdf';
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
      const blob = new Blob([ab], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = data.data.fileName || `${title}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Download failed. Please try again.');
    }
  };

  const input = `w-full px-4 py-3 rounded-xl text-sm input-navy ${dark ? 'text-white' : 'text-gray-900'}`;

  return (
    <div className={`min-h-screen pt-24 pb-20 ${dark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <div className="divider-navy mx-auto mb-4"></div>
          <h1 className={`font-display text-5xl font-bold mb-3 ${dark ? 'text-white' : 'text-gray-900'}`}>
            Inspirational <span className="brand-text">Books</span>
          </h1>
          <p className={`font-body text-lg max-w-xl mx-auto ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            Spirit-filled books to strengthen your faith, sharpen your purpose, and ignite your calling.
          </p>
        </div>

        {/* ── Tabs: Browse / Check Order ── */}
        <div className={`flex rounded-xl overflow-hidden mb-8 max-w-sm mx-auto ${dark ? 'bg-white/5' : 'bg-gray-200'}`}>
          {[
            { key: false, label: '📚 Browse Books' },
            { key: true,  label: '🔍 My Orders' },
          ].map(tab => (
            <button key={String(tab.key)} onClick={() => setShowCheckTab(tab.key)}
              className={`flex-1 py-3 text-sm font-semibold transition-all
                ${showCheckTab === tab.key ? 'btn-navy' : dark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── CHECK ORDERS TAB ── */}
        {showCheckTab ? (
          <div className="max-w-lg mx-auto">
            <div className={`p-7 rounded-2xl ${dark ? 'bg-white/4 border border-white/8' : 'bg-white border border-gray-100 shadow-sm'}`}>
              <h3 className={`font-display text-xl font-bold mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>Check Order Status</h3>
              <p className={`text-sm mb-5 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                Enter your email to see your order status and download link.
              </p>
              {checkError && (
                <div className="mb-4 flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                  <AlertCircle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-red-400 text-sm">{checkError}</p>
                </div>
              )}
              <form onSubmit={handleCheckOrders} className="space-y-3">
                <input value={checkEmail} onChange={e => setCheckEmail(e.target.value)}
                  type="email" placeholder="Your email address *" required className={input} />
                <button type="submit" disabled={checkLoading}
                  className="btn-navy w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60">
                  {checkLoading ? <><Loader2 size={14} className="animate-spin" /> Checking...</> : 'Check My Orders'}
                </button>
              </form>

              {checkOrders.length > 0 && (
                <div className="mt-6 space-y-3">
                  {checkOrders.map(order => (
                    <div key={order._id} className={`p-4 rounded-xl border ${dark ? 'border-white/8 bg-white/3' : 'border-gray-100 bg-gray-50'}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className={`font-semibold text-sm ${dark ? 'text-white' : 'text-gray-900'}`}>{order.bookTitle}</p>
                          <p className={`text-xs mt-0.5 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                          <div className="mt-2">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium
                              ${order.status === 'approved' ? 'bg-green-500/15 text-green-400'
                                : order.status === 'rejected' ? 'bg-red-500/15 text-red-400'
                                : 'bg-orange-500/15 text-orange-400'}`}>
                              {order.status === 'approved' ? '✅ Approved'
                                : order.status === 'rejected' ? '❌ Rejected'
                                : '⏳ Pending Review'}
                            </span>
                          </div>
                          {order.status === 'rejected' && order.adminNote && (
                            <p className={`text-xs mt-2 italic ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                              Note: {order.adminNote}
                            </p>
                          )}
                          {order.status === 'pending' && (
                            <p className={`text-xs mt-2 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                              Your payment proof is under review. We'll approve within 24 hours.
                            </p>
                          )}
                        </div>
                        {order.status === 'approved' && order.downloadToken && (
                          <button
                            onClick={() => downloadPdf(order.downloadToken, order.bookTitle)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl btn-navy text-xs font-semibold flex-shrink-0">
                            <Download size={13} /> Download PDF
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* ── Filters ── */}
            <div className="flex flex-wrap gap-3 mb-8 items-center">
              <div className="relative flex-1 min-w-48 max-w-xs">
                <Search size={14} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${dark ? 'text-gray-500' : 'text-gray-400'}`} />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search books..."
                  className={`${input} pl-9`} />
              </div>
              <div className="relative">
                <select value={category} onChange={e => setCategory(e.target.value)}
                  className={`appearance-none ${input} pr-8 w-auto ${dark ? 'bg-gray-900' : 'bg-white'}`}>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
                <ChevronDown size={13} className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${dark ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
            </div>

            {/* ── Books Grid ── */}
            {loading ? (
              <div className="flex justify-center py-16">
                <Loader2 size={28} className="animate-spin text-blue-500" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen size={40} className={`mx-auto mb-3 ${dark ? 'text-gray-600' : 'text-gray-300'}`} />
                <p className={`font-body text-lg ${dark ? 'text-gray-500' : 'text-gray-400'}`}>No books found.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map(book => (
                  <div key={book._id}
                    className={`rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-2
                      ${dark ? 'bg-white/4 border border-white/8 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-900/20'
                        : 'bg-white border border-gray-100 hover:border-blue-200 hover:shadow-xl shadow-sm'}`}
                    onClick={() => openBook(book)}>

                    {/* Cover */}
                    <div className={`h-56 overflow-hidden relative ${dark ? 'bg-dark-700' : 'bg-gray-100'}`}>
                      {book.coverImage ? (
                        <img src={book.coverImage} alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                          <BookOpen size={40} className={dark ? 'text-gray-600' : 'text-gray-300'} />
                          <span className={`text-xs ${dark ? 'text-gray-600' : 'text-gray-400'}`}>No Cover</span>
                        </div>
                      )}
                      {/* Category badge */}
                      <div className="absolute top-3 left-3">
                        <span className="text-xs bg-blue-600/90 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                          {book.category}
                        </span>
                      </div>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                        <span className="text-white text-xs font-semibold bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                          View & Purchase →
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className={`font-display text-base font-bold mb-0.5 group-hover:text-blue-500 transition-colors ${dark ? 'text-white' : 'text-gray-900'}`}>
                        {book.title}
                      </h3>
                      <p className={`text-xs mb-2 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                        by {book.author} {book.pages > 0 && `· ${book.pages} pages`}
                      </p>
                      {book.description && (
                        <p className={`text-xs leading-relaxed mb-3 line-clamp-2 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {book.description}
                        </p>
                      )}
                      <div className={`font-display text-xl font-bold ${dark ? 'text-blue-400' : 'text-blue-600'}`}>
                        ₦{Number(book.price).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Purchase Modal ── */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm overflow-y-auto flex items-start justify-center p-4"
          onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className={`w-full max-w-lg my-6 rounded-3xl overflow-hidden
            ${dark ? 'bg-gray-900 border border-white/10' : 'bg-white border border-gray-200 shadow-2xl'}`}>

            {/* Modal header */}
            <div className="relative hero-gradient p-6">
              <button onClick={closeModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <X size={16} />
              </button>
              <div className="flex gap-4">
                {selectedBook.coverImage && (
                  <img src={selectedBook.coverImage} alt={selectedBook.title}
                    className="w-16 h-20 object-cover rounded-xl flex-shrink-0 shadow-lg" />
                )}
                <div>
                  <p className="text-blue-200/70 text-xs uppercase tracking-wider mb-1">{selectedBook.category}</p>
                  <h3 className="font-display text-2xl font-bold text-white">{selectedBook.title}</h3>
                  <p className="text-blue-200/70 text-sm">by {selectedBook.author}</p>
                  <p className="font-display text-xl font-bold text-white mt-2">
                    ₦{Number(selectedBook.price).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Step: Info */}
              {step === 'info' && (
                <div className="space-y-4">
                  {selectedBook.description && (
                    <div>
                      <p className={`text-sm leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {selectedBook.description}
                      </p>
                    </div>
                  )}
                  {selectedBook.pages > 0 && (
                    <p className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                      📄 {selectedBook.pages} pages
                    </p>
                  )}
                  <div className={`p-4 rounded-xl border ${dark ? 'border-blue-500/20 bg-blue-500/5' : 'border-blue-100 bg-blue-50'}`}>
                    <p className={`text-xs font-semibold mb-1 ${dark ? 'text-blue-300' : 'text-blue-700'}`}>How it works:</p>
                    <ol className={`text-xs space-y-1 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <li>1. Fill in your details</li>
                      <li>2. Transfer ₦{Number(selectedBook.price).toLocaleString()} to our account</li>
                      <li>3. Upload your payment receipt/screenshot</li>
                      <li>4. Admin reviews and sends you a download link</li>
                    </ol>
                  </div>
                  <button onClick={() => setStep('payment')}
                    className="btn-navy w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                    <CreditCard size={15} /> Purchase This Book
                  </button>
                </div>
              )}

              {/* Step: Payment details + form */}
              {step === 'payment' && (
                <form onSubmit={e => { e.preventDefault(); setStep('proof'); }} className="space-y-4">
                  <h4 className={`font-display text-lg font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Your Details</h4>
                  {formError && (
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                      <AlertCircle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                      <p className="text-red-400 text-sm">{formError}</p>
                    </div>
                  )}
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Full Name *" required className={input} />
                  <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="Email Address * (for order confirmation)" required className={input} />
                  <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="Phone / WhatsApp" className={input} />

                  {/* Bank details */}
                  <div className={`p-4 rounded-xl border ${dark ? 'border-green-500/20 bg-green-500/5' : 'border-green-100 bg-green-50'}`}>
                    <p className={`text-xs font-bold mb-2 ${dark ? 'text-green-400' : 'text-green-700'}`}>
                      💳 Transfer ₦{Number(selectedBook.price).toLocaleString()} to:
                    </p>
                    <div className={`space-y-1 text-sm font-medium ${dark ? 'text-gray-300' : 'text-gray-800'}`}>
                      <p>Bank: <span className="font-bold">{selectedBook.paymentBankName || 'GTBank'}</span></p>
                      <p>Account: <span className="font-bold font-mono">{selectedBook.paymentAccountNumber || '0123456789'}</span></p>
                      <p>Name: <span className="font-bold">{selectedBook.paymentAccountName || 'The Call Global Ministry'}</span></p>
                    </div>
                    <p className={`text-xs mt-2 ${dark ? 'text-gray-500' : 'text-gray-500'}`}>
                      Use your email as payment narration/description.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep('info')}
                      className={`px-5 rounded-xl text-sm border ${dark ? 'border-white/15 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                      Back
                    </button>
                    <button type="submit" className="btn-navy flex-1 py-3 rounded-xl text-sm font-semibold">
                      I've Made Payment →
                    </button>
                  </div>
                </form>
              )}

              {/* Step: Upload proof */}
              {step === 'proof' && (
                <form onSubmit={handleSubmitPurchase} className="space-y-4">
                  <h4 className={`font-display text-lg font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Upload Payment Proof</h4>
                  <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Upload a screenshot or photo of your bank transfer receipt.
                  </p>

                  {formError && (
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                      <AlertCircle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                      <p className="text-red-400 text-sm">{formError}</p>
                    </div>
                  )}

                  {/* Preview */}
                  {proofPreview ? (
                    <div className="relative rounded-xl overflow-hidden">
                      <img src={proofPreview} alt="Payment proof" className="w-full max-h-48 object-contain bg-black/10" />
                      <button type="button" onClick={() => { setProofFile(null); setProofPreview(''); setProofBase64(''); }}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-600/90 flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                        <X size={12} />
                      </button>
                    </div>
                  ) : proofFile ? (
                    <div className={`flex items-center gap-3 p-4 rounded-xl border ${dark ? 'border-green-500/30 bg-green-500/5' : 'border-green-200 bg-green-50'}`}>
                      <FileText size={18} className="text-green-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-green-400 truncate">{proofFile.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">PDF uploaded successfully</p>
                      </div>
                      <button type="button" onClick={() => { setProofFile(null); setProofBase64(''); }}
                        className="text-red-400 hover:text-red-300 transition-colors">
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => proofInputRef.current?.click()} disabled={proofLoading}
                      className={`w-full h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all
                        ${dark ? 'border-white/15 hover:border-blue-500/50 hover:bg-blue-500/5 text-gray-500 hover:text-blue-400'
                          : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-400 hover:text-blue-500'
                        } disabled:opacity-50`}>
                      {proofLoading
                        ? <><Loader2 size={20} className="animate-spin" /><span className="text-xs">Processing...</span></>
                        : <><Upload size={20} /><span className="text-xs font-medium">Click to upload receipt</span><span className="text-xs opacity-60">Image or PDF · max 5MB</span></>
                      }
                    </button>
                  )}
                  <input ref={proofInputRef} type="file" accept="image/*,application/pdf" onChange={handleProofUpload} className="hidden" />

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep('payment')}
                      className={`px-5 rounded-xl text-sm border ${dark ? 'border-white/15 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                      Back
                    </button>
                    <button type="submit" disabled={submitting || !proofBase64}
                      className="btn-navy flex-1 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60">
                      {submitting
                        ? <><Loader2 size={14} className="animate-spin" /> Submitting...</>
                        : 'Submit for Review'
                      }
                    </button>
                  </div>
                </form>
              )}

              {/* Step: Success */}
              {step === 'success' && (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-green-400" />
                  </div>
                  <h4 className={`font-display text-2xl font-bold mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>
                    Order Submitted! 🎉
                  </h4>
                  <p className={`text-sm leading-relaxed mb-4 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {orderResult?.message || 'Your payment proof has been submitted and is under review.'}
                  </p>
                  <div className={`p-4 rounded-xl border mb-5 text-left ${dark ? 'border-blue-500/20 bg-blue-500/5' : 'border-blue-100 bg-blue-50'}`}>
                    <p className={`text-xs ${dark ? 'text-blue-300' : 'text-blue-700'}`}>
                      <strong>What happens next?</strong><br />
                      Our team will verify your payment within 24 hours. Once approved, you can download your PDF using the <strong>"My Orders"</strong> tab at the top of this page — just enter your email.
                    </p>
                  </div>
                  <button onClick={closeModal} className="btn-navy px-8 py-3 rounded-xl text-sm font-semibold">
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
