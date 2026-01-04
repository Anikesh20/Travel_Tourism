import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, Phone, MessageSquare, MapPin, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { enquiryService } from '../services/api';

const EnquiryForm = ({ inline = false }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await enquiryService.create(data);
            if (response.status === 'success') {
                setIsSuccess(true);
                reset();
                setTimeout(() => setIsSuccess(false), 5000);
            }
        } catch (error) {
            console.error("Error submitting enquiry:", error);
            const errorMsg = error.response?.data?.message || 'Something went wrong. Please try again later.';
            alert(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formContent = (
        <AnimatePresence mode="wait">
            {isSuccess ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12 md:py-20"
                >
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                        <Send size={32} className="md:w-10 md:h-10" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-brand-dark px-4">Enquiry Sent Successfully!</h3>
                    <p className="text-gray-500 text-sm md:text-base max-w-sm mx-auto px-6">Thank you for reaching out. One of our travel experts will contact you within 2 hours.</p>
                    <button
                        onClick={() => setIsSuccess(false)}
                        className="text-brand-primary font-bold hover:underline mt-4 text-sm md:text-base"
                    >
                        Send another enquiry
                    </button>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[10px] md:text-sm font-black text-brand-primary ml-1 uppercase tracking-wider">Full Name</label>
                            <input
                                {...register("name", { required: true })}
                                placeholder="John Doe"
                                disabled={isSubmitting}
                                className="w-full px-5 md:px-6 py-3.5 md:py-4 bg-gray-50 border border-transparent rounded-xl md:rounded-2xl focus:bg-white focus:border-brand-primary transition-all outline-none disabled:opacity-50 text-sm md:text-base"
                            />
                            {errors.name && <span className="text-[10px] md:text-xs text-red-500 ml-1">Name is required</span>}
                        </div>
                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[10px] md:text-sm font-black text-brand-primary ml-1 uppercase tracking-wider">Phone / WhatsApp</label>
                            <input
                                {...register("phone", { required: true })}
                                placeholder="+977-XXXXXXXXXX"
                                disabled={isSubmitting}
                                className="w-full px-5 md:px-6 py-3.5 md:py-4 bg-gray-50 border border-transparent rounded-xl md:rounded-2xl focus:bg-white focus:border-brand-primary transition-all outline-none disabled:opacity-50 text-sm md:text-base"
                            />
                            {errors.phone && <span className="text-[10px] md:text-xs text-red-500 ml-1">Phone is required</span>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[10px] md:text-sm font-black text-brand-primary ml-1 uppercase tracking-wider">Email Address</label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                placeholder="john@example.com"
                                disabled={isSubmitting}
                                className="w-full px-5 md:px-6 py-3.5 md:py-4 bg-gray-50 border border-transparent rounded-xl md:rounded-2xl focus:bg-white focus:border-brand-primary transition-all outline-none disabled:opacity-50 text-sm md:text-base"
                            />
                            {errors.email && <span className="text-[10px] md:text-xs text-red-500 ml-1">Email is required</span>}
                        </div>
                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[10px] md:text-sm font-black text-brand-primary ml-1 uppercase tracking-wider">Travel Date</label>
                            <input
                                type="date"
                                {...register("date")}
                                disabled={isSubmitting}
                                className="w-full px-5 md:px-6 py-3.5 md:py-4 bg-gray-50 border border-transparent rounded-xl md:rounded-2xl focus:bg-white focus:border-brand-primary transition-all outline-none disabled:opacity-50 text-sm md:text-base"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5 md:space-y-2">
                        <label className="text-[10px] md:text-sm font-black text-brand-primary ml-1 uppercase tracking-wider">Special Requirements</label>
                        <textarea
                            rows="3"
                            {...register("message")}
                            disabled={isSubmitting}
                            placeholder="Tell us about your dream trip..."
                            className="w-full px-5 md:px-6 py-3.5 md:py-4 bg-gray-50 border border-transparent rounded-xl md:rounded-2xl focus:bg-white focus:border-brand-primary transition-all outline-none resize-none disabled:opacity-50 text-sm md:text-base"
                        ></textarea>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-primary py-4 md:py-5 text-base md:text-lg flex items-center justify-center space-x-3 shadow-xl disabled:opacity-70 rounded-xl md:rounded-2xl"
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
    );

    if (inline) {
        return <div className="p-8 md:p-12 lg:p-16 h-full">{formContent}</div>;
    }

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
                                            <p className="text-xl font-bold">01-4XXXXXX</p>
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
                            {formContent}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default EnquiryForm;
