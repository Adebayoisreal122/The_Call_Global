import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMinistry } from '../context/MinistryContext';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const { dark } = useTheme();
  const { addPrayerRequest } = useMinistry();
  const [tab, setTab] = useState('prayer');
  const [pForm, setPForm] = useState({ name: '', email: '', request: '' });
  const [cForm, setCForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [pDone, setPDone] = useState(false);
  const [cDone, setCDone] = useState(false);

  const submitPrayer = (e) => {
    e.preventDefault();
    addPrayerRequest(pForm);
    setPDone(true);
    setPForm({ name: '', email: '', request: '' });
    setTimeout(() => setPDone(false), 3000);
  };

  const submitContact = (e) => {
    e.preventDefault();
    setCDone(true);
    setCForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setCDone(false), 3000);
  };

  const inputClass = `w-full px-4 py-3 rounded-xl text-sm input-navy ${dark ? 'text-white' : 'text-gray-900'}`;

  return (
    <section id="contact" className={`py-24 ${dark ? 'bg-navy-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="divider-gold"></div>
          <h2 className={`font-display text-4xl font-bold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
            Reach <span className="gold-text">Out To Us</span>
          </h2>
          <p className={`font-body text-lg max-w-xl mx-auto ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            Send us a prayer request, book a pastoral consultation, or simply say hello.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Info */}
          <div className="space-y-6">
            {[
              { icon: <Mail size={18} />, label: 'Email', val: 'hello@thecallglobal.org' },
              { icon: <Phone size={18} />, label: 'Phone / WhatsApp', val: '+234 800 000 0000' },
              { icon: <MapPin size={18} />, label: 'Base Location', val: 'Lagos, Nigeria (Global Ministry)' },
            ].map(c => (
              <div key={c.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0">
                  {c.icon}
                </div>
                <div>
                  <div className={`text-xs uppercase tracking-wider mb-0.5 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{c.label}</div>
                  <div className={`text-sm font-medium ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{c.val}</div>
                </div>
              </div>
            ))}

            <div className={`mt-8 p-5 rounded-2xl border border-blue-600/20 ${dark ? 'bg-blue-500/5' : 'bg-blue-50'}`}>
              <h4 className={`font-display font-semibold mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>Book a Consultation</h4>
              <p className={`text-sm font-body ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                For pastoral counseling, ministry partnership, or speaking invitations, reach out and we'll schedule a session with a ministry leader.
              </p>
            </div>
          </div>

          {/* Forms */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className={`flex rounded-xl overflow-hidden mb-6 ${dark ? 'bg-white/5' : 'bg-gray-100'}`}>
              {['prayer', 'contact'].map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`flex-1 py-3 text-sm font-medium capitalize transition-all
                    ${tab === t ? 'btn-navy' : dark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`}>
                  {t === 'prayer' ? '🙏 Prayer Request' : '✉️ Send Message'}
                </button>
              ))}
            </div>

            {tab === 'prayer' ? (
              pDone ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-3">🙏</div>
                  <h4 className={`font-display text-xl font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>We're Praying!</h4>
                  <p className={`text-sm mt-2 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Your prayer request has been received. Our prayer team will stand with you.</p>
                </div>
              ) : (
                <form onSubmit={submitPrayer} className="space-y-4">
                  <input value={pForm.name} onChange={e => setPForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your Name *" required className={inputClass} />
                  <input value={pForm.email} onChange={e => setPForm(f => ({ ...f, email: e.target.value }))}
                    type="email" placeholder="Email Address" className={inputClass} />
                  <textarea value={pForm.request} onChange={e => setPForm(f => ({ ...f, request: e.target.value }))}
                    placeholder="Share your prayer request... We keep all requests in strict confidence." required
                    rows={5} className={`${inputClass} resize-none`} />
                  <button type="submit" className="btn-navy w-full py-3.5 rounded-xl text-sm flex items-center justify-center gap-2">
                    <Send size={15} /> Send Prayer Request
                  </button>
                </form>
              )
            ) : (
              cDone ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-3">✉️</div>
                  <h4 className={`font-display text-xl font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>Message Sent!</h4>
                  <p className={`text-sm mt-2 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>We'll respond within 24-48 hours. God bless you!</p>
                </div>
              ) : (
                <form onSubmit={submitContact} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input value={cForm.name} onChange={e => setCForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your Name *" required className={inputClass} />
                    <input value={cForm.email} onChange={e => setCForm(f => ({ ...f, email: e.target.value }))}
                      type="email" placeholder="Email Address *" required className={inputClass} />
                  </div>
                  <input value={cForm.subject} onChange={e => setCForm(f => ({ ...f, subject: e.target.value }))}
                    placeholder="Subject" className={inputClass} />
                  <textarea value={cForm.message} onChange={e => setCForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Your message..." required rows={5} className={`${inputClass} resize-none`} />
                  <button type="submit" className="btn-navy w-full py-3.5 rounded-xl text-sm flex items-center justify-center gap-2">
                    <Send size={15} /> Send Message
                  </button>
                </form>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
