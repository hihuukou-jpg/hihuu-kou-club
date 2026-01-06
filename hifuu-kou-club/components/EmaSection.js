"use client";

import { useRef, useEffect, useState } from 'react'; // Re-order/fix imports if needed, but simplest to just modify existing
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Pencil, Trash2, Edit2, Heart } from 'lucide-react';
import { useSession } from "next-auth/react";
import EmaLikeButton from './EmaLikeButton';

export default function EmaSection() {
    const { data: session } = useSession();
    const [messages, setMessages] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [myEmas, setMyEmas] = useState({}); // { id: secret_key }
    const [likedEmas, setLikedEmas] = useState({}); // { id: true }
    const [editingId, setEditingId] = useState(null); // ID of message currently being edited

    useEffect(() => {
        fetchMessages();
        // Load secret keys from local storage
        const stored = localStorage.getItem('hifuu_ema_keys');
        if (stored) {
            try {
                setMyEmas(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse ema keys", e);
            }
        }

        // Load liked status
        const storedLikes = localStorage.getItem('hifuu_ema_likes');
        if (storedLikes) {
            try {
                setLikedEmas(JSON.parse(storedLikes));
            } catch (e) { console.error(e); }
        }
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
            if (editingId) {
                // UPDATE
                const key = myEmas[editingId];
                const res = await fetch('/api/ema', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: editingId,
                        content: newMessage,
                        key: key // Pass key if it exists (guest), API checks session/key
                    })
                });

                if (res.ok) {
                    setNewMessage("");
                    setIsOpen(false);
                    setEditingId(null);
                    fetchMessages();
                } else {
                    alert("更新に失敗しました");
                }
            } else {
                // CREATE
                const res = await fetch('/api/ema', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: newMessage })
                });

                if (res.ok) {
                    const data = await res.json();

                    // Save secret key if returned
                    if (data.secret_key) {
                        const newKeys = { ...myEmas, [data.id]: data.secret_key };
                        setMyEmas(newKeys);
                        localStorage.setItem('hifuu_ema_keys', JSON.stringify(newKeys));
                    }

                    setNewMessage("");
                    setIsOpen(false);
                    fetchMessages();
                } else {
                    alert("送信に失敗しました");
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!editingId) return;
        if (!confirm("本当にこの絵馬を取り外しますか？")) return;

        const key = myEmas[editingId];
        try {
            const res = await fetch(`/api/ema?id=${editingId}&key=${key || ''}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                // Remove from local storage if exists
                if (myEmas[editingId]) {
                    const newKeys = { ...myEmas };
                    delete newKeys[editingId];
                    setMyEmas(newKeys);
                    localStorage.setItem('hifuu_ema_keys', JSON.stringify(newKeys));
                }

                // Close modal and refresh
                closeModal();
                fetchMessages();
            } else {
                alert("削除に失敗しました（権限がありません）");
            }
        } catch (e) {
            console.error(e);
            alert("エラーが発生しました");
        }
    };

    const startEdit = (msg) => {
        setNewMessage(msg.content);
        setEditingId(msg.id);
        setIsOpen(true);
    };

    const handleLike = async (id) => {
        const isLiked = !!likedEmas[id];
        const newLikeStatus = !isLiked;
        const diff = newLikeStatus ? 1 : -1;

        // Optimistic update
        setMessages(prev => prev.map(m =>
            m.id === id ? { ...m, likes: Math.max(0, (m.likes || 0) + diff) } : m
        ));

        const newLikes = { ...likedEmas };
        if (newLikeStatus) {
            newLikes[id] = true;
        } else {
            delete newLikes[id];
        }
        setLikedEmas(newLikes);
        localStorage.setItem('hifuu_ema_likes', JSON.stringify(newLikes));

        try {
            await fetch('/api/ema/like', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, increment: newLikeStatus })
            });
        } catch (error) {
            console.error("Failed to toggle like", error);
            // Revert logic could be added here
        }
    };

    const closeModal = () => {
        setIsOpen(false);
        setNewMessage("");
        setEditingId(null);
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

                            {/* Like Button */}
                            {/* Like Button */}
                            <div style={{
                                position: 'absolute',
                                bottom: '10px',
                                left: '10px',
                            }}>
                                <EmaLikeButton
                                    isLiked={!!likedEmas[msg.id]}
                                    count={msg.likes}
                                    onLike={() => handleLike(msg.id)}
                                />
                            </div>

                            {/* Edit/Delete Controls */}
                            {(session || myEmas[msg.id]) && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: '5px',
                                    right: '5px',
                                    display: 'flex',
                                    gap: '5px'
                                }}>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); startEdit(msg); }}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5d4037', padding: '2px' }}
                                        title="編集"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                </div>
                            )}
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

                        onClick={closeModal}
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
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                                    {/* Delete Button (Only when editing) */}
                                    {editingId ? (
                                        <button
                                            type="button"
                                            onClick={handleDelete}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                borderRadius: '0.5rem',
                                                border: '1px solid #d32f2f',
                                                background: 'transparent',
                                                color: '#d32f2f',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.4rem',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            <Trash2 size={14} />
                                            削除
                                        </button>
                                    ) : (
                                        <div></div> // Spacer
                                    )}

                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button
                                            type="button"
                                            onClick={closeModal}
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
                                            {editingId ? "更新する" : "奉納する"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
