�f"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Pencil } from 'lucide-react';

export default function EmaSection() {
    const [messages, setMessages] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        const res = await fetch('/api/ema');
        if (res.ok) {
            const data = await res.json();
            setMessages(data);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/ema', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newMessage })
            });

            if (res.ok) {
                setNewMessage("");
                setIsOpen(false);
                fetchMessages(); // Refresh list
            } else {
                alert("送信に失敗しました");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="ema" style={{
            position: 'relative',
            padding: '4rem 1rem',
            background: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png"), #5d4037', // Wood texture fallback
            backgroundBlendMode: 'multiply',
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#fff',
            fontFamily: 'var(--font-serif)',
            overflow: 'hidden'
        }}>
            {/* Shimenawa / Rope Decoration Top */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '20px',
                background: 'repeating-linear-gradient(45deg, #f5f5f5, #f5f5f5 10px, #e0e0e0 10px, #e0e0e0 20px)',
                boxShadow: '0 5px 5px rgba(0,0,0,0.3)'
            }}></div>

            <div style={{ textAlign: 'center', marginBottom: '3rem', zIndex: 2 }}>
                <h2 style={{
                    fontSize: '2.5rem',
                    color: '#fff',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                    borderBottom: '2px solid rgba(255,255,255,0.3)',
                    paddingBottom: '0.5rem',
                    marginBottom: '0.5rem',
                    display: 'inline-block'
                }}>
                    絵馬掛け所
                </h2>
                <p style={{ opacity: 0.8 }}>みんなのメッセージ</p>
            </div>

            {/* Ema Board Area */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '2rem',
                maxWidth: '1200px',
                width: '100%',
                perspective: '1000px'
            }}>
                <AnimatePresence>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={msg.id}
                            initial={{ rotateX: -90, opacity: 0 }}
                            animate={{
                                rotateX: 0,
                                opacity: 1,
                                rotateZ: Math.random() * 4 - 2 // Random slight tilt
                            }}
                            transition={{ delay: index * 0.05, type: 'spring' }}
                            whileHover={{ scale: 1.05, rotateX: 10, zIndex: 10 }}
                            style={{
                                width: '200px',
                                height: '140px',
                                background: '#eecfa1', // Wood color
                                // Ema Shape (Pentagon-ish with curved top)
                                clipPath: 'polygon(50% 0%, 100% 20%, 100% 100%, 0% 100%, 0% 20%)',
                                padding: '1.5rem 1rem 1rem 1rem',
                                color: '#3e2723',
                                position: 'relative',
                                boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                cursor: 'default',
                                fontWeight: 'bold'
                            }}
                        >
                            {/* Red String Hole */}
                            <div style={{
                                position: 'absolute',
                                top: '15%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '8px',
                                height: '8px',
                                background: '#3e2723',
                                borderRadius: '50%'
                            }}></div>
                            {/* Red String Visual */}
                            <div style={{
                                position: 'absolute',
                                top: '-20px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '2px',
                                height: '40px',
                                background: 'red',
                                zIndex: -1
                            }}></div>

                            {/* Content */}
                            <div style={{
                                marginTop: '1rem',
                                overflow: 'hidden',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                fontSize: '0.9rem'
                            }}>
                                {msg.content}
                            </div>
                        </motion.div>
                    ))}

                    {/* Write Button Placeholder (Always at end or floating) */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        style={{
                            width: '200px',
                            height: '140px',
                            background: 'rgba(255,255,255,0.1)',
                            border: '2px dashed rgba(255,255,255,0.3)',
                            borderRadius: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            cursor: 'pointer',
                            backdropFilter: 'blur(5px)'
                        }}
                    >
                        <Pencil size={32} style={{ marginBottom: '0.5rem' }} />
                        <span>絵馬を書く</span>
                    </motion.button>
                </AnimatePresence>
            </div>

            {/* Write Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0,0,0,0.7)',
                            backdropFilter: 'blur(5px)',
                            zIndex: 100,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '1rem'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 50 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: '#fff',
                                padding: '2rem',
                                borderRadius: '1rem',
                                width: '100%',
                                maxWidth: '500px',
                                position: 'relative'
                            }}
                        >
                            <h3 style={{ color: '#333', marginBottom: '1rem', textAlign: 'center', fontWeight: 'bold' }}>奉納メッセージを書く</h3>
                            <form onSubmit={handleSubmit}>
                                <textarea
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="ここに応援メッセージや願い事を書いてください..."
                                    maxLength={140}
                                    style={{
                                        width: '100%',
                                        height: '150px',
                                        padding: '1rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid #ddd',
                                        resize: 'none',
                                        marginBottom: '1rem',
                                        fontSize: '1rem',
                                        fontFamily: 'var(--font-serif)'
                                    }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        style={{
                                            padding: '0.5rem 1.5rem',
                                            borderRadius: '0.5rem',
                                            border: 'none',
                                            background: '#f3f4f6',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        キャンセル
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        style={{
                                            padding: '0.5rem 1.5rem',
                                            borderRadius: '0.5rem',
                                            border: 'none',
                                            background: 'var(--hakurei-red)',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            opacity: isSubmitting ? 0.7 : 1
                                        }}
                                    >
                                        <Send size={16} />
                                        奉納する
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
�f*cascade08"(1d8b22ef339d47e61dc4e3ee847f9a48aab2c66e2Ffile:///C:/Users/kouki/.gemini/hifuu-kou-club/components/EmaSection.js:file:///C:/Users/kouki/.gemini