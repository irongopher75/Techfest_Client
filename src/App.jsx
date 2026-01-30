import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Events from './pages/Events';
import Profile from './pages/Profile';
import SuperiorDashboard from './pages/admin/SuperiorDashboard';
import EventAdminDashboard from './pages/admin/EventAdminDashboard';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="pt-20"> {/* Space for fixed navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/events" element={<Events />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin/superior" element={<SuperiorDashboard />} />
            <Route path="/admin/event" element={<EventAdminDashboard />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
