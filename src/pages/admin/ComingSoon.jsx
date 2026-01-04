import React from 'react';
import { Construction, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComingSoon = ({ title = "Coming Soon" }) => {
    return (
        <div className="flex items-center justify-center min-h-[600px]">
            <div className="text-center space-y-6 max-w-md">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-brand-primary to-brand-dark rounded-3xl flex items-center justify-center shadow-2xl">
                    <Construction size={48} className="text-brand-secondary" strokeWidth={2} />
                </div>

                <div className="space-y-3">
                    <h1 className="text-4xl font-extrabold text-brand-dark">
                        {title}
                    </h1>
                    <p className="text-gray-500 text-lg">
                        This feature is currently under development.
                    </p>
                    <p className="text-sm text-gray-400">
                        We're working hard to bring you this amazing feature soon!
                    </p>
                </div>

                <Link
                    to="/admin"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-brand-primary text-white rounded-full font-semibold hover:bg-brand-dark transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
                >
                    <ArrowLeft size={18} />
                    <span>Back to Dashboard</span>
                </Link>
            </div>
        </div>
    );
};

export default ComingSoon;
