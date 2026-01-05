"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function NewsSection() {
    const [news, setNews] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);

        fetch('/api/news')
            .then((res) => res.json())
            .then((data) => setNews(data));

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section id="news" style={{ minHeight: '100vh', padding: isMobile ? '6rem 1rem' : '8rem 2rem', background: '#F8FAFC', color: 'var(--text-main)', position: 'relative' }}>
            {/* Tech Background Grid */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.3, zIndex: 0 }}></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: isMobile ? '3rem' : '5rem', position: 'relative', zIndex: 1 }}
            >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ width: '40px', height: '1px', background: 'var(--hakurei-red)' }}></span>
                    <h2 className="hsr-title-decor" style={{
                        fontSize: isMobile ? '2rem' : '2.5rem',
                        fontFamily: 'var(--font-serif)',
                        color: 'var(--text-main)',
                        fontWeight: 'bold',
                        letterSpacing: '0.1em'
                    }}>
                        お知らせ
                    </h2>
                    <span style={{ width: '40px', height: '1px', background: 'var(--hakurei-red)' }}></span>
                </div>
            </motion.div>

            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: isMobile ? '1.5rem' : '2rem', position: 'relative', zIndex: 1 }}>
                {news.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                        className="hsr-card"
                        style={{
                            padding: isMobile ? '1.5rem' : '2rem 3rem',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                        }}
                    >
                        <div style={{
                            fontSize: '0.85rem',
                            color: 'var(--text-dim)',
                            fontFamily: 'var(--font-mono)',
                            marginBottom: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <span style={{ width: '8px', height: '8px', background: 'var(--hsr-cyan)', borderRadius: '50%', boxShadow: '0 0 5px var(--hsr-cyan)' }}></span>
                            {item.date}
                        </div>

                        <h3 style={{
                            fontSize: isMobile ? '1.2rem' : '1.4rem',
                            marginBottom: '1rem',
                            fontFamily: 'var(--font-serif)',
                            color: 'var(--text-main)',
                            fontWeight: 'bold'
                        }}>
                            {item.title}
                        </h3>
                        <p style={{ lineHeight: '1.8', color: '#555', fontFamily: 'var(--font-serif)', fontSize: '1rem' }}>{item.content}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
