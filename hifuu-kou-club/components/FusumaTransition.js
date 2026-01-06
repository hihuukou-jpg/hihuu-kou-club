"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeContext";

export default function FusumaTransition() {
    const { isTransitioning, transitionType } = useTheme();

    // Only render if it's a fusuma transition
    if (transitionType !== 'fusuma') return null;

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: 9999,
            display: 'flex'
        }}>
            <AnimatePresence>
                {isTransitioning && (
                    <>
                        {/* Left Door */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: '0%' }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} // Slow elegant slide
                            style={{
                                width: '50%',
                                height: '100%',
                                background: '#fdfbf7',
                                backgroundImage: `
                                    linear-gradient(to right, #5d4037 0px, #8d6e63 2px, #5d4037 5%, transparent 5%, transparent 95%, #5d4037 95%, #8d6e63 98%, #5d4037 100%),
                                    repeating-linear-gradient(to bottom, transparent, transparent 120px, #5d4037 120px, #8d6e63 122px, #5d4037 125px),
                                    url("https://www.transparenttextures.com/patterns/washi.png")
                                `,
                                backgroundBlendMode: 'normal, normal, multiply',
                                borderRight: '12px solid #3e2723',
                                position: 'relative',
                                boxShadow: '10px 0 30px rgba(0,0,0,0.7)',
                            }}
                        >
                            {/* Hikite (Handle) */}
                            <div style={{
                                position: 'absolute',
                                top: '50%', right: '30px', transform: 'translateY(-50%)',
                                width: '60px', height: '100px', borderRadius: '30px',
                                background: '#1a1a1a', border: '2px solid #d4af37',
                                boxShadow: 'inset 0 0 15px rgba(0,0,0,1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <div style={{ width: '40px', height: '70px', borderRadius: '20px', background: '#111', border: '1px solid #333' }}></div>
                                <div style={{ position: 'absolute', width: '20px', height: '20px', borderRadius: '50%', background: '#d4af37' }}></div>
                            </div>
                        </motion.div>

                        {/* Right Door */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: '0%' }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                width: '50%',
                                height: '100%',
                                background: '#fdfbf7',
                                backgroundImage: `
                                    linear-gradient(to left, #5d4037 0px, #8d6e63 2px, #5d4037 5%, transparent 5%, transparent 95%, #5d4037 95%, #8d6e63 98%, #5d4037 100%),
                                    repeating-linear-gradient(to bottom, transparent, transparent 120px, #5d4037 120px, #8d6e63 122px, #5d4037 125px),
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
                                top: '50%', left: '30px', transform: 'translateY(-50%)',
                                width: '60px', height: '100px', borderRadius: '30px',
                                background: '#1a1a1a', border: '2px solid #d4af37',
                                boxShadow: 'inset 0 0 15px rgba(0,0,0,1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <div style={{ width: '40px', height: '70px', borderRadius: '20px', background: '#111', border: '1px solid #333' }}></div>
                                <div style={{ position: 'absolute', width: '20px', height: '20px', borderRadius: '50%', background: '#d4af37' }}></div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
