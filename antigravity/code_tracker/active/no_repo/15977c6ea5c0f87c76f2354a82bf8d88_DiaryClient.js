�5"use client";

import { motion } from 'framer-motion';

export default function DiaryClient({ diary }) {
    return (
        <div style={{
            minHeight: '100vh',
            padding: '8rem 2rem 4rem',
            maxWidth: '1000px',
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
                    marginBottom: '4rem',
                    letterSpacing: '0.1em'
                }}
            >
                制作日誌
                <span style={{ display: 'block', fontSize: '1rem', color: 'var(--mist-gray)', marginTop: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                    / DEVLOG
                </span>
            </motion.h1>

            <div style={{ position: 'relative', paddingLeft: '2rem' }}>
                {/* Vertical Timeline Line */}
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: '100%' }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '2px',
                        background: 'var(--mist-gray)',
                        opacity: 0.3
                    }}
                />

                {diary.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + 0.5, duration: 0.6 }}
                        style={{ marginBottom: '4rem', position: 'relative' }}
                    >
                        {/* Timeline Dot */}
                        <div style={{
                            position: 'absolute',
                            left: '-2.4rem',
                            top: '0.5rem',
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: 'var(--hakurei-red)',
                            boxShadow: '0 0 10px var(--hakurei-red)'
                        }} />

                        <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--mist-gray)', marginBottom: '0.5rem' }}>
                            {item.date}
                        </div>

                        <div style={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            color: 'var(--sumi-black)',
                            padding: '2rem',
                            borderRadius: '2px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                            position: 'relative'
                        }}>
                            {/* Paper Texture Overlay for the card */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`,
                                pointerEvents: 'none'
                            }} />

                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                                {item.title}
                            </h2>

                            <div
                                className="diary-content"
                                dangerouslySetInnerHTML={{ __html: item.content }}
                            />

                            <style jsx global>{`
                                .diary-content { line-height: 1.8; color: #444; }
                                .diary-content h1 { font-size: 1.4rem; border-bottom: 2px solid #ddd; padding-bottom: 0.5rem; margin-top: 2rem; margin-bottom: 1rem; }
                                .diary-content h2 { font-size: 1.2rem; border-left: 3px solid var(--hakurei-red); padding-left: 0.5rem; margin-top: 1.5rem; margin-bottom: 0.8rem; }
                                .diary-content h3 { font-size: 1.1rem; font-weight: bold; margin-top: 1.2rem; margin-bottom: 0.5rem; }
                                .diary-content p { margin-bottom: 1rem; }
                                .diary-content ul, .diary-content ol { margin-bottom: 1rem; padding-left: 1.5rem; }
                                .diary-content img { max-width: 100%; height: auto; border-radius: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); margin: 1rem 0; }
                                .diary-content blockquote { border-left: 4px solid #ccc; padding-left: 1rem; color: #666; font-style: italic; }
                            `}</style>

                            {/* Progress Bar */}
                            {item.progress !== undefined && item.progress !== null && (
                                <div style={{ marginTop: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}>
                                        <span>VIDEO PROGRESS</span>
                                        <span>{item.progress}%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '4px', background: 'rgba(0,0,0,0.1)' }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${item.progress}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            style={{ height: '100%', background: 'var(--hakurei-red)' }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
�5*cascade082Ffile:///c:/Users/kouki/.gemini/hifuu-kou-club/app/diary/DiaryClient.js