import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import ServicesPage from './pages/ServicesPage';
import Contact from './pages/Contact';
import ServiceDetail from './pages/ServiceDetail';
import PackageDetail from './pages/PackageDetail';

// Admin Imports
import Login from './pages/admin/Login';
import AdminLayout from './layouts/AdminLayout';
import DashboardHome from './pages/admin/DashboardHome';
import AdminSettings from './pages/admin/Settings';
import Admins from './pages/admin/Admins';
import AdminPackages from './pages/admin/Packages';
import AdminEnquiries from './pages/admin/Enquiries';
import AdminNewsletters from './pages/admin/Newsletters';
import AdminBookings from './pages/admin/Bookings';
import AdminTestimonials from './pages/admin/Testimonials';

const PublicLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                {/* Public Routes */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/services/:id" element={<ServiceDetail />} />
                    <Route path="/package/:id" element={<PackageDetail />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<div className="pt-32 text-center h-screen">404 - Page Not Found. <Link to="/" className="text-brand-secondary">Return Home</Link></div>} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin" element={<Login />} />

                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<DashboardHome />} />
                    <Route path="settings" element={<AdminSettings />} />
                    <Route path="admins" element={<Admins />} />
                    <Route path="packages" element={<AdminPackages />} />
                    <Route path="bookings" element={<AdminBookings />} />
                    <Route path="enquiries" element={<AdminEnquiries />} />
                    <Route path="newsletters" element={<AdminNewsletters />} />
                    <Route path="testimonials" element={<AdminTestimonials />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
