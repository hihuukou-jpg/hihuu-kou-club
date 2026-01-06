"use client";

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { Ghost, Sparkles } from 'lucide-react';

const navItems = [
    { name: 'HOME', id: 'hero' },
    { name: 'NEWS', id: 'news' },
    { name: 'CONTENT', id: 'videos' },
    { name: 'ILLUSTRATIONS', id: 'illustrations' },
    { name: 'DIARY', id: 'diary' },
];

export default function Navigation() {
    const { theme, toggleTheme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        // Track Visitor Count (Once per session/mount)
        const trackVisit = async () => {
            try {
                // Check if already visited in this session to prevent spam (optional, simple sessionStorage check)
                const hasVisited = sessionStorage.getItem('has_visited_site');
                if (!hasVisited) {
                    await fetch('/api/stats', { method: 'POST' });
                    sessionStorage.setItem('has_visited_site', 'true');
                }
            } catch (e) {
                console.error("Failed to track visit", e);
            }
        };
        trackVisit();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 100,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: isMobile ? '1rem 1.5rem' : '1.5rem 3rem',
                background: scrolled || isOpen ? 'rgba(15, 23, 42, 0.8)' : 'transparent', // Dark Glass on scroll
                backdropFilter: scrolled || isOpen ? 'blur(12px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
                transition: 'all 0.4s ease'
            }}
        >
            {/* Logo Area */}
            <Link href="/#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <motion.img
                    src="/logo.png"
                    alt="秘封工倶楽部 Logo"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        height: isMobile ? '40px' : (scrolled ? '40px' : '60px'),
                        width: 'auto',
                        objectFit: 'contain',
                        filter: theme === 'ura' ? 'drop-shadow(0 0 5px #ff0000)' : 'drop-shadow(0 0 5px rgba(255,255,255,0.5))',
                        transition: 'all 0.3s ease'
                    }}
                />
            </Link>

            {/* Desktop Nav */}
            {!isMobile && (
                <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', alignItems: 'center' }}>
                    {navItems.map((item) => (
                        <li key={item.name} style={{ position: 'relative' }}>
                            <Link
                                href={`/#${item.id}`}
                                className="nav-link"
                                style={{
                                    position: 'relative',
                                    fontSize: '0.9rem',
                                    fontFamily: 'var(--font-sans)', // HSR uses Sans for UI
                                    fontWeight: 'bold',
                                    color: scrolled ? '#cbd5e1' : '#fff',
                                    textDecoration: 'none',
                                    letterSpacing: '0.05em',
                                    textShadow: scrolled ? 'none' : '0 1px 3px rgba(0,0,0,0.8)',
                                    padding: '0.5rem 0'
                                }}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={toggleTheme}
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.3)',
                                borderRadius: '20px',
                                padding: '0.3rem 0.8rem',
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--hsr-cyan)'}
                            onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'}
                        >
                            {theme === 'omote' ? <Sparkles size={14} /> : <Ghost size={14} />}
                            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-serif)' }}>
                                {theme === 'omote' ? '表' : '裏'}
                            </span>
                        </button>
                    </li>
                    <li>
                        <Link
                            href="/admin"
                            style={{
                                fontSize: '0.7rem',
                                fontFamily: 'var(--font-mono)',
                                color: 'rgba(255,255,255,0.3)',
                                textDecoration: 'none',
                                padding: '0.2rem 0.5rem',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '2px',
                                marginLeft: '1rem',
                                transition: 'all 0.2s',
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.color = 'var(--hsr-cyan)';
                                e.currentTarget.style.borderColor = 'var(--hsr-cyan)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.color = 'rgba(255,255,255,0.3)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
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
                        zIndex: 101,
                        padding: '0.5rem'
                    }}
                >
                    <div style={{
                        width: '24px', height: '2px',
                        background: '#fff',
                        marginBottom: '5px',
                        transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
                        transition: 'all 0.3s',
                        boxShadow: '0 0 5px rgba(0,0,0,0.5)'
                    }}></div>
                    <div style={{
                        width: '24px', height: '2px',
                        background: isOpen ? 'transparent' : '#fff',
                        marginBottom: '5px',
                        transition: 'all 0.3s',
                        boxShadow: '0 0 5px rgba(0,0,0,0.5)'
                    }}></div>
                    <div style={{
                        width: '24px', height: '2px',
                        background: '#fff',
                        transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
                        transition: 'all 0.3s',
                        boxShadow: '0 0 5px rgba(0,0,0,0.5)'
                    }}></div>
                </button>
            )}

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobile && isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            width: '80%',
                            height: '100vh',
                            background: theme === 'ura' ? 'rgba(20, 0, 0, 0.95)' : 'rgba(15, 23, 42, 0.95)', // Red-Black for Ura, Deep Space for Omote
                            backdropFilter: 'blur(15px)',
                            borderLeft: theme === 'ura' ? '1px solid #ff0000' : '1px solid rgba(255,255,255,0.1)',
                            padding: '6rem 2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: '2rem',
                            zIndex: 100,
                            boxShadow: theme === 'ura' ? '-5px 0 20px rgba(255, 0, 0, 0.3)' : 'none'
                        }}
                    >
                        <button
                            onClick={() => { toggleTheme(); setIsOpen(false); }}
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.3)',
                                borderRadius: '20px',
                                padding: '0.5rem 1rem',
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                cursor: 'pointer',
                                width: 'fit-content'
                            }}
                        >
                            {theme === 'omote' ? <Sparkles size={16} /> : <Ghost size={16} />}
                            <span style={{ fontSize: '1rem', fontFamily: 'var(--font-serif)' }}>
                                {theme === 'omote' ? '世界反転' : '現実回帰'}
                            </span>
                        </button>
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={`/#${item.id}`}
                                onClick={() => setIsOpen(false)}
                                style={{
                                    fontSize: '1.2rem',
                                    fontFamily: 'var(--font-sans)',
                                    fontWeight: 'bold',
                                    color: theme === 'ura' ? '#ff0000' : '#fff',
                                    textShadow: theme === 'ura' ? '0 0 5px rgba(255,0,0,0.5)' : 'none',
                                    textDecoration: 'none',
                                    borderBottom: theme === 'ura' ? '1px solid rgba(255,0,0,0.3)' : '1px solid rgba(255,255,255,0.1)',
                                    width: '100%',
                                    paddingBottom: '0.5rem'
                                }}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/admin"
                            onClick={() => setIsOpen(false)}
                            style={{
                                fontSize: '0.8rem',
                                fontFamily: 'var(--font-mono)',
                                color: 'rgba(255,255,255,0.3)',
                                marginTop: 'auto', // Push to bottom
                                width: '100%',
                                textAlign: 'right',
                                textDecoration: 'none',
                                padding: '1rem 0'
                            }}
                        >
                            ADMIN PANEL &gt;
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0%;
                    height: 2px;
                    background: var(--hsr-cyan);
                    box-shadow: 0 0 8px var(--hsr-cyan);
                    transition: width 0.3s ease;
                }
                .nav-link:hover::after {
                    width: 100%;
                }
            `}</style>
        </motion.nav>
    );
}
