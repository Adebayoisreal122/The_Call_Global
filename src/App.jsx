import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { MinistryProvider } from './context/MinistryContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DevotionalsPage from './pages/DevotionalsPage';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminPrograms from './admin/AdminPrograms';
import AdminDevotionals from './admin/AdminDevotionals';
import AdminTestimonies from './admin/AdminTestimonies';
import AdminPrayerRequests from './admin/AdminPrayerRequests';
import AdminRegistrations from './admin/AdminRegistrations';
import { useTheme } from './context/ThemeContext';

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
      <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
      <Route path="/devotionals" element={<PublicLayout><DevotionalsPage /></PublicLayout>} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="programs" element={<AdminPrograms />} />
        <Route path="devotionals" element={<AdminDevotionals />} />
        <Route path="testimonies" element={<AdminTestimonies />} />
        <Route path="prayer-requests" element={<AdminPrayerRequests />} />
        <Route path="registrations" element={<AdminRegistrations />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <MinistryProvider>
          <AppRoutes />
        </MinistryProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
