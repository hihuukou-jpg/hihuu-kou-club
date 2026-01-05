Ù+"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Hero() {
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div id="hero" style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#000' }}>

            {/* Winter Background Image */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: 'url(/hero-winter.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 0
            }} />

            {/* Overlay for Contrast */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(255,255,255,0.1) 50%, rgba(248,250,252,1) 100%)',
                zIndex: 1
            }} />

            {/* Falling Snow Particles */}
            {mounted && [...Array(30)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: -50, x: Math.random() * 100 + 'vw', opacity: 0 }}
                    animate={{
                        y: '105vh',
                        x: `calc(${Math.random() * 100}vw + ${Math.random() * 50 - 25}px)`,
                        opacity: [0, 0.8, 0]
                    }}
                    transition={{
                        duration: 8 + Math.random() * 10, // Slower snow
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "linear"
                    }}
                    style={{
                        position: 'absolute',
                        width: Math.random() * 4 + 2 + 'px', // Varying snowflake sizes
                        height: Math.random() * 4 + 2 + 'px',
                        background: '#fff',
                        borderRadius: '50%',
                        pointerEvents: 'none',
                        zIndex: 2,
                        filter: 'blur(0.5px)',
                        boxShadow: '0 0 3px rgba(255,255,255,0.8)'
                    }}
                />
            ))}

            {/* Main Content */}
            <div style={{
                position: 'relative', zIndex: 10, height: '100%',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                textAlign: 'center'
            }}>

                {/* Vertical Japanese Text with Shadow */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'upright',
                        fontFamily: 'var(--font-serif)',
                        fontSize: isMobile ? '3rem' : 'clamp(3.5rem, 7vw, 6rem)',
                        letterSpacing: isMobile ? '0.3em' : '0.5em',
                        color: '#fff',
                        textShadow: '0 2px 10px rgba(0,0,0,0.5), 0 0 20px rgba(185, 28, 28, 0.3)', // Red glow
                        height: 'auto',
                        borderRight: '2px solid rgba(255,255,255,0.7)',
                        paddingRight: '2rem',
                        marginRight: '1rem'
                    }}
                >
                    ç§˜å°å·¥å€¶æ¥½éƒ¨
                </motion.div>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1.5 }}
                    style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: isMobile ? '1.2rem' : '1.5rem',
                        color: '#fff',
                        letterSpacing: '0.3em',
                        marginTop: '2rem',
                        textShadow: '0 1px 5px rgba(0,0,0,0.5)'
                    }}
                >
                    Hifuu Kou
                </motion.div>

            </div>

            {/* Decorative Winter Circle */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                animate={{ opacity: 0.2, scale: 1, rotate: 360 }}
                transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: isMobile ? '50vh' : '80vh',
                    height: isMobile ? '50vh' : '80vh',
                    border: '2px dashed rgba(255,255,255,0.5)',
                    borderRadius: '50%',
                    zIndex: 0
                }}
            />

        </div>
    );
}
À *cascade08Àöö¥ *cascade08¥ŒŒ» *cascade08»Å*cascade08Åï *cascade08ïğ*cascade08ğ– *cascade08–¦ *cascade08¦©*cascade08©ª *cascade08ªÂ *cascade08Â¢*cascade08¢£ *cascade08£²*cascade08²³ *cascade08³Â*cascade08ÂÃ *cascade08ÃÅ*cascade08ÅÆ *cascade08Æè*cascade08èé *cascade08éí*cascade08íî *cascade08îõ*cascade08õö *cascade08öš*cascade08š› *cascade08›*cascade08¦ *cascade08¦«*cascade08«¬ *cascade08¬±*cascade08±² *cascade08²Ç*cascade08ÇÈ *cascade08ÈÏ*cascade08ÏĞ *cascade08ĞÓ*cascade08ÓÔ *cascade08ÔÜ*cascade08Üß*cascade08ß¹*cascade08¹Î	 *cascade08Î	Ï	*cascade08Ï	Ğ	 *cascade08Ğ	Ò	*cascade08Ò	Ó	 *cascade08Ó	Ô	*cascade08Ô	Õ	 *cascade08Õ	Ö	*cascade08Ö	Ü	 *cascade08Ü	İ	*cascade08İ	Ş	 *cascade08Ş	à	*cascade08à	á	 *cascade08á	ä	*cascade08ä	å	 *cascade08å	è	*cascade08è	é	 *cascade08é	ğ	*cascade08ğ	ñ	 *cascade08ñ	ò	*cascade08ò	ó	 *cascade08ó	ô	 *cascade08ô	ø	*cascade08ø	ú	 *cascade08ú	ü	*cascade08ü	ı	 *cascade08ı	’
*cascade08’
“
 *cascade08“
”
*cascade08”
–
 *cascade08–
˜
 *cascade08˜

*cascade08
Ÿ
 *cascade08Ÿ
«
*cascade08«
¬
 *cascade08¬
®
*cascade08®
°
 *cascade08°
±
*cascade08±
Å
 *cascade08Å
Ë
*cascade08Ë
Ì
*cascade08Ì
Í
 *cascade08Í
Î
*cascade08Î
Ü
 *cascade08Ü
Ş
*cascade08Ş
ß
 *cascade08ß
å
*cascade08å
ñ
 *cascade08ñ
õ
 *cascade08õ
ı
*cascade08ı
ş
 *cascade08ş
ÿ
*cascade08ÿ
 *cascade08‚ *cascade08‚‹*cascade08‹Œ *cascade08Œ*cascade08 *cascade08*cascade08 *cascade08Ÿ*cascade08Ÿ  *cascade08 ¡*cascade08¡¤ *cascade08¤¥*cascade08¥¦ *cascade08¦³ *cascade08³µ*cascade08µ¹ *cascade08¹º *cascade08ºÀ*cascade08ÀÁ *cascade08ÁÅ*cascade08ÅÆ *cascade08ÆÇ*cascade08ÇÕ *cascade08ÕÙ*cascade08ÙÚ *cascade08Úá*cascade08áú *cascade08úû*cascade08ûü *cascade08üÿ*cascade08ÿ€ *cascade08€*cascade08ƒ *cascade08ƒ†*cascade08†– *cascade08–—*cascade08—˜ *cascade08˜*cascade08 *cascade08¢*cascade08¢¥ *cascade08¥¨*cascade08¨« *cascade08«¯*cascade08¯° *cascade08°´*cascade08´µ *cascade08µ¶*cascade08¶¸ *cascade08¸Æ*cascade08ÆÉ *cascade08ÉË*cascade08ËÌ *cascade08ÌÍ*cascade08ÍÏ *cascade08ÏĞ*cascade08ĞÒ *cascade08ÒÖ*cascade08Öè *cascade08èì*cascade08ìí *cascade08íî*cascade08îï *cascade08ïò*cascade08òó *cascade08óö*cascade08ö *cascade08’*cascade08’“ *cascade08“– *cascade08–—*cascade08— *cascade08¡ *cascade08¡¢*cascade08¢£ *cascade08£¤ *cascade08¤¥ *cascade08¥µ *cascade08µÂ*cascade08ÂÃ *cascade08ÃÄ*cascade08ÄÅ *cascade08ÅÈ*cascade08ÈÉ *cascade08ÉÔ*cascade08ÔÕ *cascade08Õë *cascade08ëì*cascade08ìğ *cascade08ğñ*cascade08ñø *cascade08ø *cascade08’ *cascade08’” *cascade08”• *cascade08•–*cascade08–˜ *cascade08˜™*cascade08™› *cascade08›œ*cascade08œ *cascade08Ÿ*cascade08Ÿ  *cascade08 ¡ *cascade08¡¢*cascade08¢£ *cascade08£¤ *cascade08¤¦*cascade08¦Ô *cascade08ÔÖ*cascade08Ö× *cascade08×Ø*cascade08ØÙ *cascade08ÙÚ*cascade08ÚÛ *cascade08ÛÜ *cascade08Üá*cascade08áã *cascade08ãä*cascade08äû *cascade08ûş*cascade08şÿ *cascade08ÿ€*cascade08€ *cascade08‚ *cascade08‚ƒ*cascade08ƒ… *cascade08…†*cascade08†‡ *cascade08‡Š*cascade08Š‹ *cascade08‹Œ *cascade08Œ*cascade08’*cascade08’“ *cascade08“”*cascade08”• *cascade08•–*cascade08–— *cascade08—˜*cascade08˜™ *cascade08™› *cascade08›œ *cascade08œ *cascade08Ÿ*cascade08Ÿ  *cascade08 ¤*cascade08¤¦ *cascade08¦§ *cascade08§¨ *cascade08¨©*cascade08©« *cascade08«Å *cascade08ÅÌ*cascade08ÌÍ *cascade08ÍĞ*cascade08ĞÒ *cascade08ÒÔ *cascade08ÔÖ*cascade08Öğ *cascade08ğó*cascade08óô *cascade08ôõ*cascade08õ÷ *cascade08÷ø*cascade08øù *cascade08ùú *cascade08ú„*cascade08„… *cascade08…†*cascade08†‡ *cascade08‡ˆ*cascade08ˆ‰ *cascade08‰Ÿ *cascade08Ÿ *cascade08 ¡ *cascade08¡£ *cascade08£¤*cascade08¤¥ *cascade08¥§*cascade08§© *cascade08©±*cascade08± *cascade08‚*cascade08‚ƒ *cascade08ƒ…*cascade08…† *cascade08†‡*cascade08‡‰*cascade08‰ *cascade08*cascade08 *cascade08‘ *cascade08‘”*cascade08”° *cascade08°±*cascade08±² *cascade08²µ*cascade08µ· *cascade08·Ë*cascade08ËÌ *cascade08ÌĞ*cascade08ĞÑ *cascade08ÑÒ*cascade08ÒÔ *cascade08Ôï*cascade08ï‰ *cascade08‰Š*cascade08Š *cascade08‘ *cascade08‘¥*cascade08¥¦ *cascade08¦ª*cascade08ª­ *cascade08­È *cascade08ÈÊ*cascade08ÊË*cascade08ËÎ*cascade08ÎÏ *cascade08ÏÒ*cascade08ÒÕ *cascade08ÕÖ *cascade08ÖÙ*cascade08ÙÛ *cascade08Ûõ *cascade08õù*cascade08ùû *cascade08ûü*cascade08üı *cascade08ı€*cascade08€ƒ *cascade08ƒ„ *cascade08„…*cascade08…‰ *cascade08‰£ *cascade08£§*cascade08§¨ *cascade08¨ª *cascade08ª­*cascade08­® *cascade08®°*cascade08°³ *cascade08³¶*cascade08¶Ó *cascade08ÓÛ *cascade08ÛÜ*cascade08Üø *cascade08øù *cascade08ùú*cascade08úû *cascade08ûı*cascade08ı€ *cascade08€ƒ*cascade08ƒ„ *cascade08„… *cascade08…¸*cascade08¸º *cascade08ºÏ*cascade08ÏĞ *cascade08Ğç *cascade08çë*cascade08ëó *cascade08óô*cascade08ôõ *cascade08õû *cascade08ûü*cascade08üı *cascade08ı‹ *cascade08‹’*cascade08’ *cascade08¡*cascade08¡¢ *cascade08¢¦*cascade08¦§ *cascade08§® *cascade08®®*cascade08®¯ *cascade08¯´*cascade08´À *cascade08ÀÁ *cascade08ÁÄ*cascade08ÄÅ *cascade08ÅÍ*cascade08ÍÒ*cascade08ÒÓ *cascade08Óà*cascade08àá *cascade08áå*cascade08åæ *cascade08æç*cascade08çë *cascade08ëí*cascade08íî *cascade08î÷*cascade08÷ø *cascade08ø¤*cascade08¤¦ *cascade08¦§*cascade08§¨ *cascade08¨®*cascade08®¯ *cascade08¯°*cascade08°±*cascade08±³ *cascade08³µ*cascade08µ¶ *cascade08¶¸*cascade08¸¹ *cascade08¹º*cascade08º» *cascade08»¼*cascade08¼½ *cascade08½¾*cascade08¾¿ *cascade08¿À*cascade08ÀÃ *cascade08ÃË*cascade08ËÌ *cascade08ÌÖ*cascade08Ö×*cascade08×Ø *cascade08ØÙ*cascade08ÙÚ *cascade08Úß*cascade08ßà *cascade08àã*cascade08ãä *cascade08äå*cascade08åæ *cascade08æç *cascade08çõ*cascade08õö *cascade08öû*cascade08û *cascade08 *cascade08“*cascade08“” *cascade08”›*cascade08›œ *cascade08œ°*cascade08°³ *cascade08³Å *cascade08ÅÈ*cascade08ÈÉ *cascade08ÉÌ*cascade08ÌÎ *cascade08ÎĞ*cascade08ĞÑ *cascade08Ñ×*cascade08×Ø *cascade08ØÚ *cascade08ÚÛ *cascade08Ûß*cascade08ßà *cascade08àì*cascade08ìí*cascade08íî *cascade08îï*cascade08ï‰ *cascade08‰Œ*cascade08Œ· *cascade08·¹ *cascade08¹¾*cascade08¾Á *cascade08ÁÃ*cascade08Ãñ *cascade08ñó *cascade08óø*cascade08øú *cascade08úû*cascade08û¡ *cascade08¡£ *cascade08£¬ *cascade08¬¾*cascade08¾ù *cascade08ù‚*cascade08‚ƒ *cascade08ƒ„*cascade08„‡ *cascade08‡‘*cascade08‘” *cascade08”*cascade08 *cascade08®*cascade08®° *cascade08°µ*cascade08µ¹ *cascade08¹½*cascade08½À *cascade08ÀÂ*cascade08ÂÃ *cascade08ÃÇ*cascade08Çã *cascade08ãû *cascade08ûü*cascade08üı *cascade08ı€*cascade08€ƒ *cascade08ƒ…*cascade08…† *cascade08†*cascade08Ÿ *cascade08Ÿ¥*cascade08¥§ *cascade08§»»¼ *cascade08¼¾*cascade08¾¿ *cascade08¿Ã*cascade08ÃÅ*cascade08ÅÆ *cascade08ÆÊ *cascade08ÊË*cascade08ËÌ *cascade08ÌÍ *cascade08ÍÏ *cascade08ÏĞ*cascade08ĞÑ *cascade08ÑÒ *cascade08ÒÓ*cascade08Óğ *cascade08ğø*cascade08øù *cascade08ùú*cascade08úü *cascade08üı*cascade08ıÿ *cascade08
ÿ *cascade08
” ”• *cascade08•— *cascade08—˜*cascade08˜™ *cascade08™œ *cascade08œ¥*cascade08¥¦ *cascade08¦·*cascade08·¸ *cascade08¸»*cascade08»¾ *cascade08¾Â*cascade08ÂÃ *cascade08ÃÄ*cascade08ÄÚ *cascade08ÚŞ *cascade08Şß*cascade08ßà *cascade08àã*cascade08ãä *cascade08äè*cascade08èë *cascade08ëù*cascade08ùú *cascade08ú¦*cascade08¦¨ *cascade08¨´*cascade08´¶ *cascade08¶½*cascade08½Â *cascade08ÂÍ *cascade08ÍÎ *cascade08ÎÑ*cascade08ÑÒ *cascade08ÒÓ*cascade08Ó× *cascade08×Û*cascade08Ûİ *cascade08İô *cascade08ôö*cascade08ö÷ *cascade08÷ø *cascade08øù*cascade08ùû *cascade08û‚*cascade08‚ƒ *cascade08ƒ„ *cascade08„… *cascade08…†*cascade08† *cascade08’*cascade08’” *cascade08”£*cascade08£¦ *cascade08¦®*cascade08®¯ *cascade08¯¾*cascade08¾¿ *cascade08¿Ç *cascade08ÇÌ*cascade08ÌÏ *cascade08ÏĞ*cascade08ĞÕ *cascade08Õ×*cascade08×Û *cascade08Ûï *cascade08ïğ*cascade08ğñ *cascade08ñô*cascade08ôõ *cascade08õö *cascade08öú *cascade08
úş ş‚ *cascade08‚” *cascade08”š*cascade08š¬ *cascade08¬¯*cascade08¯¶ *cascade08¶· *cascade08·Ã *cascade08ÃÕ*cascade08Õç *cascade08çê*cascade08êë *cascade08ëí *cascade08íï *cascade08ïñ*cascade08ñò *cascade08òö*cascade08öˆ  *cascade08ˆ  *cascade08   *cascade08  *cascade08 ‘  *cascade08‘ ’  *cascade08’ “  *cascade08“ ˜ *cascade08˜ ª  *cascade08ª ¬ *cascade08¬ ­  *cascade08­ ® *cascade08® ±  *cascade08± µ *cascade08µ ·  *cascade08· º  *cascade08º Ç  *cascade08Ç Ö *cascade08Ö Ø  *cascade08Ø Ù  *cascade08Ù Ü *cascade08Ü ß  *cascade08ß à *cascade08à ç *cascade08ç ê *cascade08ê ü  *cascade08ü !*cascade08!‚! *cascade08‚!†!*cascade08†!‡! *cascade08‡!’!*cascade08’!•! *cascade08•!›!*cascade08›!!*cascade08!°! *cascade08°!²!*cascade08²!´! *cascade08´!¹!*cascade08¹!¾! *cascade08¾!Á!*cascade08Á!Â! *cascade08Â!Ä!*cascade08Ä!Å! *cascade08Å!Æ!*cascade08Æ!É! *cascade08É!Ê! *cascade08Ê!Í! *cascade08Í!Ñ!*cascade08Ñ!Ò! *cascade08Ò!Ó!*cascade08Ó!×! *cascade08×!Ù!*cascade08Ù!î! *cascade08î!ñ!*cascade08ñ!ú! *cascade08ú!ü!*cascade08ü!¬" *cascade08¬"­"*cascade08­"®" *cascade08®"±"*cascade08±"´" *cascade08´"Í"*cascade08Í"Ø" *cascade08
Ø"å" å"ç"*cascade08
ç"î" î"ï" *cascade08ï"ğ"*cascade08ğ"ñ" *cascade08ñ"ò"*cascade08ò"÷" *cascade08÷"ù"*cascade08ù"û" *cascade08û"#*cascade08#™# *cascade08™##*cascade08## *cascade08#Ÿ#*cascade08Ÿ#µ# *cascade08µ#¸#*cascade08¸#¹# *cascade08¹#¾#*cascade08¾#¿# *cascade08¿#Ç#*cascade08Ç#È# *cascade08È#Ë# *cascade08Ë#Ì#*cascade08Ì#Ğ# *cascade08Ğ#æ# *cascade08æ#ğ#*cascade08ğ#ñ# *cascade08ñ#ó#*cascade08ó#õ# *cascade08õ#ö# *cascade08ö#÷#*cascade08÷#ø# *cascade08ø#ú# *cascade08ú#¼$*cascade08¼$×$ *cascade08×$Ø$ *cascade08Ø$ç$*cascade08ç$ş$ *cascade08ş$ÿ$*cascade08ÿ$€% *cascade08€%ƒ%*cascade08ƒ%„% *cascade08„%…%*cascade08…%†% *cascade08†%‡%*cascade08‡%›% *cascade08›%¢%*cascade08¢%¨% *cascade08¨%ª%*cascade08ª%·% *cascade08·%¸%*cascade08¸%»% *cascade08»%À%*cascade08À%Á% *cascade08Á%È%*cascade08È%Ì% *cascade08Ì%Ï%*cascade08Ï%Ğ% *cascade08Ğ%Ò%*cascade08Ò%Ø% *cascade08Ø%Û% *cascade08Û%â%*cascade08â%è% *cascade08è%ù%*cascade08ù%ú% *cascade08ú%„&*cascade08„&…& *cascade08…&˜&*cascade08˜&™& *cascade08™&š&*cascade08š&›& *cascade08›&œ&*cascade08œ&& *cascade08&¡&*cascade08¡&¢& *cascade08¢&£&*cascade08£&¥& *cascade08¥&§&*cascade08§&¨& *cascade08¨&ª&*cascade08ª&«& *cascade08«&¬&*cascade08¬&¯& *cascade08¯&°&*cascade08°&±& *cascade08±&²&*cascade08²&³& *cascade08³&´&*cascade08´&µ& *cascade08µ&¸&*cascade08¸&Ã&*cascade08Ã&È& *cascade08È&Ë&*cascade08Ë&×& *cascade08×&Ú&*cascade08Ú&Û& *cascade08Û&î& *cascade08î&ï&*cascade08ï&ù& *cascade08ù&†'*cascade08†'‰' *cascade08‰'—' *cascade08—'¦'*cascade08¦'§' *cascade08§'¨'*cascade08¨'©' *cascade08©'­'*cascade08­'®' *cascade08®'¯'*cascade08¯'°' *cascade08°'³' *cascade08³'µ'*cascade08µ'¶' *cascade08¶'·' *cascade08·'¸'*cascade08¸'¹' *cascade08¹'º'*cascade08º'»' *cascade08»'¾'*cascade08¾'Á'*cascade08Á'Â' *cascade08Â'Ã' *cascade08Ã'È'*cascade08È'É' *cascade08É'Õ'*cascade08Õ'Ö' *cascade08Ö'×'*cascade08×'Ø' *cascade08Ø'Ù'*cascade08Ù'Ü' *cascade08Ü'Ş'*cascade08Ş'ê' *cascade08ê'ë'*cascade08ë'ö' *cascade08ö'ú'*cascade08ú'Ÿ( *cascade08Ÿ(¡(*cascade08¡(¢( *cascade08¢(µ(*cascade08µ(·( *cascade08·(¸(*cascade08¸(»( *cascade08»(¾(*cascade08¾(À( *cascade08À(Õ(*cascade08Õ(İ( *cascade08İ(Ş(*cascade08Ş(ô( *cascade08ô(ù(*cascade08ù(ú( *cascade08ú(ş(*cascade08ş(ÿ( *cascade08ÿ()*cascade08)„) *cascade08„)ˆ)*cascade08ˆ)‹) *cascade08‹))*cascade08)) *cascade08)”)*cascade08”)•) *cascade08•)˜)*cascade08˜)­) *cascade08­)²)*cascade08²)³) *cascade08³)¶)*cascade08¶)¸) *cascade08
¸)Ä) Ä)Å)*cascade08
Å)Ì) Ì)Í) *cascade08Í)Î)*cascade08Î)Ñ) *cascade08Ñ)é) *cascade08é)ê)*cascade08ê)ï) *cascade08
ï)ı) ı)ş)*cascade08
ş)ƒ* ƒ*†* *cascade08†*‡**cascade08‡*Š* *cascade08Š** *cascade08* **cascade08 *¢* *cascade08¢*£**cascade08£*¤* *cascade08¤*¦**cascade08¦*§* *cascade08§*¨**cascade08¨*«* *cascade08«*¬**cascade08¬*®* *cascade08®*¯* *cascade08¯*°* *cascade08°*±* *cascade08±*²**cascade08²*³* *cascade08³*´* *cascade08´*¶**cascade08¶*·* *cascade08·*Ê**cascade08Ê*Ì* *cascade08Ì*Í**cascade08Í*ã* *cascade08ã*ë**cascade08ë*í* *cascade08í*ï**cascade08ï*ñ* *cascade08ñ*ò**cascade08ò*ó* *cascade08ó*÷**cascade08÷*Š+ *cascade08Š+Œ+*cascade08Œ++ *cascade08++*cascade08++ *cascade08++*cascade08+‘+ *cascade08‘+–+*cascade08–+¨+ *cascade08¨+ª+*cascade08ª+¼+ *cascade08¼+Ù+ *cascade082@file:///c:/Users/kouki/.gemini/hifuu-kou-club/components/Hero.js