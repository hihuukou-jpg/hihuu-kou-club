"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useTheme } from './ThemeContext';

import { X, Maximize2, Loader2 } from 'lucide-react';

export default function IllustrationSection() {
    const { data: session } = useSession();
    const { theme } = useTheme();
    const [illustrations, setIllustrations] = useState([]);
    const [loading, setLoading] = useState(true);

    // Lightbox State
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetchIllustrations();
    }, [theme]); // Refetch when theme changes

    const fetchIllustrations = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/illustrations?theme=${theme}`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setIllustrations(data);
            }
        } catch (error) {
            console.error("Failed to fetch illustrations", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="illustrations" style={{ padding: '4rem 0', minHeight: '80vh' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <h2 className="hsr-title-decor" style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)' }}>
                        ILLUSTRATIONS
                    </h2>
                </div>

                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                        <Loader2 className="animate-spin" size={32} color="var(--hakurei-red)" />
                    </div>
                ) : (
                    <div className="masonry-grid">
                        {illustrations.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                style={{
                                    marginBottom: '1.5rem',
                                    breakInside: 'avoid',
                                    position: 'relative',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    background: 'var(--hakurei-white)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setSelectedImage(item)}
                                whileHover={{ y: -5, boxShadow: '0 8px 15px rgba(0,0,0,0.2)' }}
                            >
                                <div style={{ position: 'relative', width: '100%', height: 'auto', minHeight: '200px' }}>
                                    <img
                                        src={`${item.image_url}?width=500&resize=contain`}
                                        alt={item.title}
                                        loading="lazy"
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            display: 'block',
                                        }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        top: '0.5rem',
                                        right: '0.5rem',
                                        background: 'rgba(0,0,0,0.5)',
                                        color: '#fff',
                                        borderRadius: '50%',
                                        padding: '4px',
                                        opacity: 0,
                                        transition: 'opacity 0.2s'
                                    }} className="hover-icon">
                                        <Maximize2 size={16} />
                                    </div>
                                </div>

                                <div style={{
                                    padding: '1rem',
                                    background: theme === 'omote' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.6)',
                                    backdropFilter: 'blur(5px)',
                                    borderTop: '1px solid rgba(255,255,255,0.1)',
                                    color: theme === 'omote' ? '#333' : '#eee'
                                }}>
                                    <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-serif)', marginBottom: '0.3rem' }}>{item.title}</h3>
                                    {item.description && <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>{item.description}</p>}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                <style jsx>{`
                    .hover-icon { opacity: 0; }
                    div:hover .hover-icon { opacity: 1; }
                    
                    .masonry-grid {
                        column-count: 3;
                        column-gap: 1.5rem;
                    }
                    
                    @media (max-width: 1024px) {
                        .masonry-grid { column-count: 2; }
                    }
                    @media (max-width: 600px) {
                        .masonry-grid { column-count: 1; }
                    }
                `}</style>
            </div>

            {/* Lightbox Modal (Pixiv Style) */}
            <AnimatePresence>
                {selectedImage && (
                    <div
                        style={{
                            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                            background: 'rgba(0,0,0,0.9)', zIndex: 2000,
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            backdropFilter: 'blur(10px)'
                        }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            style={{
                                position: 'relative',
                                maxWidth: '95vw',
                                maxHeight: '95vh',
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedImage(null)}
                                style={{
                                    position: 'absolute', top: '-40px', right: 0,
                                    background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer'
                                }}
                            >
                                <X size={32} />
                            </button>
                            <img
                                src={selectedImage.image_url}
                                alt={selectedImage.title}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '90vh',
                                    borderRadius: '4px',
                                    boxShadow: '0 0 50px rgba(0,0,0,0.5)',
                                    objectFit: 'contain'
                                }}
                            />
                            <div style={{
                                position: 'absolute', bottom: '-40px', left: 0,
                                color: '#fff', textAlign: 'left'
                            }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{selectedImage.title}</h3>
                                {selectedImage.description && <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>{selectedImage.description}</span>}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>


        </section>
    );
}
