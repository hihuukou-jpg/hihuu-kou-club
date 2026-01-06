"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function EmaLikeButton({ isLiked, count, onLike }) {
    const [hearts, setHearts] = useState([]);

    const handleClick = (e) => {
        e.stopPropagation();

        // Trigger generic like handler
        onLike();

        // If we are liking (currently not liked, or about to be liked), spawn hearts
        // Note: isLiked prop is the *current* state before toggle. 
        // If it was false, it will become true, so we show effect.
        if (!isLiked) {
            spawnHearts();
        }
    };

    const spawnHearts = () => {
        const newHearts = Array.from({ length: 8 }).map((_, i) => ({
            id: Date.now() + i,
            x: Math.random() * 40 - 20, // -20 to 20
            y: Math.random() * -30 - 10, // -10 to -40 (upwards)
            rotation: Math.random() * 60 - 30,
            scale: Math.random() * 0.5 + 0.5,
            delay: Math.random() * 0.2
        }));
        setHearts(prev => [...prev, ...newHearts]);
    };

    // Cleanup logic could be done via onAnimationComplete, 
    // but simple timeout for cleaning up stale hearts is safer to avoid leaks if animation interrupts
    useEffect(() => {
        if (hearts.length > 0) {
            const timer = setTimeout(() => {
                setHearts([]);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [hearts]);

    return (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Particles */}
            <AnimatePresence>
                {hearts.map(heart => (
                    <motion.div
                        key={heart.id}
                        initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
                        animate={{
                            opacity: 0,
                            x: heart.x,
                            y: heart.y - 50,
                            scale: heart.scale,
                            rotate: heart.rotation
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: heart.delay }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            pointerEvents: 'none',
                            zIndex: 10
                        }}
                    >
                        <Heart size={12} fill="#e91e63" color="#e91e63" />
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Main Button */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px'
            }}>
                <motion.button
                    onClick={handleClick}
                    whileTap={{ scale: 0.8 }}
                    animate={isLiked ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: isLiked ? '#e91e63' : '#8d6e63',
                        padding: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // Ensure button is above particles origin
                        zIndex: 20,
                        outline: 'none'
                    }}
                >
                    <Heart size={16} fill={isLiked ? '#e91e63' : 'none'} />
                </motion.button>
                <span style={{ fontSize: '0.8rem', color: '#5d4037', fontWeight: 'normal' }}>
                    {count || 0}
                </span>
            </div>
        </div>
    );
}
