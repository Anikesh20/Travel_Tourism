import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    React.useEffect(() => {
        if (localStorage.getItem('adminUser')) {
            navigate('/admin/dashboard');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const data = await login(username, password);
            // Save user info
            localStorage.setItem('adminUser', JSON.stringify(data.user));
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.message || 'Login failed');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
                {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Username</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
