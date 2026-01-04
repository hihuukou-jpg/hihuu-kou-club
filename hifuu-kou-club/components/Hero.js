"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Hero() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div id="hero" style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#F9F8F6' }}>

            {/* Spiritual Background Gradient */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: 'radial-gradient(circle at 50% 30%, #fff 0%, #FEE7EB 40%, #f4f4f4 80%)',
                opacity: 0.8
            }} />

            {/* Slow Sakura Particles */}
            {mounted && [...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: -50, x: Math.random() * 100 + 'vw', rotate: 0, opacity: 0 }}
                    animate={{
                        y: '100vh',
                        x: `calc(${Math.random() * 100}vw + ${Math.random() * 100 - 50}px)`,
                        rotate: 360,
                        opacity: [0, 0.6, 0]
                    }}
                    transition={{
                        duration: 15 + Math.random() * 10, // Very slow falling
                        repeat: Infinity,
                        delay: Math.random() * 8,
                        ease: "linear"
                    }}
                    style={{
                        position: 'absolute',
                        width: '12px',
                        height: '12px',
                        background: '#FFB7C5',
                        borderRadius: '100% 0 100% 0', // Simple petal shape
                        pointerEvents: 'none',
                        zIndex: 1,
                        filter: 'blur(1px)'
                    }}
                />
            ))}

            {/* Main Content: Centered, Elegant */}
            <div style={{
                position: 'relative', zIndex: 10, height: '100%',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                textAlign: 'center'
            }}>

                {/* Vertical Japanese Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'upright',
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(3rem, 6vw, 5rem)',
                        letterSpacing: '0.8em',
                        color: 'var(--text-main)',
                        height: 'auto',
                        marginBottom: '2rem',
                        borderRight: '1px solid var(--hakurei-red)',
                        paddingRight: '2rem',
                        marginRight: '2rem'
                    }}
                >
                    秘封工倶楽部
                </motion.div>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1.5 }}
                    style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.2rem',
                        color: 'var(--hakurei-red)',
                        letterSpacing: '0.2em',
                        marginTop: '1rem'
                    }}
                >
                    Hifuu Kou Club
                </motion.div>

            </div>

            {/* Decorative Circle (Enso-like but minimal) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 3, ease: "easeOut" }}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60vh',
                    height: '60vh',
                    border: '1px solid var(--hakurei-red)',
                    borderRadius: '50%',
                    zIndex: 0
                }}
            />

        </div>
    );
}
