"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";

export default function VideoModal({ videoId, onClose }) {
    if (!videoId) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 200,
                    background: "rgba(0, 0, 0, 0.8)",
                    backdropFilter: "blur(8px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem"
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "2rem",
                        right: "2rem",
                        background: "transparent",
                        border: "none",
                        color: "#fff",
                        cursor: "pointer",
                        zIndex: 201
                    }}
                >
                    <X size={40} />
                </button>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()} // Prevent click from closing
                    style={{
                        width: "100%",
                        maxWidth: "1000px",
                        aspectRatio: "16/9",
                        background: "#000",
                        borderRadius: "8px",
                        overflow: "hidden",
                        boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                        border: "1px solid rgba(255,255,255,0.1)"
                    }}
                >
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
