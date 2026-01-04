import React, { useEffect, useState } from 'react';
import { getUsers } from '../../api/users';
import { User, Shield, Calendar } from 'lucide-react';

const Admins = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center">
                <Shield className="mr-2" /> Admin & User Management
            </h3>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{user.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                                    <User size={16} className="mr-2 text-gray-400" />
                                    {user.username}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                                    <Calendar size={14} className="mr-1 text-gray-400" />
                                    {new Date(user.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {users.length === 0 && (
                <div className="text-center py-10 text-gray-500">No users found.</div>
            )}
        </div>
    );
};

export default Admins;
