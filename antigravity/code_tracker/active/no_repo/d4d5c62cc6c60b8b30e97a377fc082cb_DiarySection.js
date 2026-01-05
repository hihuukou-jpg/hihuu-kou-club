Á2"use client";

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
        <section id="diary" style={{ minHeight: '100vh', padding: '8rem 2rem', background: 'linear-gradient(to bottom, #E0F2FE 0%, #F8FAFC 100%)', color: 'var(--text-main)', position: 'relative' }}>
            {/* Tech Background Grid (Inverted opacity) */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.15, pointerEvents: 'none' }}></div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative', zIndex: 1 }}
            >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ width: '40px', height: '1px', background: 'var(--hakurei-red)' }}></span>
                    <h2 className="hsr-title-decor" style={{
                        fontSize: '2.5rem',
                        fontFamily: 'var(--font-serif)',
                        fontWeight: 'bold',
                        letterSpacing: '0.1em'
                    }}>
                        Ê¥ªÂãïÊó•Ë™å
                    </h2>
                    <span style={{ width: '40px', height: '1px', background: 'var(--hakurei-red)' }}></span>
                </div>
            </motion.div>

            <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', paddingLeft: '2rem', zIndex: 1 }}>
                {/* Timeline Line: HSR Cyan/Gold Gradient */}
                <div style={{
                    position: 'absolute',
                    left: '0',
                    top: 0,
                    bottom: 0,
                    width: '2px',
                    background: 'linear-gradient(to bottom, var(--hsr-cyan), var(--hsr-gold))',
                    opacity: 0.5
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
                        {/* Dot on timeline: Diamond */}
                        <div style={{
                            position: 'absolute',
                            left: '-6px',
                            top: '8px',
                            width: '14px',
                            height: '14px',
                            background: '#fff',
                            border: '2px solid var(--hsr-cyan)',
                            transform: 'rotate(45deg)', // Diamond
                            boxShadow: '0 0 8px var(--hsr-cyan)',
                            zIndex: 1
                        }} />

                        <div style={{
                            fontSize: '0.9rem',
                            color: 'var(--text-dim)',
                            fontFamily: 'var(--font-mono)',
                            marginBottom: '0.2rem',
                            display: 'flex', alignItems: 'center', gap: '0.5rem'
                        }}>
                            <span style={{ color: 'var(--hsr-gold)' }}>‚óÜ</span>
                            {entry.date}
                        </div>

                        <h3 style={{
                            fontSize: '1.3rem',
                            marginBottom: '1rem',
                            fontFamily: 'var(--font-serif)',
                            fontWeight: 'bold'
                        }}>
                            {entry.title}
                        </h3>

                        <div className="hsr-card" style={{ padding: '1.5rem 2rem', borderLeft: 'none', borderTop: '2px solid var(--hakurei-red)' }}>
                            <p style={{ lineHeight: '1.8', fontSize: '1rem', color: '#475569', fontFamily: 'var(--font-serif)' }}>
                                {entry.content}
                            </p>

                            {/* Progress Bar: HSR Style */}
                            {entry.progress !== undefined && (
                                <div style={{ marginTop: '1.5rem', maxWidth: '300px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.3rem', fontFamily: 'var(--font-mono)', color: '#64748B' }}>
                                        <span>PROGRESS</span>
                                        <span>{entry.progress}%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${entry.progress}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                                            style={{ height: '100%', background: 'linear-gradient(90deg, var(--hsr-cyan), var(--hsr-gold))', boxShadow: '0 0 10px var(--hsr-cyan)' }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
Ô *cascade08ÔÒ*cascade08ÒÃ *cascade08ÃÁ*cascade08ÁË *cascade08ËÍ*cascade08ÍÎ *cascade08ÎÙ*cascade08Ù˜ *cascade08˜Ä*cascade08Äã *cascade08ãç*cascade08çé *cascade08éí*cascade08íî *cascade08îò*cascade08òô *cascade08ôõ*cascade08õú *cascade08ú≤*cascade08≤ƒ *cascade08ƒÚ*cascade08Ú˙ *cascade08˙˝*cascade08˝õ *cascade08õ•*cascade08•¶ *cascade08¶Ø*cascade08Ø∞ *cascade08∞Ω*cascade08Ωæ *cascade08æƒ*cascade08ƒÂ*cascade08ÂÊ *cascade08ÊÍ*cascade08Íˆ *cascade08ˆ˜*cascade08˜â	 *cascade08â	ä	 *cascade08ä	Ÿ
*cascade08Ÿ
€
 *cascade08€
‹
 *cascade08‹
¯
*cascade08¯
˘
*cascade08˘
˙
 *cascade08˙
˚
*cascade08˚
˝
 *cascade08˝
Ä*cascade08Äñ *cascade08ñö*cascade08öú*cascade08úû *cascade08û¢*cascade08¢• *cascade08•®*cascade08®Ø *cascade08Ø≥*cascade08≥ﬂ *cascade08ﬂ‡ *cascade08‡‰*cascade08‰˝ *cascade08˝á*cascade08áà *cascade08àã*cascade08ãé *cascade08éê *cascade08êí*cascade08íñ *cascade08ñò*cascade08ò¨ *cascade08¨µ*cascade08µ∑ *cascade08∑∏*cascade08∏π *cascade08πø *cascade08ø¡*cascade08¡¬ *cascade08¬√*cascade08√ƒ *cascade08ƒ⁄ *cascade08⁄›*cascade08›ﬂ *cascade08ﬂÛ *cascade08ÛÙ *cascade08Ùı *cascade08ıˆ *cascade08ˆÉ*cascade08ÉÖ *cascade08ÖÜ*cascade08Üï *cascade08ïñ *cascade08ñù*cascade08ùû *cascade08û¥ *cascade08¥å*cascade08åû *cascade08û† *cascade08†£*cascade08£§ *cascade08§ª *cascade08ªæ*cascade08æË *cascade08ËÈ*cascade08Èñ *cascade08ñ´*cascade08´∂*cascade08∂› *cascade08›ﬂ *cascade08ﬂ‡*cascade08‡· *cascade08·È*cascade08ÈÎ *cascade08ÎÌ *cascade08ÌÚ*cascade08ÚÛ *cascade08Ûı*cascade08ıæ *cascade08æø*cascade08ø⁄ *cascade08⁄ﬁ*cascade08ﬁﬂ*cascade08ﬂ‚*cascade08‚Ê *cascade08Ê*cascade08Ò *cascade08Òü*cascade08ü†*cascade08†¢*cascade08¢§ *cascade08§∆*cascade08∆ã *cascade08ãå*cascade08åé *cascade08éê*cascade08ê… *cascade08… *cascade08 Ω *cascade08Ω *cascade08 ç *cascade08çë*cascade08ëí *cascade08íô*cascade08ôú *cascade08úû*cascade08ûü *cascade08ü†*cascade08†¿ *cascade08¿¬*cascade08¬√ *cascade08√ƒ*cascade08ƒÀ *cascade08ÀÃ*cascade08Ã– *cascade08–”*cascade08”Û *cascade08ÛÙ*cascade08Ùı *cascade08ı˜*cascade08˜˘ *cascade08˘˝*cascade08˝Å *cascade08ÅÇ*cascade08ÇÊ *cascade08ÊË *cascade08ËÈ*cascade08ÈÍ *cascade08ÍÔ*cascade08ÔÚ *cascade08ÚÛ*cascade08ÛÙ*cascade08Ùˆ*cascade08ˆú *cascade08úù*cascade08ù» *cascade08»…*cascade08…ı *cascade08ıˆ*cascade08ˆ• *cascade08•¶ *cascade08¶©*cascade08©“ *cascade08“”*cascade08”‚ *cascade08‚„*cascade08„Ë*cascade08ËÈ *cascade08Èå*cascade08åç *cascade08çí*cascade08íì*cascade08ìú*cascade08úù *cascade08ù†*cascade08†°*cascade08°£*cascade08£§ *cascade08§¶ *cascade08¶±*cascade08±œ *cascade08œ—*cascade08—‘*cascade08‘’ *cascade08’÷ *cascade08÷ÿ*cascade08ÿ€ *cascade08€›*cascade08›ﬁ *cascade08ﬁÚ*cascade08ÚÅ *cascade08ÅÑ*cascade08ÑÖ *cascade08Öâ*cascade08âå *cascade08åí*cascade08í≥ *cascade08≥∂*cascade08∂∫ *cascade08∫¿ *cascade08¿¡*cascade08¡¬ *cascade08¬ƒ*cascade08ƒ∆ *cascade08∆»*cascade08»… *cascade08…È *cascade08ÈÓ*cascade08ÓÔ *cascade08Ô*cascade08Ò *cascade08ÒÛ*cascade08Ûˆ *cascade08ˆ¯*cascade08¯˘ *cascade08˘Å *cascade08ÅÖ*cascade08ÖÜ *cascade08Ü¶ *cascade08¶®*cascade08®© *cascade08©Ø*cascade08Ø∞ *cascade08∞≤*cascade08≤¥ *cascade08¥π*cascade08π∫ *cascade08∫º *cascade08ºè*cascade08èë *cascade08ë© *cascade08©´ *cascade08´˛*cascade08˛Å  *cascade08Å ë  *cascade08ë ö  *cascade08ö ù  *cascade08ù § *cascade08§ •  *cascade08• © *cascade08© √  *cascade08√ ≈ *cascade08≈ ∆  *cascade08∆ «  *cascade08« À *cascade08À Â  *cascade08Â Ë *cascade08Ë Í  *cascade08Í Ï *cascade08Ï Ì  *cascade08Ì Ò *cascade08Ò è! *cascade08è!ò!*cascade08ò!ô! *cascade08ô!§!*cascade08§!‘! *cascade08‘!’!*cascade08’!ã" *cascade08ã"å"*cascade08å"ç" *cascade08ç"ê"*cascade08ê"í" *cascade08í"ì"*cascade08ì"µ" *cascade08µ"∂"*cascade08∂"∑" *cascade08∑"ª"*cascade08ª"æ" *cascade08æ"¬"*cascade08¬"√" *cascade08√"≈"*cascade08≈"∆" *cascade08∆"ÿ"*cascade08ÿ"Ÿ" *cascade08Ÿ"‹" *cascade08‹"‡" *cascade08‡"˛"*cascade08˛"Ü# *cascade08Ü#ä#*cascade08ä#ß# *cascade08ß#©#*cascade08©#¨# *cascade08¨#Æ#*cascade08Æ#«# *cascade08«#·$*cascade08·$‚$*cascade08‚$Ï$ *cascade08Ï$ˇ$*cascade08ˇ$ë% *cascade08ë%í%*cascade08í%ì% *cascade08ì%î%*cascade08î%ï% *cascade08ï%ñ%*cascade08ñ%ô% *cascade08ô%ö% *cascade08ö%û%*cascade08û%ü% *cascade08ü%†%*cascade08†%°% *cascade08°%ø% *cascade08ø%¡%*cascade08¡%¬% *cascade08¬%»% *cascade08»%Ã%*cascade08Ã%˜% *cascade08˜%ë&*cascade08ë&ï&*cascade08ï&ù& *cascade08ù&û&*cascade08û&∂& *cascade08∂&π&*cascade08π&…& *cascade08…& &*cascade08 &À& *cascade08À&–&*cascade08–&—& *cascade08—&“&*cascade08“&”& *cascade08”&‘& *cascade08‘&⁄& *cascade08⁄&ﬁ&*cascade08ﬁ&ö' *cascade08ö'õ'*cascade08õ'∑' *cascade08∑'∫'*cascade08∫'€' *cascade08€'Ó'*cascade08Ó'Ù' *cascade08Ù'¯'*cascade08¯'Ç) *cascade08Ç)ú) *cascade08ú)†)*cascade08†)§) *cascade08§)•) *cascade08•)≠) *cascade08≠)≥)*cascade08≥)¥) *cascade08¥)∫) *cascade08∫)Ω)*cascade08Ω)·) *cascade08·)‚)*cascade08‚)Ë) *cascade08Ë))*cascade08)˘) *cascade08˘)˝)*cascade08˝)·* *cascade08·*Â**cascade08Â*Ì* *cascade08Ì*Ò**cascade08Ò*∑+ *cascade08∑+∏+*cascade08∏+Ã+ *cascade08Ã+Õ+*cascade08Õ+Œ+ *cascade08Œ+ÿ+*cascade08ÿ+Ÿ+ *cascade08Ÿ+˙+*cascade08˙+Å, *cascade08Å,É,*cascade08É,ß, *cascade08ß,©,*cascade08©,∞,*cascade08∞,±, *cascade08±,≤,*cascade08≤,≥, *cascade08≥,¥,*cascade08¥,∂, *cascade08∂,∫,*cascade08∫,„, *cascade08„,‰,*cascade08‰,Ê, *cascade08Ê,Ë,*cascade08Ë,Ï, *cascade08Ï,¯,*cascade08¯,¢- *cascade08¢-¶-*cascade08¶-¥-*cascade08¥-µ- *cascade08µ-ª-*cascade08ª-º- *cascade08º-ø-*cascade08ø-¿- *cascade08¿-–-*cascade08–-—- *cascade08—-”-*cascade08”-’- *cascade08’-Ÿ-*cascade08Ÿ-Å. *cascade08Å.á.*cascade08á.à. *cascade08à.ç.*cascade08ç.è. *cascade08è.ë.*cascade08ë.ì. *cascade08ì.ï. *cascade08ï.ñ.*cascade08ñ.ò. *cascade08ò.ö.*cascade08ö.ƒ. *cascade08ƒ.».*cascade08». .*cascade08 .À. *cascade08À.Õ.*cascade08Õ.–. *cascade08–.—.*cascade08—.“. *cascade08“.ÿ.*cascade08ÿ.Ÿ. *cascade08Ÿ.‹.*cascade08‹.›. *cascade08›.ﬂ.*cascade08ﬂ.·. *cascade08·.‰.*cascade08‰.Â. *cascade08Â.Í.*cascade08Í.Ó. *cascade08Ó.É/*cascade08É/≠/ *cascade08≠/±/*cascade08±/π/*cascade08π/∫/ *cascade08∫/¡/*cascade08¡/¬/ *cascade08¬/…/*cascade08…/ / *cascade08 /◊/ *cascade08◊/Ó/*cascade08Ó/Ù/ *cascade08Ù/ı/*cascade08ı/ˆ/ *cascade08ˆ/Å0*cascade08Å0Ç0 *cascade08Ç0à0*cascade08à0ç0 *cascade08ç0µ0*cascade08µ0∑0 *cascade08∑0º0 *cascade08º0¿0*cascade08¿0Ë0 *cascade08Ë0Í0*cascade08Í0ä1 *cascade08ä1å1*cascade08å1î1 *cascade08î1ò1*cascade08ò1¥1 *cascade08¥1∫1*cascade08∫1‘1 *cascade08‘1ÿ1*cascade08ÿ1⁄1*cascade08⁄1˙1*cascade08˙1Á2 *cascade082Hfile:///c:/Users/kouki/.gemini/hifuu-kou-club/components/DiarySection.js