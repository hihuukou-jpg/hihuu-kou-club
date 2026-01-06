"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

import { useTheme } from './ThemeContext';

export default function DiarySection() {
    const { theme } = useTheme();
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        fetch('/api/diary')
            .then((res) => res.json())
            .then((data) => setEntries(data));
    }, []);

    const isUra = theme === 'ura';

    return (
        <section id="diary" style={{
            minHeight: '100vh',
            padding: '8rem 2rem',
            background: isUra ? '#050505' : 'linear-gradient(to bottom, #E0F2FE 0%, #F8FAFC 100%)',
            color: isUra ? '#fff' : 'var(--text-main)',
            position: 'relative'
        }}>
            {/* Tech Background Grid */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: isUra ? 'radial-gradient(#330000 1px, transparent 1px)' : 'radial-gradient(#94a3b8 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                opacity: 0.15, pointerEvents: 'none'
            }}></div>

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
                        letterSpacing: '0.1em',
                        color: isUra ? '#ff0000' : 'inherit',
                        textShadow: isUra ? '0 0 10px #ff0000' : 'none'
                    }}>
                        活動日誌
                    </h2>
                    <span style={{ width: '40px', height: '1px', background: 'var(--hakurei-red)' }}></span>
                </div>
            </motion.div>

            <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', paddingLeft: '2rem', zIndex: 1 }}>
                {/* Timeline Line: HSR Cyan/Gold Gradient vs Red for Ura */}
                <div style={{
                    position: 'absolute',
                    left: '0',
                    top: 0,
                    bottom: 0,
                    width: '2px',
                    background: isUra ? 'linear-gradient(to bottom, #ff0000, #550000)' : 'linear-gradient(to bottom, var(--hsr-cyan), var(--hsr-gold))',
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
                        {/* Dot on timeline */}
                        <div style={{
                            position: 'absolute',
                            left: '-6px',
                            top: '8px',
                            width: '14px',
                            height: '14px',
                            background: isUra ? '#000' : '#fff',
                            border: isUra ? '2px solid #ff0000' : '2px solid var(--hsr-cyan)',
                            transform: 'rotate(45deg)', // Diamond
                            boxShadow: isUra ? '0 0 8px #ff0000' : '0 0 8px var(--hsr-cyan)',
                            zIndex: 1
                        }} />

                        <div style={{
                            fontSize: '0.9rem',
                            color: isUra ? 'rgba(255,255,255,0.7)' : 'var(--text-dim)',
                            fontFamily: 'var(--font-mono)',
                            marginBottom: '0.2rem',
                            display: 'flex', alignItems: 'center', gap: '0.5rem'
                        }}>
                            <span style={{ color: isUra ? '#ff0000' : 'var(--hsr-gold)' }}>◆</span>
                            {entry.date}
                        </div>

                        <h3 style={{
                            fontSize: '1.3rem',
                            marginBottom: '1rem',
                            fontFamily: 'var(--font-serif)',
                            fontWeight: 'bold',
                            color: isUra ? '#fff' : 'inherit'
                        }}>
                            {entry.title}
                        </h3>

                        <div className="hsr-card" style={{
                            padding: '1.5rem 2rem',
                            borderLeft: 'none',
                            borderTop: '2px solid var(--hakurei-red)',
                            background: isUra ? 'rgba(20, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.85)',
                            color: isUra ? '#ddd' : '#475569',
                            boxShadow: isUra ? '0 0 20px rgba(255,0,0,0.1)' : 'none'
                        }}>
                            <p style={{ lineHeight: '1.8', fontSize: '1rem', fontFamily: 'var(--font-serif)', color: isUra ? '#ddd' : '#475569' }}>
                                {entry.content}
                            </p>

                            {/* Progress Bar */}
                            {entry.progress !== undefined && (
                                <div style={{ marginTop: '1.5rem', maxWidth: '300px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.3rem', fontFamily: 'var(--font-mono)', color: isUra ? '#888' : '#64748B' }}>
                                        <span>PROGRESS</span>
                                        <span>{entry.progress}%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '4px', background: isUra ? '#330000' : '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${entry.progress}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                                            style={{
                                                height: '100%',
                                                background: isUra ? '#ff0000' : 'linear-gradient(90deg, var(--hsr-cyan), var(--hsr-gold))',
                                                boxShadow: isUra ? '0 0 10px #ff0000' : '0 0 10px var(--hsr-cyan)'
                                            }}
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
