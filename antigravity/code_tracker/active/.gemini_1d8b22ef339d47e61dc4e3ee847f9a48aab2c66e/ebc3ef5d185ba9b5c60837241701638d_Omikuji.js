�6"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FORTUNES = [
    { result: "大吉", color: "#eab308", desc: "素晴らしい一日になります！秘封俱楽部の活動も捗りそう。" },
    { result: "中吉", color: "#ef4444", desc: "良いことがありそう。境界の向こう側が見えるかも？" },
    { result: "小吉", color: "#3b82f6", desc: "穏やかな一日。美味しいお茶とお菓子で一息つきましょう。" },
    { result: "末吉", color: "#10b981", desc: "焦らず進めば道は開けます。オカルト研究も地道な調査から。" },
    { result: "凶", color: "#6b7280", desc: "紫のスキマに落ちないように気をつけて。戸締まりを忘れずに。" },
];

export default function Omikuji() {
    const [fortune, setFortune] = useState(null);
    const [isShaking, setIsShaking] = useState(false);

    useEffect(() => {
        // Check if already drawn today
        const saved = localStorage.getItem('daily_omikuji');
        if (saved) {
            const { date, result_index } = JSON.parse(saved);
            const today = new Date().toDateString();
            if (date === today) {
                setFortune(FORTUNES[result_index]);
            }
        }
    }, []);

    const drawFortune = () => {
        if (fortune) return; // Already drawn

        setIsShaking(true);
        setTimeout(() => {
            const index = Math.floor(Math.random() * FORTUNES.length);
            const result = FORTUNES[index];
            setFortune(result);
            setIsShaking(false);

            // Save
            localStorage.setItem('daily_omikuji', JSON.stringify({
                date: new Date().toDateString(),
                result_index: index
            }));
        }, 1500); // 1.5s shake animation
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '2rem',
            left: '2rem',
            zIndex: 90
        }}>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}
            >
                {/* Result Pop-up */}
                <AnimatePresence>
                    {fortune && !isShaking && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            style={{
                                background: '#fff',
                                padding: '1rem',
                                borderRadius: '8px',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                marginBottom: '1rem',
                                textAlign: 'center',
                                border: `2px solid ${fortune.color}`,
                                maxWidth: '200px',
                                position: 'relative'
                            }}
                        >
                            <button
                                onClick={() => setFortune(null)}
                                style={{
                                    position: 'absolute',
                                    top: '5px',
                                    right: '5px',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem',
                                    lineHeight: 1,
                                    color: '#999'
                                }}
                            >
                                &times;
                            </button>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: fortune.color, marginBottom: '0.25rem' }}>{fortune.result}</h3>
                            <p style={{ fontSize: '0.8rem', color: '#555' }}>{fortune.desc}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Omikuji Cylinder / Button */}
                <motion.button
                    onClick={drawFortune}
                    disabled={!!fortune}
                    animate={isShaking ? {
                        rotate: [0, -10, 10, -10, 10, 0],
                        y: [0, -5, 5, -5, 5, 0]
                    } : {}}
                    transition={isShaking ? { duration: 0.5, repeat: 3 } : {}}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        width: '60px',
                        height: '100px',
                        background: '#d97706', // Bamboo-ish color? Or Hexagonal wood
                        borderRadius: '4px',
                        border: 'none',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                        cursor: fortune ? 'default' : 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        // Hexagonal shape simulation with gradient
                        backgroundImage: 'linear-gradient(90deg, #b45309 0%, #d97706 50%, #b45309 100%)'
                    }}
                >
                    <span style={{
                        writingMode: 'vertical-rl',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontFamily: 'var(--font-serif)',
                        letterSpacing: '0.2em'
                    }}>
                        御神籤
                    </span>
                    {/* Stick coming out when done */}
                    {fortune && (
                        <div style={{
                            position: 'absolute',
                            top: '-20px',
                            width: '10px',
                            height: '30px',
                            background: '#fef3c7',
                            border: '1px solid #d97706'
                        }}></div>
                    )}
                </motion.button>
                {!fortune && <span style={{ fontSize: '0.8rem', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>運試し</span>}
            </motion.div>
        </div>
    );
}
� *cascade08��*cascade08�� *cascade08�� *cascade08� �6 *cascade08"(1d8b22ef339d47e61dc4e3ee847f9a48aab2c66e2Cfile:///C:/Users/kouki/.gemini/hifuu-kou-club/components/Omikuji.js:file:///C:/Users/kouki/.gemini