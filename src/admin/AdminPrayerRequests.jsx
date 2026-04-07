import { useTheme } from '../context/ThemeContext';
import { useMinistry } from '../context/MinistryContext';
import { Trash2, MessageSquare, Heart } from 'lucide-react';

export default function AdminPrayerRequests() {
  const { dark } = useTheme();
  const { prayerRequests, deletePrayerRequest } = useMinistry();

  const card = `rounded-2xl p-6 ${dark ? 'bg-white/4 border border-white/8' : 'bg-white border border-gray-100 shadow-sm'}`;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className={`font-display text-2xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Prayer Requests</h2>
        <p className={`text-sm mt-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{prayerRequests.length} requests received</p>
      </div>

      {prayerRequests.length === 0 ? (
        <div className={`${card} text-center py-16`}>
          <MessageSquare size={40} className="mx-auto text-blue-500/40 mb-3" />
          <p className={`font-body text-lg ${dark ? 'text-gray-400' : 'text-gray-500'}`}>No prayer requests yet.</p>
          <p className={`text-sm mt-1 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>When visitors submit prayer requests, they'll appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {[...prayerRequests].reverse().map(r => (
            <div key={r.id} className={`${card} flex items-start gap-4`}>
              <div className="w-9 h-9 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0 mt-0.5">
                <Heart size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`font-semibold text-sm ${dark ? 'text-white' : 'text-gray-900'}`}>{r.name || 'Anonymous'}</span>
                  {r.email && <span className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>· {r.email}</span>}
                  <span className={`text-xs ml-auto ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{r.date}</span>
                </div>
                <p className={`text-sm leading-relaxed font-body ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{r.request}</p>
              </div>
              <button onClick={() => deletePrayerRequest(r.id)}
                className="p-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors flex-shrink-0">
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Scripture Encouragement */}
      <div className={`p-5 rounded-2xl border border-blue-600/20 ${dark ? 'bg-blue-500/5' : 'bg-blue-50'}`}>
        <p className={`font-body italic text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
          "The prayer of a righteous person is powerful and effective." — <span className="text-blue-600 not-italic font-medium">James 5:16b</span>
        </p>
      </div>
    </div>
  );
}
