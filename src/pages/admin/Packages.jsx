import React, { useState, useEffect } from 'react';
import { getPackages, createPackage, updatePackage, deletePackage } from '../../api/packages';
import { Package, Plus, Edit, Trash2, X, Upload } from 'lucide-react';
import { uploadImage } from '../../api/upload';

const AdminPackages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPackage, setCurrentPackage] = useState(null); // null for create, object for edit

    // Form State
    const [formData, setFormData] = useState({
        destination: '',
        description: '',
        price: '',
        duration: '',
        type: '',
        rating: '5.0',
        image_url: '',
        badge: ''
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
                badge: pkg.badge || ''
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
                badge: ''
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentPackage) {
                await updatePackage(formData);
            } else {
                await createPackage(formData);
            }
            handleCloseModal();
            loadPackages();
        } catch (err) {
            alert("Error saving package: " + err.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this package?")) {
            try {
                await deletePackage(id);
                loadPackages();
            } catch (err) {
                alert("Error deleting: " + err.message);
            }
        }
    };

    if (loading && packages.length === 0) return <div className="p-6">Loading...</div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Info</th>
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
                                    <div>{pkg.duration}</div>
                                    <div>{pkg.type} • ⭐ {pkg.rating}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                    <button onClick={() => handleOpenModal(pkg)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(pkg.id)} className="text-red-600 hover:text-red-900">
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
                    <div className="relative bg-white rounded-lg shadow-2xl max-w-lg w-full z-10 flex flex-col max-h-[90vh]">
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
                                <button type="submit" className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:text-sm transition-colors">
                                    {currentPackage ? 'Update' : 'Create'}
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
