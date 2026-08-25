import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { MinistryProvider } from './context/MinistryContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DevotionalsPage from './pages/DevotionalsPage';
import BooksPage from './pages/BooksPage';
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/AdminLogin';
import ProtectedRoute from './admin/ProtectedRoute';
import AdminDashboard from './admin/AdminDashboard';
import AdminPrograms from './admin/AdminPrograms';
import AdminDevotionals from './admin/AdminDevotionals';
import AdminTestimonies from './admin/AdminTestimonies';
import AdminPrayerRequests from './admin/AdminPrayerRequests';
import AdminRegistrations from './admin/AdminRegistrations';
import AdminSettings from './admin/AdminSettings';
import AdminBooks from './admin/AdminBooks';
import AdminBookOrders from './admin/AdminBookOrders';
import { useTheme } from './context/ThemeContext';
import BookDownloadPage from './pages/BookDownloadPage';

function PublicLayout({ children }) {
  const { dark } = useTheme();
  return (
    <div className={dark ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
      <Route path="/devotionals" element={<PublicLayout><DevotionalsPage /></PublicLayout>} />
      <Route path="/books" element={<PublicLayout><BooksPage /></PublicLayout>} />
      <Route path="/books/download/:token" element={<BookDownloadPage />} />

      {/* Admin login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin panel — all protected */}
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="programs" element={<AdminPrograms />} />
          <Route path="devotionals" element={<AdminDevotionals />} />
          <Route path="testimonies" element={<AdminTestimonies />} />
          <Route path="prayer-requests" element={<AdminPrayerRequests />} />
          <Route path="registrations" element={<AdminRegistrations />} />
          <Route path="books" element={<AdminBooks />} />
          <Route path="book-orders" element={<AdminBookOrders />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <MinistryProvider>
            <AppRoutes />
          </MinistryProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
