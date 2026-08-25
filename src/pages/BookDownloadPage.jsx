import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Download, Loader2, AlertCircle, BookOpen, CheckCircle2 } from 'lucide-react';

export default function BookDownloadPage() {
  const { token } = useParams();
  const { dark } = useTheme();
  const [status, setStatus] = useState('loading'); // loading | ready | error | expired
  const [bookData, setBookData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!token) { setStatus('error'); setErrorMsg('Invalid download link.'); return; }
    // Verify the token is valid by hitting the API
    const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    fetch(`${BASE_URL}/books/download/${token}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setBookData(data.data);
          setStatus('ready');
        } else {
          setStatus('error');
          setErrorMsg(data.message || 'This download link is invalid or has expired.');
        }
      })
      .catch(() => {
        setStatus('error');
        setErrorMsg('Failed to verify download link. Please check your internet connection.');
      });

  }, [token]);

  const handleDownload = async () => {
    if (!bookData?.pdf) return;
    setDownloading(true);
    try {
      const base64 = bookData.pdf;
      const byteString = atob(base64.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
      const blob = new Blob([ab], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = bookData.fileName || 'book.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('Download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${dark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">

          <img src="/logowhite.jpeg" alt="The Call Global"
            className={`h-16 w-16 object-contain rounded-full ${dark ? '' : 'hidden'}`} />
          <img src="/logo.png" alt="The Call Global"
            className={`h-16 w-16 object-contain rounded-full ${dark ? 'hidden' : ''}`} />
        </div>

        <div className={`rounded-3xl p-8 ${dark ? 'bg-white/4 border border-white/8' : 'bg-white border border-gray-100 shadow-xl'}`}>

          {/* Loading */}
          {status === 'loading' && (
            <div className="py-8">
              <Loader2 size={40} className="animate-spin text-blue-500 mx-auto mb-4" />
              <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Verifying your download link...</p>
            </div>
          )}

          {/* Ready to download */}
          {status === 'ready' && bookData && (
            <div className="space-y-5">
              <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} className="text-green-400" />
              </div>
              <div>
                <h1 className={`font-display text-2xl font-bold mb-1 ${dark ? 'text-white' : 'text-gray-900'}`}>
                  Your Book is Ready!
                </h1>
                <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Your purchase has been approved. Click below to download your PDF.
                </p>
              </div>

              {/* Book info */}

              <div className={`p-4 rounded-xl border text-left ${dark ? 'border-white/8 bg-white/3' : 'border-gray-100 bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center flex-shrink-0">
                    <BookOpen size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <p className={`font-semibold text-sm ${dark ? 'text-white' : 'text-gray-900'}`}>
                      {bookData.bookTitle}
                    </p>
                    <p className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                      {bookData.fileName} · Download #{bookData.downloadCount}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleDownload}
                disabled={downloading}
                className="btn-navy w-full py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {downloading
                  ? <><Loader2 size={16} className="animate-spin" /> Preparing download...</>
                  : <><Download size={16} /> Download PDF Now</>
                }
              </button>

              <p className={`text-xs ${dark ? 'text-gray-600' : 'text-gray-400'}`}>
                This link is valid for 30 days. You can download multiple times.
              </p>
            </div>
          )}


          {/* Error / Expired */}
          {(status === 'error' || status === 'expired') && (
            <div className="space-y-4 py-4">
              <div className="w-16 h-16 rounded-full bg-red-500/15 flex items-center justify-center mx-auto">
                <AlertCircle size={32} className="text-red-400" />
              </div>
              <h1 className={`font-display text-2xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>
                Link Invalid
              </h1>
              <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                {errorMsg}
              </p>
              <div className={`p-4 rounded-xl text-left border ${dark ? 'border-blue-500/20 bg-blue-500/5' : 'border-blue-100 bg-blue-50'}`}>
                <p className={`text-xs ${dark ? 'text-blue-300' : 'text-blue-700'}`}>
                  <strong>What to do:</strong><br />
                  • Check that you copied the full link correctly<br />
                  • Links expire after 30 days — contact us if yours has expired<br />
                  • Visit the <a href="/books" className="underline">Books page</a> and use
                  the "My Orders" tab to check your order status
                </p>
              </div>
              <div className="flex gap-3">
                <Link to="/books" className="btn-navy flex-1 py-3 rounded-xl text-sm font-semibold text-center">
                  Go to Books
                </Link>
                <Link to="/" className={`flex-1 py-3 rounded-xl text-sm font-semibold text-center border
                  ${dark ? 'border-white/15 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
                  Home
                </Link>
              </div>
            </div>

          )}
        </div>

        <p className={`text-xs mt-5 ${dark ? 'text-gray-600' : 'text-gray-400'}`}>
          The Call Global Ministry · <a href="/contact" className="hover:underline">Contact Support</a>
        </p>
      </div>
    </div>
  );
}