import React, { useState, useEffect } from 'react';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../../api/testimonials';
import { MessageSquare, Plus, Edit, Trash2, X, Upload, Star, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadImage } from '../../api/upload';
import Toast from '../../components/admin/Toast';

const AdminTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(null);
    const [saving, setSaving] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        content: '',
        rating: 5,
        avatar: ''
    });

    const loadTestimonials = async () => {
        setLoading(true);
        try {
            const data = await getTestimonials();
            setTestimonials(data);
        } catch (err) {
            setError('Failed to fetch testimonials');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTestimonials();
    }, []);

    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
    };

    const handleCloseNotification = () => {
        setNotification(prev => ({ ...prev, show: false }));
    };

    const handleOpenModal = (t = null) => {
        if (t) {
            setCurrentTestimonial(t);
            setFormData({
                id: t.id,
                name: t.name,
                role: t.role || '',
                content: t.content,
                rating: t.rating || 5,
                avatar: t.avatar || ''
            });
        } else {
            setCurrentTestimonial(null);
            setFormData({
                name: '',
                role: '',
                content: '',
                rating: 5,
                avatar: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentTestimonial(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const response = await uploadImage(file);
            setFormData(prev => ({ ...prev, avatar: response.url }));
            showNotification("Avatar uploaded successfully", "success");
        } catch (err) {
            showNotification("Failed to upload avatar", "error");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (currentTestimonial) {
                await updateTestimonial(formData);
                showNotification("Testimonial updated successfully", "success");
            } else {
                await createTestimonial(formData);
                showNotification("Testimonial created successfully", "success");
            }
            loadTestimonials();
            handleCloseModal();
        } catch (err) {
            showNotification(err.message || "Something went wrong", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this testimonial?")) {
            try {
                await deleteTestimonial(id);
                showNotification("Testimonial deleted successfully", "success");
                loadTestimonials();
            } catch (err) {
                showNotification(err.message || "Failed to delete testimonial", "error");
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm relative">
            <Toast
                show={notification.show}
                message={notification.message}
                type={notification.type}
                onClose={handleCloseNotification}
            />

            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center tracking-tight">
                    <MessageSquare className="mr-2 text-brand-primary" /> Traveler Stories
                </h3>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center px-4 py-2 bg-brand-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all active:scale-95"
                >
                    <Plus size={18} className="mr-1" /> Add Story
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="animate-spin text-brand-primary" size={40} />
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="py-4 px-4 font-black text-[10px] uppercase tracking-widest text-gray-400">Traveler</th>
                                <th className="py-4 px-4 font-black text-[10px] uppercase tracking-widest text-gray-400">Content</th>
                                <th className="py-4 px-4 font-black text-[10px] uppercase tracking-widest text-gray-400">Rating</th>
                                <th className="py-4 px-4 font-black text-[10px] uppercase tracking-widest text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testimonials.map((t) => (
                                <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-4">
                                        <div className="flex items-center space-x-3">
                                            {t.avatar ? (
                                                <img src={t.avatar} alt="" className="w-10 h-10 rounded-xl object-cover" />
                                            ) : (
                                                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                                                    <User size={20} />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-bold text-sm text-brand-primary">{t.name}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t.role}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 max-w-xs">
                                        <p className="text-sm text-gray-600 line-clamp-2">{t.content}</p>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center text-brand-secondary">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={12} className={i < t.rating ? 'fill-brand-secondary' : 'text-gray-200'} />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                onClick={() => handleOpenModal(t)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(t.id)}
                                                className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModal}
                            className="absolute inset-0 bg-brand-primary/20 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <h4 className="text-xl font-black text-brand-primary tracking-tight">
                                    {currentTestimonial ? 'Edit Story' : 'New Story'}
                                </h4>
                                <button onClick={handleCloseModal} className="p-2 hover:bg-white rounded-xl transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Traveler Name</label>
                                        <input
                                            required
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-primary/10 font-bold transition-all"
                                            placeholder="e.g. Suman Thapa"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Role / Tag</label>
                                        <input
                                            name="role"
                                            value={formData.role}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-primary/10 font-bold transition-all"
                                            placeholder="e.g. Business Traveler"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Rating</label>
                                    <select
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-primary/10 font-bold transition-all"
                                    >
                                        {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">The Story</label>
                                    <textarea
                                        required
                                        name="content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        rows="4"
                                        className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-brand-primary/10 font-bold transition-all resize-none"
                                        placeholder="What did the traveler say about your service?"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Avatar Image</label>
                                    <div className="flex items-center space-x-4">
                                        <div className="relative group">
                                            {formData.avatar ? (
                                                <img src={formData.avatar} alt="Avatar" className="w-16 h-16 rounded-2xl object-cover ring-4 ring-gray-100" />
                                            ) : (
                                                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 ring-4 ring-gray-100">
                                                    <User size={32} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <label className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl font-bold text-xs uppercase tracking-widest cursor-pointer hover:bg-gray-50 transition-all">
                                                <Upload size={14} className="mr-2" />
                                                {uploading ? 'Uploading...' : 'Upload Photo'}
                                                <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                                            </label>
                                            <p className="text-[9px] text-gray-400 mt-1 uppercase font-black tracking-tighter">Recommended: Square 300x300px</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-50 flex gap-4">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="flex-1 px-6 py-4 bg-gray-100 text-gray-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving || uploading}
                                        className="flex-3 px-6 py-4 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-xl disabled:opacity-50 transition-all flex items-center justify-center"
                                    >
                                        {saving ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin mr-2" />
                                                Saving...
                                            </>
                                        ) : (
                                            currentTestimonial ? 'Update Story' : 'Publish Story'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminTestimonials;
