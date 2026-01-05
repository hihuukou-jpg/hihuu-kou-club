import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BgmPlayer() {
    // NOTE: Replace this with a real file hosted on public/ or a valid URL.
    // Using a placeholder that returns a silent or sample mp3 if possible, or a free asset.
    // For now, attempting a common creative commons sound or just leaving placeholder text.
    // I will use a reliable external source for "Zen Garden" type music if available, 
    // but without internet search reliability for direct MP3 links, I will point to a local file 
    // and instruct user to add logic.
    // WAIT, I'll use a data URI for a very short silent loop or just default to empty and ask user.
    // NO, user said "Make it if you can". I will provide the UI and a *sample* URL if I stick to 
    // standard web ones like basic sound effects. 
    // Actually, I'll use a royalty free placeholder URL served from a CDN if I can recall one.
    // Let's use a dummy source and ask user to replace it. 
    // UPDATE: User insists "Make it". I'll try to find a generic background music URL. 
    // I will use a placeholder from a standard CDN or just build the UI robustly.

    // Using a local file. Please place your audio file in the 'public' folder and name it 'bgm.mp3'.
    const BGM_URL = "/bgm.mp3";

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.05); // Set to Very Quiet (5%) as requested
    const [showVolume, setShowVolume] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        // Attempt Autoplay
        const audio = audioRef.current;
        if (audio) {
            audio.volume = volume;
            const playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setIsPlaying(true);
                    })
                    .catch(error => {
                        console.log("Autoplay prevented by browser:", error);
                        setIsPlaying(false);
                    });
            }
        }
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
        if (newVolume === 0) setIsMuted(true);
        else setIsMuted(false);
    };

    const toggleMute = () => {
        if (audioRef.current) {
            if (isMuted) {
                audioRef.current.volume = volume; // Restore previous volume
                setIsMuted(false);
            } else {
                audioRef.current.volume = 0;
                setIsMuted(true);
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onHoverStart={() => setShowVolume(true)}
            onHoverEnd={() => setShowVolume(false)}
            style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                zIndex: 90,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                padding: '0.5rem',
                borderRadius: '50px',
                border: '1px solid rgba(255,255,255,0.2)',
                flexDirection: 'row-reverse' // Expand to left
            }}
        >
            <audio
                ref={audioRef}
                src={BGM_URL}
                loop
                preload="auto"
            />

            <button
                onClick={togglePlay}
                style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: 'none',
                    background: isPlaying ? 'var(--hsr-gold)' : '#333',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    flexShrink: 0
                }}
            >
                <Music size={20} className={isPlaying ? "spin-slow" : ""} />
            </button>

            <AnimatePresence>
                {/* Always show volume controls if playing, or on hover */}
                {(showVolume || isPlaying) && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 'auto', opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}
                    >
                        <button
                            onClick={toggleMute}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#fff',
                                cursor: 'pointer',
                                padding: '0'
                            }}
                        >
                            {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </button>

                        <input
                            type="range"
                            min="0"
                            max="0.05" // Capped at 5% max volume
                            step="0.005" // Fine tuning
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            style={{
                                width: '80px',
                                accentColor: 'var(--hsr-gold)',
                                cursor: 'pointer'
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .spin-slow {
                    animation: spin 4s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </motion.div>
    );
}
