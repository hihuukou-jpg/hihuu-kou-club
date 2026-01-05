Ã)"use client";

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
            background: '#F8FAFC',
            color: '#333',
            padding: '8rem 2rem',
            fontFamily: 'var(--font-serif)'
        }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hsr-title-decor"
                    style={{
                        fontSize: '2.5rem',
                        marginBottom: '3rem',
                        letterSpacing: '0.05em',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 'bold',
                        color: 'var(--text-main)',
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
                                className="hsr-glass"
                                style={{
                                    padding: '0.5rem',
                                    border: '1px solid rgba(0,0,0,0.1)',
                                    background: '#fff',
                                    position: 'relative',
                                    clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
                                }}
                            >
                                {/* Decorative Corner Accents */}
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '10px', height: '10px', borderTop: '2px solid var(--hsr-gold)', borderLeft: '2px solid var(--hsr-gold)' }}></div>
                                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderBottom: '2px solid var(--hsr-gold)', borderRight: '2px solid var(--hsr-gold)' }}></div>

                                <div style={{
                                    position: 'relative',
                                    paddingBottom: '56.25%',
                                    height: 0,
                                    overflow: 'hidden',
                                    marginBottom: '1rem',
                                    background: '#000',
                                    clipPath: 'polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)',
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
                                <h3 style={{ fontSize: '1rem', fontWeight: 'bold', margin: '0 0.5rem 0.5rem 0.5rem', fontFamily: 'var(--font-sans)' }}>{video.title}</h3>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
ó *cascade08óù*cascade08ùõ	 *cascade08õ	Ã	*cascade08Ã	ﬁ *cascade08ﬁï *cascade08ïÔ *cascade08Ô¶*cascade08¶‘ *cascade08‘’*cascade08’÷ *cascade08÷Ÿ*cascade08Ÿ⁄ *cascade08⁄€*cascade08€ﬁ *cascade08ﬁ‰*cascade08‰ü *cascade08ü„*cascade08„‰ *cascade08‰Â *cascade08ÂÁ*cascade08Áê *cascade08êî*cascade08îï *cascade08ïñ*cascade08ñú *cascade08ú¢*cascade08¢  *cascade08 —*cascade08—’ *cascade08’ﬁ*cascade08ﬁﬂ *cascade08ﬂ‰*cascade08‰Â *cascade08ÂÁ*cascade08ÁÒ*cascade08ÒÚ *cascade08ÚÄ*cascade08ÄÇ *cascade08ÇÑ*cascade08ÑÖ *cascade08ÖÜ*cascade08Üá *cascade08áâ*cascade08âä *cascade08äò*cascade08òö *cascade08öõ*cascade08õú *cascade08úù*cascade08ùû *cascade08û£*cascade08£§ *cascade08§•*cascade08•¶ *cascade08¶®*cascade08®© *cascade08©´*cascade08´¨ *cascade08
¨– –‘*cascade08
‘ÿ ÿö*cascade08
öú ú¶*cascade08
¶® ®◊*cascade08
◊Ÿ ŸÙ*cascade08
Ùı ıê*cascade08
êì ìï*cascade08
ïó óò *cascade08òô*cascade08ôö *cascade08ö°*cascade08°¢ *cascade08¢©*cascade08©™ *cascade08™¥*cascade08¥µ *cascade08µπ*cascade08π∫ *cascade08∫ø*cascade08ø¿ *cascade08¿—*cascade08—“ *cascade08“›*cascade08›ﬁ *cascade08ﬁ‚*cascade08‚„ *cascade08„Ë*cascade08ËÈ *cascade08È˘*cascade08˘˙ *cascade08˙Ö*cascade08Ö• *cascade08•©*cascade08©™ *cascade08™≤*cascade08≤≥ *cascade08≥º*cascade08ºΩ *cascade08Ω»*cascade08»… *cascade08…–*cascade08–— *cascade08—”*cascade08”‘ *cascade08‘⁄*cascade08⁄€ *cascade08€›*cascade08›ﬁ *cascade08ﬁ‰*cascade08‰Â *cascade08ÂÏ*cascade08ÏÌ *cascade08ÌÙ*cascade08Ùı *cascade08ı¸*cascade08¸˝ *cascade08˝ä*cascade08äã *cascade08ãè*cascade08èê *cascade08êï*cascade08ïñ *cascade08ñß*cascade08ß® *cascade08®¥*cascade08¥µ *cascade08µ”*cascade08”‘ *cascade08‘‹*cascade08‹Ñ *cascade08ÑÑ*cascade08Ñ‡ *cascade08‡Á*cascade08Á‹' *cascade08‹'à(*cascade08à(Ã) *cascade082Hfile:///c:/Users/kouki/.gemini/hifuu-kou-club/components/VideoSection.js