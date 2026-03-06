"use client";

import { motion } from "framer-motion";
import { Send, MessageSquare, Mail, Phone } from "lucide-react";
import { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const whatsappMsg = `Hi Dhanush, I'm ${formData.name} (${formData.email}). ${formData.message}`;
        window.open(`https://wa.me/916361446768?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
    };

    return (
        <section id="contact" className="relative py-40 px-6 overflow-hidden bg-white">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-24">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="technical-label"
                    >
                        [ CONNECT_NODE ]
                    </motion.span>
                    <h2 className="text-5xl md:text-[100px] font-black text-[#333333] luxury-text leading-[0.8] mt-6">
                        LET&apos;S <span className="text-primary italic">SYNC</span>
                    </h2>
                    <p className="mt-8 text-[11px] font-black tracking-[0.5em] uppercase text-[#333333]/30 max-w-xl mx-auto">
                        STARTING A NEW SYSTEM DEPLOYMENT? LET&apos;S ARCHITECT SOMETHING EXCEPTIONAL.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">
                    {/* Left: Communication Channels */}
                    <div className="space-y-10">
                        <div className="glass-card p-10 bg-[#f2f2f2]/50 border border-[#333333]/5 space-y-8">
                            <h4 className="text-xl font-black text-[#333333] luxury-text">SYSTEM_METADATA</h4>
                            <div className="space-y-6">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-primary/40 tracking-widest uppercase mb-1 text-primary">Email_Address</p>
                                        <p className="text-sm font-bold text-[#333333] tracking-widest uppercase">virtuosodhanush@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-primary/40 tracking-widest uppercase mb-1 text-primary">Phone_Line</p>
                                        <p className="text-sm font-bold text-[#333333] tracking-widest uppercase">+91 6361446768</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                                        <MessageSquare className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-primary/40 tracking-widest uppercase mb-1 text-primary">WhatsApp_Sync</p>
                                        <p className="text-sm font-bold text-[#333333] tracking-widest uppercase">ENCRYPTED_LINE_ACTIVE</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            {[
                                { name: "LINKEDIN", url: "https://www.linkedin.com/in/ldhanushraj" },
                                { name: "GITHUB", url: "https://github.com/LDHANUSHRAJ" },
                                { name: "WA", url: "https://wa.me/916361446768" }
                            ].map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -5 }}
                                    className="px-6 py-3 bg-[#f2f2f2] border border-[#333333]/5 rounded-full text-[9px] font-black tracking-widest text-[#333333] hover:text-primary transition-colors cursor-pointer"
                                >
                                    {social.name}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Right: Submission Form */}
                    <div className="glass-card p-10 bg-white border border-primary/10 shadow-2xl shadow-primary/5">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black tracking-[0.3em] text-[#333333]/40 uppercase ml-4">Identity_Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-[#f2f2f2] border-none rounded-2xl px-6 py-4 text-sm font-bold tracking-widest uppercase focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="ENTER_YOUR_NAME"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-black tracking-[0.3em] text-[#333333]/40 uppercase ml-4">Comm_Link</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-[#f2f2f2] border-none rounded-2xl px-6 py-4 text-sm font-bold tracking-widest uppercase focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="ENTER_YOUR_EMAIL"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-black tracking-[0.3em] text-[#333333]/40 uppercase ml-4">Data_Payload</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-[#f2f2f2] border-none rounded-2xl px-6 py-4 text-sm font-bold tracking-widest uppercase focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                    placeholder="TELL_ME_ABOUT_THE_PROJECT"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-5 bg-[#333333] text-white text-[10px] font-black tracking-[0.5em] uppercase rounded-2xl flex items-center justify-center gap-4 hover:bg-primary transition-all shadow-xl shadow-primary/10 group"
                            >
                                <Send className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                                Initiate_Sync
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Background Texture */}
            <div className="absolute inset-0 grid-overlay opacity-[0.03] pointer-events-none" />
        </section>
    );
}
