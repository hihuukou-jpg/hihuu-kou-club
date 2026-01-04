"use client";

import { motion } from 'framer-motion';
import newsData from '../../data/news.json';

// Variants for staggering children
const containerV = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const itemV = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

export default function NewsPage() {
    return (
        <div style={{
            minHeight: '100vh',
            padding: '8rem 2rem 4rem',
            maxWidth: '1200px',
            margin: '0 auto',
        }}>
            <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                    fontSize: '3rem',
                    borderLeft: '4px solid var(--hakurei-red)',
                    paddingLeft: '1rem',
                    marginBottom: '3rem',
                    letterSpacing: '0.1em'
                }}
            >
                お知らせ
                <span style={{ display: 'block', fontSize: '1rem', color: 'var(--mist-gray)', marginTop: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                    / ANNOUNCEMENTS
                </span>
            </motion.h1>

            <motion.div
                variants={containerV}
                initial="hidden"
                animate="visible"
                style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
            >
                {newsData.map((item) => (
                    <motion.div
                        key={item.id}
                        variants={itemV}
                        style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            padding: '2rem',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        whileHover={{
                            backgroundColor: 'rgba(230, 0, 51, 0.1)',
                            borderColor: 'var(--hakurei-red)'
                        }}
                    >
                        {/* Ema-like decorative element */}
                        <div style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            width: '10px',
                            height: '10px',
                            border: '1px solid var(--hakurei-red)',
                            transform: 'rotate(45deg)'
                        }} />

                        <div style={{
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--hakurei-red)',
                            fontSize: '0.9rem',
                            marginBottom: '0.5rem'
                        }}>
                            {item.date}
                        </div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                            {item.title}
                        </h2>
                        <p style={{ lineHeight: '1.8', color: '#ccc' }}>
                            {item.content}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
