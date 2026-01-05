†""use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function NewsSection() {
    const [news, setNews] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);

        fetch('/api/news')
            .then((res) => res.json())
            .then((data) => setNews(data));

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section id="news" style={{ minHeight: '100vh', padding: isMobile ? '6rem 1rem' : '8rem 2rem', background: '#F8FAFC', color: 'var(--text-main)', position: 'relative' }}>
            {/* Tech Background Grid */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.3, zIndex: 0 }}></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: isMobile ? '3rem' : '5rem', position: 'relative', zIndex: 1 }}
            >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ width: '40px', height: '1px', background: 'var(--hakurei-red)' }}></span>
                    <h2 className="hsr-title-decor" style={{
                        fontSize: isMobile ? '2rem' : '2.5rem',
                        fontFamily: 'var(--font-serif)',
                        color: 'var(--text-main)',
                        fontWeight: 'bold',
                        letterSpacing: '0.1em'
                    }}>
                        ãŠçŸ¥ã‚‰ã›
                    </h2>
                    <span style={{ width: '40px', height: '1px', background: 'var(--hakurei-red)' }}></span>
                </div>
            </motion.div>

            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: isMobile ? '1.5rem' : '2rem', position: 'relative', zIndex: 1 }}>
                {news.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                        className="hsr-card"
                        style={{
                            padding: isMobile ? '1.5rem' : '2rem 3rem',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                        }}
                    >
                        <div style={{
                            fontSize: '0.85rem',
                            color: 'var(--text-dim)',
                            fontFamily: 'var(--font-mono)',
                            marginBottom: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <span style={{ width: '8px', height: '8px', background: 'var(--hsr-cyan)', borderRadius: '50%', boxShadow: '0 0 5px var(--hsr-cyan)' }}></span>
                            {item.date}
                        </div>

                        <h3 style={{
                            fontSize: isMobile ? '1.2rem' : '1.4rem',
                            marginBottom: '1rem',
                            fontFamily: 'var(--font-serif)',
                            color: 'var(--text-main)',
                            fontWeight: 'bold'
                        }}>
                            {item.title}
                        </h3>
                        <p style={{ lineHeight: '1.8', color: '#555', fontFamily: 'var(--font-serif)', fontSize: '1rem' }}>{item.content}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
¾ *cascade08¾ôô• *cascade08•´´½ *cascade08½¿*cascade08¿ *cascade08ééÅ *cascade08ÅŞŞú *cascade08ú†*cascade08†‡ *cascade08‡*cascade08 *cascade08*cascade08‘ *cascade08‘ª*cascade08ª« *cascade08«­*cascade08­® *cascade08®¯*cascade08¯° *cascade08°±*cascade08±² *cascade08²Ö*cascade08Ö× *cascade08×õ*cascade08õö *cascade08ö*cascade08‚ *cascade08‚ƒ*cascade08ƒ„ *cascade08„†*cascade08†‡ *cascade08‡‰*cascade08‰Š *cascade08Š‹*cascade08‹Œ *cascade08Œ*cascade08 *cascade08“*cascade08“• *cascade08•™*cascade08™› *cascade08› *cascade08 ¤ *cascade08¤­*cascade08­® *cascade08®²*cascade08²³ *cascade08³¼*cascade08¼À *cascade08ÀÃ *cascade08ÃÅ*cascade08ÅÆ *cascade08ÆÉ*cascade08ÉÊ *cascade08ÊÒ*cascade08ÒÕ *cascade08ÕÖ*cascade08Ö× *cascade08×İ*cascade08İŞ *cascade08Şä*cascade08äå *cascade08åê*cascade08êë *cascade08ëï*cascade08ïğ *cascade08ğò*cascade08òó *cascade08óô*cascade08ôõ *cascade08õû*cascade08ûü *cascade08ü*cascade08ƒ *cascade08ƒ¹*cascade08¹½ *cascade08½Å*cascade08ÅÛ *cascade08ÛŞ*cascade08Ş‡	 *cascade08‡	ˆ	*cascade08ˆ	¼	 *cascade08¼	½	*cascade08½	ˆ
 *cascade08ˆ
¬
 *cascade08¬
À
À
Æ
 *cascade08Æ
ç
*cascade08ç
ê
 *cascade08ê
ö
 *cascade08ö
û
*cascade08û
† *cascade08†Œ *cascade08ŒÛ*cascade08ÛŞ *cascade08Şú*cascade08úş *cascade08şÿ *cascade08ÿ‚*cascade08‚„ *cascade08„†*cascade08†š *cascade08šœ*cascade08œ*cascade08  *cascade08 ¤*cascade08¤¸¸» *cascade08»¾*cascade08¾Å *cascade08ÅÉ*cascade08Éõ *cascade08õö *cascade08öú*cascade08ú“ *cascade08“—*cascade08—š*cascade08š› *cascade08›œ*cascade08œŸ *cascade08Ÿ¦*cascade08¦§ *cascade08§«*cascade08«¬ *cascade08¬¯*cascade08¯³ *cascade08³´*cascade08´È *cascade08ÈÑ*cascade08ÑÒ *cascade08ÒÕ*cascade08ÕØ *cascade08ØÙ *cascade08ÙÚ*cascade08ÚÛ *cascade08ÛÜ*cascade08Üà *cascade08àâ*cascade08âö *cascade08öù*cascade08ùú *cascade08úû *cascade08ûü *cascade08ü…*cascade08…ˆ *cascade08ˆ¢*cascade08¢¤ *cascade08¤§*cascade08§½ *cascade08½À*cascade08ÀÁ *cascade08ÁÍ*cascade08Íİ *cascade08İß *cascade08ßç*cascade08çè*cascade08èê *cascade08êñ *cascade08ñö *cascade08öş *cascade08şÖ*cascade08Öè *cascade08èé *cascade08éê *cascade08êí*cascade08íî *cascade08î… *cascade08…ˆ*cascade08ˆ² *cascade08²³*cascade08³Ê *cascade08ÊÖ *cascade08ÖÚ*cascade08Úİ *cascade08İã*cascade08ãå *cascade08åæ*cascade08æç *cascade08çè*cascade08èí *cascade08íğ*cascade08ğû *cascade08û‘‘— *cascade08—¸*cascade08¸ã *cascade08ãä*cascade08äæ *cascade08æç*cascade08çè*cascade08è¡ *cascade08¡¢*cascade08¢• *cascade08•¤*cascade08¤Á *cascade08ÁÄ*cascade08ÄÅ *cascade08ÅÉ*cascade08ÉË *cascade08ËÕ*cascade08Õï *cascade08ï÷*cascade08÷• *cascade08•—*cascade08—˜ *cascade08˜œ*cascade08œ *cascade08´´µ *cascade08µ¹*cascade08¹º *cascade08º» *cascade08»¾*cascade08¾Ş *cascade08Şß*cascade08ßà *cascade08àå*cascade08åæ*cascade08æç*cascade08çê *cascade08êö*cascade08ö÷ *cascade08÷ù*cascade08ùú *cascade08ú„ *cascade08„…*cascade08…† *cascade08†¢ *cascade08¢¦*cascade08¦ª *cascade08ª« *cascade08«º *cascade08º½*cascade08½Ê *cascade08ÊË *cascade08ËÌ *cascade08ÌÍ *cascade08Í×*cascade08×Ø *cascade08ØŞ*cascade08Şß *cascade08ßâ*cascade08â€ *cascade08€*cascade08‚ *cascade08‚‡*cascade08‡ˆ *cascade08ˆ‹ *cascade08‹’*cascade08’“ *cascade08“”*cascade08”® *cascade08®² *cascade08²¸*cascade08¸¹*cascade08¹Ë*cascade08Ëå *cascade08åğ*cascade08ğñ *cascade08ñö*cascade08ö÷ *cascade08÷ÿ*cascade08ÿ€ *cascade08€ˆ*cascade08ˆ£ *cascade08£¥*cascade08¥¦ *cascade08¦«*cascade08«¬ *cascade08¬®*cascade08®¯ *cascade08¯²*cascade08²³ *cascade08³´ *cascade08´· *cascade08·¸*cascade08¸½ *cascade08½× *cascade08×Û*cascade08Ûß*cascade08ßà *cascade08àâ*cascade08âä *cascade08äå *cascade08åé*cascade08éê *cascade08êë *cascade08ëï*cascade08ïğ *cascade08ğ‰ *cascade08‰*cascade08 *cascade08*cascade08 *cascade08‘*cascade08‘’ *cascade08’“*cascade08“– *cascade08–˜*cascade08˜š *cascade08š› *cascade08›œ *cascade08œ *cascade08¢*cascade08¢£ *cascade08£¼ *cascade08¼½*cascade08½¾ *cascade08¾¿*cascade08¿Ã *cascade08ÃÄ *cascade08ÄÅ*cascade08ÅÈ *cascade08Èå *cascade08å’*cascade08’¥*cascade08¥¦ *cascade08¦± *cascade08±Û *cascade08Û„ *cascade08„¢ *cascade08¢ª *cascade08ªÀÀÅ *cascade08ÅÆ*cascade08ÆË *cascade08Ëè *cascade08èı *cascade08ıµ *cascade08µ¹*cascade08¹â *cascade08âè*cascade08èê *cascade08êò*cascade08òó *cascade08óô*cascade08ô’ *cascade08’•*cascade08•– *cascade08–—*cascade08—™ *cascade08™›*cascade08›œ *cascade08œŸ *cascade08Ÿ£*cascade08£¤ *cascade08¤¾ *cascade08¾À*cascade08ÀÃ *cascade08ÃÇ*cascade08Çã *cascade08ãä*cascade08äæ*cascade08æè *cascade08èé*cascade08éë *cascade08ë‡  *cascade08‡ ‰ *cascade08‰ ¥  *cascade08¥ ¦ *cascade08¦ °  *cascade08° ± *cascade08± ´  *cascade08´ ¶ *cascade08¶ ½  *cascade08½ À *cascade08À Ã  *cascade08Ã È *cascade08È Ë  *cascade08Ë Ï *cascade08Ï Ò  *cascade08Ò Ó *cascade08Ó Ô  *cascade08Ô Õ *cascade08Õ Ö  *cascade08Ö Ø *cascade08Ø Ù  *cascade08Ù Ü *cascade08Ü å  *cascade08å ç *cascade08ç è  *cascade08è é *cascade08é ê  *cascade08ê ë *cascade08ë ì  *cascade08ì ï *cascade08ï ó  *cascade08ó ô *cascade08ô õ  *cascade08õ ø *cascade08ø ù  *cascade08ù û *cascade08û ş  *cascade08ş ÿ *cascade08ÿ ! *cascade08!‚!*cascade08‚!†! *cascade08†!–!*cascade08–!—! *cascade08—!˜!*cascade08˜!†" *cascade082Gfile:///c:/Users/kouki/.gemini/hifuu-kou-club/components/NewsSection.js