import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMinistry } from '../context/MinistryContext';
import { Trash2, MessageSquare, Heart, CheckCheck, Loader2 } from 'lucide-react';

export default function AdminPrayerRequests() {
  const { dark } = useTheme();
  const { prayerRequests, loadPrayerRequests, markPrayed, removePrayerRequest } = useMinistry();
  const [loaded, setLoaded] = useState(false);
  const [actionId, setActionId] = useState(null);

  useEffect(() => {
    loadPrayerRequests().then(() => setLoaded(true));
  }, []);

  const card = `rounded-2xl p-5 ${dark ? 'bg-white/4 border border-white/8' : 'bg-white border border-gray-100 shadow-sm'}`;

  const handleMarkPrayed = async (id) => {
    setActionId(id);
    try { await markPrayed(id); }
    catch (e) { alert(e.message); }
    finally { setActionId(null); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this prayer request?')) return;
    setActionId(id);
    try { await removePrayerRequest(id); }
    catch (e) { alert(e.message); }
    finally { setActionId(null); }
  };

  if (!loaded) return (
    <div className="flex items-center justify-center py-24">
      <Loader2 size={28} className="animate-spin text-blue-500" />
    </div>
  );

  const unread = prayerRequests.filter((r) => !r.isRead);
  const read = prayerRequests.filter((r) => r.isRead);

  const RequestCard = ({ r }) => (
    <div className={`${card} flex items-start gap-4`}>
      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
        ${r.isRead ? 'bg-green-500/15 text-green-400' : 'bg-violet-500/15 text-violet-400'}`}>
        {r.isRead ? <CheckCheck size={16} /> : <Heart size={16} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className={`font-semibold text-sm ${dark ? 'text-white' : 'text-gray-900'}`}>{r.name || 'Anonymous'}</span>
          {r.email && <span className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>· {r.email}</span>}
          <span className={`text-xs ml-auto ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
            {new Date(r.createdAt).toLocaleDateString()}
          </span>
        </div>
        <p className={`text-sm leading-relaxed font-body ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{r.request}</p>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        {!r.isRead && (
          <button onClick={() => handleMarkPrayed(r._id)} disabled={actionId === r._id}
            className="p-2 rounded-xl text-green-400 hover:bg-green-500/10 transition-colors disabled:opacity-40"
            title="Mark as prayed for">
            {actionId === r._id ? <Loader2 size={15} className="animate-spin" /> : <CheckCheck size={15} />}
          </button>
        )}
        <button onClick={() => handleDelete(r._id)} disabled={actionId === r._id}
          className="p-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-40">
          {actionId === r._id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className={`font-display text-2xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Prayer Requests</h2>
        <p className={`text-sm mt-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
          {prayerRequests.length} total · {unread.length} need prayer · click ✓ to mark prayed for
        </p>
      </div>

      {prayerRequests.length === 0 ? (
        <div className={`${card} text-center py-16`}>
          <MessageSquare size={40} className="mx-auto text-blue-500/40 mb-3" />
          <p className={`font-body text-lg ${dark ? 'text-gray-400' : 'text-gray-500'}`}>No prayer requests yet.</p>
        </div>
      ) : (
        <>
          {unread.length > 0 && (
            <div>
              <h3 className={`font-display font-semibold mb-4 flex items-center gap-2 ${dark ? 'text-white' : 'text-gray-900'}`}>
                <Heart size={16} className="text-violet-400" /> Needs Prayer
                <span className="text-xs bg-violet-500/15 text-violet-400 px-2 py-0.5 rounded-full">{unread.length}</span>
              </h3>
              <div className="space-y-3">{unread.map((r) => <RequestCard key={r._id} r={r} />)}</div>
            </div>
          )}
          {read.length > 0 && (
            <div>
              <h3 className={`font-display font-semibold mb-4 flex items-center gap-2 ${dark ? 'text-white' : 'text-gray-900'}`}>
                <CheckCheck size={16} className="text-green-400" /> Prayed For
                <span className="text-xs bg-green-500/15 text-green-400 px-2 py-0.5 rounded-full">{read.length}</span>
              </h3>
              <div className="space-y-3">{read.map((r) => <RequestCard key={r._id} r={r} />)}</div>
            </div>
          )}
        </>
      )}

      <div className={`p-5 rounded-2xl border border-blue-600/20 ${dark ? 'bg-blue-500/5' : 'bg-blue-50'}`}>
        <p className={`font-body italic text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
          "The prayer of a righteous person is powerful and effective." —{' '}
          <span className="text-blue-500 not-italic font-medium">James 5:16b</span>
        </p>
      </div>
    </div>
  );
}
