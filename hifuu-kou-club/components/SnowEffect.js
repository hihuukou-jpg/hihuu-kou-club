"use client";

import { useEffect, useRef } from 'react';

export default function SnowEffect() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        const init = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            // Create particles
            const particleCount = Math.min(width * 0.15, 150); // Responsive count
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 3 + 1,
                    speedY: Math.random() * 1 + 0.5,
                    speedX: Math.random() * 1 - 0.5,
                    opacity: Math.random() * 0.5 + 0.3
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#fff';

            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.globalAlpha = p.opacity;
                ctx.fill();
            });
            ctx.globalAlpha = 1;
        };

        const update = () => {
            particles.forEach((p) => {
                p.y += p.speedY;
                p.x += p.speedX;

                if (p.y > height) {
                    p.y = -10;
                    p.x = Math.random() * width;
                }
                if (p.x > width) p.x = 0;
                if (p.x < 0) p.x = width;
            });
        };

        const animate = () => {
            draw();
            update();
            requestAnimationFrame(animate);
        };

        init();
        animate();

        window.addEventListener('resize', init);
        return () => window.removeEventListener('resize', init);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0, // Behind content but in front of background color if needed, check layout
                opacity: 0.6 // Subtle
            }}
        />
    );
}
