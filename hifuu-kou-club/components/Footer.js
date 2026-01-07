"use client";

import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer style={{
            background: 'var(--sumi-black)',
            color: '#ccc',
            padding: '3rem 0',
            textAlign: 'center',
            fontFamily: 'var(--font-serif)',
            borderTop: '2px solid var(--hakurei-red)'
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>

                {/* Logo or Title */}
                <div style={{ fontSize: '1.2rem', color: 'var(--hakurei-white)', letterSpacing: '0.1em' }}>
                    秘封工倶楽部
                </div>

                {/* Social Links */}
                <div style={{ display: 'flex', gap: '2rem', fontSize: '1rem' }}>
                    <a
                        href="https://x.com/hihuukou"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.3s' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#ccc'}
                    >
                        <span>X (Twitter)</span>
                    </a>

                    <a
                        href="https://www.youtube.com/@Hihuukou"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.3s' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#ccc'}
                    >
                        <span>YouTube</span>
                    </a>

                    <a
                        href="https://www.pixiv.net/users/119554479"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.3s' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#ccc'}
                    >
                        <span>Pixiv</span>
                    </a>

                    <a
                        href="https://seiga.nicovideo.jp/my/?track=global_navi_top"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.3s' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#ccc'}
                    >
                        <span>ニコニコ静画</span>
                    </a>
                </div>

                {/* Copyright */}
                <div style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '1rem' }}>
                    © 2026 Hifuu Kou Club. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}
