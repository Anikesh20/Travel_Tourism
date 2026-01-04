import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import ServicesPage from './pages/ServicesPage';
import Contact from './pages/Contact';

// Admin Imports
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import Enquiries from './pages/admin/Enquiries';
import ComingSoon from './pages/admin/ComingSoon';

const LayoutWrapper = () => {
    const location = useLocation();
    const isAdminPath = location.pathname.startsWith('/admin');

    if (isAdminPath) {
        return (
            <AdminLayout>
                <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/enquiries" element={<Enquiries />} />
                    <Route path="/bookings" element={<ComingSoon title="Bookings Tracking" />} />
                    <Route path="/packages" element={<ComingSoon title="Packages Editor" />} />
                    <Route path="/settings" element={<ComingSoon title="Admin Settings" />} />
                </Routes>
            </AdminLayout>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

function App() {
    return (
        <Router>
            <LayoutWrapper />
        </Router>
    );
}

export default App;
