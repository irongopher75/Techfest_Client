import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Events from './pages/Events';
import Profile from './pages/Profile';
import LoggedOut from './pages/LoggedOut';
const SuperiorDashboard = lazy(() => import('./pages/admin/SuperiorDashboard'));
const EventAdminDashboard = lazy(() => import('./pages/admin/EventAdminDashboard'));
import Payment from './pages/Payment';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

const queryClient = new QueryClient();

const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen bg-black">
    <div className="animate-pulse tech-font text-primary text-xl">LOADING_SYSTEM...</div>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Navbar />
          <div className="pt-20"> {/* Space for fixed navbar */}
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/events" element={<Events />} />
                <Route path="/logged-out" element={<LoggedOut />} />

                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />

                <Route path="/admin/superior" element={
                  <ProtectedRoute allowedRoles={['superior_admin']}>
                    <SuperiorDashboard />
                  </ProtectedRoute>
                } />

                <Route path="/admin/event" element={
                  <ProtectedRoute allowedRoles={['superior_admin', 'event_admin']}>
                    <EventAdminDashboard />
                  </ProtectedRoute>
                } />

                <Route path="/payment" element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                } />
              </Routes>
            </Suspense>
          </div>
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: 'glass-morphism',
              style: {
                background: 'rgba(0, 0, 0, 0.8)',
                color: '#fff',
                border: '1px solid var(--glass-border)',
                fontFamily: 'var(--font-tech)'
              },
            }}
          />
          <Footer />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
