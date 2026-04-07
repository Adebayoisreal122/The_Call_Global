import { useTheme } from '../context/ThemeContext';
import { useMinistry } from '../context/MinistryContext';
import { CheckCircle2, Trash2, Star, Clock } from 'lucide-react';

export default function AdminTestimonies() {
  const { dark } = useTheme();
  const { testimonies, approveTestimony, deleteTestimony } = useMinistry();

  const card = `rounded-2xl p-6 ${dark ? 'bg-white/4 border border-white/8' : 'bg-white border border-gray-100 shadow-sm'}`;
  const pending = testimonies.filter(t => !t.approved);
  const approved = testimonies.filter(t => t.approved);

  const Section = ({ title, items, icon }) => (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className={`font-display text-lg font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full ${dark ? 'bg-white/10 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>{items.length}</span>
      </div>
      {items.length === 0 ? (
        <div className={`${card} text-center py-8`}>
          <p className={`text-sm ${dark ? 'text-gray-500' : 'text-gray-400'}`}>None here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map(t => (
            <div key={t.id} className={`${card} relative`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {t.name?.[0] || '?'}
                  </div>
                  <div>
                    <div className={`font-semibold text-sm ${dark ? 'text-white' : 'text-gray-900'}`}>{t.name}</div>
                    <div className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{t.location} · {t.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!t.approved && (
                    <button onClick={() => approveTestimony(t.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/15 text-green-400 text-xs hover:bg-green-500/25 transition-colors">
                      <CheckCircle2 size={13} /> Approve
                    </button>
                  )}
                  <button onClick={() => deleteTestimony(t.id)}
                    className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <p className={`mt-3 text-sm leading-relaxed font-body ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{t.text}</p>
              {!t.approved && (
                <span className="absolute top-4 right-[100px] text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full hidden sm:block">
                  Pending
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-10 max-w-4xl">
      <div>
        <h2 className={`font-display text-2xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Testimonies</h2>
        <p className={`text-sm mt-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{testimonies.length} total · {pending.length} awaiting review</p>
      </div>

      <Section
        title="Pending Review"
        items={pending}
        icon={<Clock size={18} className="text-orange-400" />}
      />
      <Section
        title="Approved & Published"
        items={approved}
        icon={<Star size={18} className="text-yellow-500" />}
      />
    </div>
  );
}
