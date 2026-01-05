¥;"use client";

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
÷ *cascade08÷ø*cascade08ø¥ *cascade08¥§*cascade08§¨ *cascade08¨©*cascade08©« *cascade08«¬*cascade08¬± *cascade08±³*cascade08³À *cascade08ÀÅ*cascade08ÅË *cascade08Ë×*cascade08×Ø *cascade08ØÙ*cascade08ÙÚ *cascade08Úë*cascade08ëì *cascade08ìö*cascade08ö÷ *cascade08÷ù*cascade08ùú *cascade08úû*cascade08ûü *cascade08üş*cascade08şÿ *cascade08ÿ‚*cascade08‚ƒ *cascade08ƒ‡*cascade08‡ˆ *cascade08ˆ‘*cascade08‘” *cascade08”–*cascade08–— *cascade08—™*cascade08™š *cascade08š›*cascade08›İ *cascade08İ˜*cascade08˜³ *cascade08³À*cascade08ÀÇ *cascade08ÇÔ*cascade08Ôú *cascade08ú‡*cascade08‡ *cascade08”*cascade08”• *cascade08•*cascade08» *cascade08»ü*cascade08ü¡ *cascade08¡¿*cascade08¿Â *cascade08ÂÃ*cascade08ÃÄ *cascade08ÄÇ*cascade08ÇÊ *cascade08ÊË*cascade08ËÑ *cascade08ÑÔ*cascade08ÔÕ *cascade08Õ×*cascade08×Ù *cascade08Ùã*cascade08ãä *cascade08äç*cascade08çè *cascade08èê*cascade08êí *cascade08íî*cascade08î„ *cascade08„†*cascade08†‡ *cascade08‡ˆ*cascade08ˆ‰ *cascade08‰Š*cascade08Š *cascade08*cascade08 *cascade08‘*cascade08‘˜ *cascade08˜™*cascade08™ *cascade08¡*cascade08¡¢ *cascade08¢£*cascade08£¦ *cascade08¦©*cascade08©ª *cascade08ª«*cascade08«¬ *cascade08¬Æ*cascade08ÆÇ *cascade08ÇÏ*cascade08ÏĞ *cascade08ĞÜ*cascade08Üİ *cascade08İŞ*cascade08Şß *cascade08ßá*cascade08áâ *cascade08âô*cascade08ôõ *cascade08õø*cascade08øù *cascade08ùş*cascade08şÿ *cascade08ÿŸ*cascade08Ÿ¿ *cascade08¿Ç*cascade08ÇË *cascade08ËÑ*cascade08ÑÓ *cascade08ÓÚ*cascade08ÚÛ *cascade08Ûà*cascade08àá *cascade08áã*cascade08ã‰ *cascade08‰‹*cascade08‹– *cascade08–˜*cascade08˜™ *cascade08™›*cascade08›¡ *cascade08¡ª*cascade08ª‹ *cascade08‹*cascade08’ *cascade08’”*cascade08”¤ *cascade08¤¥*cascade08¥§ *cascade08§Å*cascade08Å *cascade08¢*cascade08¢¯ *cascade08¯°*cascade08°‡ *cascade08‡ˆ*cascade08ˆ¬ *cascade08¬®*cascade08®Ø *cascade08ØÙ*cascade08Ù *cascade08’*cascade08’“ *cascade08“•*cascade08•– *cascade08–¿*cascade08¿Á *cascade08ÁÕ*cascade08Õ *cascade08ƒ*cascade08ƒ‡ *cascade08‡”*cascade08”Á *cascade08ÁÊ*cascade08ÊË *cascade08Ëè!*cascade08è!" *cascade08"‘"*cascade08‘"”" *cascade08”"É%*cascade08É%¡' *cascade08¡'¢'*cascade08¢'Ò( *cascade08Ò(×(*cascade08×(›) *cascade08›)Å)*cascade08Å)ß) *cascade08ß)ì)*cascade08ì)ò) *cascade08ò)ÿ)*cascade08ÿ)¦* *cascade08¦*³**cascade08³*»* *cascade08»*À**cascade08À*Á* *cascade08Á*Ê**cascade08Ê*ç* *cascade08ç*–+*cascade08–+»+ *cascade08»+Ù+*cascade08Ù+Ü+ *cascade08Ü+İ+*cascade08İ+Ş+ *cascade08Ş+á+*cascade08á+ä+ *cascade08ä+å+*cascade08å+ë+ *cascade08ë+î+*cascade08î+ï+ *cascade08ï+ñ+*cascade08ñ+ó+ *cascade08ó+ı+*cascade08ı+ş+ *cascade08ş+,*cascade08,‚, *cascade08‚,„,*cascade08„,‡, *cascade08‡,†-*cascade08†-¾- *cascade08¾-Æ-*cascade08Æ-Ê- *cascade08Ê-Ğ-*cascade08Ğ-Ò- *cascade08Ò-Ù-*cascade08Ù-Ú- *cascade08Ú-ß-*cascade08ß-à- *cascade08à-â-*cascade08â-‡. *cascade08‡.‰.*cascade08‰.”. *cascade08”.–.*cascade08–.—. *cascade08—.™.*cascade08™.é. *cascade08é.ë.*cascade08ë.ğ. *cascade08ğ.ò.*cascade08ò.‚/ *cascade08‚/ƒ/*cascade08ƒ/…/ *cascade08…/†/*cascade08†/Ú0 *cascade08Ú0Û0*cascade08Û0²1 *cascade08²1³1*cascade08³1×1 *cascade08×1Ù1*cascade08Ù1ƒ2 *cascade08ƒ2„2*cascade08„2¬2 *cascade08¬2¯2*cascade08¯2°2 *cascade08°2½2*cascade08½2¾2 *cascade08¾2ê2*cascade08ê2˜3 *cascade08˜3š3*cascade08š3Ë3 *cascade08Ë3Ô3*cascade08Ô3Õ3 *cascade08Õ3Ã7*cascade08Ã7è7 *cascade08è7ì7*cascade08ì7ï7 *cascade08ï7ç:*cascade08ç:¥; *cascade08"(1d8b22ef339d47e61dc4e3ee847f9a48aab2c66e2Ffile:///C:/Users/kouki/.gemini/hifuu-kou-club/components/FusumaGate.js:file:///C:/Users/kouki/.gemini