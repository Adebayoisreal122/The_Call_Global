import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMinistry } from '../context/MinistryContext';
import { Users, Search, Download, Trash2, Loader2 } from 'lucide-react';

export default function AdminRegistrations() {
  const { dark } = useTheme();
  const { registrations, loadRegistrations, removeRegistration } = useMinistry();
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    loadRegistrations().then(() => setLoaded(true));
  }, []);

  const filtered = registrations.filter((r) =>
    r.name?.toLowerCase().includes(search.toLowerCase()) ||
    r.email?.toLowerCase().includes(search.toLowerCase()) ||
    r.country?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!confirm('Remove this registration?')) return;
    setDeleting(id);
    try { await removeRegistration(id); }
    catch (e) { alert(e.message); }
    finally { setDeleting(null); }
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Country', 'Interest', 'Date'];
    const rows = registrations.map((r) => [r.name, r.email, r.phone, r.country, r.interest, new Date(r.createdAt).toLocaleDateString()]);
    const csv = [headers, ...rows].map((row) => row.map((v) => `"${v || ''}"`).join(',')).join('\n');
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    a.download = `tcg-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const card = `rounded-2xl ${dark ? 'bg-white/4 border border-white/8' : 'bg-white border border-gray-100 shadow-sm'}`;

  if (!loaded) return (
    <div className="flex items-center justify-center py-24">
      <Loader2 size={28} className="animate-spin text-blue-500" />
    </div>
  );

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className={`font-display text-2xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Registrations</h2>
          <p className={`text-sm mt-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{registrations.length} members registered</p>
        </div>
        {registrations.length > 0 && (
          <button onClick={exportCSV} className="btn-outline-navy px-5 py-2.5 rounded-xl text-sm flex items-center gap-2">
            <Download size={15} /> Export CSV
          </button>
        )}
      </div>

      {registrations.length > 0 && (
        <div className="relative max-w-md">
          <Search size={15} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${dark ? 'text-gray-500' : 'text-gray-400'}`} />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email or country..."
            className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm input-navy ${dark ? 'text-white' : 'text-gray-900'}`} />
        </div>
      )}

      {registrations.length === 0 ? (
        <div className={`${card} p-6 text-center py-16`}>
          <Users size={40} className="mx-auto text-blue-500/40 mb-3" />
          <p className={`font-body text-lg ${dark ? 'text-gray-400' : 'text-gray-500'}`}>No registrations yet.</p>
        </div>
      ) : (
        <div className={`${card} overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={`border-b ${dark ? 'border-white/8 text-gray-400' : 'border-gray-100 text-gray-500'}`}>
                  {['Member', 'Email', 'Phone', 'Country', 'Interest', 'Joined', ''].map((h) => (
                    <th key={h} className="text-left px-5 py-4 font-medium text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r._id} className={`border-b transition-colors ${dark ? 'border-white/5 hover:bg-white/3' : 'border-gray-50 hover:bg-gray-50'}`}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0a1a6b] to-[#1e3db5] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {r.name?.[0] || '?'}
                        </div>
                        <span className={`font-medium whitespace-nowrap ${dark ? 'text-white' : 'text-gray-900'}`}>{r.name}</span>
                      </div>
                    </td>
                    <td className={`px-5 py-3.5 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{r.email}</td>
                    <td className={`px-5 py-3.5 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{r.phone || '—'}</td>
                    <td className={`px-5 py-3.5 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{r.country || '—'}</td>
                    <td className="px-5 py-3.5">
                      {r.interest ? (
                        <span className="text-xs bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded-full whitespace-nowrap">{r.interest}</span>
                      ) : '—'}
                    </td>
                    <td className={`px-5 py-3.5 text-xs whitespace-nowrap ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3.5">
                      <button onClick={() => handleDelete(r._id)} disabled={deleting === r._id}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-40">
                        {deleting === r._id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && search && (
            <div className={`text-center py-10 text-sm ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
              No results for "{search}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
