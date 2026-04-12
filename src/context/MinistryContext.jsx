import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as api from '../services/api';

const MinistryContext = createContext();

export function MinistryProvider({ children }) {
  const [programs, setPrograms] = useState([]);
  const [devotionals, setDevotionals] = useState([]);
  const [latestDevotional, setLatestDevotional] = useState(null);
  const [testimonies, setTestimonies] = useState([]);
  const [allTestimonies, setAllTestimonies] = useState([]);
  const [prayerRequests, setPrayerRequests] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState({
    programs: true, devotionals: true, latestDevotional: true, testimonies: true,
    prayerRequests: false, registrations: false,
  });
  const [errors, setErrors] = useState({});

  const setLoadingKey = (key, val) => setLoading((p) => ({ ...p, [key]: val }));
  const setErrorKey = (key, msg) => setErrors((p) => ({ ...p, [key]: msg }));

  const loadPrograms = useCallback(async () => {
    setLoadingKey('programs', true);
    try { const r = await api.fetchPrograms(); setPrograms(r.data); }
    catch (e) { setErrorKey('programs', e.message); }
    finally { setLoadingKey('programs', false); }
  }, []);

  const loadDevotionals = useCallback(async () => {
    setLoadingKey('devotionals', true);
    try { const r = await api.fetchDevotionals(); setDevotionals(r.data); }
    catch (e) { setErrorKey('devotionals', e.message); }
    finally { setLoadingKey('devotionals', false); }
  }, []);

  const loadLatestDevotional = useCallback(async () => {
    setLoadingKey('latestDevotional', true);
    try { const r = await api.fetchLatestDevotional(); setLatestDevotional(r.data); }
    catch (e) { setLatestDevotional(null); }
    finally { setLoadingKey('latestDevotional', false); }
  }, []);

  const loadTestimonies = useCallback(async () => {
    setLoadingKey('testimonies', true);
    try { const r = await api.fetchTestimonies(); setTestimonies(r.data); }
    catch (e) { setErrorKey('testimonies', e.message); }
    finally { setLoadingKey('testimonies', false); }
  }, []);

  useEffect(() => {
    loadPrograms();
    loadDevotionals();
    loadLatestDevotional();
    loadTestimonies();
  }, []);

  const loadAllTestimonies = useCallback(async () => {
    try { const r = await api.fetchAllTestimonies(); setAllTestimonies(r.data); }
    catch (e) { setErrorKey('allTestimonies', e.message); }
  }, []);

  const loadPrayerRequests = useCallback(async () => {
    setLoadingKey('prayerRequests', true);
    try { const r = await api.fetchPrayerRequests(); setPrayerRequests(r.data); }
    catch (e) { setErrorKey('prayerRequests', e.message); }
    finally { setLoadingKey('prayerRequests', false); }
  }, []);

  const loadRegistrations = useCallback(async () => {
    setLoadingKey('registrations', true);
    try { const r = await api.fetchRegistrations(); setRegistrations(r.data); }
    catch (e) { setErrorKey('registrations', e.message); }
    finally { setLoadingKey('registrations', false); }
  }, []);

  // Programs
  const addProgram = async (data) => { const r = await api.createProgram(data); setPrograms((p) => [r.data, ...p]); return r; };
  const editProgram = async (id, data) => { const r = await api.updateProgram(id, data); setPrograms((p) => p.map((x) => (x._id === id ? r.data : x))); return r; };
  const removeProgram = async (id) => { await api.deleteProgram(id); setPrograms((p) => p.filter((x) => x._id !== id)); };

  // Devotionals
  const addDevotional = async (data) => { const r = await api.createDevotional(data); setDevotionals((p) => [r.data, ...p]); setLatestDevotional(r.data); return r; };
  const removeDevotional = async (id) => { await api.deleteDevotional(id); setDevotionals((p) => p.filter((x) => x._id !== id)); loadLatestDevotional(); };

  // Testimonies
  const submitTestimony = async (data) => api.submitTestimony(data);
  const approveTestimony = async (id) => {
    const r = await api.approveTestimony(id);
    setAllTestimonies((p) => p.map((t) => (t._id === id ? r.data : t)));
    setTestimonies((p) => [...p, r.data]);
    return r;
  };
  const removeTestimony = async (id) => {
    await api.deleteTestimony(id);
    setAllTestimonies((p) => p.filter((t) => t._id !== id));
    setTestimonies((p) => p.filter((t) => t._id !== id));
  };

  // Prayer
  const submitPrayer = async (data) => api.submitPrayerRequest(data);
  const markPrayed = async (id) => { const r = await api.markPrayerAsPrayed(id); setPrayerRequests((p) => p.map((x) => (x._id === id ? r.data : x))); return r; };
  const removePrayerRequest = async (id) => { await api.deletePrayerRequest(id); setPrayerRequests((p) => p.filter((x) => x._id !== id)); };

  // Registrations
  const submitRegistration = async (data) => api.submitRegistration(data);
  const removeRegistration = async (id) => { await api.deleteRegistration(id); setRegistrations((p) => p.filter((x) => x._id !== id)); };

  return (
    <MinistryContext.Provider value={{
      programs, devotionals, latestDevotional, testimonies, allTestimonies,
      prayerRequests, registrations, loading, errors,
      loadAllTestimonies, loadPrayerRequests, loadRegistrations, loadPrograms, loadDevotionals,
      addProgram, editProgram, removeProgram,
      addDevotional, removeDevotional,
      submitTestimony, approveTestimony, removeTestimony,
      submitPrayer, markPrayed, removePrayerRequest,
      submitRegistration, removeRegistration,
    }}>
      {children}
    </MinistryContext.Provider>
  );
}

export const useMinistry = () => useContext(MinistryContext);
