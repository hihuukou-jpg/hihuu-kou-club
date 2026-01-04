›"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function NewsSection() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch('/api/news')
            .then((res) => res.json())
            .then((data) => setNews(data));
    }, []);

    return (
        <section id="news" style={{ minHeight: '100vh', padding: '8rem 2rem', background: '#F9F8F6', color: 'var(--text-main)' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: '5rem' }}
            >
                <h2 style={{
                    fontSize: '2.5rem',
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--text-main)',
                    display: 'inline-block',
                    borderBottom: '2px solid var(--hakurei-red)',
                    paddingBottom: '1rem'
                }}>
                    ãŠçŸ¥ã‚‰ã›
                </h2>
            </motion.div>

            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {news.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                        style={{
                            background: '#fff',
                            padding: '2rem 3rem',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                            position: 'relative',
                            borderLeft: '4px solid var(--hakurei-red)',
                            borderRadius: '2px'
                        }}
                    >
                        <div style={{
                            fontSize: '0.9rem',
                            color: '#999',
                            fontFamily: 'var(--font-serif)',
                            marginBottom: '0.5rem'
                        }}>
                            {item.date}
                        </div>

                        <h3 style={{
                            fontSize: '1.4rem',
                            marginBottom: '1rem',
                            fontFamily: 'var(--font-serif)',
                            color: 'var(--text-main)',
                            fontWeight: '500'
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
è *cascade08èê*cascade08êÀ *cascade08ÀÇ*cascade08ÇØ *cascade08ØÜ*cascade08Üİ *cascade08İŞ*cascade08Şß *cascade08ßá*cascade08áı *cascade08ı€*cascade08€© *cascade08©ª*cascade08ªŞ *cascade08Şß*cascade08ßª *cascade08ª×*cascade08×ã *cascade08ãè*cascade08èó *cascade08ó€*cascade08€ *cascade08„*cascade08„š *cascade08šœ*cascade08œ *cascade08¢*cascade08¢¥ *cascade08¥¨*cascade08¨Û *cascade08ÛÜ *cascade08Üà*cascade08àù *cascade08ùü*cascade08üı *cascade08ış*cascade08ş *cascade08ˆ*cascade08ˆ‰ *cascade08‰*cascade08 *cascade08‘*cascade08‘© *cascade08©­*cascade08­® *cascade08®°*cascade08°³ *cascade08³µ *cascade08µ¿*cascade08¿× *cascade08×Ú*cascade08ÚÛ *cascade08Ûİ *cascade08İß*cascade08ßà *cascade08àã*cascade08ãæ *cascade08æç*cascade08çò *cascade08òó *cascade08óö *cascade08ö÷*cascade08÷ø *cascade08øú*cascade08úû *cascade08ûü*cascade08üş *cascade08şÿ*cascade08ÿ€ *cascade08€*cascade08‚ *cascade08‚› *cascade08›*cascade08Ÿ *cascade08Ÿ¡ *cascade08¡£*cascade08£¤ *cascade08¤§*cascade08§ª *cascade08ª«*cascade08«­ *cascade08­®*cascade08®¿ *cascade08¿Ã *cascade08ÃÄ*cascade08ÄÆ *cascade08ÆÍ *cascade08ÍÒ *cascade08ÒÚ *cascade08Úæ*cascade08æø *cascade08øù *cascade08ùú *cascade08úü*cascade08üı *cascade08ı”	 *cascade08”	—	*cascade08—	Á	 *cascade08Á	Â	*cascade08Â	Ù	 *cascade08Ù	å	 *cascade08å	é	*cascade08é	ì	 *cascade08ì	ò	*cascade08ò	ô	 *cascade08ô	õ	*cascade08õ	ö	 *cascade08ö	÷	*cascade08÷	ü	 *cascade08ü	ÿ	*cascade08ÿ	
 *cascade08
» *cascade08»¼*cascade08¼¾ *cascade08¾¿*cascade08¿ø *cascade08øù*cascade08ùì *cascade08ìû*cascade08ûË *cascade08ËÌ *cascade08ÌÏ*cascade08Ïï *cascade08ïñ*cascade08ñò *cascade08òö*cascade08öù *cascade08ùı*cascade08ış *cascade08şÿ *cascade08ÿ‚*cascade08‚¢ *cascade08¢£*cascade08£¤ *cascade08¤©*cascade08©ª*cascade08ª«*cascade08«® *cascade08®º*cascade08º» *cascade08»½*cascade08½¾ *cascade08¾Ê*cascade08Êê *cascade08êë*cascade08ëì *cascade08ìğ*cascade08ğñ *cascade08ñò*cascade08òõ *cascade08õú*cascade08úû *cascade08ûü*cascade08ü *cascade08 *cascade08 ¡ *cascade08¡§*cascade08§ª *cascade08ª°*cascade08°± *cascade08±¿*cascade08¿À *cascade08ÀÆ*cascade08Ææ *cascade08æè*cascade08èé *cascade08éê*cascade08êë *cascade08ëï*cascade08ïğ *cascade08ğò*cascade08òõ *cascade08õø*cascade08ø“ *cascade08“—*cascade08—› *cascade08›œ*cascade08œ *cascade08¬*cascade08¬Æ *cascade08ÆÓ *cascade08Óî *cascade08îğ*cascade08ğñ *cascade08ñò*cascade08òó *cascade08óô *cascade08ôö*cascade08ö÷ *cascade08÷ù*cascade08ùú *cascade08úû *cascade08ûş *cascade08şÿ*cascade08ÿ„ *cascade08„ *cascade08¢*cascade08¢£ *cascade08£¥*cascade08¥§ *cascade08§© *cascade08©ª *cascade08ª« *cascade08«®*cascade08®¯ *cascade08¯° *cascade08°´*cascade08´µ *cascade08µÕ*cascade08ÕÖ *cascade08ÖØ*cascade08ØÛ *cascade08Ûæ *cascade08æç*cascade08çè *cascade08èë*cascade08ëì *cascade08ìî *cascade08îò*cascade08òó *cascade08óŒ *cascade08Œ“*cascade08“” *cascade08”•*cascade08•– *cascade08–˜*cascade08˜œ *cascade08œ *cascade08*cascade08¡ *cascade08¡¾ *cascade08¾Ñ*cascade08ÑÒ *cascade08Òİ *cascade08İ‡ *cascade08‡° *cascade08°Î *cascade08ÎÛ *cascade08ÛÜ*cascade08Üá *cascade08áş *cascade08ş“ *cascade08“Ë *cascade08ËÏ*cascade08Ïø *cascade08øş*cascade08ş€ *cascade08€ˆ*cascade08ˆ‰ *cascade08‰Š*cascade08Š¨ *cascade08¨«*cascade08«¬ *cascade08¬­*cascade08­¯ *cascade08¯±*cascade08±² *cascade08²¹*cascade08¹Ó *cascade08ÓÕ*cascade08ÕØ *cascade08ØÜ*cascade08Üø *cascade08øù*cascade08ùû*cascade08ûı *cascade08ış*cascade08ş€ *cascade08€œ *cascade08œ*cascade08º *cascade08º»*cascade08»Å *cascade08ÅÆ*cascade08ÆÉ *cascade08ÉË*cascade08ËÒ *cascade08ÒÕ*cascade08ÕØ *cascade08Øİ*cascade08İà *cascade08àä*cascade08äç *cascade08çè*cascade08èé *cascade08éê*cascade08êë *cascade08ëí*cascade08íî *cascade08îñ*cascade08ñú *cascade08úü*cascade08üı *cascade08ış*cascade08şÿ *cascade08ÿ€*cascade08€ *cascade08„*cascade08„ˆ *cascade08ˆ‰*cascade08‰Š *cascade08Š*cascade08 *cascade08*cascade08“ *cascade08“”*cascade08”– *cascade08–—*cascade08—› *cascade08›«*cascade08«¬ *cascade08¬­*cascade08­› *cascade082Gfile:///c:/Users/kouki/.gemini/hifuu-kou-club/components/NewsSection.js