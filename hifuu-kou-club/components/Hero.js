"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Hero() {
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div id="hero" style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#000' }}>

            {/* Winter Background Image */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: 'url(/hero-winter.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 0
            }} />

            {/* Overlay for Contrast */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(255,255,255,0.1) 50%, rgba(248,250,252,1) 100%)',
                zIndex: 1
            }} />

            {/* Falling Snow Particles */}
            {mounted && [...Array(30)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: -50, x: Math.random() * 100 + 'vw', opacity: 0 }}
                    animate={{
                        y: '105vh',
                        x: `calc(${Math.random() * 100}vw + ${Math.random() * 50 - 25}px)`,
                        opacity: [0, 0.8, 0]
                    }}
                    transition={{
                        duration: 8 + Math.random() * 10, // Slower snow
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "linear"
                    }}
                    style={{
                        position: 'absolute',
                        width: Math.random() * 4 + 2 + 'px', // Varying snowflake sizes
                        height: Math.random() * 4 + 2 + 'px',
                        background: '#fff',
                        borderRadius: '50%',
                        pointerEvents: 'none',
                        zIndex: 2,
                        filter: 'blur(0.5px)',
                        boxShadow: '0 0 3px rgba(255,255,255,0.8)'
                    }}
                />
            ))}

            {/* Main Content */}
            <div style={{
                position: 'relative', zIndex: 10, height: '100%',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                textAlign: 'center'
            }}>

                {/* Vertical Japanese Text with Shadow */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'upright',
                        fontFamily: 'var(--font-serif)',
                        fontSize: isMobile ? '3rem' : 'clamp(3.5rem, 7vw, 6rem)',
                        letterSpacing: isMobile ? '0.3em' : '0.5em',
                        color: '#fff',
                        textShadow: '0 2px 10px rgba(0,0,0,0.5), 0 0 20px rgba(185, 28, 28, 0.3)', // Red glow
                        height: 'auto',
                        borderRight: '2px solid rgba(255,255,255,0.7)',
                        paddingRight: '2rem',
                        marginRight: '1rem'
                    }}
                >
                    秘封工倶楽部
                </motion.div>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1.5 }}
                    style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: isMobile ? '1.2rem' : '1.5rem',
                        color: '#fff',
                        letterSpacing: '0.3em',
                        marginTop: '2rem',
                        textShadow: '0 1px 5px rgba(0,0,0,0.5)'
                    }}
                >
                    Hifuu Kou
                </motion.div>

            </div>

            {/* Decorative Winter Circle */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                animate={{ opacity: 0.2, scale: 1, rotate: 360 }}
                transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: isMobile ? '50vh' : '80vh',
                    height: isMobile ? '50vh' : '80vh',
                    border: '2px dashed rgba(255,255,255,0.5)',
                    borderRadius: '50%',
                    zIndex: 0
                }}
            />

        </div>
    );
}
