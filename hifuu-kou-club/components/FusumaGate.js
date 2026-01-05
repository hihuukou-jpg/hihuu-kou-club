"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function FusumaGate() {
    const [isOpen, setIsOpen] = useState(false);
    // Placeholder sound - using a standard 'door slide' effect if available or generic.
    // For now, using a Data URI for a short noise or just referring to a placeholder.
    // I'll assume a generic sliding sound URL from a royalty-free CDN for demo.
    const SOUND_URL = "https://cdn.pixabay.com/download/audio/2022/03/24/audio_03e05a76e7.mp3?filename=sliding-door-6091.mp3";

    const audioRef = useRef(null);

    useEffect(() => {
        // Prevent scrolling while closed
        if (!isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        // Start animation after mount
        const timer = setTimeout(() => {
            if (audioRef.current) {
                audioRef.current.volume = 0.5;
                audioRef.current.play().catch(e => console.log("Audio autoplay blocked", e));
            }
            setIsOpen(true);
        }, 500); // Short delay before opening

        return () => clearTimeout(timer);
    }, [isOpen]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 9999, // Highest priority
            pointerEvents: 'none', // Allow clicks through after opening (though we'll move them off screen)
            display: 'flex'
        }}>
            <audio ref={audioRef} src={SOUND_URL} preload="auto" />

            {/* Left Door */}
            <motion.div
                initial={{ x: '0%' }}
                animate={{ x: '-100%' }}
                transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }} // Slower, heavier feel
                style={{
                    width: '50%',
                    height: '100%',
                    background: '#fdfbf7', // Base paper color
                    // Complex background layering for realism
                    backgroundImage: `
                        /* Wood Frame (Vertical Rails) */
                        linear-gradient(to right, #5d4037 0px, #8d6e63 2px, #5d4037 5%, transparent 5%, transparent 95%, #5d4037 95%, #8d6e63 98%, #5d4037 100%),
                        /* Horizontal Wood Bars (Kumiko/San) */
                        repeating-linear-gradient(to bottom, transparent, transparent 120px, #5d4037 120px, #8d6e63 122px, #5d4037 125px),
                        /* Subtle Washi Paper Texture (Grain) */
                        url("https://www.transparenttextures.com/patterns/washi.png")
                    `,
                    backgroundBlendMode: 'normal, normal, multiply',
                    borderRight: '12px solid #3e2723', // Thicker central meeting frame
                    position: 'relative',
                    boxShadow: '10px 0 30px rgba(0,0,0,0.7)', // Deep shadow between doors
                }}
            >
                {/* Hikite (Handle) - Ornate Metal Style */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    right: '30px',
                    transform: 'translateY(-50%)',
                    width: '60px',
                    height: '100px',
                    borderRadius: '30px',
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 50%, #1a1a1a 100%)', // Iron/Black Metal
                    border: '2px solid #d4af37', // Gold trim
                    boxShadow: 'inset 0 0 15px rgba(0,0,0,1), 0 2px 5px rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {/* Inner indentation */}
                    <div style={{
                        width: '40px',
                        height: '70px',
                        borderRadius: '20px',
                        background: '#111',
                        border: '1px solid #333',
                        boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.8)'
                    }}></div>
                    {/* Flower Crest (Kamon) Simulation */}
                    <div style={{
                        position: 'absolute',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: '#d4af37',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.5)'
                    }}></div>
                </div>
            </motion.div>

            {/* Right Door */}
            <motion.div
                initial={{ x: '0%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                style={{
                    width: '50%',
                    height: '100%',
                    background: '#fdfbf7',
                    backgroundImage: `
                        /* Wood Frame */
                        linear-gradient(to left, #5d4037 0px, #8d6e63 2px, #5d4037 5%, transparent 5%, transparent 95%, #5d4037 95%, #8d6e63 98%, #5d4037 100%),
                        /* Horizontal Bars */
                        repeating-linear-gradient(to bottom, transparent, transparent 120px, #5d4037 120px, #8d6e63 122px, #5d4037 125px),
                        /* Texture */
                        url("https://www.transparenttextures.com/patterns/washi.png")
                    `,
                    backgroundBlendMode: 'normal, normal, multiply',
                    borderLeft: '12px solid #3e2723',
                    position: 'relative',
                    boxShadow: '-10px 0 30px rgba(0,0,0,0.7)',
                }}
            >
                {/* Hikite (Handle) */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '30px',
                    transform: 'translateY(-50%)',
                    width: '60px',
                    height: '100px',
                    borderRadius: '30px',
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 50%, #1a1a1a 100%)',
                    border: '2px solid #d4af37',
                    boxShadow: 'inset 0 0 15px rgba(0,0,0,1), 0 2px 5px rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        width: '40px',
                        height: '70px',
                        borderRadius: '20px',
                        background: '#111',
                        border: '1px solid #333',
                        boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.8)'
                    }}></div>
                    <div style={{
                        position: 'absolute',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: '#d4af37',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.5)'
                    }}></div>
                </div>
            </motion.div>
        </div>
    );
}
