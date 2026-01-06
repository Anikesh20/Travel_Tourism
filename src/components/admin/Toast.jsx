import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const Toast = ({ show, message, type = 'success', onClose }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: -20, x: '-50%' }}
                    animate={{ opacity: 1, y: 20, x: '-50%' }}
                    exit={{ opacity: 0, y: -20, x: '-50%' }}
                    className={`fixed top-4 left-1/2 z-[100] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border min-w-[320px] ${type === 'success'
                            ? 'bg-white border-emerald-100'
                            : 'bg-white border-rose-100'
                        }`}
                >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                        }`}>
                        {type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className={`text-sm font-black uppercase tracking-wider ${type === 'success' ? 'text-emerald-800' : 'text-rose-800'}`}>
                            {type === 'success' ? 'Success' : 'Error'}
                        </p>
                        <p className="text-xs font-bold text-slate-500 truncate">{message}</p>
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-slate-50 rounded-lg transition-colors text-slate-400">
                        <X size={16} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
