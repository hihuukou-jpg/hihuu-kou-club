"use client";

import { motion } from 'framer-motion';

export default function ScrollReveal({ children, delay = 0, style = {} }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            style={style}
        >
            {children}
        </motion.div>
    );
}
