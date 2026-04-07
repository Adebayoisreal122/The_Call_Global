import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useMinistry } from '../context/MinistryContext';
import { MessageCircle, Send, Users, ArrowRight } from 'lucide-react';

const communities = [
  { icon: <MessageCircle size={22} />, label: 'WhatsApp Community', desc: 'Join our active WhatsApp community for daily devotionals and updates.', color: 'from-green-500 to-green-600', href: 'https://chat.whatsapp.com/your-link' },
  { icon: <Send size={22} />, label: 'Telegram Channel', desc: 'Get ministry updates, teachings, and prayer alerts on Telegram.', color: 'from-blue-500 to-blue-600', href: 'https://t.me/thecallglobal' },
  { icon: <Users size={22} />, label: 'Online Community', desc: 'Connect with believers worldwide through our digital community platform.', color: 'from-purple-500 to-purple-600', href: '#' },
];

export default function Join() {
  const { dark } = useTheme();
  const { addRegistration } = useMinistry();
  const [form, setForm] = useState({ name: '', email: '', phone: '', country: '', interest: '' });
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addRegistration(form);
    setDone(true);
    setForm({ name: '', email: '', phone: '', country: '', interest: '' });
  };

  return (
    <section id="join" className={`py-24 ${dark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="divider-gold"></div>
          <h2 className={`font-display text-4xl font-bold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
            Answer The <span className="gold-text">Call</span>
          </h2>
          <p className={`font-body text-lg max-w-xl mx-auto ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            There are multiple ways to connect and be a part of what God is doing through this ministry.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Registration Form */}
          <div className={`p-8 rounded-3xl ${dark ? 'bg-white/4 border border-white/8' : 'bg-white border border-gray-100 shadow-sm'}`}>
            <h3 className={`font-display text-2xl font-semibold mb-6 ${dark ? 'text-white' : 'text-gray-900'}`}>
              Register as a Member
            </h3>
            {done ? (
              <div className="text-center py-10">
                <div className="text-6xl mb-4">🎉</div>
                <h4 className={`font-display text-2xl font-bold mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>Welcome to the Family!</h4>
                <p className={`font-body text-base ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                  You have been registered successfully. We'll reach out to you shortly with next steps.
                </p>
                <button onClick={() => setDone(false)} className="mt-6 btn-outline-gold px-6 py-2 rounded-full text-sm">
                  Register Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Full Name *" required
                    className={`col-span-2 w-full px-4 py-3 rounded-xl text-sm input-gold ${dark ? 'text-white' : 'text-gray-900'}`} />
                  <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    type="email" placeholder="Email Address *" required
                    className={`w-full px-4 py-3 rounded-xl text-sm input-gold ${dark ? 'text-white' : 'text-gray-900'}`} />
                  <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="Phone / WhatsApp"
                    className={`w-full px-4 py-3 rounded-xl text-sm input-gold ${dark ? 'text-white' : 'text-gray-900'}`} />
                </div>
                <input value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                  placeholder="Country / City"
                  className={`w-full px-4 py-3 rounded-xl text-sm input-gold ${dark ? 'text-white' : 'text-gray-900'}`} />
                <select value={form.interest} onChange={e => setForm(f => ({ ...f, interest: e.target.value }))}
                  className={`w-full px-4 py-3 rounded-xl text-sm input-gold ${dark ? 'text-white bg-orange-900' : 'text-gray-900 bg-dark'}`}>
                  <option className={`${dark ? 'text-white bg-gray-900' : 'text-gray-900 bg-dark'}`} value="">Area of Your Interest</option>
                  <option className={`${dark ? 'text-white bg-gray-900' : 'text-gray-900 bg-dark'}`}>Prayer & Intercession</option>
                  <option className={`${dark ? 'text-white bg-gray-900' : 'text-gray-900 bg-dark'}`}>Word Ministry / Teaching</option>
                  <option className={`${dark ? 'text-white bg-gray-900' : 'text-gray-900 bg-dark'}`}>Music & Worship</option>
                  <option className={`${dark ? 'text-white bg-gray-900' : 'text-gray-900 bg-dark'}`}>Media & Technology</option>
                  <option className={`${dark ? 'text-white bg-gray-900' : 'text-gray-900 bg-dark'}`}>Missions & Evangelism</option>
                  <option className={`${dark ? 'text-white bg-gray-900' : 'text-gray-900 bg-dark'}`}>Youth Ministry</option>
                  <option className={`${dark ? 'text-white bg-gray-900' : 'text-gray-900 bg-dark'}`}>General Member</option>
                </select>
                <button type="submit" className="btn-gold w-full py-3.5 rounded-xl text-sm flex items-center justify-center gap-2">
                  Join The Ministry <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>

          {/* Community Options */}
          <div className="space-y-4">
            <h3 className={`font-display text-2xl font-semibold mb-6 ${dark ? 'text-white' : 'text-gray-900'}`}>
              Join Our Communities
            </h3>
            {communities.map((c, i) => (
              <a key={i} href={c.href} target="_blank" rel="noreferrer"
                className={`flex items-center gap-5 p-5 rounded-2xl group transition-all
                  ${dark
                    ? 'bg-white/4 border border-white/8 hover:border-yellow-600/30 hover:bg-white/6'
                    : 'bg-white border border-gray-100 hover:border-yellow-500/30 shadow-sm hover:shadow-md'
                  }`}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  {c.icon}
                </div>
                <div className="flex-1">
                  <div className={`font-semibold text-sm mb-0.5 ${dark ? 'text-white' : 'text-gray-900'}`}>{c.label}</div>
                  <div className={`text-xs leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{c.desc}</div>
                </div>
                <ArrowRight size={16} className="text-yellow-500 group-hover:translate-x-1 transition-transform" />
              </a>
            ))}

            <div className={`mt-6 p-5 rounded-2xl border border-yellow-600/20 ${dark ? 'bg-yellow-500/5' : 'bg-yellow-50'}`}>
              <p className={`font-body text-sm italic ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                "And let us consider how to stir up one another to love and good works, not neglecting to meet together..."
              </p>
              <cite className="text-yellow-600 text-xs not-italic font-medium mt-2 block">— Hebrews 10:24-25</cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
