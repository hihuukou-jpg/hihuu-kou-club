$"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Hero() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div id="hero" style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#F9F8F6' }}>

            {/* Spiritual Background Gradient */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: 'radial-gradient(circle at 50% 30%, #fff 0%, #FEE7EB 40%, #f4f4f4 80%)',
                opacity: 0.8
            }} />

            {/* Slow Sakura Particles */}
            {mounted && [...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: -50, x: Math.random() * 100 + 'vw', rotate: 0, opacity: 0 }}
                    animate={{
                        y: '100vh',
                        x: `calc(${Math.random() * 100}vw + ${Math.random() * 100 - 50}px)`,
                        rotate: 360,
                        opacity: [0, 0.6, 0]
                    }}
                    transition={{
                        duration: 15 + Math.random() * 10, // Very slow falling
                        repeat: Infinity,
                        delay: Math.random() * 8,
                        ease: "linear"
                    }}
                    style={{
                        position: 'absolute',
                        width: '12px',
                        height: '12px',
                        background: '#FFB7C5',
                        borderRadius: '100% 0 100% 0', // Simple petal shape
                        pointerEvents: 'none',
                        zIndex: 1,
                        filter: 'blur(1px)'
                    }}
                />
            ))}

            {/* Main Content: Centered, Elegant */}
            <div style={{
                position: 'relative', zIndex: 10, height: '100%',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                textAlign: 'center'
            }}>

                {/* Vertical Japanese Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'upright',
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(3rem, 6vw, 5rem)',
                        letterSpacing: '0.8em',
                        color: 'var(--text-main)',
                        height: 'auto',
                        marginBottom: '2rem',
                        borderRight: '1px solid var(--hakurei-red)',
                        paddingRight: '2rem',
                        marginRight: '2rem'
                    }}
                >
                    ç§˜å°å·¥å€¶æ¥½éƒ¨
                </motion.div>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1.5 }}
                    style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.2rem',
                        color: 'var(--hakurei-red)',
                        letterSpacing: '0.2em',
                        marginTop: '1rem'
                    }}
                >
                    Hifuu Kou Club
                </motion.div>

            </div>

            {/* Decorative Circle (Enso-like but minimal) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 3, ease: "easeOut" }}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60vh',
                    height: '60vh',
                    border: '1px solid var(--hakurei-red)',
                    borderRadius: '50%',
                    zIndex: 0
                }}
            />

        </div>
    );
}
 *cascade08¨*cascade08¨Ò *cascade08ÒÓ*cascade08Óù *cascade08ù‰ *cascade08‰*cascade08 *cascade08¨ *cascade08¨²*cascade08²½ *cascade08½¿ *cascade08¿Á*cascade08ÁÂ *cascade08ÂÅ*cascade08Åß *cascade08ßà*cascade08àá *cascade08áâ*cascade08âè *cascade08èé*cascade08éê *cascade08êï*cascade08ïğ *cascade08ğò *cascade08òô*cascade08ôõ *cascade08õ÷*cascade08÷ø *cascade08øû*cascade08ûı *cascade08ı*cascade08ƒ *cascade08ƒ…*cascade08…† *cascade08†‘*cascade08‘“ *cascade08“š*cascade08š› *cascade08›*cascade08Ÿ*cascade08Ÿ³ *cascade08³µ*cascade08µ¸ *cascade08¸º*cascade08º»*cascade08»½ *cascade08½¿*cascade08¿Í *cascade08ÍÏ*cascade08ÏĞ *cascade08ĞÖ*cascade08Öâ *cascade08âê*cascade08êë *cascade08ëñ*cascade08ñò *cascade08òû*cascade08ûü *cascade08üı*cascade08ış *cascade08şÿ*cascade08ÿ *cascade08*cascade08 *cascade08‘*cascade08‘” *cascade08”•*cascade08•– *cascade08–©*cascade08©ª *cascade08ª°*cascade08°± *cascade08±µ*cascade08µ¶ *cascade08¶·*cascade08·Å *cascade08ÅÉ*cascade08ÉÊ *cascade08ÊÑ*cascade08Ñê *cascade08êë*cascade08ëì *cascade08ìï*cascade08ïğ *cascade08ğñ*cascade08ñó *cascade08óö*cascade08ö† *cascade08†‡*cascade08‡ˆ *cascade08ˆ*cascade08 *cascade08’*cascade08’• *cascade08•˜*cascade08˜› *cascade08›Ÿ*cascade08Ÿ  *cascade08 ¤*cascade08¤¥ *cascade08¥¦*cascade08¦¨ *cascade08¨¶*cascade08¶¹ *cascade08¹»*cascade08»¼ *cascade08¼½*cascade08½Á *cascade08ÁÂ*cascade08ÂÄ *cascade08ÄÆ*cascade08ÆÇ *cascade08ÇÈ*cascade08ÈÊ *cascade08ÊË*cascade08ËÍ *cascade08ÍÑ*cascade08Ñã *cascade08ãç*cascade08çè *cascade08èé*cascade08éê *cascade08êí*cascade08íî *cascade08îñ*cascade08ñ‹ *cascade08‹*cascade08 *cascade08˜*cascade08˜œ *cascade08œ*cascade08 *cascade08Ÿ *cascade08Ÿ  *cascade08 ° *cascade08°½*cascade08½¾ *cascade08¾¿*cascade08¿À *cascade08ÀÃ*cascade08ÃÄ *cascade08ÄÏ*cascade08ÏĞ *cascade08Ğô*cascade08ôŠ	 *cascade08Š		*cascade08	“	 *cascade08“	”	*cascade08”	–	 *cascade08–	˜	*cascade08˜	™	 *cascade08™	š	*cascade08š	°	 *cascade08°	¶	*cascade08¶	·	 *cascade08·	¸	*cascade08¸	º	 *cascade08º	»	*cascade08»	½	 *cascade08½	¾	*cascade08¾	¿	 *cascade08¿	Á	*cascade08Á	Â	 *cascade08Â	Å	*cascade08Å	Æ	 *cascade08Æ	È	*cascade08È	ö	 *cascade08ö	ø	*cascade08ø	ù	 *cascade08ù	ú	*cascade08ú	û	 *cascade08û	ü	*cascade08ü	ı	 *cascade08ı	ş	 *cascade08ş	ƒ
*cascade08ƒ
…
 *cascade08…
†
*cascade08†

 *cascade08
 
*cascade08 
¡
 *cascade08¡
¢
*cascade08¢
£
 *cascade08£
¤
 *cascade08¤
¥
*cascade08¥
§
 *cascade08§
¨
 *cascade08¨
©
*cascade08©
ª
 *cascade08ª
­
*cascade08­
®
 *cascade08®
¯
 *cascade08¯
°
*cascade08°
µ
*cascade08µ
¶
 *cascade08¶
·
*cascade08·
¸
 *cascade08¸
¹
*cascade08¹
º
 *cascade08º
»
*cascade08»
¼
 *cascade08¼
¾
 *cascade08¾
¿
 *cascade08¿
À
 *cascade08À
Â
*cascade08Â
Ã
 *cascade08Ã
Ç
*cascade08Ç
È
 *cascade08È
Ì
*cascade08Ì
Í
 *cascade08Í
Ô
*cascade08Ô
î
 *cascade08î
õ
*cascade08õ
ö
 *cascade08ö
ù
*cascade08ù
û
 *cascade08û
ı
 *cascade08ı
ÿ
*cascade08ÿ
™ *cascade08™œ*cascade08œ *cascade08*cascade08  *cascade08 ¡*cascade08¡¢ *cascade08¢£ *cascade08£­*cascade08­® *cascade08®¯*cascade08¯° *cascade08°²*cascade08²È *cascade08ÈÉ*cascade08ÉÊ *cascade08ÊÌ *cascade08ÌÍ*cascade08ÍÎ *cascade08ÎĞ*cascade08ĞÒ *cascade08ÒÚ*cascade08Úª *cascade08ª«*cascade08«¬ *cascade08¬®*cascade08®¯ *cascade08¯°*cascade08°²*cascade08²¶ *cascade08¶¸*cascade08¸¹ *cascade08¹º *cascade08º½*cascade08½Ù *cascade08ÙÚ*cascade08ÚÛ *cascade08ÛŞ*cascade08Şá *cascade08áã*cascade08ãä *cascade08äå*cascade08å *cascade08‚*cascade08‚† *cascade08†‰ *cascade08‰*cascade08ª *cascade08ª¬*cascade08¬­*cascade08­°*cascade08°± *cascade08±´*cascade08´· *cascade08·¾*cascade08¾À *cascade08ÀÚ *cascade08ÚŞ*cascade08Şà *cascade08àá*cascade08áâ *cascade08âå*cascade08åè *cascade08èé *cascade08éÿ*cascade08ÿ€ *cascade08€ƒ*cascade08ƒ„ *cascade08„… *cascade08…†*cascade08†‡ *cascade08‡‰*cascade08‰Š *cascade08Š*cascade08¨ *cascade08¨¬*cascade08¬­ *cascade08­¯ *cascade08¯²*cascade08²³ *cascade08³µ*cascade08µ¸ *cascade08¸»*cascade08»Ø *cascade08Øı*cascade08ış *cascade08şÿ*cascade08ÿ€ *cascade08€‚*cascade08‚… *cascade08…ˆ*cascade08ˆ‰ *cascade08‰*cascade08¥ *cascade08¥©*cascade08©± *cascade08±²*cascade08²³ *cascade08³¹ *cascade08¹º*cascade08º» *cascade08»É *cascade08ÉĞ*cascade08ĞÜ *cascade08Üß*cascade08ßà *cascade08àä*cascade08äå *cascade08åí*cascade08íî *cascade08î÷*cascade08÷ø *cascade08øÿ*cascade08ÿ€ *cascade08€…*cascade08…‘ *cascade08‘’ *cascade08’•*cascade08•– *cascade08–*cascade08£*cascade08£¤ *cascade08¤±*cascade08±² *cascade08²¶*cascade08¶· *cascade08·¸*cascade08¸¼ *cascade08¼¾*cascade08¾¿ *cascade08¿È*cascade08ÈÉ *cascade08Éõ*cascade08õ÷ *cascade08÷ø*cascade08øù *cascade08ùÿ*cascade08ÿ€ *cascade08€*cascade08‚*cascade08‚„ *cascade08„†*cascade08†‡ *cascade08‡‰*cascade08‰Š *cascade08Š‹*cascade08‹Œ *cascade08Œ*cascade08 *cascade08*cascade08 *cascade08‘*cascade08‘” *cascade08”œ*cascade08œ *cascade08§*cascade08§¨*cascade08¨© *cascade08©ª*cascade08ª« *cascade08«°*cascade08°± *cascade08±´*cascade08´µ *cascade08µ¶*cascade08¶· *cascade08·¸ *cascade08¸Æ*cascade08ÆÇ *cascade08ÇÌ*cascade08ÌŞ *cascade08Şß *cascade08ßä*cascade08äå *cascade08åì*cascade08ìí *cascade08í*cascade08„ *cascade08„– *cascade08–™*cascade08™š *cascade08š*cascade08Ÿ *cascade08Ÿ¡*cascade08¡¢ *cascade08¢¨*cascade08¨© *cascade08©« *cascade08«¬ *cascade08¬°*cascade08°± *cascade08±²*cascade08²³ *cascade08³´*cascade08´Î *cascade08ÎÑ*cascade08Ñü *cascade08üƒ*cascade08ƒ± *cascade08±·*cascade08·İ *cascade08İß *cascade08ßè *cascade08èú*cascade08úµ *cascade08µ¾*cascade08¾¿ *cascade08¿À*cascade08ÀÃ *cascade08ÃÍ*cascade08ÍĞ *cascade08ĞÙ*cascade08ÙÚ *cascade08Úê*cascade08êì *cascade08ìñ*cascade08ñõ *cascade08õù*cascade08ùü *cascade08üş*cascade08şÿ *cascade08ÿƒ*cascade08ƒŸ *cascade08Ÿ· *cascade08·¸*cascade08¸¹ *cascade08¹¼*cascade08¼¿ *cascade08¿Á*cascade08ÁÂ *cascade08ÂÚ*cascade08ÚÛ *cascade08Ûá*cascade08áä *cascade08äæ*cascade08æç *cascade08çë*cascade08ëì *cascade08ìò*cascade08òó *cascade08óö*cascade08ö÷ *cascade08÷ø *cascade08øù*cascade08ù– *cascade08–*cascade08Ÿ *cascade08Ÿ *cascade08 ¢ *cascade08¢£*cascade08£¦ *cascade08¦©*cascade08©ª *cascade08ª­ *cascade08­¶*cascade08¶· *cascade08·È*cascade08ÈÉ *cascade08ÉÌ*cascade08ÌÏ *cascade08ÏÑ*cascade08ÑÒ *cascade08ÒÖ*cascade08Ö× *cascade08×Ú*cascade08ÚÛ *cascade08Ûß*cascade08ßà *cascade08àá*cascade08á÷ *cascade08÷Š*cascade08ŠŒ *cascade08Œ“*cascade08“˜ *cascade08˜£ *cascade08£¹*cascade08¹Ğ *cascade08ĞÒ*cascade08ÒÓ *cascade08ÓÔ *cascade08ÔÕ*cascade08Õ× *cascade08×Ş*cascade08Şß *cascade08ßà *cascade08àá *cascade08áë*cascade08ëñ *cascade08ñò*cascade08òó *cascade08óõ*cascade08õö *cascade08ö÷*cascade08÷ù *cascade08ùú*cascade08úû *cascade08ûü*cascade08üÿ *cascade08ÿ‡*cascade08‡ˆ *cascade08ˆ—*cascade08—˜ *cascade08˜  *cascade08 ¥*cascade08¥¨ *cascade08¨©*cascade08©® *cascade08®°*cascade08°´ *cascade08´È *cascade08ÈÉ*cascade08ÉÊ *cascade08ÊÍ*cascade08ÍÎ *cascade08ÎÏ *cascade08ÏÔ*cascade08ÔÕ *cascade08ÕÛ*cascade08Ûí *cascade08íó*cascade08ó… *cascade08…ˆ*cascade08ˆ *cascade08 *cascade08œ *cascade08œ®*cascade08®À *cascade08ÀÃ*cascade08ÃÄ *cascade08ÄÆ *cascade08ÆÈ *cascade08ÈÊ*cascade08ÊË *cascade08ËÏ*cascade08Ïá *cascade08áç*cascade08çè *cascade08èé*cascade08éê *cascade08êë *cascade08ëì *cascade08ìñ*cascade08ñƒ *cascade08ƒ…*cascade08…† *cascade08†‡*cascade08‡Š *cascade08Š*cascade08 *cascade08“ *cascade08“  *cascade08 ¯*cascade08¯± *cascade08±² *cascade08²µ*cascade08µ¸ *cascade08¸¹*cascade08¹¼*cascade08¼Î *cascade08ÎÓ*cascade08ÓÔ *cascade08ÔØ*cascade08ØÙ *cascade08Ùä*cascade08äç *cascade08çê*cascade08êü *cascade08üş*cascade08ş€ *cascade08€…*cascade08…Š *cascade08Š*cascade08 *cascade08*cascade08‘ *cascade08‘’*cascade08’• *cascade08•˜*cascade08˜› *cascade08›Ÿ*cascade08Ÿ  *cascade08 ¡*cascade08¡¥ *cascade08¥§*cascade08§¼ *cascade08¼¿*cascade08¿È *cascade08ÈÊ*cascade08Êú *cascade08úû*cascade08ûü *cascade08üÿ*cascade08ÿ‚ *cascade08‚›*cascade08›§ *cascade08§¨*cascade08¨© *cascade08©ª*cascade08ª¯ *cascade08¯±*cascade08±³ *cascade08³È*cascade08È× *cascade08×Û*cascade08ÛÜ *cascade08Üİ*cascade08İß *cascade08ßâ*cascade08âä *cascade08äå*cascade08åû *cascade08ûş*cascade08şÿ *cascade08ÿ„*cascade08„… *cascade08…*cascade08 *cascade08–*cascade08–¬ *cascade08¬¶*cascade08¶· *cascade08·¹*cascade08¹» *cascade08»½*cascade08½¾ *cascade08¾Û*cascade08ÛÜ *cascade08Üë*cascade08ë‚ *cascade08‚‡*cascade08‡ˆ *cascade08ˆ*cascade08¤ *cascade08¤«*cascade08«± *cascade08±³*cascade08³À *cascade08ÀÁ*cascade08ÁÄ *cascade08ÄÉ*cascade08ÉÊ *cascade08ÊÑ*cascade08ÑÕ *cascade08ÕØ*cascade08ØÙ *cascade08ÙÛ*cascade08Ûá *cascade08áí*cascade08íî *cascade08îğ*cascade08ğó *cascade08óô*cascade08ôõ *cascade08õø*cascade08øú *cascade08úü*cascade08üı *cascade08ış*cascade08ş‚ *cascade08‚“*cascade08“” *cascade08”*cascade08Ÿ *cascade08Ÿ²*cascade08²³ *cascade08³´*cascade08´µ *cascade08µ¶*cascade08¶¸ *cascade08¸»*cascade08»¼ *cascade08¼½*cascade08½¿ *cascade08¿Á*cascade08ÁÂ *cascade08ÂÄ*cascade08ÄÅ *cascade08ÅÆ*cascade08ÆÉ *cascade08ÉÊ*cascade08ÊË *cascade08ËÌ*cascade08ÌÍ *cascade08ÍÎ*cascade08ÎÏ *cascade08ÏÒ*cascade08Ò× *cascade08×Ú*cascade08Úæ *cascade08æé*cascade08éê *cascade08ê‹ *cascade08‹ ™  *cascade08™ ¨ *cascade08¨ ©  *cascade08© ª *cascade08ª «  *cascade08« ¯ *cascade08¯ °  *cascade08° ± *cascade08± ²  *cascade08² · *cascade08· ¸  *cascade08¸ ¹ *cascade08¹ º  *cascade08º » *cascade08» ¼  *cascade08¼ ¿ *cascade08¿ À  *cascade08À Â *cascade08Â Ã  *cascade08Ã Ç *cascade08Ç È  *cascade08È É *cascade08É Ì  *cascade08Ì Î *cascade08Î Ú  *cascade08Ú Û *cascade08Û æ  *cascade08æ ê *cascade08ê ! *cascade08!‘!*cascade08‘!’! *cascade08’!¥!*cascade08¥!§! *cascade08§!¨!*cascade08¨!«! *cascade08«!®!*cascade08®!°! *cascade08°!Å!*cascade08Å!Í! *cascade08Í!Î!*cascade08Î!ä! *cascade08ä!é!*cascade08é!ê! *cascade08ê!î!*cascade08î!ï! *cascade08ï!ñ!*cascade08ñ!ô! *cascade08ô!ø!*cascade08ø!û! *cascade08û!ı!*cascade08ı!ÿ! *cascade08ÿ!„"*cascade08„"…" *cascade08…"ˆ"*cascade08ˆ"" *cascade08"¢"*cascade08¢"£" *cascade08£"¦"*cascade08¦"©" *cascade08©"­"*cascade08­"Å" *cascade08Å"Æ"*cascade08Æ"Î" *cascade08Î"Ò"*cascade08Ò"æ" *cascade08æ"è"*cascade08è"ê" *cascade08ê"ë"*cascade08ë"ì" *cascade08ì"î"*cascade08î"ï" *cascade08ï"ğ"*cascade08ğ"ó" *cascade08ó"ö"*cascade08ö"÷" *cascade08÷"ø"*cascade08ø"ú" *cascade08ú"ü"*cascade08ü"ƒ# *cascade08ƒ#ˆ#*cascade08ˆ#‰# *cascade08‰#Š#*cascade08Š#‹# *cascade08‹##*cascade08## *cascade08#‘#*cascade08‘#§# *cascade08§#¯#*cascade08¯#±# *cascade08±#³#*cascade08³#µ# *cascade08µ#¶#*cascade08¶#·# *cascade08·#»#*cascade08»#Î# *cascade08Î#Ğ#*cascade08Ğ#Ñ# *cascade08Ñ#Ò#*cascade08Ò#Ó# *cascade08Ó#Ô#*cascade08Ô#Õ# *cascade08Õ#Ú#*cascade08Ú#ì# *cascade08ì#î#*cascade08î#€$ *cascade08€$$ *cascade082@file:///c:/Users/kouki/.gemini/hifuu-kou-club/components/Hero.js