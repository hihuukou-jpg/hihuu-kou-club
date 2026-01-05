ä]"use client";

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const navItems = [
    { name: 'HOME', id: 'hero' },
    { name: 'NEWS', id: 'news' },
    { name: 'CONTENT', id: 'videos' },
    { name: 'CHARACTERS', id: 'characters' },
    { name: 'DIARY', id: 'diary' },
];

export default function Navigation() {
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        // Track Visitor Count (Once per session/mount)
        const trackVisit = async () => {
            try {
                // Check if already visited in this session to prevent spam (optional, simple sessionStorage check)
                const hasVisited = sessionStorage.getItem('has_visited_site');
                if (!hasVisited) {
                    await fetch('/api/stats', { method: 'POST' });
                    sessionStorage.setItem('has_visited_site', 'true');
                }
            } catch (e) {
                console.error("Failed to track visit", e);
            }
        };
        trackVisit();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 100,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: isMobile ? '1rem 1.5rem' : '1.5rem 3rem',
                background: scrolled || isOpen ? 'rgba(15, 23, 42, 0.8)' : 'transparent', // Dark Glass on scroll
                backdropFilter: scrolled || isOpen ? 'blur(12px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
                transition: 'all 0.4s ease'
            }}
        >
            {/* Logo Area */}
            <Link href="/#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{
                    width: isMobile ? '32px' : '40px',
                    height: isMobile ? '32px' : '40px',
                    background: 'var(--hakurei-red)',
                    borderRadius: '2px', // Sharper corners for HSR feel
                    display: 'grid', placeItems: 'center',
                    transform: 'rotate(45deg)', // Diamond shape
                    boxShadow: '0 0 10px var(--hakurei-red)'
                }}>
                    <div style={{ width: '60%', height: '60%', background: '#fff', transform: 'rotate(-45deg)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                </div>
                <span style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: isMobile ? '1.1rem' : '1.3rem',
                    fontWeight: 'bold',
                    color: '#fff', // Always white for contrast on Hero/Dark header
                    letterSpacing: '0.1em',
                    whiteSpace: 'nowrap',
                    textShadow: '0 0 5px rgba(0,0,0,0.5)'
                }}>
                    ç§˜å°å·¥å€¶æ¥½éƒ¨
                </span>
            </Link>

            {/* Desktop Nav */}
            {!isMobile && (
                <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', alignItems: 'center' }}>
                    {navItems.map((item) => (
                        <li key={item.name} style={{ position: 'relative' }}>
                            <Link
                                href={`/#${item.id}`}
                                className="nav-link"
                                style={{
                                    position: 'relative',
                                    fontSize: '0.9rem',
                                    fontFamily: 'var(--font-sans)', // HSR uses Sans for UI
                                    fontWeight: 'bold',
                                    color: scrolled ? '#cbd5e1' : '#fff',
                                    textDecoration: 'none',
                                    letterSpacing: '0.05em',
                                    textShadow: scrolled ? 'none' : '0 1px 3px rgba(0,0,0,0.8)',
                                    padding: '0.5rem 0'
                                }}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link
                            href="/admin"
                            style={{
                                fontSize: '0.7rem',
                                fontFamily: 'var(--font-mono)',
                                color: 'rgba(255,255,255,0.3)',
                                textDecoration: 'none',
                                padding: '0.2rem 0.5rem',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '2px',
                                marginLeft: '1rem',
                                transition: 'all 0.2s',
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.color = 'var(--hsr-cyan)';
                                e.currentTarget.style.borderColor = 'var(--hsr-cyan)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.color = 'rgba(255,255,255,0.3)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                            }}
                        >
                            ADMIN
                        </Link>
                    </li>
                </ul>
            )}

            {/* Mobile Hamburger Button */}
            {isMobile && (
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        zIndex: 101,
                        padding: '0.5rem'
                    }}
                >
                    <div style={{
                        width: '24px', height: '2px',
                        background: '#fff',
                        marginBottom: '5px',
                        transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
                        transition: 'all 0.3s',
                        boxShadow: '0 0 5px rgba(0,0,0,0.5)'
                    }}></div>
                    <div style={{
                        width: '24px', height: '2px',
                        background: isOpen ? 'transparent' : '#fff',
                        marginBottom: '5px',
                        transition: 'all 0.3s',
                        boxShadow: '0 0 5px rgba(0,0,0,0.5)'
                    }}></div>
                    <div style={{
                        width: '24px', height: '2px',
                        background: '#fff',
                        transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
                        transition: 'all 0.3s',
                        boxShadow: '0 0 5px rgba(0,0,0,0.5)'
                    }}></div>
                </button>
            )}

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobile && isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            width: '80%',
                            height: '100vh',
                            background: 'rgba(15, 23, 42, 0.95)', // Deep Space Blue
                            backdropFilter: 'blur(15px)',
                            borderLeft: '1px solid rgba(255,255,255,0.1)',
                            padding: '6rem 2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: '2rem',
                            zIndex: 100
                        }}
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={`/#${item.id}`}
                                onClick={() => setIsOpen(false)}
                                style={{
                                    fontSize: '1.2rem',
                                    fontFamily: 'var(--font-sans)',
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    textDecoration: 'none',
                                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                                    width: '100%',
                                    paddingBottom: '0.5rem'
                                }}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/admin"
                            onClick={() => setIsOpen(false)}
                            style={{
                                fontSize: '0.8rem',
                                fontFamily: 'var(--font-mono)',
                                color: 'rgba(255,255,255,0.3)',
                                marginTop: 'auto', // Push to bottom
                                width: '100%',
                                textAlign: 'right',
                                textDecoration: 'none',
                                padding: '1rem 0'
                            }}
                        >
                            ADMIN PANEL &gt;
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0%;
                    height: 2px;
                    background: var(--hsr-cyan);
                    box-shadow: 0 0 8px var(--hsr-cyan);
                    transition: width 0.3s ease;
                }
                .nav-link:hover::after {
                    width: 100%;
                }
            `}</style>
        </motion.nav>
    );
}
? *cascade08?PPf *cascade08f””˜ *cascade08˜˜*cascade08˜» *cascade08»¿*cascade08¿Â *cascade08ÂÄ*cascade08ÄÇ *cascade08ÇË*cascade08ËŞ *cascade08Şâ*cascade08âå *cascade08åç*cascade08ç *cascade08³³¶ *cascade08¶¸*cascade08¸Ë *cascade08ËØ *cascade08Øİ*cascade08İà *cascade08àâ*cascade08âç *cascade08çê*cascade08êğ *cascade08ğ *cascade08
† †¼*cascade08
¼£ £¥*cascade08
¥¦ ¦§*cascade08
§¨ ¨ª*cascade08
ª« «´*cascade08
´¶ ¶Ñ*cascade08
ÑÒ ÒÖ*cascade08
Ö× ×á*cascade08
áâ âü*cascade08
üÙ Ù‹ *cascade08‹—*cascade08—Ÿ *cascade08
Ÿ« «º*cascade08
ºí íº*cascade08
ºÌ Ìî *cascade08îï*cascade08ïğ *cascade08ğñ*cascade08ñù *cascade08ù‚*cascade08‚Æ *cascade08Æááâ *cascade08âå*cascade08åé *cascade08éê*cascade08ê‚ *cascade08‚†*cascade08†ˆ *cascade08ˆ‹*cascade08‹ *cascade08¢*cascade08¢¨ *cascade08¨ª*cascade08ª­ *cascade08­®*cascade08®° *cascade08°±*cascade08±² *cascade08²¶ *cascade08¶· *cascade08·¹ *cascade08¹É*cascade08ÉÊ *cascade08ÊÎ *cascade08ÎĞ*cascade08ĞÑ *cascade08ÑÖ*cascade08Ö× *cascade08×Û*cascade08ÛÜ *cascade08Üâ*cascade08â„ *cascade08„™*cascade08™Ÿ *cascade08Ÿ  *cascade08 ¡*cascade08¡¤ *cascade08¤­*cascade08­½ *cascade08½Ï *cascade08ÏÚ*cascade08Úê *cascade08êö*cascade08ö÷ *cascade08÷ø *cascade08øù*cascade08ùú *cascade08úƒ*cascade08ƒ„ *cascade08„… *cascade08…— *cascade08—™*cascade08™š *cascade08šŸ*cascade08Ÿ  *cascade08 ¡*cascade08¡¥ *cascade08¥§*cascade08§¨*cascade08¨© *cascade08©¬*cascade08¬­ *cascade08­±*cascade08±À *cascade08ÀÛ *cascade08Ûú*cascade08úû *cascade08ûü*cascade08üı *cascade08ı*cascade08— *cascade08—*cascade08Ÿ *cascade08Ÿ¡*cascade08¡£ *cascade08£¥*cascade08¥¨ *cascade08¨«*cascade08«¯ *cascade08¯°*cascade08°± *cascade08±¶*cascade08¶¹ *cascade08¹º*cascade08º» *cascade08»½*cascade08½À *cascade08ÀÁ*cascade08ÁÂ *cascade08ÂÆ*cascade08ÆÈ *cascade08ÈÍ*cascade08ÍÎ *cascade08ÎÏ*cascade08ÏĞ *cascade08ĞÖ*cascade08Ö× *cascade08×Ù*cascade08ÙŞ *cascade08Şà*cascade08àú *cascade08úû*cascade08ûü *cascade08üı*cascade08ış *cascade08ş‚*cascade08‚„ *cascade08„£ *cascade08
£¯ ¯°*cascade08
°· ·¸ *cascade08¸º*cascade08º¾ *cascade08¾ÓÓÔ *cascade08ÔÖ *cascade08ÖÚ *cascade08
Úè èé*cascade08
éî îñ *cascade08ñó*cascade08ó’ *cascade08’” *cascade08”Ó *cascade08ÓÖ*cascade08ÖØ *cascade08Øø*cascade08ø³ *cascade08³´*cascade08´ã *cascade08ãä *cascade08äç*cascade08çè *cascade08èé*cascade08éë *cascade08ëì*cascade08ìí *cascade08íğ*cascade08ğñ*cascade08ñü*cascade08üı *cascade08ı€*cascade08€ *cascade08Œ*cascade08Œ *cascade08*cascade08‘ *cascade08‘’*cascade08’“ *cascade08“”*cascade08”— *cascade08—›*cascade08›œ*cascade08œ *cascade08 *cascade08»*cascade08»¼ *cascade08¼Ç*cascade08ÇÉ *cascade08ÉË*cascade08ËÌ *cascade08Ìæ *cascade08æé *cascade08éê *cascade08êì*cascade08ìí *cascade08íî *cascade08îô*cascade08ô† *cascade08†š*cascade08š¬ *cascade08¬¯*cascade08¯° *cascade08°Ã*cascade08ÃÄ *cascade08ÄÊ*cascade08ÊË *cascade08ËÌ*cascade08ÌÕ *cascade08ÕÛ*cascade08ÛÜ *cascade08Üİ*cascade08İŞ *cascade08Ş‚ *cascade08‚˜˜› *cascade08›œ*cascade08œ *cascade08Ç*cascade08ÇÈ *cascade08Èè *cascade08èõ*cascade08õö *cascade08öü*cascade08üş *cascade08ş†*cascade08†‡ *cascade08‡ˆ*cascade08ˆ‰ *cascade08‰*cascade08 *cascade08Ÿ*cascade08Ÿ¤ *cascade08¤¥ *cascade08¥¼*cascade08¼¾ *cascade08¾À*cascade08ÀÁ *cascade08ÁË *cascade08Ëö*cascade08ö²*cascade08²Æ *cascade08ÆÇ *cascade08ÇÜ*cascade08Üƒ  *cascade08ƒ † *cascade08† ‡  *cascade08‡ ˜  *cascade08˜ ™ *cascade08™ š  *cascade08š œ *cascade08œ ­  *cascade08­ ±  *cascade08± ¹ ¹ Â  *cascade08Â ã ã ï  *cascade08ï “! *cascade08“!–!*cascade08–!¬! *cascade08¬!Â!*cascade08Â!É! *cascade08É!Ì!Ì!Ü! *cascade08Ü!İ!İ!õ! *cascade08õ!ö!*cascade08ö!ø! *cascade08ø!ü!ü!" *cascade08"’"*cascade08’"”" *cascade08”"•"*cascade08•"–" *cascade08–"—"*cascade08—"˜" *cascade08˜"™"*cascade08™"" *cascade08"Ÿ"*cascade08Ÿ" " *cascade08 "¢" *cascade08¢"Ã"*cascade08Ã"Å" *cascade08Å"Û" *cascade08Û"Ş"*cascade08Ş"ß" *cascade08ß"ã"ã"ä" *cascade08ä"è"*cascade08è"ê" *cascade08ê"î"î"†# *cascade08†#‰#*cascade08‰#Š# *cascade08Š#Œ#*cascade08Œ## *cascade08##*cascade08## *cascade08#”#*cascade08”#š# *cascade08š##*cascade08#¡# *cascade08¡#×#*cascade08×#ó# *cascade08ó#÷#÷#ø#*cascade08ø#ù# *cascade08ù#û#*cascade08û#ü# *cascade08ü#ÿ#*cascade08ÿ#$ *cascade08$…$…$¥$ *cascade08¥$§$*cascade08§$¨$ *cascade08¨$´$*cascade08´$¸$ *cascade08¸$º$*cascade08º$¼$ *cascade08¼$À$À$à$ *cascade08à$á$*cascade08á$ã$ *cascade08ã$ç$*cascade08ç$è$ *cascade08è$î$*cascade08î$ğ$ *cascade08ğ$ó$*cascade08ó$•% *cascade08•%™%™%œ%*cascade08œ%% *cascade08%%*cascade08%Ÿ% *cascade08Ÿ% %*cascade08 %¡% *cascade08¡%£%*cascade08£%¤% *cascade08¤%¥% *cascade08¥%¦% *cascade08¦%²%*cascade08²%Â%*cascade08Â%Ã% *cascade08Ã%Ì%*cascade08Ì%Í% *cascade08Í%ö%*cascade08ö%÷% *cascade08÷%‡&*cascade08‡&‰& *cascade08‰&‹& *cascade08‹&&&¯& *cascade08¯&°&*cascade08°&±& *cascade08±&²& *cascade08²&´&*cascade08´&¶& *cascade08¶&¸&*cascade08¸&¹& *cascade08¹&¼&*cascade08¼&½& *cascade08½&Ò&*cascade08Ò&ö& *cascade08ö&ú&ú&€'*cascade08€''*cascade08'‚' *cascade08‚'†'*cascade08†'‡' *cascade08‡'ˆ'*cascade08ˆ'Š' *cascade08Š'‹' *cascade08‹''*cascade08'' *cascade08'“' *cascade08“'”'”'´' *cascade08´'·'·'¸'*cascade08¸'º' *cascade08º'»'*cascade08»'¼' *cascade08¼'½' *cascade08½'¿'*cascade08¿'À' *cascade08À'Á'*cascade08Á'Ã' *cascade08Ã'Ä'*cascade08Ä'Æ' *cascade08Æ'Ç' *cascade08Ç'Ë'*cascade08Ë'Ì' *cascade08Ì'Í'*cascade08
Í'Î' Î'ê(*cascade08
ê(ğ+ ğ+ñ+*cascade08
ñ+°, °,²,*cascade08²,³, *cascade08³,´,*cascade08´,Ù, *cascade08Ù,Ú,*cascade08Ú,Û, *cascade08Û,Ş,*cascade08Ş,á, *cascade08á,ã,*cascade08ã,ä, *cascade08ä,ö,*cascade08
ö,š- š- -*cascade08
 -¢- ¢-¦-*cascade08
¦-§- §-¨-*cascade08
¨-«- «-¯-*cascade08
¯-Ó- Ó-Ô-*cascade08Ô-Õ- *cascade08Õ-Ù-*cascade08Ù-Ú- *cascade08Ú-à-*cascade08à-á- *cascade08
á-. .‘.*cascade08
‘.’. ’.”.*cascade08
”.—. —..*cascade08
.Ÿ. Ÿ.¡.*cascade08
¡.¢. ¢.£.*cascade08£.¤.*cascade08¤.¥. *cascade08¥.¦. *cascade08¦.§.*cascade08§.¨. *cascade08¨.©.*cascade08©.ª. *cascade08ª.­.*cascade08­.®. *cascade08®.¯.*cascade08¯.°. *cascade08°.².*cascade08².³. *cascade08³.µ.*cascade08
µ.¸. ¸.¿.*cascade08¿.À. *cascade08À.Ø.*cascade08Ø.Ù. *cascade08Ù.Û.*cascade08Û.Ü. *cascade08Ü.İ.*cascade08İ.Ş. *cascade08Ş.ß.*cascade08ß.à. *cascade08à.á.*cascade08á.ä. *cascade08ä.î.*cascade08
î./ /‘/*cascade08
‘/’/ ’/”/*cascade08
”/–/ –/š/*cascade08
š/¥/ ¥/¦/*cascade08
¦/Å/ Å/Ê/*cascade08Ê/Ì/ *cascade08Ì/Ï/*cascade08Ï/Ò/ *cascade08Ò/Ó/*cascade08Ó/Ô/ *cascade08Ô/Õ/*cascade08Õ/×/ *cascade08×/Û/*cascade08Û/Ü/ *cascade08Ü/†0*cascade08†00 *cascade0800*cascade080˜0 *cascade08
˜0™0 ™0š0 *cascade08
š0›0 ›0œ0*cascade08œ0£0*cascade08
£0¥0 ¥0¯0*cascade08¯0Ñ0 *cascade08Ñ0Ù0*cascade08Ù0Ú0 *cascade08Ú0Ş0*cascade08Ş0à0 *cascade08à0å0*cascade08å0æ0 *cascade08æ0ç0*cascade08ç0é0 *cascade08é0ê0*cascade08ê0ë0 *cascade08ë0î0*cascade08î0ğ0 *cascade08ğ0ı0*cascade08ı0ş0 *cascade08ş0ÿ0*cascade08ÿ0€1 *cascade08€11*cascade081£1 *cascade08£1­1*cascade08­1®1 *cascade08®1µ1*cascade08µ1¸1 *cascade08¸1¹1*cascade08¹1º1 *cascade08º1Á1*cascade08Á1Ã1 *cascade08Ã1Ò1*cascade08Ò1Ó1 *cascade08Ó1×1*cascade08×1Ø1 *cascade08Ø1Ù1*cascade08Ù1Û1 *cascade08Û1İ1*cascade08İ1ğ1 *cascade08ğ1û1*cascade08û1ˆ2 *cascade08ˆ2 2*cascade08 2¡2 *cascade08¡2Ñ2*cascade08Ñ2Ò2 *cascade08Ò2Ô2*cascade08Ô2Õ2 *cascade08Õ2İ2*cascade08
İ2Ş2 Ş2ß2 *cascade08ß2ä2*cascade08ä2å2 *cascade08å2ê2*cascade08
ê2ì2 ì2í2 *cascade08í2ï2*cascade08ï2ğ2 *cascade08ğ2¬3¬3­3 *cascade08­3µ3*cascade08µ3¶3 *cascade08¶3Ä3*cascade08Ä3Æ3 *cascade08Æ3È3*cascade08È3É3 *cascade08É3Û3*cascade08
Û3Ü3 Ü3İ3 *cascade08İ3ß3*cascade08ß3à3 *cascade08à3á3*cascade08á3ÿ3 *cascade08ÿ3ƒ4*cascade08ƒ4›4 *cascade08›44*cascade084º4 *cascade08º4¿4¿4Ù4 *cascade08Ù4Û4 *cascade08Û4ß4*cascade08ß4â4 *cascade08â4ö4 *cascade08ö4ø4*cascade08ø4ú4 *cascade08ú4û4*cascade08û45 *cascade085 5 5¡5 *cascade08¡5¼6¼6À6 *cascade08À6Ğ6 *cascade08
Ğ6‹8 ‹8‹8*cascade08
‹8÷8 ÷8ø8 *cascade08ø8ÿ8ÿ8€9 *cascade08€9Ÿ9Ÿ9 9 *cascade08
 9ã9 ã9æ9*cascade08
æ9¡; ¡;à;*cascade08
à;ş; ş;< *cascade08<‰< *cascade08‰<–< *cascade08–<—<—<˜< *cascade08˜<û<û<ü< *cascade08
ü<™= ™==*cascade08
=Ÿ= Ÿ=¹= *cascade08
¹=ü= ü=»>*cascade08
»>œ? œ?? *cascade08
?İ? İ?à?*cascade08
à?@ @‚@ *cascade08
‚@ï@ ï@®A*cascade08
®AÈA ÈAÉA *cascade08ÉABBB *cascade08BŠCŠC‹C *cascade08
‹C¾C ¾C¿C*cascade08
¿CÁC ÁCÄC*cascade08
ÄCÅC ÅCÇC*cascade08
ÇCçC çCèC *cascade08èCóCóCôC *cascade08
ôCûC ûCüC*cascade08
üC°D °D±D*cascade08
±D³D ³DµD*cascade08
µD¶D ¶D¹D*cascade08
¹DƒE ƒE„E *cascade08
„E‡E ‡EŠE*cascade08
ŠE‹E ‹EŒE*cascade08
ŒEÑE ÑEÕE*cascade08
ÕE€F €F¬F*cascade08
¬F¯F ¯F±F*cascade08
±FŞF ŞFôF*cascade08
ôFöF öF‰G*cascade08
‰G¨G ¨G«G*cascade08
«G®G ®G²G*cascade08
²G³G ³GµG*cascade08
µG¸G ¸G½G*cascade08
½G¾G ¾G¿G*cascade08
¿GÁG ÁGÂG*cascade08
ÂGäG äGåG*cascade08
åGæG æGìG*cascade08
ìGïG ïGğG*cascade08
ğGóG óGøG*cascade08
øGşG şGH*cascade08
H‚H ‚H…H*cascade08
…H†H †H‰H*cascade08
‰HŒH ŒHH*cascade08
H¸H ¸H¹H*cascade08
¹H½H ½HÁH*cascade08
ÁH§I §IÁI *cascade08
ÁIÒI ÒIÔI*cascade08
ÔIÕI ÕIØI*cascade08
ØIÙI ÙIÚI*cascade08
ÚIÛI ÛIÜI*cascade08
ÜI‚J ‚JƒJ*cascade08
ƒJ‡J ‡J±J*cascade08
±J†M †MM*cascade08MM *cascade08M˜M˜M´M *cascade08´MµM*cascade08µM·M *cascade08·M¸M *cascade08¸M¹M*cascade08¹MºM *cascade08ºM»M*cascade08»M¿M *cascade08¿MÀMÀMÂM*cascade08ÂMÃM *cascade08ÃMÄM *cascade08ÄMÅM*cascade08ÅMåM *cascade08åMíMíMğM*cascade08ğMñM *cascade08ñMôM*cascade08ôMõM *cascade08õM÷M*cascade08÷MùM *cascade08ùMúM*cascade08úMüM*cascade08üMıM *cascade08ıM†N*cascade08†N·N*cascade08·N¸N *cascade08¸N¹N *cascade08¹NÃN*cascade08ÃNÄN *cascade08ÄNãN *cascade08
ãNóN óN÷N*cascade08
÷NÜO ÜOæP*cascade08
æPíP íPóP*cascade08
óPŠT ŠTT*cascade08
T´T ´TµT*cascade08µT¶T *cascade08¶T¼T*cascade08¼T½T *cascade08½T¾T*cascade08¾TÀT *cascade08ÀTÁT *cascade08ÁTÑT*cascade08ÑTÒT *cascade08ÒTñT *cascade08ñTõTõTöT *cascade08öTøT*cascade08øTùT *cascade08ùTúT*cascade08úTüT *cascade08üTıT *cascade08ıTşT *cascade08şTÿT *cascade08ÿT€U*cascade08€UU *cascade08U‚U *cascade08‚UƒU*cascade08ƒU„U *cascade08„U…U*cascade08…U†U *cascade08†U‰U*cascade08‰UŠU *cascade08ŠUŒU*cascade08ŒUU *cascade08UU*cascade08UU *cascade08U‘U*cascade08‘U“U *cascade08“U²U *cascade08²U¶U¶U·U*cascade08·U¸U *cascade08¸UºU*cascade08ºU¼U *cascade08¼U¿U*cascade08¿UÂU *cascade08ÂUÆU*cascade08ÆUÈU *cascade08ÈUÚU*cascade08ÚUÜU *cascade08ÜUàUàUüU *cascade08üUıU*cascade08ıUşU *cascade08şUÿU*cascade08ÿUV *cascade08V„V *cascade08„VˆV *cascade08ˆV‰V *cascade08‰VŠVŠV¤V *cascade08
¤V¬V ¬V³V*cascade08
³V¹V ¹VåV *cascade08åVìV*cascade08ìVíV *cascade08íVîV*cascade08îVóV *cascade08óVõV*cascade08õVšW *cascade08šWœW*cascade08œWW *cascade08W¡W*cascade08¡W¥W *cascade08¥W©W*cascade08©WªW *cascade08
ªWÉW ÉWÍW *cascade08ÍWÑWÑWåW *cascade08åWæW*cascade08æW€X *cascade08€X„X„X‰X*cascade08‰XX*cascade08X”X*cascade08”X–X *cascade08–X—X—X«X *cascade08«X®X®XÇX *cascade08ÇXËXËXÍX *cascade08ÍXÕXÕXÖX *cascade08ÖX×X×XæX *cascade08æXúXúXüX *cascade08
üXŠY ŠY¾]*cascade08
¾]¿] ¿]ä] *cascade082Ffile:///c:/Users/kouki/.gemini/hifuu-kou-club/components/Navigation.js