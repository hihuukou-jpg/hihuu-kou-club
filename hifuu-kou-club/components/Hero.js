"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useTheme } from './ThemeContext';

export default function Hero() {
    const { theme } = useTheme();
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

            {/* Background Image */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: theme === 'omote' ? 'url(/hero-winter.jpg)' : 'url(/images/shark_bg.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 0,
                transition: 'background-image 0.5s ease-in-out'
            }} />

            {/* Overlay for Contrast */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(255,255,255,0.1) 50%, rgba(248,250,252,1) 100%)',
                zIndex: 1
            }} />

            {/* Falling Snow Particles */}
            {/* Conditional Particles: Snow (Omote) vs Fire (Ura) */}
            {mounted && theme === 'omote' && [...Array(30)].map((_, i) => (
                <motion.div
                    key={`snow-${i}`}
                    initial={{ y: -50, x: Math.random() * 100 + 'vw', opacity: 0 }}
                    animate={{
                        y: '105vh',
                        x: `calc(${Math.random() * 100}vw + ${Math.random() * 50 - 25}px)`,
                        opacity: [0, 0.8, 0]
                    }}
                    transition={{
                        duration: 8 + Math.random() * 10,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "linear"
                    }}
                    style={{
                        position: 'absolute',
                        width: Math.random() * 4 + 2 + 'px',
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

            {mounted && theme === 'ura' && [...Array(40)].map((_, i) => (
                <motion.div
                    key={`fire-${i}`}
                    initial={{ y: '110vh', x: Math.random() * 100 + 'vw', opacity: 0, scale: 0.5 }}
                    animate={{
                        y: '-10vh',
                        x: `calc(${Math.random() * 100}vw + ${(Math.random() - 0.5) * 50}px)`,
                        opacity: [0, 1, 0, 0],
                        scale: [0.5, 1.5, 0.5]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 4, // Faster than snow
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "circOut"
                    }}
                    style={{
                        position: 'absolute',
                        width: Math.random() * 6 + 4 + 'px',
                        height: Math.random() * 6 + 4 + 'px',
                        background: i % 2 === 0 ? '#ff4500' : '#ff8c00', // OrangeRed / DarkOrange
                        borderRadius: '50%',
                        pointerEvents: 'none',
                        zIndex: 2,
                        filter: 'blur(1px) drop-shadow(0 0 4px #ff0000)',
                        mixBlendMode: 'screen'
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
                {/* Vertical Japanese Text with Shadow */}
                <div style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'upright',
                    fontFamily: 'var(--font-serif)',
                    fontSize: isMobile ? '2.2rem' : 'clamp(3.5rem, 7vw, 6rem)',
                    letterSpacing: isMobile ? '0.2em' : '0.5em',

                    // Ura Theme: Solid Red Text (No Gradient to fix disappearance)
                    color: theme === 'omote' ? '#fff' : '#ff0000',

                    // Ura Theme: Bleeding Shadow
                    textShadow: theme === 'omote'
                        ? '0 2px 10px rgba(0,0,0,0.5), 0 0 20px rgba(185, 28, 28, 0.3)'
                        : '2px 2px 0px #000, -1px -1px 0 #3a0000, 0 0 15px #ff0000',

                    filter: theme === 'ura' ? 'contrast(1.2) drop-shadow(0 0 5px #ff0000)' : 'none',

                    height: 'auto',
                    // Border removed in Ura mode
                    borderRight: theme === 'omote' ? '2px solid rgba(255,255,255,0.7)' : 'none',
                    paddingRight: '2rem',
                    marginRight: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.5s ease-in-out'
                }}>
                    {Array.from("秘封工倶楽部").map((char, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0px)',
                                // Randomize transform slightly in Ura mode for jagged look
                                x: theme === 'ura' ? Math.random() * 4 - 2 : 0,
                                scale: theme === 'ura' ? 1.1 : 1,
                                rotate: theme === 'ura' ? Math.random() * 10 - 5 : 0
                            }}
                            transition={{
                                duration: 1.2,
                                delay: 0.5 + index * 0.2,
                                ease: "easeOut"
                            }}
                            style={{
                                display: 'inline-block' // Required for transforms
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </div>

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
