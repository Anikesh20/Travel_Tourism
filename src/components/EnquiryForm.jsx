import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, Phone, MessageSquare, MapPin, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { enquiryService } from '../services/api';

const EnquiryForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await enquiryService.create(data);
            if (response.success) {
                setIsSuccess(true);
                reset();
                setTimeout(() => setIsSuccess(false), 5000);
            }
        } catch (error) {
            console.error("Error submitting enquiry:", error);
            alert('Something went wrong. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-24 bg-brand-accent/30 relative">
            <div className="section-container">
                <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-brand-accent">
                    <div className="grid grid-cols-1 lg:grid-cols-5">
                        {/* Info Section */}
                        <div className="lg:col-span-2 bg-brand-primary p-12 text-white relative flex flex-col justify-between">
                            <div>
                                <h3 className="text-3xl font-bold mb-6">Plan Your Dream Trip Today</h3>
                                <p className="text-gray-300 mb-12">
                                    Our travel experts are ready to help you plan the perfect journey. Fill out the form and we'll get back to you within 2 hours.
                                </p>

                                <div className="space-y-8">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                            <Phone className="text-brand-secondary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Call Us Now</p>
                                            <p className="text-xl font-bold">+977-1-4XXXXXX</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                            <MessageSquare className="text-brand-secondary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">WhatsApp</p>
                                            <p className="text-xl font-bold">+977-98XXXXXXXX</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                            <MapPin className="text-brand-secondary" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Our Office</p>
                                            <p className="text-xl font-bold">Thamel, Kathmandu, Nepal</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 flex space-x-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-secondary hover:text-brand-primary transition-all cursor-pointer">
                                    <i className="fab fa-facebook-f"></i>
                                </div>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="lg:col-span-3 p-12">
                            <AnimatePresence mode="wait">
                                {isSuccess ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="h-full flex flex-col items-center justify-center text-center space-y-4"
                                    >
                                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                            <Send size={40} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-brand-dark">Enquiry Sent Successfully!</h3>
                                        <p className="text-gray-500 max-w-sm">Thank you for reaching out. One of our travel experts will contact you within 2 hours.</p>
                                        <button
                                            onClick={() => setIsSuccess(false)}
                                            className="text-brand-primary font-bold hover:underline mt-4"
                                        >
                                            Send another enquiry
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                                                <input
                                                    {...register("name", { required: true })}
                                                    placeholder="John Doe"
                                                    disabled={isSubmitting}
                                                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-brand-primary transition-all outline-none disabled:opacity-50"
                                                />
                                                {errors.name && <span className="text-xs text-red-500">Name is required</span>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700 ml-1">Phone / WhatsApp</label>
                                                <input
                                                    {...register("phone", { required: true })}
                                                    placeholder="+977-XXXXXXXXXX"
                                                    disabled={isSubmitting}
                                                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-brand-primary transition-all outline-none disabled:opacity-50"
                                                />
                                                {errors.phone && <span className="text-xs text-red-500">Phone is required</span>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                                                <input
                                                    type="email"
                                                    {...register("email", { required: true })}
                                                    placeholder="john@example.com"
                                                    disabled={isSubmitting}
                                                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-brand-primary transition-all outline-none disabled:opacity-50"
                                                />
                                                {errors.email && <span className="text-xs text-red-500">Email is required</span>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700 ml-1">Approximate Travel Date</label>
                                                <input
                                                    type="date"
                                                    {...register("date")}
                                                    disabled={isSubmitting}
                                                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-brand-primary transition-all outline-none disabled:opacity-50"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-1">Special Requirements</label>
                                            <textarea
                                                rows="4"
                                                {...register("message")}
                                                disabled={isSubmitting}
                                                placeholder="Tell us about your dream trip..."
                                                className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-brand-primary transition-all outline-none resize-none disabled:opacity-50"
                                            ></textarea>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full btn-primary py-5 text-lg flex items-center justify-center space-x-3 shadow-xl disabled:opacity-70"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="animate-spin" size={20} />
                                                    <span>Submitting...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Get My Free Quote</span>
                                                    <Send size={20} />
                                                </>
                                            )}
                                        </motion.button>
                                    </form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EnquiryForm;

