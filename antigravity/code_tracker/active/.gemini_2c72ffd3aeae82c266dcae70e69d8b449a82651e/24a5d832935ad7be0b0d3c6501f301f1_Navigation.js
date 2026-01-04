�B"use client";

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const navItems = [
    { name: 'HOME', id: 'hero' },
    { name: 'NEWS', id: 'news' },
    { name: 'CONTENT', id: 'videos' },
    { name: 'CHARACTERS', id: 'characters' },
    { name: 'DIARY', id: 'diary' },
];

export default function Navigation() {
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 100,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: isMobile ? '1rem 1.5rem' : '2rem 3rem',
                background: 'rgba(249, 248, 246, 0.9)',
                backdropFilter: 'blur(8px)',
                borderBottom: '1px solid rgba(0,0,0,0.05)'
            }}
        >
            {/* Logo Area */}
            <Link href="/#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{
                    width: isMobile ? '28px' : '32px',
                    height: isMobile ? '28px' : '32px',
                    background: 'var(--hakurei-red)',
                    borderRadius: '50%',
                    display: 'grid', placeItems: 'center'
                }}>
                    <div style={{ width: '60%', height: '60%', background: '#fff', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'translateY(-10%)' }}></div>
                </div>
                <span style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: isMobile ? '1.1rem' : '1.4rem',
                    fontWeight: 'bold',
                    color: 'var(--text-main)',
                    letterSpacing: '0.1em',
                    whiteSpace: 'nowrap'
                }}>
                    秘封工倶楽部
                </span>
            </Link>

            {/* Desktop Nav */}
            {!isMobile && (
                <ul style={{ display: 'flex', gap: '3rem', listStyle: 'none' }}>
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={`/#${item.id}`}
                                style={{
                                    position: 'relative',
                                    fontSize: '0.95rem',
                                    fontFamily: 'var(--font-serif)',
                                    color: 'var(--text-main)',
                                    textDecoration: 'none',
                                    letterSpacing: '0.05em'
                                }}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link
                            href="/admin"
                            style={{
                                fontSize: '0.9rem',
                                fontFamily: 'var(--font-serif)',
                                color: 'var(--hakurei-red)',
                                border: '1px solid var(--hakurei-red)',
                                padding: '0.4rem 1rem',
                                borderRadius: '20px'
                            }}
                        >
                            ADMIN
                        </Link>
                    </li>
                </ul>
            )}

            {/* Mobile Hamburger Button */}
            {isMobile && (
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        zIndex: 101, // Above the menu
                        padding: '0.5rem'
                    }}
                >
                    <div style={{
                        width: '24px', height: '2px',
                        background: isOpen ? '#333' : 'var(--hakurei-red)',
                        marginBottom: '5px',
                        transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
                        transition: 'all 0.3s'
                    }}></div>
                    <div style={{
                        width: '24px', height: '2px',
                        background: isOpen ? 'transparent' : 'var(--hakurei-red)',
                        marginBottom: '5px',
                        transition: 'all 0.3s'
                    }}></div>
                    <div style={{
                        width: '24px', height: '2px',
                        background: isOpen ? '#333' : 'var(--hakurei-red)',
                        transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
                        transition: 'all 0.3s'
                    }}></div>
                </button>
            )}

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobile && isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            width: '100%',
                            background: '#fff',
                            borderBottom: '1px solid #eee',
                            boxShadow: '0 5px 10px rgba(0,0,0,0.05)',
                            padding: '1rem 0',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1.5rem'
                        }}
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={`/#${item.id}`}
                                onClick={() => setIsOpen(false)}
                                style={{
                                    fontSize: '1rem',
                                    fontFamily: 'var(--font-serif)',
                                    color: 'var(--text-main)',
                                    textDecoration: 'none',
                                    padding: '0.5rem'
                                }}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/admin"
                            onClick={() => setIsOpen(false)}
                            style={{
                                fontSize: '0.9rem',
                                color: 'var(--hakurei-red)',
                                border: '1px solid var(--hakurei-red)',
                                padding: '0.4rem 1.5rem',
                                borderRadius: '20px',
                                marginTop: '0.5rem'
                            }}
                        >
                            ADMIN
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
�B"(2c72ffd3aeae82c266dcae70e69d8b449a82651e2Ffile:///C:/Users/kouki/.gemini/hifuu-kou-club/components/Navigation.js:file:///C:/Users/kouki/.gemini