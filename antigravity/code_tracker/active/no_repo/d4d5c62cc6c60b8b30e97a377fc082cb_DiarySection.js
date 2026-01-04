·'"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function DiarySection() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        fetch('/api/diary')
            .then((res) => res.json())
            .then((data) => setEntries(data));
    }, []);

    return (
        <section id="diary" style={{ minHeight: '100vh', padding: '8rem 2rem', background: '#F9F8F6', color: 'var(--text-main)' }}>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
                <h2 style={{
                    fontSize: '2.5rem',
                    fontFamily: 'var(--font-serif)',
                    display: 'inline-block',
                    padding: '0 2rem',
                    borderLeft: '1px solid var(--hakurei-red)',
                    borderRight: '1px solid var(--hakurei-red)'
                }}>
                    Ê¥ªÂãïÊó•Ë™å
                </h2>
            </motion.div>

            <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', paddingLeft: '2rem' }}>
                {/* Timeline Line: Solid Red */}
                <div style={{
                    position: 'absolute',
                    left: '0',
                    top: 0,
                    bottom: 0,
                    width: '1px',
                    background: '#ddd',
                }} />

                {entries.map((entry, index) => (
                    <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, duration: 1 }}
                        style={{
                            marginBottom: '4rem',
                            position: 'relative',
                            paddingLeft: '2rem'
                        }}
                    >
                        {/* Dot on timeline: Circle */}
                        <div style={{
                            position: 'absolute',
                            left: '-5px',
                            top: '8px',
                            width: '11px',
                            height: '11px',
                            background: '#fff',
                            border: '3px solid var(--hakurei-red)',
                            borderRadius: '50%',
                            zIndex: 1
                        }} />

                        <div style={{
                            fontSize: '0.9rem',
                            color: 'var(--hakurei-red)',
                            fontFamily: 'var(--font-serif)',
                            marginBottom: '0.2rem'
                        }}>
                            {entry.date}
                        </div>

                        <h3 style={{
                            fontSize: '1.3rem',
                            marginBottom: '1rem',
                            fontFamily: 'var(--font-serif)',
                            fontWeight: '500'
                        }}>
                            {entry.title}
                        </h3>

                        <p style={{ lineHeight: '1.8', fontSize: '1rem', color: '#666', fontFamily: 'var(--font-serif)' }}>
                            {entry.content}
                        </p>

                        {/* Progress Bar: Elegant Gold Line */}
                        {entry.progress !== undefined && (
                            <div style={{ marginTop: '1.5rem', maxWidth: '300px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.3rem', fontFamily: 'var(--font-serif)', color: '#999' }}>
                                    <span>ÈÄ≤Êçó</span>
                                    <span>{entry.progress}%</span>
                                </div>
                                <div style={{ width: '100%', height: '2px', background: '#eee' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${entry.progress}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                                        style={{ height: '100%', background: 'var(--spirit-gold)' }}
                                    />
                                </div>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
Ô *cascade08ÔÒ*cascade08ÒÕ *cascade08Õ”*cascade08”ﬁ *cascade08ﬁ‡*cascade08‡· *cascade08·Â*cascade08ÂÁ *cascade08ÁÎ*cascade08ÎÏ *cascade08ÏÓ*cascade08Óâ *cascade08âå*cascade08å™ *cascade08™¥*cascade08¥µ *cascade08µæ*cascade08æø *cascade08øÃ*cascade08ÃÕ *cascade08Õ”*cascade08”‘ *cascade08‘ÿ*cascade08ÿ‰ *cascade08‰Â*cascade08Â˜ *cascade08˜˙*cascade08˙˚ *cascade08˚¸*cascade08¸˝ *cascade08˝˛*cascade08˛Ä *cascade08ÄÉ*cascade08Éô *cascade08ôõ*cascade08õù *cascade08ù°*cascade08°§ *cascade08§ß*cascade08ß⁄ *cascade08⁄€ *cascade08€ﬂ*cascade08ﬂ¯ *cascade08¯˝*cascade08˝˛ *cascade08˛ˇ*cascade08ˇÇ *cascade08Çá*cascade08áà *cascade08àå*cascade08åç *cascade08çé*cascade08é¶ *cascade08¶® *cascade08®™*cascade08™´ *cascade08´± *cascade08±¥*cascade08¥µ *cascade08µ∂*cascade08∂∑ *cascade08∑∏*cascade08∏Œ *cascade08ŒŸ*cascade08Ÿ⁄ *cascade08⁄ﬁ*cascade08ﬁﬂ *cascade08ﬂ‰*cascade08‰Â *cascade08Â˚*cascade08˚è *cascade08èõ*cascade08õú *cascade08úû*cascade08ûü *cascade08ü†*cascade08†§ *cascade08§¶*cascade08¶≠ *cascade08≠Æ*cascade08ÆØ *cascade08Ø±*cascade08±≤ *cascade08≤≥*cascade08≥µ *cascade08µ∂*cascade08∂∑ *cascade08∑∏*cascade08∏∫ *cascade08∫À*cascade08Àœ *cascade08œÉ	*cascade08É	Ö	 *cascade08Ö	á	*cascade08á	à	 *cascade08à	ü	 *cascade08ü	¢	*cascade08¢	Ã	 *cascade08Ã	Õ	*cascade08Õ	˙	 *cascade08˙	è
*cascade08è
∂
 *cascade08∂
∏
 *cascade08∏
º
*cascade08º
æ
 *cascade08æ
¿
*cascade08¿
¡
 *cascade08¡
ä *cascade08äã*cascade08ã¶ *cascade08¶™*cascade08™´*cascade08´Æ*cascade08Æ≤ *cascade08≤≥*cascade08≥µ *cascade08µ∂*cascade08∂˝ *cascade08˝˛*cascade08˛Ä *cascade08ÄÇ*cascade08Çª *cascade08ªº*cascade08ºØ *cascade08Øº*cascade08ºˇ *cascade08ˇÉ*cascade08ÉÑ *cascade08Ñã*cascade08ãé *cascade08éê*cascade08êë *cascade08ëí*cascade08í≤ *cascade08≤¥*cascade08¥µ *cascade08µ∂*cascade08∂Ω *cascade08Ωæ*cascade08æ¬ *cascade08¬≈*cascade08≈Â *cascade08ÂÊ*cascade08ÊÁ *cascade08ÁÈ*cascade08ÈÎ *cascade08ÎÔ*cascade08ÔÛ *cascade08ÛÙ*cascade08Ùÿ *cascade08ÿ⁄ *cascade08⁄‹*cascade08‹› *cascade08›ﬂ*cascade08ﬂ‡ *cascade08‡„ *cascade08„‰*cascade08‰Â *cascade08ÂÁ*cascade08Áç *cascade08çé*cascade08éπ *cascade08π∫*cascade08∫Ê *cascade08ÊÁ*cascade08Áñ *cascade08ñó *cascade08óö*cascade08ö√ *cascade08√ƒ*cascade08ƒ” *cascade08”‘*cascade08‘’ *cascade08’◊*cascade08◊ÿ *cascade08ÿŸ*cascade08Ÿ€ *cascade08€‹*cascade08‹› *cascade08›ﬁ*cascade08ﬁﬂ *cascade08ﬂˇ *cascade08ˇÅ*cascade08ÅÇ *cascade08ÇÜ*cascade08Üá *cascade08áä*cascade08ä† *cascade08†£*cascade08£§ *cascade08§®*cascade08®´ *cascade08´±*cascade08±“ *cascade08“’*cascade08’Ÿ *cascade08ŸÎ*cascade08Îã *cascade08ãê*cascade08êë *cascade08ëí*cascade08íì *cascade08ìï*cascade08ïò *cascade08òö*cascade08öõ *cascade08õ§*cascade08§• *cascade08•©*cascade08©… *cascade08…À*cascade08ÀÃ *cascade08Ã“*cascade08“” *cascade08”’*cascade08’◊ *cascade08◊‹*cascade08‹› *cascade08›·*cascade08·˘ *cascade08˘˛*cascade08˛é *cascade08éó *cascade08óö *cascade08ö°*cascade08°¢ *cascade08¢¶*cascade08¶¿ *cascade08¿¬*cascade08¬√ *cascade08√ƒ *cascade08ƒ»*cascade08»‚ *cascade08‚Â*cascade08ÂÁ *cascade08ÁÈ*cascade08ÈÍ *cascade08ÍÓ*cascade08Óå *cascade08åï*cascade08ïñ *cascade08ñ°*cascade08°— *cascade08—“*cascade08“à *cascade08àâ*cascade08âä *cascade08äç*cascade08çè *cascade08èê*cascade08ê≤ *cascade08≤≥*cascade08≥¥ *cascade08¥∏*cascade08∏ª *cascade08ªº*cascade08ºΩ *cascade08Ωæ*cascade08æø *cascade08ø¡*cascade08¡¬ *cascade08¬‘*cascade08‘’ *cascade08’ÿ *cascade08ÿ‹ *cascade08‹˙*cascade08˙Ç *cascade08ÇÜ*cascade08Ü£ *cascade08£•*cascade08•® *cascade08®™*cascade08™√ *cascade08√ƒ*cascade08ƒŒ *cascade08Œ·*cascade08·Û *cascade08ÛÙ*cascade08Ùı *cascade08ıˆ*cascade08ˆ˜ *cascade08˜¯*cascade08¯˚ *cascade08˚ˇ*cascade08ˇÄ *cascade08Äû *cascade08û†*cascade08†° *cascade08°“ *cascade08“Ï*cascade08Ïú *cascade08úù*cascade08ùû *cascade08ûü*cascade08ü† *cascade08†¢ *cascade08¢£*cascade08£§ *cascade08§• *cascade08•Æ*cascade08ÆØ *cascade08ØÆ *cascade08Æ¡*cascade08¡— *cascade08—Î *cascade08ÎÏ*cascade08ÏÌ *cascade08ÌÙ*cascade08Ùı *cascade08ıÄ *cascade08Ä Å  *cascade08Å ±  *cascade08± ∑ *cascade08∑ Ú! *cascade08Ú!Û!*cascade08Û!á" *cascade08á"â"*cascade08â"¥" *cascade08¥"ª"*cascade08ª"º" *cascade08º"Ω"*cascade08Ω"æ" *cascade08æ"ø"*cascade08ø"Í" *cascade08Í"Î"*cascade08Î"Ì" *cascade08Ì"Ô"*cascade08Ô"Û" *cascade08Û"ˇ"*cascade08ˇ"©# *cascade08©#∑#*cascade08∑#∏# *cascade08∏#æ#*cascade08æ#ø# *cascade08ø#¬#*cascade08¬#√# *cascade08√#”#*cascade08”#‘# *cascade08‘#÷#*cascade08÷#Ä$ *cascade08Ä$Ü$*cascade08Ü$á$ *cascade08á$å$*cascade08å$é$ *cascade08é$ê$*cascade08ê$í$ *cascade08í$î$ *cascade08î$ï$*cascade08ï$ó$ *cascade08ó$ô$*cascade08ô$√$ *cascade08√$≈$*cascade08≈$∆$ *cascade08∆$»$*cascade08»$À$ *cascade08À$Ã$*cascade08Ã$Õ$ *cascade08Õ$”$*cascade08”$‘$ *cascade08‘$◊$*cascade08◊$ÿ$ *cascade08ÿ$⁄$*cascade08⁄$‹$ *cascade08‹$ﬂ$*cascade08ﬂ$‡$ *cascade08‡$Â$*cascade08Â$È$ *cascade08È$˛$*cascade08˛$®% *cascade08®%∞%*cascade08∞%±% *cascade08±%∏%*cascade08∏%π% *cascade08π%¿%*cascade08¿%¡% *cascade08¡%·%*cascade08·%“& *cascade08“&ÿ&*cascade08ÿ&Ú& *cascade08Ú&Ù&*cascade08Ù&·' *cascade082Hfile:///c:/Users/kouki/.gemini/hifuu-kou-club/components/DiarySection.js