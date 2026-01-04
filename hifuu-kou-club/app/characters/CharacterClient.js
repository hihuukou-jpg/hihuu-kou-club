"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function CharacterClient({ characters }) {
    const [selectedId, setSelectedId] = useState(null);

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            overflow: 'hidden',
            background: 'var(--sumi-black)'
        }}>
            {characters.map((char) => {
                const isSelected = selectedId === char.id;
                const isOtherSelected = selectedId && !isSelected;

                return (
                    <motion.div
                        key={char.id}
                        layout
                        onClick={() => setSelectedId(isSelected ? null : char.id)}
                        style={{
                            position: 'relative',
                            height: '100%',
                            flex: isSelected ? 3 : 1, // Expand if selected
                            minWidth: isOtherSelected ? '100px' : 'auto', // Shrink others
                            cursor: 'pointer',
                            borderRight: '1px solid rgba(255,255,255,0.1)',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                    >
                        {/* Background Image / Color Placeholder */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: `linear-gradient(to bottom, ${char.color}22, transparent)`,
                            zIndex: 0
                        }} />

                        {/* Vertical Text Label (when not selected) */}
                        {!isSelected && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{
                                    writingMode: 'vertical-rl',
                                    fontSize: '3rem',
                                    letterSpacing: '0.5em',
                                    color: 'rgba(255,255,255,0.8)',
                                    zIndex: 10,
                                    textShadow: '0 0 10px rgba(0,0,0,0.5)'
                                }}
                            >
                                {char.name}
                            </motion.div>
                        )}

                        {/* Expanded Content */}
                        <AnimatePresence>
                            {isSelected && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: 0.3 }}
                                    style={{
                                        zIndex: 20,
                                        padding: '4rem',
                                        maxWidth: '600px',
                                        width: '100%',
                                        textAlign: 'left' // Reset alignment
                                    }}
                                >
                                    <h2 style={{ fontSize: '4rem', marginBottom: '1rem', borderBottom: `4px solid ${char.color}` }}>
                                        {char.name}
                                    </h2>
                                    <div style={{ fontFamily: 'var(--font-mono)', marginBottom: '2rem', color: 'var(--spirit-cyan)' }}>
                                        ROLE: {char.role}
                                    </div>
                                    <p style={{ fontSize: '1.2rem', lineHeight: '2' }}>
                                        {char.description}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Decorative Fusuma Handle */}
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            right: '10px',
                            width: '40px',
                            height: '80px',
                            border: '2px solid rgba(255,255,255,0.3)',
                            borderRadius: '20px',
                            transform: 'translateY(-50%)',
                            opacity: 0.5
                        }} />
                    </motion.div>
                );
            })}
        </div>
    );
}
