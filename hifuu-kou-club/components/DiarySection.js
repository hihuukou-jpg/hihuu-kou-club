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
        <section id="diary" style={{ minHeight: '100vh', padding: '8rem 2rem', background: 'linear-gradient(to bottom, #E0F2FE 0%, #F8FAFC 100%)', color: 'var(--text-main)', position: 'relative' }}>
            {/* Tech Background Grid (Inverted opacity) */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.15, pointerEvents: 'none' }}></div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative', zIndex: 1 }}
            >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ width: '40px', height: '1px', background: 'var(--hakurei-red)' }}></span>
                    <h2 className="hsr-title-decor" style={{
                        fontSize: '2.5rem',
                        fontFamily: 'var(--font-serif)',
                        fontWeight: 'bold',
                        letterSpacing: '0.1em'
                    }}>
                        活動日誌
                    </h2>
                    <span style={{ width: '40px', height: '1px', background: 'var(--hakurei-red)' }}></span>
                </div>
            </motion.div>

            <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', paddingLeft: '2rem', zIndex: 1 }}>
                {/* Timeline Line: HSR Cyan/Gold Gradient */}
                <div style={{
                    position: 'absolute',
                    left: '0',
                    top: 0,
                    bottom: 0,
                    width: '2px',
                    background: 'linear-gradient(to bottom, var(--hsr-cyan), var(--hsr-gold))',
                    opacity: 0.5
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
                        {/* Dot on timeline: Diamond */}
                        <div style={{
                            position: 'absolute',
                            left: '-6px',
                            top: '8px',
                            width: '14px',
                            height: '14px',
                            background: '#fff',
                            border: '2px solid var(--hsr-cyan)',
                            transform: 'rotate(45deg)', // Diamond
                            boxShadow: '0 0 8px var(--hsr-cyan)',
                            zIndex: 1
                        }} />

                        <div style={{
                            fontSize: '0.9rem',
                            color: 'var(--text-dim)',
                            fontFamily: 'var(--font-mono)',
                            marginBottom: '0.2rem',
                            display: 'flex', alignItems: 'center', gap: '0.5rem'
                        }}>
                            <span style={{ color: 'var(--hsr-gold)' }}>◆</span>
                            {entry.date}
                        </div>

                        <h3 style={{
                            fontSize: '1.3rem',
                            marginBottom: '1rem',
                            fontFamily: 'var(--font-serif)',
                            fontWeight: 'bold'
                        }}>
                            {entry.title}
                        </h3>

                        <div className="hsr-card" style={{ padding: '1.5rem 2rem', borderLeft: 'none', borderTop: '2px solid var(--hakurei-red)' }}>
                            <p style={{ lineHeight: '1.8', fontSize: '1rem', color: '#475569', fontFamily: 'var(--font-serif)' }}>
                                {entry.content}
                            </p>

                            {/* Progress Bar: HSR Style */}
                            {entry.progress !== undefined && (
                                <div style={{ marginTop: '1.5rem', maxWidth: '300px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.3rem', fontFamily: 'var(--font-mono)', color: '#64748B' }}>
                                        <span>PROGRESS</span>
                                        <span>{entry.progress}%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${entry.progress}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                                            style={{ height: '100%', background: 'linear-gradient(90deg, var(--hsr-cyan), var(--hsr-gold))', boxShadow: '0 0 10px var(--hsr-cyan)' }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
