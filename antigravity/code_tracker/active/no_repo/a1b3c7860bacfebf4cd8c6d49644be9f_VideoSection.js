’#"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function VideoSection() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetch('/api/videos')
            .then(res => res.json())
            .then(data => setVideos(data));
    }, []);

    // Helper to extract YouTube ID
    const getYouTubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url?.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    if (videos.length === 0) return null;

    return (
        <section id="videos" style={{
            position: 'relative',
            background: '#fff',
            color: '#333',
            padding: '8rem 2rem',
            fontFamily: 'var(--font-serif)'
        }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        fontSize: '2.5rem',
                        borderBottom: '4px solid #333',
                        paddingBottom: '0.5rem',
                        marginBottom: '3rem',
                        letterSpacing: '0.05em',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 'bold'
                    }}
                >
                    CONTENT
                </motion.h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {videos.map((video, index) => {
                        const videoId = getYouTubeId(video.url);
                        return (
                            <motion.div
                                key={video.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                style={{
                                    background: '#f8f8f8',
                                    border: '1px solid #ddd',
                                    padding: '1rem',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                                }}
                            >
                                <div style={{
                                    position: 'relative',
                                    paddingBottom: '56.25%', /* 16:9 Aspect Ratio */
                                    height: 0,
                                    overflow: 'hidden',
                                    marginBottom: '1rem',
                                    background: '#000'
                                }}>
                                    {videoId ? (
                                        <iframe
                                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                            src={`https://www.youtube.com/embed/${videoId}`}
                                            title={video.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                            Invalid URL
                                        </div>
                                    )}
                                </div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>{video.title}</h3>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
’# *cascade082Hfile:///c:/Users/kouki/.gemini/hifuu-kou-club/components/VideoSection.js