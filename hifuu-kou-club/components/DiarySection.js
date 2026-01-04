"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function DiarySection() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        fetch('/api/diary')
            .then((res) => res.json())
            .then((data) => setEntries(data));
    }, []);

    return (
        <section id="diary" style={{ minHeight: '100vh', padding: '8rem 2rem', background: '#F9F8F6', color: 'var(--text-main)' }}>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
                <h2 style={{
                    fontSize: '2.5rem',
                    fontFamily: 'var(--font-serif)',
                    display: 'inline-block',
                    padding: '0 2rem',
                    borderLeft: '1px solid var(--hakurei-red)',
                    borderRight: '1px solid var(--hakurei-red)'
                }}>
                    活動日誌
                </h2>
            </motion.div>

            <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', paddingLeft: '2rem' }}>
                {/* Timeline Line: Solid Red */}
                <div style={{
                    position: 'absolute',
                    left: '0',
                    top: 0,
                    bottom: 0,
                    width: '1px',
                    background: '#ddd',
                }} />

                {entries.map((entry, index) => (
                    <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, duration: 1 }}
                        style={{
                            marginBottom: '4rem',
                            position: 'relative',
                            paddingLeft: '2rem'
                        }}
                    >
                        {/* Dot on timeline: Circle */}
                        <div style={{
                            position: 'absolute',
                            left: '-5px',
                            top: '8px',
                            width: '11px',
                            height: '11px',
                            background: '#fff',
                            border: '3px solid var(--hakurei-red)',
                            borderRadius: '50%',
                            zIndex: 1
                        }} />

                        <div style={{
                            fontSize: '0.9rem',
                            color: 'var(--hakurei-red)',
                            fontFamily: 'var(--font-serif)',
                            marginBottom: '0.2rem'
                        }}>
                            {entry.date}
                        </div>

                        <h3 style={{
                            fontSize: '1.3rem',
                            marginBottom: '1rem',
                            fontFamily: 'var(--font-serif)',
                            fontWeight: '500'
                        }}>
                            {entry.title}
                        </h3>

                        <p style={{ lineHeight: '1.8', fontSize: '1rem', color: '#666', fontFamily: 'var(--font-serif)' }}>
                            {entry.content}
                        </p>

                        {/* Progress Bar: Elegant Gold Line */}
                        {entry.progress !== undefined && (
                            <div style={{ marginTop: '1.5rem', maxWidth: '300px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.3rem', fontFamily: 'var(--font-serif)', color: '#999' }}>
                                    <span>進捗</span>
                                    <span>{entry.progress}%</span>
                                </div>
                                <div style={{ width: '100%', height: '2px', background: '#eee' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${entry.progress}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                                        style={{ height: '100%', background: 'var(--spirit-gold)' }}
                                    />
                                </div>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
