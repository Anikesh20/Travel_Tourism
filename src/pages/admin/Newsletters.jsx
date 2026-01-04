import React, { useState, useEffect } from 'react';
import { Mail, Trash2, Search, Download, Calendar, HelpCircle } from 'lucide-react';
import { newsletterService } from '../../services/api';

const Newsletters = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Newsletters: Fetching subscribers...');
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        try {
            setLoading(true);
            const data = await newsletterService.getAll();
            console.log('Newsletters: API Response:', data);
            setSubscribers(Array.isArray(data) ? data : []);
            setError(null);
        } catch (error) {
            console.error('Newsletters: Failed to fetch subscribers', error);
            setError('Failed to load subscribers. Please ensure the newsletter table exists.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to remove this subscriber?')) return;
        try {
            const data = await newsletterService.delete(id);
            if (data.success) {
                setSubscribers(subscribers.filter(s => s.id !== id));
            }
        } catch (error) {
            alert('Failed to delete subscriber');
        }
    };

    const filteredSubscribers = (subscribers || []).filter(s =>
        s && s.email && s.email.toLowerCase().includes((searchTerm || '').toLowerCase())
    );

    const exportToCSV = () => {
        try {
            const headers = ['Email', 'Subscribed At'];
            const rows = filteredSubscribers.map(s => [s.email || '', s.created_at || '']);
            const csvContent = "data:text/csv;charset=utf-8,"
                + headers.join(",") + "\n"
                + rows.map(e => e.join(",")).join("\n");
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "newsletter_subscribers.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (e) {
            console.error('Export failed', e);
        }
    };

    if (error) {
        return (
            <div className="p-8 text-center bg-white rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-black text-rose-500 mb-4">Error</h2>
                <p className="text-gray-500 mb-6">{error}</p>
                <button
                    onClick={fetchSubscribers}
                    className="px-6 py-2 bg-brand-primary text-white rounded-xl font-bold uppercase tracking-widest text-xs"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8 text-brand-primary">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter">Newsletters</h1>
                    <p className="text-gray-500 font-medium">Manage your community and email reach.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={exportToCSV}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-50 transition-all"
                    >
                        <Download size={14} /> Export CSV
                    </button>
                    <div className="bg-brand-secondary/10 px-4 py-2 rounded-xl border border-brand-secondary/20">
                        <span className="text-xs font-black uppercase tracking-widest text-brand-primary">
                            Total: {subscribers.length}
                        </span>
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                        <Mail size={24} />
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-1">Active Leads</h3>
                    <p className="text-3xl font-black">{subscribers.length}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-4">
                        <Calendar size={24} />
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-1">Last 30 Days</h3>
                    <p className="text-3xl font-black">
                        {subscribers.filter(s => s && s.created_at && new Date(s.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-4">
                        <HelpCircle size={24} />
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-1">Reach Potential</h3>
                    <p className="text-3xl font-black">Elite</p>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 className="text-xl font-black tracking-tight">Subscriber Directory</h3>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Filter by email..."
                            className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-secondary/20 w-full md:w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Subscriber Information</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Join Date</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                [1, 2, 3].map(i => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan="3" className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-1/2"></div></td>
                                    </tr>
                                ))
                            ) : filteredSubscribers.length > 0 ? (
                                filteredSubscribers.map((subscriber) => (
                                    <tr key={subscriber.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-brand-primary text-white rounded-lg flex items-center justify-center font-bold text-xs">
                                                    {(subscriber.email && subscriber.email[0]) ? subscriber.email[0].toUpperCase() : '?'}
                                                </div>
                                                <span className="font-bold text-sm tracking-tight">{subscriber.email || 'No Email'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-medium text-gray-500">
                                                {subscriber.created_at ? new Date(subscriber.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                }) : 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(subscriber.id)}
                                                className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-12 text-center text-gray-400 font-medium">
                                        No subscribers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Newsletters;
