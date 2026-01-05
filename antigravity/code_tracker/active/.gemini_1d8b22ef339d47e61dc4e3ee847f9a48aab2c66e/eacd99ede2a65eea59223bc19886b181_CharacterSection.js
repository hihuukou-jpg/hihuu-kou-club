¢|"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// Sakura Petal Component
const SakuraPetal = ({ delay }) => (
    <motion.div
        initial={{ y: -20, x: Math.random() * 100 - 50, opacity: 0, rotate: 0 }}
        animate={{
            y: ['0vh', '100vh'],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0],
            rotate: [0, 360],
        }}
        transition={{
            duration: 10 + Math.random() * 5,
            delay: delay,
            repeat: Infinity,
            ease: "linear"
        }}
        style={{
            position: 'absolute',
            top: -20,
            left: `${Math.random() * 100}%`,
            width: '16px',
            height: '16px',
            background: '#FECACA', // Sakura Pink
            borderRadius: '100% 0 100% 0',
            opacity: 0.6,
            zIndex: 0,
            pointerEvents: 'none'
        }}
    />
);

export default function CharacterSection() {
    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024); // Mobile breakpoint increased for list view
        handleResize();
        window.addEventListener('resize', handleResize);

        fetch('/api/characters')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                if (data.length > 0) setSelectedId(data[0].id);
            });

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!data || data.length === 0) return null;

    const selectedChar = data.find(c => c.id === selectedId) || data[0];

    return (
        <section id="characters" style={{
            position: 'relative',
            minHeight: '100vh',
            // Washi Paper Texture Simulation
            background: 'var(--hakurei-white)',
            backgroundImage: `
                radial-gradient(#e5e7eb 1px, transparent 1px),
                radial-gradient(#e5e7eb 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px',
            color: '#333',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: isMobile ? '6rem 1rem' : '4rem 8rem',
            fontFamily: 'var(--font-serif)'
        }}>

            {/* Sakura Particles */}
            {[...Array(15)].map((_, i) => <SakuraPetal key={i} delay={i * 0.5} />)}

            {/* Title */}
            <div style={{ textAlign: 'center', marginBottom: '3rem', zIndex: 2 }}>
                <h2 className="hsr-title-decor" style={{
                    fontSize: '2.5rem',
                    color: 'var(--hakurei-red)',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 0px rgba(0,0,0,0.1)',
                    display: 'inline-block',
                    background: '#fff',
                    padding: '0.5rem 2rem',
                    border: 'double 4px var(--hakurei-red)'
                }}>
                    ç™»å ´äººç‰©
                </h2>
                <p style={{ marginTop: '0.5rem', color: '#666', fontSize: '0.9rem' }}>CHARACTERS</p>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column-reverse' : 'row',
                gap: '2rem',
                maxWidth: '1400px',
                margin: '0 auto',
                width: '100%',
                height: isMobile ? 'auto' : '70vh',
                zIndex: 2
            }}>

                {/* Left: Character Tabs (EMA Style) */}
                <div style={{
                    width: isMobile ? '100%' : '300px',
                    display: 'flex',
                    flexDirection: isMobile ? 'row' : 'column',
                    gap: '1rem',
                    overflowX: isMobile ? 'auto' : 'hidden',
                    overflowY: isMobile ? 'hidden' : 'auto',
                    padding: '1rem',
                    scrollbarWidth: 'none'
                }}>
                    {data.map((char) => (
                        <motion.button
                            key={char.id}
                            onClick={() => setSelectedId(char.id)}
                            whileHover={{ scale: 1.05, x: isMobile ? 0 : 10 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                background: selectedId === char.id ? 'var(--hakurei-red)' : '#fff',
                                color: selectedId === char.id ? '#fff' : '#333',
                                border: '2px solid var(--hakurei-red)',
                                borderRadius: '8px 8px 12px 12px', // Pseudo Ema shape
                                padding: '1rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                minWidth: isMobile ? '200px' : 'auto',
                                position: 'relative',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                border: '2px solid #fff',
                                overflow: 'hidden',
                                flexShrink: 0,
                                background: char.color || '#ccc'
                            }}>
                                <img src={char.image_url || 'https://placehold.co/100x100'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>{char.role}</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', fontFamily: 'var(--font-serif)' }}>{char.name}</div>
                            </div>

                            {/* Ema String Graphic (Simple CSS) */}
                            <div style={{
                                position: 'absolute',
                                top: '-10px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '4px',
                                height: '20px',
                                background: 'var(--hakurei-red)',
                                borderRadius: '2px',
                                display: isMobile ? 'none' : 'block' // Only vertical look needs hanging string look
                            }}></div>
                        </motion.button>
                    ))}
                </div>

                {/* Right: Character Detail (Scroll/Illustration) */}
                <div style={{
                    flex: 1,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255,255,255,0.6)',
                    backdropFilter: 'blur(5px)',
                    borderRadius: '20px',
                    border: '1px solid rgba(0,0,0,0.05)',
                    padding: '2rem'
                }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedChar.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{
                                display: 'flex',
                                flexDirection: isMobile ? 'column' : 'row',
                                width: '100%',
                                height: '100%',
                                gap: '2rem',
                                alignItems: 'center'
                            }}
                        >
                            {/* Illustration */}
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{
                                    x: 0,
                                    opacity: 1,
                                    y: [0, -15, 0] // Gentle floating animation
                                }}
                                transition={{
                                    delay: 0.2, // Entrance delay
                                    y: {
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                                style={{
                                    flex: 1,
                                    height: isMobile ? '350px' : '100%', // Restored size
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',
                                    zIndex: 10
                                }}
                            >
                                {/* Circle behind char */}
                                <div style={{
                                    position: 'absolute',
                                    width: isMobile ? '280px' : '400px', // Slightly reduced base size
                                    height: isMobile ? '280px' : '400px',
                                    maxWidth: '80vw', // Responsive constraint
                                    maxHeight: '80vw',
                                    background: selectedChar.color || 'var(--hakurei-red)',
                                    opacity: 0.15,
                                    borderRadius: '50%',
                                    filter: 'blur(50px)',
                                    zIndex: 0,
                                    // Pulse effect for the background circle
                                    animation: 'pulse 4s infinite ease-in-out alternate'
                                }}></div>
                                <style jsx>{`
                                    @keyframes pulse {
                                        from { transform: scale(1); opacity: 0.1; }
                                        to { transform: scale(1.1); opacity: 0.2; }
                                    }
                                `}</style>

                                <img
                                    src={selectedChar.image_url}
                                    alt={selectedChar.name}
                                    style={{
                                        // Dynamic sizing based on viewport to prevent "too big" feel
                                        height: 'auto',
                                        width: 'auto',
                                        maxHeight: isMobile ? '350px' : '65vh', // Limit against window height
                                        maxWidth: isMobile ? '100%' : '35vw',  // Limit against window width
                                        objectFit: 'contain',
                                        zIndex: 1,
                                        // "Paper Cutout" Glow + Shadow combination for non-angular feel
                                        filter: 'drop-shadow(0 0 2px #fff) drop-shadow(0 4px 12px rgba(0,0,0,0.2))',
                                        // Mask the bottom to prevent "cut off" look if the image is partial body
                                        maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                                        WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
                                    }}
                                />
                            </motion.div>

                            {/* Text / Scroll Area */}
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                style={{
                                    flex: 1,
                                    background: '#fff',
                                    padding: '2rem',
                                    borderRadius: '4px',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                                    border: '1px solid #e5e7eb',
                                    position: 'relative',
                                    // Scroll Pattern Borders
                                    borderTop: '8px solid var(--hakurei-red)',
                                    borderBottom: '8px solid var(--hakurei-red)',
                                }}
                            >
                                <div style={{
                                    color: 'var(--hakurei-red)',
                                    fontWeight: 'bold',
                                    marginBottom: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <span style={{ width: '8px', height: '8px', background: 'var(--hakurei-red)', transform: 'rotate(45deg)', display: 'inline-block' }}></span>
                                    {selectedChar.role}
                                </div>
                                <h1 style={{
                                    fontSize: '2.5rem',
                                    fontWeight: 'bold',
                                    marginBottom: '1.5rem',
                                    borderBottom: '2px solid #f3f4f6',
                                    paddingBottom: '1rem'
                                }}>
                                    {selectedChar.name}
                                </h1>
                                <p style={{
                                    lineHeight: '2',
                                    color: '#4b5563',
                                    fontSize: '1rem',
                                    textAlign: 'justify'
                                }}>
                                    {selectedChar.description}
                                </p>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
}

˜G *cascade08˜G½G*cascade08½GÃG *cascade08ÃGèG*cascade08èGóG *cascade08óGæH*cascade08æH˜I *cascade08˜I½I*cascade08½IÈI *cascade08ÈIùK*cascade08ùKM *cascade08MM*cascade08MM *cascade08M˜M *cascade08˜MšM*cascade08šMM *cascade08M¤M *cascade08¤M¨M*cascade08¨M«M *cascade08«M¬M*cascade08¬M­M *cascade08­M¯M*cascade08¯M™O *cascade08™OÊO*cascade08ÊOíQ *cascade08íQîQ*cascade08îQöQ *cascade08öQ÷Q*cascade08÷QøQ*cascade08øQıQ *cascade08ıQR *cascade08R†R*cascade08†R‡R *cascade08‡RŠR*cascade08ŠRR *cascade08R–R*cascade08–R›R *cascade08›RÖR *cascade08ÖR×R*cascade08×RßR *cascade08ßRàR*cascade08àRáR*cascade08áRæR *cascade08æRS*cascade08S¤S *cascade08¤S¥S*cascade08¥S¦S *cascade08¦SªS*cascade08ªS¬S *cascade08¬S¯S*cascade08¯S°S *cascade08°S³S*cascade08³S´S *cascade08´SàS*cascade08àSáS *cascade08áSîS*cascade08îSıT *cascade08ıTşT*cascade08şTíU *cascade08íUîU*cascade08îU£V *cascade08£VÍW*cascade08ÍW›X *cascade08›X[*cascade08[Û\ *cascade08Û\³^*cascade08³^¾^ *cascade08¾^É^*cascade08É^Ê^ *cascade08Ê^Ì^*cascade08Ì^Í^ *cascade08Í^Ø^*cascade08Ø^Ş^ *cascade08Ş^â^*cascade08â^ã^ *cascade08ã^ä^ *cascade08ä^é^*cascade08é^ê^ *cascade08ê^í^*cascade08í^î^ *cascade08î^ô^*cascade08ô^õ^ *cascade08õ^ù^*cascade08ù^­_ *cascade08­_¸_*cascade08¸_¹_ *cascade08¹_¼_*cascade08¼_½_ *cascade08½_Æ_*cascade08Æ_É_ *cascade08É_Ê_*cascade08Ê_Í_ *cascade08Í_Ø_*cascade08Ø_Ú_ *cascade08Ú_Ş_*cascade08Ş_ß_ *cascade08ß_á_*cascade08á_â_ *cascade08â_ã_*cascade08ã_ä_ *cascade08ä_ç_*cascade08ç_„a *cascade08„a‹a*cascade08‹aa *cascade08a˜a*cascade08˜a™a *cascade08™aa*cascade08a¤a *cascade08¤a¯a*cascade08¯a°a *cascade08°a²a*cascade08²a³a *cascade08³aºa*cascade08ºa»a *cascade08»a½a*cascade08½a¾a *cascade08¾aÄa*cascade08Äaîa *cascade08îaóa*cascade08óaôa *cascade08ôa÷a*cascade08÷aùa *cascade08ùaşa*cascade08şa€b *cascade08€b„b*cascade08„b†b *cascade08†bˆb*cascade08ˆb‹b *cascade08‹bb*cascade08b‘b *cascade08‘b“b*cascade08“b”b *cascade08”b§b*cascade08§b©b *cascade08©bºb*cascade08ºbçb *cascade08çbúb*cascade08úbûb *cascade08ûb€c*cascade08€cc *cascade08c‡c*cascade08‡cˆc *cascade08ˆcŒc*cascade08Œcc *cascade08cc*cascade08c¡c *cascade08¡c¢c*cascade08¢c¦c *cascade08¦c§c*cascade08§c©c *cascade08©c­c*cascade08­c×c *cascade08×cÛc*cascade08ÛcÜc *cascade08Ücác*cascade08ácâc *cascade08âcäc*cascade08äcåc *cascade08åcçc*cascade08çcèc *cascade08ècëc*cascade08ëcíc *cascade08ícïc*cascade08ïcòc *cascade08òcóc*cascade08ócöc *cascade08öcøc*cascade08øcúc *cascade08úcıc*cascade08ıcşc *cascade08şcd*cascade08d‚d *cascade08‚dƒd*cascade08ƒd„d *cascade08„dˆd*cascade08ˆdŠd *cascade08Šdd*cascade08dd *cascade08d›d*cascade08›dÆd *cascade08ÆdÈd*cascade08ÈdÉd *cascade08ÉdËd*cascade08ËdÌd *cascade08ÌdÎd*cascade08ÎdÏd *cascade08ÏdÔd*cascade08ÔdÕd *cascade08ÕdÖd*cascade08Öd×d *cascade08×dØd*cascade08ØdÜd *cascade08Üdâd*cascade08âdãd *cascade08ãdêd*cascade08êdîd *cascade08îdòd*cascade08òdód *cascade08ódôd*cascade08ôdöd *cascade08ödüd*cascade08üdşd *cascade08şde*cascade08e‚e *cascade08‚e„e*cascade08„eˆe *cascade08ˆe‰e*cascade08‰eŠe *cascade08Šee*cascade08e¢| *cascade08"(1d8b22ef339d47e61dc4e3ee847f9a48aab2c66e2Lfile:///C:/Users/kouki/.gemini/hifuu-kou-club/components/CharacterSection.js:file:///C:/Users/kouki/.gemini