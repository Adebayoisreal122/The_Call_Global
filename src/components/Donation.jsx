import { useTheme } from '../context/ThemeContext';
import { Copy, Heart } from 'lucide-react';
import { useState } from 'react';

export default function Donation() {
  const { dark } = useTheme();
  const [copied, setCopied] = useState('');

  const accounts = [
    {
      bank: 'Palmpay',
      name: 'Ajibola Pamilerin',
      number: '9078757151',
      purpose: 'Donations',
    },
    {
      bank: 'Kuda',
      name: 'Gloria Adunmo Bukunmi',
      number: '3002359073',
      purpose: 'Partnership & Sponsorship',
    },
  ];

  const handleCopy = (number) => {
    navigator.clipboard.writeText(number);
    setCopied(number);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <section className={`py-20 ${dark ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Header */}
        <div className="flex justify-center mb-4 text-blue-600">
          <Heart size={40} />
        </div>

        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
          Support the Mission
        </h2>

        <p className={`text-lg max-w-2xl mx-auto mb-10 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
          Your giving helps us reach more lives, spread the Gospel, and impact communities globally.
        </p>

        {/* Accounts Grid */}
        <div className="grid item-center md:grid-cols-3 gap-6">

          {accounts.map((acc, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl shadow-lg text-left ${
                dark ? 'bg-gray-900 text-white' : 'bg-white'
              }`}
            >
              <p className="text-sm text-blue-500 mb-2">{acc.purpose}</p>

              <h3 className="text-xl font-semibold mb-2">{acc.bank}</h3>

              <p className="text-sm mb-1">
                <strong>Account Name:</strong> {acc.name}
              </p>

              <p className="text-lg font-bold tracking-widest mb-4">
                {acc.number}
              </p>

              <button
                onClick={() => handleCopy(acc.number)}
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                <Copy size={16} />
                {copied === acc.number ? 'Copied!' : 'Copy Account Number'}
              </button>
            </div>
          ))}

        </div>

        {/* Trust Note */}
        <p className="text-sm mt-10 text-gray-400">
          All donations are handled securely and used for ministry purposes.
        </p>

      </div>
    </section>
  );
}