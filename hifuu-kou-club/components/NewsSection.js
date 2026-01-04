"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function NewsSection() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch('/api/news')
            .then((res) => res.json())
            .then((data) => setNews(data));
    }, []);

    return (
        <section id="news" style={{ minHeight: '100vh', padding: '8rem 2rem', background: '#F9F8F6', color: 'var(--text-main)' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: '5rem' }}
            >
                <h2 style={{
                    fontSize: '2.5rem',
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--text-main)',
                    display: 'inline-block',
                    borderBottom: '2px solid var(--hakurei-red)',
                    paddingBottom: '1rem'
                }}>
                    お知らせ
                </h2>
            </motion.div>

            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {news.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                        style={{
                            background: '#fff',
                            padding: '2rem 3rem',
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
                            fontSize: '1.4rem',
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
