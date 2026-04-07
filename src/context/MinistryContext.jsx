import { createContext, useContext, useState } from 'react';

const MinistryContext = createContext();

const defaultPrograms = [
  {
    id: 1, title: 'Sunday Worship Service', type: 'Worship',
    date: '2025-12-07', time: '9:00 AM', location: 'Online & Physical',
    description: 'Join us for a powerful time of worship, prayer, and the Word.',
    image: null, upcoming: true
  },
  {
    id: 2, title: 'Kingdom Fireside Night', type: 'Prayer',
    date: '2025-12-13', time: '8:00 PM', location: 'Online (Zoom)',
    description: 'An intimate night of prayer, intercession and prophetic declarations.',
    image: null, upcoming: true
  },
  {
    id: 3, title: 'The Call Conference 2025', type: 'Conference',
    date: '2025-12-20', time: '10:00 AM', location: 'Lagos, Nigeria',
    description: 'Our annual gathering of believers across nations — expect an encounter.',
    image: null, upcoming: true
  },
];

const defaultTestimonies = [
  {
    id: 1, name: 'Amara O.', location: 'Abuja, Nigeria',
    text: 'Through The Call Global, I found my purpose and calling. The Word ministry transformed my life completely.',
    date: '2025-11-20', approved: true
  },
  {
    id: 2, name: 'David K.', location: 'Accra, Ghana',
    text: 'I was healed of a chronic condition during one of the online prayer sessions. God is faithful!',
    date: '2025-11-15', approved: true
  },
  {
    id: 3, name: 'Faith E.', location: 'London, UK',
    text: 'This ministry gave me a community when I felt alone in my faith journey. I am forever grateful.',
    date: '2025-11-10', approved: true
  },
];

const defaultDevotionals = [
  {
    id: 1, title: 'Walk in Your Calling', scripture: 'Romans 8:28',
    content: 'God\'s call on your life is irrevocable. Today, take one bold step towards what He has placed in your heart. The season of hesitation is over — this is your moment.',
    author: 'Pastor Emmanuel A.', date: '2025-12-04', category: 'Faith'
  },
  {
    id: 2, title: 'The Power of Intercession', scripture: 'James 5:16',
    content: 'Prayer is not a last resort — it is our first response. When we intercede for others, we partner with heaven to bring transformation to the earth.',
    author: 'Pastor Emmanuel A.', date: '2025-12-01', category: 'Prayer'
  },
];

export function MinistryProvider({ children }) {
  const [programs, setPrograms] = useState(() => {
    const stored = localStorage.getItem('tcg-programs');
    return stored ? JSON.parse(stored) : defaultPrograms;
  });
  const [testimonies, setTestimonies] = useState(() => {
    const stored = localStorage.getItem('tcg-testimonies');
    return stored ? JSON.parse(stored) : defaultTestimonies;
  });
  const [devotionals, setDevotionals] = useState(() => {
    const stored = localStorage.getItem('tcg-devotionals');
    return stored ? JSON.parse(stored) : defaultDevotionals;
  });
  const [prayerRequests, setPrayerRequests] = useState(() => {
    const stored = localStorage.getItem('tcg-prayer-requests');
    return stored ? JSON.parse(stored) : [];
  });
  const [registrations, setRegistrations] = useState(() => {
    const stored = localStorage.getItem('tcg-registrations');
    return stored ? JSON.parse(stored) : [];
  });

  const save = (key, data) => localStorage.setItem(key, JSON.stringify(data));

  const addProgram = (p) => {
    const updated = [...programs, { ...p, id: Date.now() }];
    setPrograms(updated); save('tcg-programs', updated);
  };
  const deleteProgram = (id) => {
    const updated = programs.filter(p => p.id !== id);
    setPrograms(updated); save('tcg-programs', updated);
  };
  const updateProgram = (id, data) => {
    const updated = programs.map(p => p.id === id ? { ...p, ...data } : p);
    setPrograms(updated); save('tcg-programs', updated);
  };

  const addTestimony = (t) => {
    const updated = [...testimonies, { ...t, id: Date.now(), approved: false }];
    setTestimonies(updated); save('tcg-testimonies', updated);
  };
  const approveTestimony = (id) => {
    const updated = testimonies.map(t => t.id === id ? { ...t, approved: true } : t);
    setTestimonies(updated); save('tcg-testimonies', updated);
  };
  const deleteTestimony = (id) => {
    const updated = testimonies.filter(t => t.id !== id);
    setTestimonies(updated); save('tcg-testimonies', updated);
  };

  const addDevotional = (d) => {
    const updated = [...devotionals, { ...d, id: Date.now() }];
    setDevotionals(updated); save('tcg-devotionals', updated);
  };
  const deleteDevotional = (id) => {
    const updated = devotionals.filter(d => d.id !== id);
    setDevotionals(updated); save('tcg-devotionals', updated);
  };

  const addPrayerRequest = (r) => {
    const updated = [...prayerRequests, { ...r, id: Date.now(), date: new Date().toISOString().split('T')[0] }];
    setPrayerRequests(updated); save('tcg-prayer-requests', updated);
  };
  const deletePrayerRequest = (id) => {
    const updated = prayerRequests.filter(r => r.id !== id);
    setPrayerRequests(updated); save('tcg-prayer-requests', updated);
  };

  const addRegistration = (r) => {
    const updated = [...registrations, { ...r, id: Date.now(), date: new Date().toISOString().split('T')[0] }];
    setRegistrations(updated); save('tcg-registrations', updated);
  };

  return (
    <MinistryContext.Provider value={{
      programs, testimonies, devotionals, prayerRequests, registrations,
      addProgram, deleteProgram, updateProgram,
      addTestimony, approveTestimony, deleteTestimony,
      addDevotional, deleteDevotional,
      addPrayerRequest, deletePrayerRequest,
      addRegistration,
    }}>
      {children}
    </MinistryContext.Provider>
  );
}

export const useMinistry = () => useContext(MinistryContext);
