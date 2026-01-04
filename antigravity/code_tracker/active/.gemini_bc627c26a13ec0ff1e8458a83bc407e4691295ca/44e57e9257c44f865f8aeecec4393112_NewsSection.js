�"use client";

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
        <section id="news" style={{ minHeight: '100vh', padding: isMobile ? '6rem 1rem' : '8rem 2rem', background: '#F9F8F6', color: 'var(--text-main)' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: isMobile ? '3rem' : '5rem' }}
            >
                <h2 style={{
                    fontSize: isMobile ? '2rem' : '2.5rem',
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--text-main)',
                    display: 'inline-block',
                    borderBottom: '2px solid var(--hakurei-red)',
                    paddingBottom: '1rem'
                }}>
                    お知らせ
                </h2>
            </motion.div>

            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: isMobile ? '1.5rem' : '2rem' }}>
                {news.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                        style={{
                            background: '#fff',
                            padding: isMobile ? '1.5rem' : '2rem 3rem',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                            position: 'relative',
                            borderLeft: '4px solid var(--hakurei-red)',
                            borderRadius: '2px'
                        }}
                    >
                        <div style={{
                            fontSize: '0.9rem',
                            color: '#999',
                            fontFamily: 'var(--font-serif)',
                            marginBottom: '0.5rem'
                        }}>
                            {item.date}
                        </div>

                        <h3 style={{
                            fontSize: isMobile ? '1.2rem' : '1.4rem',
                            marginBottom: '1rem',
                            fontFamily: 'var(--font-serif)',
                            color: 'var(--text-main)',
                            fontWeight: '500'
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
�*cascade08"(bc627c26a13ec0ff1e8458a83bc407e4691295ca2Gfile:///C:/Users/kouki/.gemini/hifuu-kou-club/components/NewsSection.js:file:///C:/Users/kouki/.gemini