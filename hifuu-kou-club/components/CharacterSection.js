"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function CharacterSection() {
    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
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
            background: 'linear-gradient(to top, #0f172a 0%, #1e293b 100%)', // Deep Space for HSR contrast
            color: '#fff',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
        }}>

            {/* Tech Particles/Grid Background */}
            <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', opacity: 0.5 }}></div>

            {/* Selector Sidebar */}
            <div style={{
                width: isMobile ? '100%' : '140px',
                height: isMobile ? 'auto' : '100vh',
                background: 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(10px)',
                borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.1)',
                borderBottom: isMobile ? '1px solid rgba(255,255,255,0.1)' : 'none',
                zIndex: 10,
                display: 'flex',
                flexDirection: isMobile ? 'row' : 'column',
                justifyContent: isMobile ? 'center' : 'center',
                alignItems: 'center',
                paddingTop: isMobile ? '1rem' : '0',
                paddingBottom: isMobile ? '1rem' : '0',
                gap: '2rem',
                position: 'relative'
            }}>
                {data.map((char) => (
                    <button
                        key={char.id}
                        onClick={() => setSelectedId(char.id)}
                        style={{
                            position: 'relative',
                            width: '80px',
                            height: '80px',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {/* Rotated Square Frame (Diamond) */}
                        <div style={{
                            width: '60px', height: '60px',
                            transform: 'rotate(45deg)',
                            border: selectedId === char.id ? '2px solid var(--hsr-gold)' : '1px solid rgba(255,255,255,0.3)',
                            background: selectedId === char.id ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                            boxShadow: selectedId === char.id ? '0 0 15px rgba(212, 175, 55, 0.3)' : 'none',
                            overflow: 'hidden',
                            position: 'relative',
                            transition: 'all 0.3s ease'
                        }}>
                            <img
                                src={char.image_url || 'https://placehold.co/100x100'}
                                alt={char.name}
                                style={{
                                    width: '140%', height: '140%',
                                    objectFit: 'cover',
                                    transform: 'rotate(-45deg) translate(-15%, -15%)', // Counter-rotate image
                                    filter: selectedId === char.id ? 'none' : 'grayscale(100%) brightness(0.7)'
                                }}
                            />
                        </div>

                        {/* Active Indicator Line */}
                        {selectedId === char.id && !isMobile && (
                            <motion.div
                                layoutId="active-line"
                                style={{ position: 'absolute', right: '-2px', top: '50%', transform: 'translateY(-50%)', width: '4px', height: '40px', background: 'var(--hsr-cyan)', boxShadow: '0 0 10px var(--hsr-cyan)' }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Main Content Area */}
            <div style={{
                flex: 1,
                position: 'relative',
                height: isMobile ? 'calc(100vh - 120px)' : '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>

                {/* Background Geometric Rings */}
                <motion.div
                    key={`ring-${selectedId}`}
                    initial={{ rotate: 0, opacity: 0 }}
                    animate={{ rotate: 360, opacity: 1 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: 'absolute',
                        width: isMobile ? '300px' : '600px',
                        height: isMobile ? '300px' : '600px',
                        border: '1px dashed rgba(255,255,255,0.1)',
                        borderRadius: '50%',
                        zIndex: 0,
                        top: isMobile ? '5%' : 'auto'
                    }}
                />
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: 'absolute',
                        width: isMobile ? '250px' : '500px',
                        height: isMobile ? '250px' : '500px',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '50%',
                        zIndex: 0,
                        top: isMobile ? '8%' : 'auto'
                    }}
                />

                {/* Character Illustration */}
                <div style={{
                    zIndex: 1,
                    height: isMobile ? '55%' : '100%',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={selectedChar.image_url}
                            src={selectedChar.image_url}
                            alt={selectedChar.name}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.6, ease: "circOut" }}
                            style={{
                                height: '90%',
                                maxHeight: isMobile ? '50vh' : '90vh',
                                width: 'auto',
                                maxWidth: '90%',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.5))'
                            }}
                        />
                    </AnimatePresence>
                </div>

                {/* Description Box: Glass Panel */}
                <div style={{
                    position: isMobile ? 'relative' : 'absolute',
                    bottom: isMobile ? 'auto' : '10%',
                    right: isMobile ? 'auto' : '5%',
                    width: isMobile ? '90%' : '400px',
                    zIndex: 2,
                    marginBottom: isMobile ? '2rem' : '0'
                }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedId}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5 }}
                            className="hsr-glass"
                            style={{
                                padding: '2rem',
                                clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)', // Cut Corners
                                borderLeft: '4px solid var(--hsr-gold)',
                                background: 'rgba(15, 23, 42, 0.7)' // Overriding generic glass for darker look
                            }}
                        >
                            <div style={{
                                fontFamily: 'var(--font-mono)',
                                color: 'var(--hsr-cyan)',
                                fontSize: '0.8rem',
                                marginBottom: '0.5rem',
                                letterSpacing: '0.1em'
                            }}>
                                // {selectedChar.role}
                            </div>
                            <h2 style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: '2.5rem',
                                marginBottom: '1rem',
                                fontWeight: 'bold',
                                color: '#fff',
                                textShadow: '0 0 10px rgba(255,255,255,0.3)'
                            }}>
                                {selectedChar.name}
                            </h2>
                            <div style={{ width: '50px', height: '2px', background: 'var(--hsr-gold)', marginBottom: '1rem' }}></div>
                            <p style={{
                                fontFamily: 'var(--font-serif)',
                                lineHeight: '1.8',
                                fontSize: '0.95rem',
                                color: '#ddd'
                            }}>
                                {selectedChar.description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>

            <style jsx>{`
                /* Ensure clip-path works on the container */
                .hsr-glass {
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                }
            `}</style>
        </section>
    );
}
