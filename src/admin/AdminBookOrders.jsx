import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  fetchAllOrders, fetchOrder, approveOrder, rejectOrder, deleteOrder,
} from '../services/api';
import {
  CheckCircle2, XCircle, Trash2, Eye, Loader2,
  Clock, BookOpen, Mail, Phone, Copy, ExternalLink,
} from 'lucide-react';

const statusConfig = {
  pending:  { label: 'Pending',  color: 'bg-orange-500/15 text-orange-400', icon: <Clock size={12} /> },
  approved: { label: 'Approved', color: 'bg-green-500/15 text-green-400',  icon: <CheckCircle2 size={12} /> },
  rejected: { label: 'Rejected', color: 'bg-red-500/15 text-red-400',      icon: <XCircle size={12} /> },
};

export default function AdminBookOrders() {
  const { dark } = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [actionId, setActionId] = useState(null);
  const [adminNote, setAdminNote] = useState('');
  const [copied, setCopied] = useState('');

  const card = `rounded-2xl p-5 ${dark ? 'bg-white/4 border border-white/8' : 'bg-white border border-gray-100 shadow-sm'}`;

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchAllOrders();
      setOrders(res.data || []);
    } catch (e) { setOrders([]); }
    finally { setLoading(false); }
  };

  const openOrder = async (order) => {
    setLoadingOrder(true);
    setSelectedOrder(null);
    setAdminNote('');
    try {
      const res = await fetchOrder(order._id);
      setSelectedOrder(res.data);
    } catch (e) { alert('Failed to load order details'); }
    finally { setLoadingOrder(false); }
  };

  const handleApprove = async (id) => {
    setActionId(id + '-approve');
    try {
      const res = await approveOrder(id, adminNote);
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status: 'approved' } : o));
      // Show download link in modal
      if (selectedOrder?._id === id) {
        setSelectedOrder(prev => ({ ...prev, status: 'approved', downloadToken: res.data.downloadToken }));
      }
      alert(`✅ Order approved!\n\nDownload link:\n${res.data.downloadLink}\n\nShare this link with the buyer: ${selectedOrder?.buyerEmail}`);
    } catch (e) { alert(e.message || 'Failed to approve'); }
    finally { setActionId(null); }
  };

  const handleReject = async (id) => {
    if (!adminNote.trim()) { alert('Please add a note explaining the rejection reason.'); return; }
    setActionId(id + '-reject');
    try {
      await rejectOrder(id, adminNote);
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status: 'rejected' } : o));
      if (selectedOrder?._id === id) setSelectedOrder(prev => ({ ...prev, status: 'rejected' }));
    } catch (e) { alert(e.message || 'Failed to reject'); }
    finally { setActionId(null); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this order?')) return;
    setActionId(id + '-del');
    try {
      await deleteOrder(id);
      setOrders(prev => prev.filter(o => o._id !== id));
      if (selectedOrder?._id === id) setSelectedOrder(null);
    } catch (e) { alert(e.message); }
    finally { setActionId(null); }
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(''), 2000);
    });
  };

  const displayed = filter === 'all' ? orders : orders.filter(o => o.status === filter);
  const counts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    approved: orders.filter(o => o.status === 'approved').length,
    rejected: orders.filter(o => o.status === 'rejected').length,
  };

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <Loader2 size={28} className="animate-spin text-blue-500" />
    </div>
  );

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className={`font-display text-2xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Book Orders</h2>
        <p className={`text-sm mt-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
          {counts.pending} pending · {counts.approved} approved · {counts.rejected} rejected
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: 'all',      label: `All (${counts.all})` },
          { key: 'pending',  label: `⏳ Pending (${counts.pending})` },
          { key: 'approved', label: `✅ Approved (${counts.approved})` },
          { key: 'rejected', label: `❌ Rejected (${counts.rejected})` },
        ].map(tab => (
          <button key={tab.key} onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all
              ${filter === tab.key ? 'btn-navy' : `border ${dark ? 'border-white/15 text-gray-400 hover:text-white' : 'border-gray-200 text-gray-500 hover:text-gray-800'}`}`}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* ── Orders List ── */}
        <div className="space-y-3">
          {displayed.length === 0 ? (
            <div className={`${card} text-center py-10`}>
              <BookOpen size={32} className="mx-auto text-blue-500/30 mb-2" />
              <p className={`text-sm ${dark ? 'text-gray-500' : 'text-gray-400'}`}>No orders here.</p>
            </div>
          ) : displayed.map(order => {
            const cfg = statusConfig[order.status] || statusConfig.pending;
            const isSelected = selectedOrder?._id === order._id;
            return (
              <div key={order._id}
                onClick={() => openOrder(order)}
                className={`${card} cursor-pointer transition-all
                  ${isSelected ? 'border-blue-500/40 bg-blue-500/5' : dark ? 'hover:border-white/15 hover:bg-white/5' : 'hover:border-blue-200 hover:shadow-md'}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${cfg.color}`}>
                        {cfg.icon} {cfg.label}
                      </span>
                      <span className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className={`font-semibold text-sm truncate ${dark ? 'text-white' : 'text-gray-900'}`}>
                      {order.bookTitle}
                    </p>
                    <p className={`text-xs mt-0.5 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{order.buyerName}</p>
                    <p className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{order.buyerEmail}</p>
                    <p className={`text-xs font-semibold mt-1 ${dark ? 'text-blue-400' : 'text-blue-600'}`}>
                      ₦{Number(order.bookPrice).toLocaleString()}
                    </p>
                  </div>
                  <button onClick={e => { e.stopPropagation(); handleDelete(order._id); }}
                    disabled={actionId === order._id + '-del'}
                    className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors flex-shrink-0 disabled:opacity-40">
                    {actionId === order._id + '-del' ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Order Detail Panel ── */}
        <div className={`${card} sticky top-24`} style={{ minHeight: 200 }}>
          {loadingOrder ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={24} className="animate-spin text-blue-500" />
            </div>
          ) : !selectedOrder ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Eye size={32} className={`mb-3 ${dark ? 'text-gray-600' : 'text-gray-300'}`} />
              <p className={`text-sm ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                Click an order to review the payment proof and take action
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Order info */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className={`font-display font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Order Details</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${statusConfig[selectedOrder.status]?.color}`}>
                    {statusConfig[selectedOrder.status]?.icon}
                    {statusConfig[selectedOrder.status]?.label}
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'Book', value: selectedOrder.bookTitle },
                    { label: 'Amount', value: `₦${Number(selectedOrder.bookPrice).toLocaleString()}` },
                    { label: 'Buyer', value: selectedOrder.buyerName },
                    { label: 'Email', value: selectedOrder.buyerEmail, copy: true },
                    ...(selectedOrder.buyerPhone ? [{ label: 'Phone', value: selectedOrder.buyerPhone }] : []),
                    { label: 'Submitted', value: new Date(selectedOrder.createdAt).toLocaleString() },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start justify-between gap-2">
                      <span className={`text-xs w-16 flex-shrink-0 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{item.label}</span>
                      <div className="flex items-center gap-1 flex-1 min-w-0">
                        <span className={`text-xs font-medium truncate ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{item.value}</span>
                        {item.copy && (
                          <button onClick={() => copyToClipboard(item.value, item.label)}
                            className="flex-shrink-0 text-blue-400 hover:text-blue-300 transition-colors">
                            <Copy size={11} />
                          </button>
                        )}
                        {copied === item.label && <span className="text-xs text-green-400 flex-shrink-0">Copied!</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Proof */}
              {selectedOrder.paymentProof && (
                <div>
                  <p className={`text-xs font-medium mb-2 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Payment Proof:</p>
                  {selectedOrder.paymentProof.startsWith('data:image') ? (
                    <div className="rounded-xl overflow-hidden border border-white/10">
                      <img
                        src={selectedOrder.paymentProof}
                        alt="Payment proof"
                        className="w-full max-h-56 object-contain bg-black/20"
                      />
                    </div>
                  ) : (
                    <div className={`p-3 rounded-xl border flex items-center gap-2 ${dark ? 'border-white/8 bg-white/3' : 'border-gray-200 bg-gray-50'}`}>
                      <FileText size={14} className="text-blue-400" />
                      <span className="text-xs text-gray-400">{selectedOrder.paymentProofFileName || 'proof.pdf'}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Approved download link */}
              {selectedOrder.status === 'approved' && selectedOrder.downloadToken && (
                <div className={`p-3 rounded-xl border border-green-500/20 bg-green-500/5`}>
                  <p className="text-xs text-green-400 font-medium mb-1">Download Link Generated:</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 truncate flex-1">
                      /books/download/{selectedOrder.downloadToken.slice(0, 16)}...
                    </span>
                    <button
                      onClick={() => copyToClipboard(`${window.location.origin}/books/download/${selectedOrder.downloadToken}`, 'link')}
                      className="text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0">
                      <Copy size={13} />
                    </button>
                  </div>
                  {copied === 'link' && <p className="text-xs text-green-400 mt-1">Link copied!</p>}
                </div>
              )}

              {/* Actions */}
              {selectedOrder.status === 'pending' && (
                <div className="space-y-3 pt-2 border-t border-white/8">
                  <div>
                    <label className={`block text-xs mb-1.5 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Note for buyer (required for rejection):
                    </label>
                    <textarea
                      value={adminNote}
                      onChange={e => setAdminNote(e.target.value)}
                      placeholder="e.g. Payment confirmed, here is your download link. / Payment amount doesn't match..."
                      rows={2}
                      className={`w-full px-3 py-2 rounded-xl text-xs input-navy resize-none ${dark ? 'text-white' : 'text-gray-900'}`}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleApprove(selectedOrder._id)}
                      disabled={!!actionId}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold bg-green-600 hover:bg-green-700 text-white transition-colors disabled:opacity-60">
                      {actionId === selectedOrder._id + '-approve'
                        ? <><Loader2 size={13} className="animate-spin" /> Approving...</>
                        : <><CheckCircle2 size={14} /> Approve & Generate Link</>
                      }
                    </button>
                    <button onClick={() => handleReject(selectedOrder._id)}
                      disabled={!!actionId}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors disabled:opacity-60">
                      {actionId === selectedOrder._id + '-reject'
                        ? <><Loader2 size={13} className="animate-spin" /> Rejecting...</>
                        : <><XCircle size={14} /> Reject</>
                      }
                    </button>
                  </div>
                </div>
              )}

              {selectedOrder.adminNote && (
                <div className={`p-3 rounded-xl text-xs ${dark ? 'bg-white/5 text-gray-400' : 'bg-gray-50 text-gray-600'}`}>
                  <span className="font-medium">Admin note:</span> {selectedOrder.adminNote}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
