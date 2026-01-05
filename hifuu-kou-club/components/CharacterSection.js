"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Sakura Petal Component
const SakuraPetal = ({ delay }) => (
    <motion.div
        initial={{ y: -20, x: Math.random() * 100 - 50, opacity: 0, rotate: 0 }}
        animate={{
            y: ['0vh', '100vh'],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0],
            rotate: [0, 360],
        }}
        transition={{
            duration: 10 + Math.random() * 5,
            delay: delay,
            repeat: Infinity,
            ease: "linear"
        }}
        style={{
            position: 'absolute',
            top: -20,
            left: `${Math.random() * 100}%`,
            width: '16px',
            height: '16px',
            background: '#FECACA', // Sakura Pink
            borderRadius: '100% 0 100% 0',
            opacity: 0.6,
            zIndex: 0,
            pointerEvents: 'none'
        }}
    />
);

export default function CharacterSection() {
    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024); // Mobile breakpoint increased for list view
        handleResize();
        window.addEventListener('resize', handleResize);

        fetch('/api/characters')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                if (data.length > 0) setSelectedId(data[0].id);
            });

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!data || data.length === 0) return null;

    const selectedChar = data.find(c => c.id === selectedId) || data[0];

    return (
        <section id="characters" style={{
            position: 'relative',
            minHeight: '100vh',
            // Washi Paper Texture Simulation
            background: 'var(--hakurei-white)',
            backgroundImage: `
                radial-gradient(#e5e7eb 1px, transparent 1px),
                radial-gradient(#e5e7eb 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px',
            color: '#333',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: isMobile ? '6rem 1rem' : '4rem 8rem',
            fontFamily: 'var(--font-serif)'
        }}>

            {/* Sakura Particles */}
            {[...Array(15)].map((_, i) => <SakuraPetal key={i} delay={i * 0.5} />)}

            {/* Title */}
            <div style={{ textAlign: 'center', marginBottom: '3rem', zIndex: 2 }}>
                <h2 className="hsr-title-decor" style={{
                    fontSize: '2.5rem',
                    color: 'var(--hakurei-red)',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 0px rgba(0,0,0,0.1)',
                    display: 'inline-block',
                    background: '#fff',
                    padding: '0.5rem 2rem',
                    border: 'double 4px var(--hakurei-red)'
                }}>
                    登場人物
                </h2>
                <p style={{ marginTop: '0.5rem', color: '#666', fontSize: '0.9rem' }}>CHARACTERS</p>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column-reverse' : 'row',
                gap: '2rem',
                maxWidth: '1400px',
                margin: '0 auto',
                width: '100%',
                height: isMobile ? 'auto' : '70vh',
                zIndex: 2
            }}>

                {/* Left: Character Tabs (EMA Style) */}
                <div style={{
                    width: isMobile ? '100%' : '300px',
                    display: 'flex',
                    flexDirection: isMobile ? 'row' : 'column',
                    gap: '1rem',
                    overflowX: isMobile ? 'auto' : 'hidden',
                    overflowY: isMobile ? 'hidden' : 'auto',
                    padding: '1rem',
                    scrollbarWidth: 'none'
                }}>
                    {data.map((char) => (
                        <motion.button
                            key={char.id}
                            onClick={() => setSelectedId(char.id)}
                            whileHover={{ scale: 1.05, x: isMobile ? 0 : 10 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                background: selectedId === char.id ? 'var(--hakurei-red)' : '#fff',
                                color: selectedId === char.id ? '#fff' : '#333',
                                border: '2px solid var(--hakurei-red)',
                                borderRadius: '8px 8px 12px 12px', // Pseudo Ema shape
                                padding: '1rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                minWidth: isMobile ? '200px' : 'auto',
                                position: 'relative',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                border: '2px solid #fff',
                                overflow: 'hidden',
                                flexShrink: 0,
                                background: char.color || '#ccc'
                            }}>
                                <img src={char.image_url || 'https://placehold.co/100x100'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>{char.role}</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', fontFamily: 'var(--font-serif)' }}>{char.name}</div>
                            </div>

                            {/* Ema String Graphic (Simple CSS) */}
                            <div style={{
                                position: 'absolute',
                                top: '-10px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '4px',
                                height: '20px',
                                background: 'var(--hakurei-red)',
                                borderRadius: '2px',
                                display: isMobile ? 'none' : 'block' // Only vertical look needs hanging string look
                            }}></div>
                        </motion.button>
                    ))}
                </div>

                {/* Right: Character Detail (Scroll/Illustration) */}
                <div style={{
                    flex: 1,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255,255,255,0.6)',
                    backdropFilter: 'blur(5px)',
                    borderRadius: '20px',
                    border: '1px solid rgba(0,0,0,0.05)',
                    padding: '2rem'
                }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedChar.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{
                                display: 'flex',
                                flexDirection: isMobile ? 'column' : 'row',
                                width: '100%',
                                height: '100%',
                                gap: '2rem',
                                alignItems: 'center'
                            }}
                        >
                            {/* Illustration */}
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{
                                    x: 0,
                                    opacity: 1,
                                    y: [0, -15, 0] // Gentle floating animation
                                }}
                                transition={{
                                    delay: 0.2, // Entrance delay
                                    y: {
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                                style={{
                                    flex: 1,
                                    height: isMobile ? '350px' : '100%', // Restored size
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',
                                    zIndex: 10
                                }}
                            >
                                {/* Circle behind char */}
                                <div style={{
                                    position: 'absolute',
                                    width: isMobile ? '280px' : '400px', // Slightly reduced base size
                                    height: isMobile ? '280px' : '400px',
                                    maxWidth: '80vw', // Responsive constraint
                                    maxHeight: '80vw',
                                    background: selectedChar.color || 'var(--hakurei-red)',
                                    opacity: 0.15,
                                    borderRadius: '50%',
                                    filter: 'blur(50px)',
                                    zIndex: 0,
                                    // Pulse effect for the background circle
                                    animation: 'pulse 4s infinite ease-in-out alternate'
                                }}></div>
                                <style jsx>{`
                                    @keyframes pulse {
                                        from { transform: scale(1); opacity: 0.1; }
                                        to { transform: scale(1.1); opacity: 0.2; }
                                    }
                                `}</style>

                                <img
                                    src={selectedChar.image_url}
                                    alt={selectedChar.name}
                                    style={{
                                        // Dynamic sizing based on viewport to prevent "too big" feel
                                        height: 'auto',
                                        width: 'auto',
                                        maxHeight: isMobile ? '350px' : '65vh', // Limit against window height
                                        maxWidth: isMobile ? '100%' : '35vw',  // Limit against window width
                                        objectFit: 'contain',
                                        zIndex: 1,
                                        // "Paper Cutout" Glow + Shadow combination for non-angular feel
                                        filter: 'drop-shadow(0 0 2px #fff) drop-shadow(0 4px 12px rgba(0,0,0,0.2))',
                                        // Mask the bottom to prevent "cut off" look if the image is partial body
                                        maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                                        WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
                                    }}
                                />
                            </motion.div>

                            {/* Text / Scroll Area */}
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                style={{
                                    flex: 1,
                                    background: '#fff',
                                    padding: '2rem',
                                    borderRadius: '4px',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                                    border: '1px solid #e5e7eb',
                                    position: 'relative',
                                    // Scroll Pattern Borders
                                    borderTop: '8px solid var(--hakurei-red)',
                                    borderBottom: '8px solid var(--hakurei-red)',
                                }}
                            >
                                <div style={{
                                    color: 'var(--hakurei-red)',
                                    fontWeight: 'bold',
                                    marginBottom: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <span style={{ width: '8px', height: '8px', background: 'var(--hakurei-red)', transform: 'rotate(45deg)', display: 'inline-block' }}></span>
                                    {selectedChar.role}
                                </div>
                                <h1 style={{
                                    fontSize: '2.5rem',
                                    fontWeight: 'bold',
                                    marginBottom: '1.5rem',
                                    borderBottom: '2px solid #f3f4f6',
                                    paddingBottom: '1rem'
                                }}>
                                    {selectedChar.name}
                                </h1>
                                <p style={{
                                    lineHeight: '2',
                                    color: '#4b5563',
                                    fontSize: '1rem',
                                    textAlign: 'justify'
                                }}>
                                    {selectedChar.description}
                                </p>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
}

