import React, { useState, useEffect } from 'react';
import { getPackages, createPackage, updatePackage, deletePackage } from '../../api/packages';
import { Package, Plus, Edit, Trash2, X, Upload, Calendar, ShieldCheck, Info, Globe, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadImage } from '../../api/upload';
import Toast from '../../components/admin/Toast';

const AdminPackages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPackage, setCurrentPackage] = useState(null);
    const [saving, setSaving] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

    // Form State
    const [formData, setFormData] = useState({
        destination: '',
        description: '',
        price: '',
        duration: '',
        type: '',
        rating: '5.0',
        image_url: '',
        badge: '',
        itinerary: [], // Array of {day, title, description}
        included: [], // Array of strings
        excluded: [], // Array of strings
        visa_requirements: ''
    });

    const loadPackages = async () => {
        setLoading(true);
        try {
            const data = await getPackages();
            setPackages(data);
        } catch (err) {
            setError('Failed to fetch packages');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPackages();
    }, []);

    const handleOpenModal = (pkg = null) => {
        if (pkg) {
            setCurrentPackage(pkg);
            setFormData({
                id: pkg.id,
                destination: pkg.destination,
                description: pkg.description || '',
                price: pkg.price,
                duration: pkg.duration,
                type: pkg.type,
                rating: pkg.rating,
                image_url: pkg.image_url || '',
                badge: pkg.badge || '',
                itinerary: pkg.itinerary ? JSON.parse(pkg.itinerary) : [{ day: 1, title: '', description: '' }],
                included: pkg.included ? JSON.parse(pkg.included) : [],
                excluded: pkg.excluded ? JSON.parse(pkg.excluded) : [],
                visa_requirements: pkg.visa_requirements || ''
            });
        } else {
            setCurrentPackage(null);
            setFormData({
                destination: '',
                description: '',
                price: '',
                duration: '',
                type: '',
                rating: '5.0',
                image_url: '',
                badge: '',
                itinerary: [{ day: 1, title: '', description: '' }],
                included: [],
                excluded: [],
                visa_requirements: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentPackage(null);
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
            const result = await uploadImage(file);
            setFormData(prev => ({ ...prev, image_url: 'http://localhost' + result.url }));
        } catch (err) {
            alert('Failed to upload image: ' + (err.message || 'Unknown error'));
        } finally {
            setUploading(false);
        }
    };

    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
    };

    const handleCloseNotification = () => {
        setNotification(prev => ({ ...prev, show: false }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const submissionData = {
                ...formData,
                itinerary: JSON.stringify(formData.itinerary),
                included: JSON.stringify(formData.included),
                excluded: JSON.stringify(formData.excluded)
            };

            if (currentPackage) {
                await updatePackage(submissionData);
                showNotification("Package updated successfully!", "success");
            } else {
                await createPackage(submissionData);
                showNotification("New package created successfully!", "success");
            }
            handleCloseModal();
            loadPackages();
        } catch (err) {
            showNotification(err.message || "Something went wrong", "error");
        } finally {
            setSaving(false);
        }
    };

    // Form Helper Functions
    const addItineraryDay = () => {
        setFormData(prev => ({
            ...prev,
            itinerary: [...prev.itinerary, { day: prev.itinerary.length + 1, title: '', description: '' }]
        }));
    };

    const removeItineraryDay = (index) => {
        const newItin = formData.itinerary.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, itinerary: newItin }));
    };

    const handleItineraryChange = (index, field, value) => {
        const newItin = [...formData.itinerary];
        newItin[index][field] = value;
        setFormData(prev => ({ ...prev, itinerary: newItin }));
    };

    const addListItem = (field) => {
        setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
    };

    const removeListItem = (field, index) => {
        const newList = formData[field].filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, [field]: newList }));
    };

    const handleListChange = (field, index, value) => {
        const newList = [...formData[field]];
        newList[index] = value;
        setFormData(prev => ({ ...prev, [field]: newList }));
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this package?")) {
            try {
                await deletePackage(id);
                showNotification("Package deleted successfully", "success");
                loadPackages();
            } catch (err) {
                showNotification(err.message || "Failed to delete package", "error");
            }
        }
    };

    if (loading && packages.length === 0) return <div className="p-6">Loading...</div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm relative">
            <Toast
                show={notification.show}
                message={notification.message}
                type={notification.type}
                onClose={handleCloseNotification}
            />
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center">
                    <Package className="mr-2" /> Tour Packages
                </h3>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
                >
                    <Plus size={18} className="mr-2" /> Add Package
                </button>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destination</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Package Details</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {packages.map((pkg) => (
                            <tr key={pkg.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img src={pkg.image_url} alt={pkg.destination} className="h-12 w-12 rounded object-cover bg-gray-200" />
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-900">{pkg.destination}</div>
                                    <div className="text-xs text-gray-500">{pkg.badge}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {pkg.price}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    <div className="font-bold text-slate-900">{pkg.duration}</div>
                                    <div className="flex gap-2 mt-1">
                                        <span title="Itinerary" className={`p-1 rounded ${pkg.itinerary && pkg.itinerary !== '[]' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-300'}`}>
                                            <Calendar size={12} />
                                        </span>
                                        <span title="Inclusions" className={`p-1 rounded ${pkg.included && pkg.included !== '[]' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-300'}`}>
                                            <ShieldCheck size={12} />
                                        </span>
                                        <span title="Visa Info" className={`p-1 rounded ${pkg.visa_requirements ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-300'}`}>
                                            <Info size={12} />
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                    <a
                                        href={`/package/${pkg.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                        title="View Live Page"
                                    >
                                        <Globe size={18} />
                                    </a>
                                    <button onClick={() => handleOpenModal(pkg)} className="text-indigo-600 hover:text-indigo-900 mr-4" title="Edit Package">
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(pkg.id)} className="text-red-600 hover:text-red-900" title="Delete Package">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Subtle Backdrop with Blur */}
                    <div
                        className="absolute inset-0 backdrop-blur-sm"
                        onClick={handleCloseModal}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full z-10 flex flex-col max-h-[90vh]">
                        <style>{`
                            .modal-scrollbar::-webkit-scrollbar {
                                width: 6px;
                            }
                            .modal-scrollbar::-webkit-scrollbar-track {
                                background: #f1f1f1;
                                border-radius: 10px;
                            }
                            .modal-scrollbar::-webkit-scrollbar-thumb {
                                background: #888;
                                border-radius: 10px;
                            }
                            .modal-scrollbar::-webkit-scrollbar-thumb:hover {
                                background: #555;
                            }
                        `}</style>
                        <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
                            {/* Header - Fixed */}
                            <div className="bg-white px-6 py-4 border-b">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-gray-900">
                                        {currentPackage ? 'Edit Package' : 'Add New Package'}
                                    </h3>
                                    <button type="button" onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                                        <X size={24} />
                                    </button>
                                </div>
                            </div>

                            {/* Body - Scrollable */}
                            <div className="px-6 py-5 overflow-y-auto modal-scrollbar flex-1">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Destination Name</label>
                                        <input name="destination" value={formData.destination} onChange={handleInputChange} required className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Dubai, UAE" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                                        <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none resize-none" rows="2" placeholder="Describe this destination..."></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                        <input name="price" value={formData.price} onChange={handleInputChange} required className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. NPR 75,000" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                        <input name="duration" value={formData.duration} onChange={handleInputChange} required className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. 5 Days" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                        <input name="type" value={formData.type} onChange={handleInputChange} required className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Adventure" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                        <input name="rating" value={formData.rating} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="4.9" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
                                        <input name="badge" value={formData.badge} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. LUXURY" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Visa & Document Requirements</label>
                                        <textarea name="visa_requirements" value={formData.visa_requirements} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none resize-none" rows="3" placeholder="Passport scan, visa fees, etc..."></textarea>
                                    </div>

                                    {/* Itinerary Section */}
                                    <div className="col-span-2 mt-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-sm font-bold text-gray-800">Itinerary (Day by Day Plan)</label>
                                            <button type="button" onClick={addItineraryDay} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-200 hover:bg-blue-100 font-bold">
                                                + Add Day
                                            </button>
                                        </div>
                                        <div className="space-y-3">
                                            {formData.itinerary.map((item, idx) => (
                                                <div key={idx} className="p-3 bg-gray-50 rounded border border-gray-100 relative group/day">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-1 rounded">Day {idx + 1}</span>
                                                        <input
                                                            value={item.title}
                                                            onChange={(e) => handleItineraryChange(idx, 'title', e.target.value)}
                                                            className="flex-1 text-sm font-bold bg-transparent border-b border-gray-200 outline-none focus:border-blue-500"
                                                            placeholder="Title: Arrival at..."
                                                        />
                                                        <button type="button" onClick={() => removeItineraryDay(idx)} className="text-gray-300 hover:text-red-500 transition-colors">
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                    <textarea
                                                        value={item.description}
                                                        onChange={(e) => handleItineraryChange(idx, 'description', e.target.value)}
                                                        className="w-full text-xs p-2 bg-white border border-gray-100 rounded focus:border-blue-300 outline-none resize-none"
                                                        rows="2"
                                                        placeholder="What happens on this day?"
                                                    ></textarea>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Included / Excluded Section */}
                                    <div className="col-span-2 grid grid-cols-2 gap-4 mt-4">
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <label className="block text-sm font-bold text-emerald-700">What's Included</label>
                                                <button type="button" onClick={() => addListItem('included')} className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded border border-emerald-100">+</button>
                                            </div>
                                            <div className="space-y-2">
                                                {formData.included.map((item, idx) => (
                                                    <div key={idx} className="flex gap-1 items-center">
                                                        <input
                                                            value={item}
                                                            onChange={(e) => handleListChange('included', idx, e.target.value)}
                                                            className="flex-1 text-xs p-1.5 border border-gray-200 rounded outline-none"
                                                            placeholder="Included item..."
                                                        />
                                                        <button type="button" onClick={() => removeListItem('included', idx)} className="text-gray-300 hover:text-red-500"><X size={12} /></button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <label className="block text-sm font-bold text-rose-700">What's Excluded</label>
                                                <button type="button" onClick={() => addListItem('excluded')} className="text-xs bg-rose-50 text-rose-600 px-2 py-1 rounded border border-rose-100">+</button>
                                            </div>
                                            <div className="space-y-2">
                                                {formData.excluded.map((item, idx) => (
                                                    <div key={idx} className="flex gap-1 items-center">
                                                        <input
                                                            value={item}
                                                            onChange={(e) => handleListChange('excluded', idx, e.target.value)}
                                                            className="flex-1 text-xs p-1.5 border border-gray-200 rounded outline-none"
                                                            placeholder="Excluded item..."
                                                        />
                                                        <button type="button" onClick={() => removeListItem('excluded', idx)} className="text-gray-300 hover:text-red-500"><X size={12} /></button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Package Image</label>

                                        {/* File Upload Button */}
                                        <div className="flex gap-2 mb-2">
                                            <label className="flex-1 cursor-pointer">
                                                <div className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded hover:border-blue-500 hover:bg-blue-50 transition-colors">
                                                    <Upload size={18} className="text-gray-500" />
                                                    <span className="text-sm text-gray-600">
                                                        {uploading ? 'Uploading...' : 'Upload Image'}
                                                    </span>
                                                </div>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileUpload}
                                                    disabled={uploading}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>

                                        {/* Or URL Input */}
                                        <div className="text-center text-xs text-gray-500 my-2">or paste URL</div>
                                        <input
                                            name="image_url"
                                            value={formData.image_url}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                            placeholder="https://..."
                                        />

                                        {/* Image Preview */}
                                        {formData.image_url && (
                                            <div className="mt-3">
                                                <p className="text-xs text-gray-500 mb-1">Preview:</p>
                                                <img
                                                    src={formData.image_url}
                                                    alt="Preview"
                                                    className="h-48 w-full object-cover rounded border shadow-sm"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Footer - Fixed */}
                            <div className="bg-gray-50 px-6 py-4 flex flex-row-reverse rounded-b-lg border-t">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="w-full sm:w-auto inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-6 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:text-sm transition-colors disabled:opacity-50"
                                >
                                    {saving && <Loader2 size={16} className="animate-spin mr-2" />}
                                    {currentPackage ? (saving ? 'Updating...' : 'Update') : (saving ? 'Creating...' : 'Create')}
                                </button>
                                <button type="button" onClick={handleCloseModal} className="mt-3 w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-6 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:text-sm transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPackages;
