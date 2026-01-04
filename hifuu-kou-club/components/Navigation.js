"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

const navItems = [
    { name: 'HOME', id: 'hero' },
    { name: 'NEWS', id: 'news' },
    { name: 'CONTENT', id: 'videos' },
    { name: 'CHARACTERS', id: 'characters' },
    { name: 'DIARY', id: 'diary' },
];

export default function Navigation() {
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
                padding: '2rem 3rem',
                background: 'rgba(249, 248, 246, 0.8)',
                backdropFilter: 'blur(8px)',
                borderBottom: '1px solid rgba(0,0,0,0.05)'
            }}
        >
            {/* Logo Area */}
            <Link href="/#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{
                    width: '32px', height: '32px',
                    background: 'var(--hakurei-red)',
                    borderRadius: '50%',
                    display: 'grid', placeItems: 'center'
                }}>
                    <div style={{ width: '60%', height: '60%', background: '#fff', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'translateY(-10%)' }}></div>
                </div>
                <span style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    color: 'var(--text-main)',
                    letterSpacing: '0.1em',
                    whiteSpace: 'nowrap'
                }}>
                    秘封工倶楽部
                </span>
            </Link>

            {/* Nav Items */}
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
        </motion.nav>
    );
}
