"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';

export default function NewsSection() {
    const [news, setNews] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const { theme } = useTheme(); // Get current theme

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);

        fetch('/api/news')
            .then((res) => res.json())
            .then((data) => setNews(data));

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Theme Styles
    const isUra = theme === 'ura';
    const bgStyle = isUra ? {
        background: '#0a0a0a',
        color: '#ff0055'
    } : {
        background: '#F8FAFC',
        color: 'var(--text-main)'
    };

    const cardStyle = isUra ? {
        background: 'rgba(0,0,0,0.8)',
        border: '2px solid #ff0055',
        boxShadow: '0 0 15px rgba(255, 0, 85, 0.3)',
        color: '#fff'
    } : {
        background: 'rgba(255, 255, 255, 0.95)', // More opaque for readability
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        borderLeft: '4px solid var(--hakurei-red)',
        color: '#334155'
    };

    return (
        <section id="news" style={{ minHeight: '100vh', padding: isMobile ? '6rem 1rem' : '8rem 2rem', position: 'relative', ...bgStyle }}>
            {/* Background Grid */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: isUra ? 'radial-gradient(#330000 1px, transparent 1px)' : 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.3, zIndex: 0 }}></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: isMobile ? '3rem' : '5rem', position: 'relative', zIndex: 1 }}
            >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ width: '40px', height: '1px', background: isUra ? '#ff0055' : 'var(--hakurei-red)' }}></span>
                    <h2 className="hsr-title-decor" style={{
                        fontSize: isMobile ? '2.5rem' : '3.5rem', // Larger Font
                        fontFamily: 'var(--font-serif)',
                        color: isUra ? '#ff0055' : 'var(--text-main)',
                        fontWeight: 'bold',
                        letterSpacing: '0.1em',
                        textShadow: isUra ? '3px 3px 0px #000' : 'none'
                    }}>
                        {isUra ? 'DANGER NEWS' : 'お知らせ'}
                    </h2>
                    <span style={{ width: '40px', height: '1px', background: isUra ? '#ff0055' : 'var(--hakurei-red)' }}></span>
                </div>
            </motion.div>

            <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: isMobile ? '1.5rem' : '2.5rem', position: 'relative', zIndex: 1 }}>
                {news.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                        className="hsr-card"
                        style={{
                            padding: isMobile ? '2rem' : '3rem',
                            borderRadius: '8px',
                            ...cardStyle
                        }}
                    >
                        <div style={{
                            fontSize: '1rem',
                            color: isUra ? '#ff0055' : 'var(--text-dim)',
                            fontFamily: 'var(--font-mono)',
                            marginBottom: '0.8rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontWeight: 'bold'
                        }}>
                            <span style={{ width: '10px', height: '10px', background: isUra ? '#ff0055' : 'var(--hsr-cyan)', borderRadius: '50%', boxShadow: isUra ? '0 0 10px #ff0055' : '0 0 5px var(--hsr-cyan)' }}></span>
                            {item.date}
                        </div>

                        <h3 style={{
                            fontSize: isMobile ? '1.5rem' : '1.8rem',
                            marginBottom: '1.2rem',
                            fontFamily: 'var(--font-serif)',
                            color: isUra ? '#fff' : 'var(--text-main)',
                            fontWeight: 'bold',
                            lineHeight: 1.3,
                            textShadow: isUra ? '2px 2px 0px #ff0055' : 'none'
                        }}>
                            {item.title}
                        </h3>
                        <p style={{
                            lineHeight: '2',
                            color: isUra ? '#eee' : '#333',
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.15rem',
                            fontWeight: '500' // Increased weight
                        }}>
                            {item.content}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
