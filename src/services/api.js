const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ─── Helpers ────────────────────────────────────────────────────────────────

const authHeaders = () => {
  const token = localStorage.getItem('tcg-token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong. Please try again.');
  return data;
};

// ─── AUTH ────────────────────────────────────────────────────────────────────

export const loginAdmin = (email, password) =>
  fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);

export const getMe = () =>
  fetch(`${BASE_URL}/auth/me`, { headers: authHeaders() }).then(handleResponse);

export const changePassword = (currentPassword, newPassword) =>
  fetch(`${BASE_URL}/auth/change-password`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ currentPassword, newPassword }),
  }).then(handleResponse);

export const updateProfile = (data) =>
  fetch(`${BASE_URL}/auth/update-profile`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);

// ─── PROGRAMS ────────────────────────────────────────────────────────────────

export const fetchPrograms = (upcoming = false) =>
  fetch(`${BASE_URL}/programs${upcoming ? '?upcoming=true' : ''}`).then(handleResponse);

export const fetchProgram = (id) =>
  fetch(`${BASE_URL}/programs/${id}`).then(handleResponse);

export const createProgram = (data) =>
  fetch(`${BASE_URL}/programs`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);

export const updateProgram = (id, data) =>
  fetch(`${BASE_URL}/programs/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);

export const deleteProgram = (id) =>
  fetch(`${BASE_URL}/programs/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  }).then(handleResponse);

// ─── DEVOTIONALS ─────────────────────────────────────────────────────────────

export const fetchDevotionals = () =>
  fetch(`${BASE_URL}/devotionals`).then(handleResponse);

export const fetchLatestDevotional = () =>
  fetch(`${BASE_URL}/devotionals/latest`).then(handleResponse);

export const createDevotional = (data) =>
  fetch(`${BASE_URL}/devotionals`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);

export const deleteDevotional = (id) =>
  fetch(`${BASE_URL}/devotionals/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  }).then(handleResponse);

// ─── TESTIMONIES ─────────────────────────────────────────────────────────────

export const fetchTestimonies = () =>
  fetch(`${BASE_URL}/testimonies`).then(handleResponse);

export const fetchAllTestimonies = () =>
  fetch(`${BASE_URL}/testimonies/all`, { headers: authHeaders() }).then(handleResponse);

export const submitTestimony = (data) =>
  fetch(`${BASE_URL}/testimonies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleResponse);

export const approveTestimony = (id) =>
  fetch(`${BASE_URL}/testimonies/${id}/approve`, {
    method: 'PATCH',
    headers: authHeaders(),
  }).then(handleResponse);

export const deleteTestimony = (id) =>
  fetch(`${BASE_URL}/testimonies/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  }).then(handleResponse);

// ─── PRAYER REQUESTS ─────────────────────────────────────────────────────────

export const submitPrayerRequest = (data) =>
  fetch(`${BASE_URL}/prayers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleResponse);

export const fetchPrayerRequests = () =>
  fetch(`${BASE_URL}/prayers`, { headers: authHeaders() }).then(handleResponse);

export const markPrayerAsPrayed = (id) =>
  fetch(`${BASE_URL}/prayers/${id}/prayed`, {
    method: 'PATCH',
    headers: authHeaders(),
  }).then(handleResponse);

export const deletePrayerRequest = (id) =>
  fetch(`${BASE_URL}/prayers/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  }).then(handleResponse);

// ─── REGISTRATIONS ───────────────────────────────────────────────────────────

export const submitRegistration = (data) =>
  fetch(`${BASE_URL}/registrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleResponse);

export const fetchRegistrations = () =>
  fetch(`${BASE_URL}/registrations`, { headers: authHeaders() }).then(handleResponse);

export const deleteRegistration = (id) =>
  fetch(`${BASE_URL}/registrations/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  }).then(handleResponse);

// ─── PROGRAM REGISTRATIONS ────────────────────────────────────────────────────

export const registerForProgram = (data) =>
  fetch(`${BASE_URL}/program-registrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleResponse);

export const fetchProgramRegistrations = (program) =>
  fetch(`${BASE_URL}/program-registrations${program ? `?program=${encodeURIComponent(program)}` : ''}`, {
    headers: authHeaders(),
  }).then(handleResponse);

export const deleteProgramRegistration = (id) =>
  fetch(`${BASE_URL}/program-registrations/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  }).then(handleResponse);

// ─── BOOKS ───────────────────────────────────────────────────────────────────

export const fetchBooks = () =>
  fetch(`${BASE_URL}/books`).then(handleResponse);

export const fetchBook = (id) =>
  fetch(`${BASE_URL}/books/${id}`).then(handleResponse);

export const createBook = (data) =>
  fetch(`${BASE_URL}/books`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);

export const updateBook = (id, data) =>
  fetch(`${BASE_URL}/books/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);

export const deleteBook = (id) =>
  fetch(`${BASE_URL}/books/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  }).then(handleResponse);

export const submitPurchase = (bookId, data) =>
  fetch(`${BASE_URL}/books/${bookId}/purchase`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleResponse);

export const downloadBookByToken = (token) =>
  fetch(`${BASE_URL}/books/download/${token}`).then(handleResponse);

export const checkOrderStatus = (email, bookId = '') =>
  fetch(`${BASE_URL}/books/orders/check?email=${encodeURIComponent(email)}${bookId ? `&bookId=${bookId}` : ''}`).then(handleResponse);

export const fetchAllOrders = (status = '') =>
  fetch(`${BASE_URL}/books/orders${status ? `?status=${status}` : ''}`, {
    headers: authHeaders(),
  }).then(handleResponse);

export const fetchOrder = (id) =>
  fetch(`${BASE_URL}/books/orders/${id}`, { headers: authHeaders() }).then(handleResponse);

export const approveOrder = (id, adminNote = '') =>
  fetch(`${BASE_URL}/books/orders/${id}/approve`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ adminNote }),
  }).then(handleResponse);

export const rejectOrder = (id, adminNote = '') =>
  fetch(`${BASE_URL}/books/orders/${id}/reject`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ adminNote }),
  }).then(handleResponse);

export const deleteOrder = (id) =>
  fetch(`${BASE_URL}/books/orders/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  }).then(handleResponse);
