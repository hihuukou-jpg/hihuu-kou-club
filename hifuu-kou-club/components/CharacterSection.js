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
            background: '#F0EFE9', // Mystical Warm White
            color: '#333',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row', // Stack on mobile
        }}>

            {/* Selector Sidebar (Left on Desktop, Top on Mobile) */}
            <div style={{
                width: isMobile ? '100%' : '120px',
                height: isMobile ? 'auto' : '100vh',
                background: '#fff',
                borderRight: isMobile ? 'none' : '1px solid #ddd',
                borderBottom: isMobile ? '1px solid #ddd' : 'none',
                zIndex: 10,
                display: 'flex',
                flexDirection: isMobile ? 'row' : 'column', // Horizontal on mobile
                justifyContent: isMobile ? 'center' : 'flex-start',
                alignItems: 'center',
                paddingTop: isMobile ? '1rem' : '100px',
                paddingBottom: isMobile ? '1rem' : '0',
                gap: '1.5rem',
                position: 'relative',
                boxShadow: '2px 0 10px rgba(0,0,0,0.05)',
                overflowX: isMobile ? 'auto' : 'visible' // Scrollable on mobile
            }}>
                {!isMobile && (
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eee', marginBottom: '1rem', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        <span style={{ fontSize: '1.2rem', color: '#888' }}>▲</span>
                    </div>
                )}

                {data.map((char) => (
                    <button
                        key={char.id}
                        onClick={() => setSelectedId(char.id)}
                        style={{
                            position: 'relative',
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            background: 'transparent',
                            transition: 'all 0.3s ease',
                            flexShrink: 0 // Prevent shrinking on mobile
                        }}
                    >
                        {/* Avatar Image */}
                        <div style={{
                            width: '100%', height: '100%',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: selectedId === char.id ? '2px solid transparent' : '2px solid #ddd',
                            filter: selectedId === char.id ? 'none' : 'grayscale(100%) opacity(0.7)'
                        }}>
                            <img src={char.image || 'https://placehold.co/100x100'} alt={char.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>

                        {/* Active Selection Ring */}
                        {selectedId === char.id && (
                            <motion.div
                                layoutId="active-ring"
                                style={{
                                    position: 'absolute',
                                    top: '-6px', left: '-6px', right: '-6px', bottom: '-6px',
                                    borderRadius: '50%',
                                    border: '2px solid var(--industrial-yellow)',
                                    borderStyle: 'dashed',
                                    animation: 'spin 10s linear infinite'
                                }}
                            />
                        )}
                        {selectedId === char.id && (
                            <motion.div
                                layoutId="active-ring-inner"
                                style={{
                                    position: 'absolute',
                                    top: '-3px', left: '-3px', right: '-3px', bottom: '-3px',
                                    borderRadius: '50%',
                                    border: '2px solid var(--industrial-yellow)',
                                }}
                            />
                        )}
                    </button>
                ))}

                {!isMobile && (
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eee', marginTop: '1rem', display: 'grid', placeItems: 'center', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        <span style={{ fontSize: '1.2rem', color: '#888' }}>▼</span>
                    </div>
                )}
            </div>

            {/* Main Content Area */}
            <div style={{
                flex: 1,
                position: 'relative',
                height: isMobile ? 'calc(100vh - 100px)' : '100%', // Adjust height for mobile
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column' // Stack content if needed
            }}>

                {/* Background Circle */}
                <motion.div
                    key={`circle-${selectedId}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    style={{
                        position: 'absolute',
                        width: isMobile ? '300px' : '500px', // Smaller circle on mobile
                        height: isMobile ? '300px' : '500px',
                        background: selectedId === 'renko' ? '#EAEAF0' : '#F0EAF0',
                        borderRadius: '50%',
                        zIndex: 0,
                        top: isMobile ? '10%' : 'auto' // Adjust position on mobile
                    }}
                />

                {/* Character Illustration */}
                <div style={{
                    zIndex: 1,
                    height: isMobile ? '50%' : '100%', // Take up less height on mobile to fit text
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: isMobile ? '1rem' : '0'
                }}>
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={selectedChar.image}
                            src={selectedChar.image}
                            alt={selectedChar.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            style={{
                                height: '90%',
                                maxHeight: isMobile ? '50vh' : '85vh',
                                width: 'auto',
                                maxWidth: '90%',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))'
                            }}
                        />
                    </AnimatePresence>
                </div>

                {/* Description Box */}
                <div style={{
                    position: isMobile ? 'relative' : 'absolute', // Relative flow on mobile
                    bottom: isMobile ? 'auto' : '10%',
                    right: isMobile ? 'auto' : '5%',
                    width: isMobile ? '90%' : '350px', // Full width on mobile
                    marginTop: isMobile ? '1rem' : '0',
                    zIndex: 2,
                    marginBottom: isMobile ? '2rem' : '0'
                }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedId}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 1 }}
                        >
                            <div style={{
                                width: '100%',
                                padding: '2rem',
                                background: 'rgba(255,255,255,0.85)',
                                backdropFilter: 'blur(5px)',
                                borderTop: '2px solid var(--hakurei-red)',
                                boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                                borderRadius: isMobile ? '8px' : '0'
                            }}>
                                <div style={{
                                    fontFamily: 'var(--font-serif)',
                                    color: 'var(--hakurei-red)',
                                    fontSize: '0.9rem',
                                    marginBottom: '0.5rem'
                                }}>
                                    {selectedChar.role}
                                </div>
                                <h2 style={{
                                    fontFamily: 'var(--font-serif)',
                                    fontSize: '2rem',
                                    marginBottom: '1rem',
                                    fontWeight: '500',
                                    color: '#333'
                                }}>
                                    {selectedChar.name}
                                </h2>
                                <p style={{
                                    fontFamily: 'var(--font-serif)',
                                    lineHeight: '1.8',
                                    fontSize: '0.95rem',
                                    color: '#555'
                                }}>
                                    {selectedChar.description}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>

            <style jsx global>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
}
