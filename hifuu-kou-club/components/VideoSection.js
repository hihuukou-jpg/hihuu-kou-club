"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import VideoModal from './VideoModal';

export default function VideoSection() {
    const [videos, setVideos] = useState([]);
    const [selectedVideoId, setSelectedVideoId] = useState(null);

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
            background: '#F8FAFC',
            color: '#333',
            padding: '8rem 2rem',
            fontFamily: 'var(--font-serif)'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <h2
                        className="hsr-title-decor"
                        style={{
                            fontSize: '3rem',
                            marginBottom: '1rem',
                            letterSpacing: '0.05em',
                            fontFamily: 'var(--font-display)',
                            fontWeight: 'bold',
                            color: 'var(--text-main)',
                            display: 'inline-block'
                        }}
                    >
                        CONTENT
                    </h2>
                    <p style={{ color: '#64748b', marginTop: '1rem' }}>秘封工倶楽部の制作物・動画アーカイブ</p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '2.5rem',
                }}>
                    {videos.map((video, index) => {
                        const videoId = getYouTubeId(video.url);
                        return (
                            <motion.div
                                key={video.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="video-card"
                                onClick={() => setSelectedVideoId(videoId)}
                                style={{
                                    cursor: 'pointer',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    background: '#fff',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    group: 'test' // dummy
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
                                }}
                            >
                                {/* Thumbnail Container */}
                                <div style={{
                                    position: 'relative',
                                    paddingBottom: '56.25%', // 16:9
                                    background: '#000',
                                    overflow: 'hidden'
                                }}>
                                    <img
                                        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                                        alt={video.title}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.5s ease'
                                        }}
                                        className="thumbnail"
                                    />

                                    {/* Overlay */}
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'rgba(0,0,0,0.3)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        opacity: 0,
                                        transition: 'opacity 0.3s'
                                    }} className="play-overlay">
                                        <div style={{
                                            width: '60px',
                                            height: '60px',
                                            background: 'rgba(255,255,255,0.2)',
                                            backdropFilter: 'blur(4px)',
                                            borderRadius: '50%',
                                            display: 'grid',
                                            placeItems: 'center',
                                            border: '1px solid rgba(255,255,255,0.4)'
                                        }}>
                                            <Play fill="white" color="white" size={24} style={{ marginLeft: '4px' }} />
                                        </div>
                                    </div>
                                </div>

                                {/* Info */}
                                <div style={{ padding: '1.5rem' }}>
                                    <h3 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: 'bold',
                                        fontFamily: 'var(--font-sans)',
                                        lineHeight: 1.4,
                                        marginBottom: '0.5rem',
                                        color: '#1e293b'
                                    }}>
                                        {video.title}
                                    </h3>
                                    <div style={{
                                        width: '40px',
                                        height: '2px',
                                        background: 'var(--hsr-cyan)',
                                        marginTop: '1rem'
                                    }}></div>
                                </div>

                                <style jsx>{`
                                    .video-card:hover .play-overlay {
                                        opacity: 1 !important;
                                    }
                                    .video-card:hover .thumbnail {
                                        transform: scale(1.05);
                                    }
                                `}</style>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedVideoId && (
                <VideoModal
                    videoId={selectedVideoId}
                    onClose={() => setSelectedVideoId(null)}
                />
            )}
        </section>
    );
}

