"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeContext";

export default function SharkTransition() {
    const { isTransitioning, transitionType } = useTheme();

    if (transitionType !== 'shark') return null; // Only active for shark transition

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: 9999,
            overflow: "hidden"
        }}>
            <AnimatePresence>
                {isTransitioning && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                background: 'rgba(0,0,0,0.3)', zIndex: 0
                            }}
                        />

                        {/* Upper Jaw */}
                        <motion.div
                            initial={{ y: "-100%" }}
                            animate={{ y: "0%" }}
                            exit={{ y: "-100%" }}
                            transition={{ duration: 0.4, ease: "circIn", delay: 0.2 }} // Faster snap
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "55%",
                                background: "linear-gradient(to bottom, #000 0%, #1a0510 80%, #300 100%)", // Scarier gradient
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "center",
                                zIndex: 1,
                                filter: "drop-shadow(0 0 20px rgba(0,0,0,0.8))"
                            }}
                        >
                            {/* Teeth Graphic - Jagged and Random */}
                            <div style={{
                                width: "100%",
                                height: "25%",
                                background: "#eee",
                                clipPath: "polygon(0% 0%, 2% 100%, 5% 10%, 8% 90%, 12% 0%, 15% 100%, 18% 5%, 22% 95%, 26% 0%, 30% 100%, 34% 5%, 38% 90%, 42% 0%, 45% 100%, 50% 10%, 55% 95%, 58% 0%, 62% 100%, 65% 10%, 68% 90%, 72% 0%, 75% 100%, 78% 5%, 82% 95%, 86% 0%, 90% 100%, 94% 5%, 98% 95%, 100% 0%)",
                                background: "linear-gradient(to bottom, #ddd 0%, #fff 50%, #d00 100%)" // Blood stained teeth
                            }}></div>
                        </motion.div>

                        {/* Lower Jaw */}
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: "0%" }}
                            exit={{ y: "100%" }}
                            transition={{ duration: 0.4, ease: "circIn", delay: 0.2 }}
                            style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                height: "55%",
                                background: "linear-gradient(to top, #000 0%, #1a0510 80%, #300 100%)",
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "center",
                                zIndex: 1,
                                filter: "drop-shadow(0 0 20px rgba(0,0,0,0.8))"
                            }}
                        >
                            <div style={{
                                width: "100%",
                                height: "25%",
                                background: "#eee",
                                clipPath: "polygon(0% 100%, 3% 0%, 6% 90%, 9% 5%, 13% 100%, 16% 0%, 20% 95%, 23% 5%, 27% 100%, 31% 0%, 35% 90%, 38% 5%, 43% 100%, 46% 0%, 50% 90%, 53% 0%, 57% 100%, 61% 5%, 64% 95%, 68% 0%, 71% 100%, 75% 5%, 79% 90%, 82% 0%, 86% 100%, 89% 5%, 93% 95%, 96% 0%, 100% 100%)",
                                background: "linear-gradient(to top, #ddd 0%, #fff 50%, #d00 100%)" // Blood stained
                            }}></div>
                        </motion.div>

                        {/* Impact Effect - Shake and Text */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, x: 0, rotate: 0 }}
                            animate={{
                                opacity: [0, 1, 1, 0],
                                scale: [0.5, 2, 2.5, 3],
                                x: [0, -20, 20, -10, 10, 0], // Shake
                                rotate: [0, -5, 5, -5, 5, 0]
                            }}
                            transition={{ delay: 0.6, duration: 0.5, times: [0, 0.1, 0.8, 1] }}
                            style={{
                                position: 'absolute',
                                top: '50%', left: '50%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <h1 style={{
                                color: '#ff0000',
                                fontSize: '8rem',
                                fontWeight: '900',
                                fontFamily: '"Impact", sans-serif',
                                textShadow: '0 0 20px #000, 5px 5px 0px #300',
                                margin: 0,
                                letterSpacing: '0.1em'
                            }}>
                                GABU!!
                            </h1>
                            {/* Blood Splatter SVG Effect could go here if we had simple SVG strings */}
                        </motion.div>

                        {/* Flash Red on impact */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.8, 0] }}
                            transition={{ delay: 0.6, duration: 0.2 }}
                            style={{
                                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                background: '#500', mixBlendMode: 'multiply', zIndex: 3
                            }}
                        />
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
