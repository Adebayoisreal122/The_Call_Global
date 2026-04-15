import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { registerForProgram } from '../services/api';
import { X, Loader2, CheckCircle2, AlertCircle, User, Phone, Mail, MapPin, ChevronRight } from 'lucide-react';

const programs = [
  { title: 'School of Ministry', image: '/School.jpg', desc: 'Equipping believers for deeper spiritual growth and service.', tag: 'Training' },
  { title: 'Discipleship Class', image: '/Discipleship.jpg', desc: 'Building strong foundations in Christ.', tag: 'Growth' },
  { title: 'Bible Class', image: '/bible.jpg', desc: 'Understanding the Word with clarity and revelation.', tag: 'Study' },
  { title: 'Leadership Class', image: '/Leadership.jfif', desc: 'Raising leaders for kingdom impact.', tag: 'Leadership' },
  { title: 'Teenagers Discipleship', image: '/Teenagers.jfif', desc: 'Guiding the next generation in truth.', tag: 'Youth' },
  { title: 'Teenagers Bible Class', image: '/Teenagers2.jfif', desc: "Helping teens grow in God's Word.", tag: 'Youth' },
  { title: 'Clarion Call', image: '/Clarion.png', desc: 'A movement calling hearts back to God.', tag: 'Outreach' },
  { title: 'University Chapters', image: '/University.jpg', desc: 'Start a chapter in your campus and impact lives.', tag: 'Campus' },
];

const tagColors = {
  Training:   'bg-blue-500/15 text-blue-400',
  Growth:     'bg-green-500/15 text-green-400',
  Study:      'bg-violet-500/15 text-violet-400',
  Leadership: 'bg-amber-500/15 text-amber-400',
  Youth:      'bg-pink-500/15 text-pink-400',
  Outreach:   'bg-orange-500/15 text-orange-400',
  Campus:     'bg-cyan-500/15 text-cyan-400',
};

const emptyForm = { name: '', phone: '', email: '', gender: '', age: '', city: '', message: '' };

export default function MinistryPrograms() {
  const { dark } = useTheme();
  const [selected, setSelected] = useState(null); // the program clicked
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const openModal = (program) => {
    setSelected(program);
    setForm(emptyForm);
    setSuccess('');
    setError('');
  };

  const closeModal = () => {
    if (saving) return; // prevent closing while submitting
    setSelected(null);
    setSuccess('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const res = await registerForProgram({ ...form, programTitle: selected.title });
      setSuccess(res.message);
      setForm(emptyForm);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const input = `w-full px-4 py-3 rounded-xl text-sm border transition-colors focus:outline-none
    ${dark
      ? 'bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-blue-500 focus:bg-white/8'
      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white'
    }`;

  return (
    <>
      {/* ── Programs Grid ──────────────────────────────────────────────────── */}
      <section className={`py-20 ${dark ? 'bg-gray-950' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="divider-navy"></div>
          <h2 className={`font-display text-3xl md:text-4xl font-bold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
            Grow <span className="brand-text">With Us</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto mb-12 font-body ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            Explore our training programs, discipleship pathways, and outreach movements designed to build lives and raise leaders. Click any program to register.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {programs.map((program, index) => (
              <div
                key={index}
                onClick={() => openModal(program)}
                className={`group rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-2
                  ${dark
                    ? 'bg-gray-900 border border-white/8 hover:border-blue-500/40 hover:shadow-blue-900/30 hover:shadow-xl'
                    : 'bg-white border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50'
                  }`}
              >
                {/* Image */}
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentNode.classList.add('hero-gradient');
                    }}
                  />
                  {/* Tag badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm ${tagColors[program.tag] || 'bg-blue-500/15 text-blue-400'}`}>
                      {program.tag}
                    </span>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <span className="text-white text-xs font-semibold flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
                      Register Now <ChevronRight size={12} />
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 text-left">
                  <h3 className={`font-display text-base font-semibold mb-1.5 group-hover:text-blue-500 transition-colors ${dark ? 'text-white' : 'text-gray-900'}`}>
                    {program.title}
                  </h3>
                  <p className={`text-xs leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {program.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Registration Modal ─────────────────────────────────────────────── */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className={`w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl
            ${dark ? 'bg-gray-900 border border-white/10' : 'bg-white border border-gray-100'}`}
            style={{ maxHeight: '90vh', overflowY: 'auto' }}
          >
            {/* Modal Header */}
            <div className="relative hero-gradient p-6">
              <button
                onClick={closeModal}
                disabled={saving}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors disabled:opacity-40"
              >
                <X size={16} />
              </button>
              <div className="pr-10">
                <p className="text-blue-200/70 text-xs uppercase tracking-wider font-medium mb-1">Register for</p>
                <h3 className="font-display text-2xl font-bold text-white">{selected.title}</h3>
                <p className="text-blue-100/70 text-sm mt-1">{selected.desc}</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {success ? (
                /* ── Success State ── */
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-green-400" />
                  </div>
                  <h4 className={`font-display text-xl font-bold mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>
                    Registration Successful!
                  </h4>
                  <p className={`text-sm leading-relaxed mb-6 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {success}
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => { setSuccess(''); setForm(emptyForm); }}
                      className="btn-outline-navy px-5 py-2 rounded-full text-sm"
                    >
                      Register Another Person
                    </button>
                    <button onClick={closeModal} className="btn-navy px-5 py-2 rounded-full text-sm">
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                /* ── Form ── */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className={`text-xs mb-4 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                    Fields marked <span className="text-red-400">*</span> are required. Your details will be sent directly to our ministry team.
                  </p>

                  {error && (
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                      <AlertCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  {/* Full Name */}
                  <div className="relative">
                    <User size={14} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${dark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Full Name *"
                      required
                      className={`${input} pl-10`}
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <Phone size={14} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${dark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="Phone / WhatsApp Number *"
                      required
                      className={`${input} pl-10`}
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <Mail size={14} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${dark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="Email Address (for confirmation)"
                      className={`${input} pl-10`}
                    />
                  </div>

                  {/* Gender + Age in two columns */}
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={form.gender}
                      onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))}
                      className={`${input} ${dark ? 'bg-gray-800' : 'bg-gray-50'}`}
                    >
                      <option value="">Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Prefer not to say</option>
                    </select>

                    <select
                      value={form.age}
                      onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
                      className={`${input} ${dark ? 'bg-gray-800' : 'bg-gray-50'}`}
                    >
                      <option value="">Age Range</option>
                      <option>Under 13</option>
                      <option>13 – 17</option>
                      <option>18 – 24</option>
                      <option>25 – 34</option>
                      <option>35 – 44</option>
                      <option>45 – 54</option>
                      <option>55+</option>
                    </select>
                  </div>

                  {/* City */}
                  <div className="relative">
                    <MapPin size={14} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${dark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      value={form.city}
                      onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                      placeholder="City / Country"
                      className={`${input} pl-10`}
                    />
                  </div>

                  {/* Message */}
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Any additional information or questions... (optional)"
                    rows={3}
                    className={`${input} resize-none`}
                  />

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn-navy w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {saving
                      ? <><Loader2 size={15} className="animate-spin" /> Submitting Registration...</>
                      : <>Register for {selected.title} →</>
                    }
                  </button>

                  <p className={`text-xs text-center ${dark ? 'text-gray-600' : 'text-gray-400'}`}>
                    Your details will be sent to our ministry team. We'll contact you shortly.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
