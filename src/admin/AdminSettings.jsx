import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { changePassword, updateProfile } from '../services/api';
import {
  Lock, Loader2, CheckCircle2, AlertCircle,
  Eye, EyeOff, Shield, User, Mail, Pencil,
} from 'lucide-react';

export default function AdminSettings() {
  const { dark } = useTheme();
  const { admin, refreshAdmin } = useAuth();

  // ── Profile form ─────────────────────────────────────────────────────────
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState('');

  // Populate profile form from current admin data
  useEffect(() => {
    if (admin) setProfile({ name: admin.name || '', email: admin.email || '' });
  }, [admin]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess(false);

    if (!profile.name.trim()) return setProfileError('Name cannot be empty.');
    if (!profile.email.trim()) return setProfileError('Email cannot be empty.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email))
      return setProfileError('Please enter a valid email address.');

    // No changes made
    if (profile.name === admin.name && profile.email === admin.email) {
      return setProfileError('No changes were made.');
    }

    setProfileSaving(true);
    try {
      const res = await updateProfile(profile);
      refreshAdmin(res.admin); // update navbar, sidebar immediately
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 4000);
    } catch (err) {
      setProfileError(err.message);
    } finally {
      setProfileSaving(false);
    }
  };

  // ── Password form ─────────────────────────────────────────────────────────
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (passwords.newPassword !== passwords.confirmPassword)
      return setPasswordError('New passwords do not match.');
    if (passwords.newPassword.length < 6)
      return setPasswordError('New password must be at least 6 characters.');
    if (passwords.newPassword === passwords.currentPassword)
      return setPasswordError('New password must be different from the current one.');

    setPasswordSaving(true);
    try {
      await changePassword(passwords.currentPassword, passwords.newPassword);
      setPasswordSuccess(true);
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setPasswordSuccess(false), 4000);
    } catch (err) {
      setPasswordError(err.message);
    } finally {
      setPasswordSaving(false);
    }
  };

  // Password strength
  const getStrength = (pw) => {
    if (!pw) return null;
    let score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    const levels = [
      { label: 'Weak',        color: 'bg-red-500',    width: '20%' },
      { label: 'Weak',        color: 'bg-red-500',    width: '20%' },
      { label: 'Fair',        color: 'bg-orange-500', width: '45%' },
      { label: 'Good',        color: 'bg-yellow-500', width: '65%' },
      { label: 'Strong',      color: 'bg-green-500',  width: '85%' },
      { label: 'Very Strong', color: 'bg-green-400',  width: '100%' },
    ];
    return levels[score];
  };
  const strength = getStrength(passwords.newPassword);

  // ── Shared styles ─────────────────────────────────────────────────────────
  const card = `rounded-2xl p-6 ${dark ? 'bg-white/4 border border-white/8' : 'bg-white border border-gray-100 shadow-sm'}`;
  const input = `w-full pl-10 py-3 rounded-xl text-sm input-navy ${dark ? 'text-white placeholder-gray-600' : 'text-gray-900 placeholder-gray-400'}`;
  const label = `block text-xs font-medium mb-1.5 ${dark ? 'text-gray-400' : 'text-gray-600'}`;

  const Alert = ({ type, message }) => (
    <div className={`mb-5 flex items-start gap-3 p-4 rounded-xl border
      ${type === 'success'
        ? 'bg-green-500/10 border-green-500/20'
        : 'bg-red-500/10 border-red-500/20'}`}>
      {type === 'success'
        ? <CheckCircle2 size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
        : <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />}
      <p className={`text-sm ${type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{message}</p>
    </div>
  );

  const PasswordField = ({ field, placeholder, showKey }) => (
    <div className="relative">
      <Lock size={14} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${dark ? 'text-gray-500' : 'text-gray-400'}`} />
      <input
        type={show[showKey] ? 'text' : 'password'}
        value={passwords[field]}
        onChange={(e) => setPasswords((p) => ({ ...p, [field]: e.target.value }))}
        placeholder={placeholder}
        required
        className={`${input} pr-11`}
      />
      <button
        type="button"
        onClick={() => setShow((s) => ({ ...s, [showKey]: !s[showKey] }))}
        className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors
          ${dark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
      >
        {show[showKey] ? <EyeOff size={14} /> : <Eye size={14} />}
      </button>
    </div>
  );

  return (
    <div className="space-y-6 max-w-xl">
      {/* Header */}
      <div>
        <h2 className={`font-display text-2xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>
          Settings
        </h2>
        <p className={`text-sm mt-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
          Manage your admin account details and credentials
        </p>
      </div>

      {/* ── Edit Profile ───────────────────────────────────────────────────── */}
      <div className={card}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400">
            <Pencil size={15} />
          </div>
          <h3 className={`font-display font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>
            Edit Profile
          </h3>
        </div>

        {profileSuccess && <Alert type="success" message="Profile updated successfully!" />}
        {profileError && <Alert type="error" message={profileError} />}

        <form onSubmit={handleProfileSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className={label}>Full Name</label>
            <div className="relative">
              <User size={14} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${dark ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                placeholder="Your name"
                required
                className={input}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className={label}>Email Address</label>
            <div className="relative">
              <Mail size={14} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${dark ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                placeholder="admin@example.com"
                required
                className={input}
              />
            </div>
            <p className={`text-xs mt-1.5 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
              Changing your email will update your login credentials.
            </p>
          </div>

          {/* Role — read only */}
          <div>
            <label className={label}>Role</label>
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed
              border-blue-500/20 bg-blue-500/5">
              <span className="text-xs bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded-full capitalize font-medium">
                {admin?.role}
              </span>
              <span className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                Role cannot be changed here
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={profileSaving}
            className="btn-navy w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {profileSaving
              ? <><Loader2 size={14} className="animate-spin" /> Saving Changes...</>
              : <><User size={14} /> Save Profile Changes</>
            }
          </button>
        </form>
      </div>

      {/* ── Change Password ────────────────────────────────────────────────── */}
      <div className={card}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400">
            <Shield size={15} />
          </div>
          <h3 className={`font-display font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>
            Change Password
          </h3>
        </div>

        {passwordSuccess && <Alert type="success" message="Password updated successfully!" />}
        {passwordError && <Alert type="error" message={passwordError} />}

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className={label}>Current Password</label>
            <PasswordField field="currentPassword" placeholder="Enter current password" showKey="current" />
          </div>

          <div>
            <label className={label}>New Password</label>
            <PasswordField field="newPassword" placeholder="Enter new password" showKey="new" />
            {/* Strength bar */}
            {passwords.newPassword && strength && (
              <div className="mt-2">
                <div className={`h-1.5 w-full rounded-full ${dark ? 'bg-white/10' : 'bg-gray-100'}`}>
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                    style={{ width: strength.width }}
                  />
                </div>
                <p className={`text-xs mt-1 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                  Strength: <span className="font-medium">{strength.label}</span>
                </p>
              </div>
            )}
          </div>

          <div>
            <label className={label}>Confirm New Password</label>
            <PasswordField field="confirmPassword" placeholder="Repeat new password" showKey="confirm" />
            {/* Match indicator */}
            {passwords.confirmPassword && (
              <p className={`text-xs mt-1.5 flex items-center gap-1
                ${passwords.newPassword === passwords.confirmPassword ? 'text-green-400' : 'text-red-400'}`}>
                {passwords.newPassword === passwords.confirmPassword
                  ? <><CheckCircle2 size={11} /> Passwords match</>
                  : <><AlertCircle size={11} /> Passwords do not match</>
                }
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={passwordSaving}
            className="btn-navy w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {passwordSaving
              ? <><Loader2 size={14} className="animate-spin" /> Updating Password...</>
              : <><Shield size={14} /> Update Password</>
            }
          </button>
        </form>
      </div>

      {/* Security Tips */}
      <div className={`p-5 rounded-2xl border border-blue-600/20 ${dark ? 'bg-blue-500/5' : 'bg-blue-50'}`}>
        <h4 className={`text-sm font-semibold mb-2 ${dark ? 'text-blue-300' : 'text-blue-700'}`}>
          🔒 Security Tips
        </h4>
        <ul className={`text-xs space-y-1.5 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
          <li>• Use at least 8 characters with a mix of letters, numbers and symbols</li>
          <li>• Never share your admin credentials with anyone</li>
          <li>• Change your password every 3–6 months</li>
          <li>• After changing your email, use the new email to log in next time</li>
        </ul>
      </div>
    </div>
  );
}
