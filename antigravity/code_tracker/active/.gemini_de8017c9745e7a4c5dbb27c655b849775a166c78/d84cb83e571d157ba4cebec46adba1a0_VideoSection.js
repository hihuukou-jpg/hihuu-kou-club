ºE"use client";

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
                    <p style={{ color: '#64748b', marginTop: '1rem' }}>ç§˜å°å·¥å€¶æ¥½éƒ¨ã®åˆ¶ä½œç‰©ãƒ»å‹•ç”»ã‚¢ãƒ¼ã‚«ã‚¤ãƒ–</p>
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

© *cascade08©«*cascade08«½ *cascade08½¿*cascade08¿‡	 *cascade08‡	Š	*cascade08Š	Á
 *cascade08Á
¼*cascade08¼í *cascade08íñ*cascade08ñû *cascade08ûı*cascade08ı• *cascade08•—*cascade08—¢ *cascade08¢£*cascade08£ª *cascade08ª¬*cascade08¬Ä *cascade08ÄÆ*cascade08ÆÕ *cascade08ÕÖ*cascade08Öİ *cascade08İá*cascade08á« *cascade08«¯*cascade08¯Ó *cascade08ÓÖ*cascade08Öî *cascade08îï*cascade08ï„ *cascade08„ˆ*cascade08ˆĞ *cascade08Ğ‰*cascade08‰ *cascade08¡*cascade08¡¤ *cascade08¤¨*cascade08¨Õ *cascade08Õó*cascade08óü *cascade08üÿ*cascade08ÿ¡ *cascade08¡¶*cascade08¶Ç *cascade08ÇÜ*cascade08Ü *cascade08*cascade08š *cascade08š¯*cascade08¯· *cascade08·¹*cascade08¹½ *cascade08½Ï*cascade08Ïş *cascade08şƒ*cascade08ƒ† *cascade08†‰*cascade08‰É *cascade08ÉÎ*cascade08ÎĞ *cascade08ĞÑ*cascade08ÑÕ *cascade08ÕÚ*cascade08ÚÛ *cascade08ÛÜ*cascade08Üİ *cascade08İß*cascade08ß¡ *cascade08¡£*cascade08£ı *cascade08ıƒ*cascade08ƒ† *cascade08†‹*cascade08‹Œ *cascade08Œ*cascade08» *cascade08»Á*cascade08ÁÅ *cascade08ÅÆ*cascade08Æğ *cascade08ğó*cascade08óõ *cascade08õö*cascade08ö÷ *cascade08÷ø*cascade08øû *cascade08ûü*cascade08üı *cascade08ıÿ*cascade08ÿ€ *cascade08€*cascade08© *cascade08©«*cascade08«¬ *cascade08¬®*cascade08®° *cascade08°³*cascade08³¶ *cascade08¶º*cascade08ºâ *cascade08âç*cascade08çè *cascade08èë*cascade08ëï *cascade08ïñ*cascade08ñô *cascade08ôõ*cascade08õù *cascade08ùü*cascade08ü *cascade08‚*cascade08‚… *cascade08…†*cascade08†‡ *cascade08‡ˆ*cascade08ˆ¿ *cascade08¿Á*cascade08Áï *cascade08ïˆ*cascade08ˆª *cascade08ª«*cascade08«® *cascade08®°*cascade08°± *cascade08±³*cascade08³¶ *cascade08¶»*cascade08»¼ *cascade08¼¾*cascade08¾¿ *cascade08¿È*cascade08Èæ *cascade08æè*cascade08èŠ *cascade08Š*cascade08‘ *cascade08‘“*cascade08“– *cascade08–™*cascade08™š *cascade08š›*cascade08›œ *cascade08œ*cascade08Ÿ *cascade08Ÿ *cascade08 Å *cascade08ÅÉ*cascade08ÉÊ *cascade08ÊÌ*cascade08ÌÍ *cascade08ÍÎ*cascade08ÎÏ *cascade08ÏÓ*cascade08ÓÕ *cascade08Õ×*cascade08×Ø *cascade08ØÚ*cascade08ÚÛ *cascade08ÛÜ*cascade08Üß *cascade08ßà*cascade08àá *cascade08áã*cascade08ãä *cascade08äå*cascade08åæ *cascade08æç*cascade08çé *cascade08éí*cascade08íğ *cascade08ğó*cascade08óõ *cascade08õø*cascade08øú *cascade08úû*cascade08ûı *cascade08ış*cascade08şŸ *cascade08Ÿ©*cascade08©ª *cascade08ª®*cascade08®¯ *cascade08¯±*cascade08±³ *cascade08³´*cascade08´¶ *cascade08¶·*cascade08·¹ *cascade08¹¾*cascade08¾¿ *cascade08¿À*cascade08ÀÁ *cascade08ÁÂ*cascade08ÂÃ *cascade08ÃÄ*cascade08ÄË *cascade08ËÌ*cascade08ÌÑ *cascade08ÑÓ*cascade08ÓÕ *cascade08ÕŞ*cascade08Şà *cascade08àã*cascade08ãç *cascade08ç‚*cascade08‚§ *cascade08§±*cascade08±µ *cascade08µ¼*cascade08¼ã *cascade08ãó*cascade08óô *cascade08ôù*cascade08ùú *cascade08úÿ*cascade08ÿ€ *cascade08€„*cascade08„† *cascade08†‡*cascade08‡ˆ *cascade08ˆ‹*cascade08‹ *cascade08“*cascade08“” *cascade08”•*cascade08•» *cascade08»Å*cascade08ÅÆ *cascade08ÆÇ*cascade08ÇÈ *cascade08ÈÉ*cascade08ÉÊ *cascade08ÊÌ*cascade08ÌÍ *cascade08ÍÒ*cascade08ÒÓ *cascade08ÓÜ*cascade08ÜŞ *cascade08Şä*cascade08äå *cascade08å÷*cascade08÷ø *cascade08øù*cascade08ùú *cascade08úû*cascade08û  *cascade08 ¡ *cascade08¡ ½  *cascade08½ Ó *cascade08Ó Ô  *cascade08Ô å *cascade08å æ  *cascade08æ ë *cascade08ë ì  *cascade08ì ğ *cascade08ğ ñ  *cascade08ñ û *cascade08û ! *cascade08!Ÿ!*cascade08Ÿ! ! *cascade08 !¡!*cascade08¡!¢! *cascade08¢!¦!*cascade08¦!§! *cascade08§!ª!*cascade08ª!Ğ! *cascade08Ğ!Ö!*cascade08Ö!Û! *cascade08Û!ã!*cascade08ã!" *cascade08"”"*cascade08”"•" *cascade08•"˜"*cascade08˜"›" *cascade08›"Ÿ"*cascade08Ÿ"¡" *cascade08¡"¢"*cascade08¢"¤" *cascade08¤"¦"*cascade08¦"¨" *cascade08¨"­"*cascade08­"Ñ" *cascade08Ñ"ä"*cascade08ä"Š# *cascade08Š##*cascade08## *cascade08##*cascade08## *cascade08#“#*cascade08“#”# *cascade08”#œ#*cascade08œ#¾# *cascade08¾#À#*cascade08À#š$ *cascade08š$œ$*cascade08œ$$ *cascade08$¤$*cascade08¤$¥$ *cascade08¥$¬$*cascade08¬$­$ *cascade08­$´$*cascade08´$µ$ *cascade08µ$Ä$*cascade08Ä$Å$ *cascade08Å$Ì$*cascade08Ì$Í$ *cascade08Í$—E*cascade08—E¶E *cascade08¶E¸E*cascade08¸EºE *cascade08"(de8017c9745e7a4c5dbb27c655b849775a166c782Hfile:///C:/Users/kouki/.gemini/hifuu-kou-club/components/VideoSection.js:file:///C:/Users/kouki/.gemini