‚"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

const navItems = [
    { name: 'HOME', id: 'hero' },
    { name: 'NEWS', id: 'news' },
    { name: 'CONTENT', id: 'videos' },
    { name: 'CHARACTERS', id: 'characters' },
    { name: 'DIARY', id: 'diary' },
];

export default function Navigation() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 100,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '2rem 3rem',
                background: 'rgba(249, 248, 246, 0.8)',
                backdropFilter: 'blur(8px)',
                borderBottom: '1px solid rgba(0,0,0,0.05)'
            }}
        >
            {/* Logo Area */}
            <Link href="/#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{
                    width: '32px', height: '32px',
                    background: 'var(--hakurei-red)',
                    borderRadius: '50%',
                    display: 'grid', placeItems: 'center'
                }}>
                    <div style={{ width: '60%', height: '60%', background: '#fff', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', transform: 'translateY(-10%)' }}></div>
                </div>
                <span style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    color: 'var(--text-main)',
                    letterSpacing: '0.1em',
                    whiteSpace: 'nowrap'
                }}>
                    ç§˜å°å·¥å€¶æ¥½éƒ¨
                </span>
            </Link>

            {/* Nav Items */}
            <ul style={{ display: 'flex', gap: '3rem', listStyle: 'none' }}>
                {navItems.map((item) => (
                    <li key={item.name}>
                        <Link
                            href={`/#${item.id}`}
                            style={{
                                position: 'relative',
                                fontSize: '0.95rem',
                                fontFamily: 'var(--font-serif)',
                                color: 'var(--text-main)',
                                textDecoration: 'none',
                                letterSpacing: '0.05em'
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
                            fontSize: '0.9rem',
                            fontFamily: 'var(--font-serif)',
                            color: 'var(--hakurei-red)',
                            border: '1px solid var(--hakurei-red)',
                            padding: '0.4rem 1rem',
                            borderRadius: '20px'
                        }}
                    >
                        ADMIN
                    </Link>
                </li>
            </ul>
        </motion.nav>
    );
}
Y *cascade08YY*cascade08Y| *cascade08|€*cascade08€ƒ *cascade08ƒ…*cascade08…ˆ *cascade08ˆŒ*cascade08ŒŸ *cascade08Ÿ£*cascade08£¦ *cascade08¦¨*cascade08¨Â *cascade08Âôô÷ *cascade08÷ù*cascade08ùŒ *cascade08Œ™ *cascade08™*cascade08¡ *cascade08¡£*cascade08£¨ *cascade08¨«*cascade08«± *cascade08± *cascade08‚*cascade08‚ƒ *cascade08ƒ„*cascade08„â *cascade08âã*cascade08ãç *cascade08çè*cascade08è€ *cascade08€„*cascade08„† *cascade08†‰*cascade08‰’ *cascade08’”*cascade08”— *cascade08—™*cascade08™œ *cascade08œ*cascade08¢ *cascade08¢£*cascade08£Î *cascade08ÎÏ*cascade08Ïâ *cascade08â*cascade08¹ *cascade08¹Ø*cascade08ØÙ *cascade08ÙÚ*cascade08ÚÛ *cascade08Ûë*cascade08ëõ *cascade08õü*cascade08üı *cascade08ıÿ*cascade08ÿ	 *cascade08	ƒ	*cascade08ƒ	†	 *cascade08†	‰	*cascade08‰		 *cascade08		*cascade08		 *cascade08	”	*cascade08”	—	 *cascade08—	˜	*cascade08˜	™	 *cascade08™	›	*cascade08›		 *cascade08	Ÿ	*cascade08Ÿ	 	 *cascade08 	¤	*cascade08¤	¦	 *cascade08¦	«	*cascade08«	¬	 *cascade08¬	­	*cascade08­	®	 *cascade08®	´	*cascade08´	µ	 *cascade08µ	·	*cascade08·	¼	 *cascade08¼	¾	*cascade08¾	Ø	 *cascade08Ø	Ù	*cascade08Ù	Ú	 *cascade08Ú	Û	*cascade08Û	Ü	 *cascade08Ü	à	*cascade08à	â	 *cascade08â	‰
*cascade08‰
‹
 *cascade08‹
³
*cascade08³
µ
 *cascade08µ
ã*cascade08ãä *cascade08äç*cascade08çè *cascade08èé*cascade08éë *cascade08ëì*cascade08ìí *cascade08íğ*cascade08ğñ*cascade08ñü*cascade08üı *cascade08ı€*cascade08€ *cascade08Œ*cascade08Œ *cascade08*cascade08‘ *cascade08‘’*cascade08’“ *cascade08“”*cascade08”— *cascade08—›*cascade08›œ*cascade08œ *cascade08Ÿ *cascade08Ÿª*cascade08ª¬ *cascade08¬®*cascade08®¯ *cascade08¯Ğ*cascade08ĞÑ *cascade08ÑØ*cascade08ØÙ *cascade08ÙÛ *cascade08ÛÜ*cascade08Üİ *cascade08İâ*cascade08âã *cascade08ãë*cascade08ëì *cascade08ìî*cascade08îï *cascade08ïğ *cascade08ğö*cascade08öˆ *cascade08ˆœ*cascade08œ® *cascade08®±*cascade08±² *cascade08²Å*cascade08ÅÆ *cascade08ÆÌ*cascade08ÌÍ *cascade08ÍÎ*cascade08Î× *cascade08×İ*cascade08İŞ *cascade08Şß*cascade08ßà *cascade08àˆ*cascade08ˆŠ *cascade08Š³*cascade08³´ *cascade08´ã*cascade08ãå *cascade08åë*cascade08ëì *cascade08ìƒ*cascade08ƒ… *cascade08…‡*cascade08‡ˆ *cascade08ˆ’ *cascade08’½*cascade08½Ñ *cascade08ÑÒ *cascade08Òç*cascade08ç *cascade08‘*cascade08‘’ *cascade08’£ *cascade08£¤*cascade08¤¥ *cascade08¥§*cascade08§¸ *cascade08¸×*cascade08×û *cascade08ûü*cascade08üÁ *cascade08ÁÂ*cascade08ÂØ *cascade08ØÚ*cascade08ÚÜ *cascade08Üİ*cascade08İŞ *cascade08Şß*cascade08ßà *cascade08àá*cascade08áæ *cascade08æç*cascade08çè *cascade08èì*cascade08ì‚ *cascade08‚…*cascade08…† *cascade08†‡ *cascade08‡‹*cascade08‹¥ *cascade08¥¨*cascade08¨© *cascade08©«*cascade08«¬ *cascade08¬­*cascade08­® *cascade08®³*cascade08³¹ *cascade08¹½*cascade08½Ü *cascade08Üİ*cascade08İŞ *cascade08Şà*cascade08àá *cascade08áä*cascade08ä† *cascade08†ˆ*cascade08ˆ‰ *cascade08‰•*cascade08•™ *cascade08™›*cascade08›½ *cascade08½¾*cascade08¾À *cascade08ÀÄ*cascade08ÄÅ *cascade08ÅË*cascade08ËÌ*cascade08ÌÎ *cascade08ÎÑ*cascade08Ñó *cascade08óö*cascade08ö÷ *cascade08÷ø*cascade08øù *cascade08ùú*cascade08úû *cascade08ûı*cascade08ış *cascade08şÿ *cascade08ÿ€ *cascade08€Œ*cascade08Œ *cascade08‘*cascade08‘“ *cascade08“µ *cascade08µ¶*cascade08¶· *cascade08·¸ *cascade08¸º*cascade08º½ *cascade08½¾*cascade08¾¿ *cascade08¿Ã *cascade08ÃÆ*cascade08ÆÇ *cascade08ÇÉ *cascade08ÉË*cascade08ËÍ *cascade08Íñ *cascade08ñ÷*cascade08÷ø*cascade08øù *cascade08ùı*cascade08ış *cascade08şÿ*cascade08ÿ *cascade08‚ *cascade08‚…*cascade08…‡ *cascade08‡ª *cascade08ª«*cascade08«­ *cascade08­®*cascade08®¯ *cascade08¯° *cascade08°²*cascade08²³ *cascade08³´*cascade08´¶ *cascade08¶·*cascade08·¹ *cascade08¹º *cascade08º¾*cascade08¾¿ *cascade08¿À*cascade08ÀÁ *cascade08Áß *cascade08ßã*cascade08ãû *cascade08ûş*cascade08şš *cascade08š›*cascade08› *cascade08¥*cascade08¥¿ *cascade08¿Á *cascade08ÁÅ*cascade08ÅÈ *cascade08ÈÜ *cascade08ÜŞ*cascade08Şà *cascade08àá*cascade08áó *cascade08óø*cascade08øˆ *cascade08ˆ*cascade08– *cascade08–§*cascade08§Á *cascade08ÁÇ*cascade08ÇÈ *cascade08ÈÎ*cascade08Îè *cascade08èğ*cascade08ğ *cascade08*cascade08‘ *cascade08‘’ *cascade08’“*cascade08“” *cascade08”•*cascade08•™ *cascade08™› *cascade08›œ*cascade08œ *cascade08 *cascade08Ÿ*cascade08Ÿ¿ *cascade08¿Â*cascade08ÂÃ *cascade08ÃÆ*cascade08ÆÇ *cascade08ÇÉ*cascade08ÉË *cascade08ËÌ*cascade08ÌÎ*cascade08ÎÏ *cascade08ÏØ*cascade08ØÙ *cascade08Ùİ*cascade08İŞ *cascade08Şı *cascade08ıÿ*cascade08ÿ€ *cascade08€*cascade08„ *cascade08„… *cascade08…*cascade08‘ *cascade08‘—*cascade08—˜ *cascade08˜· *cascade08·¸*cascade08¸¹ *cascade08¹½*cascade08½¿ *cascade08¿À *cascade08ÀÊ*cascade08ÊĞ *cascade08Ğ×*cascade08×Ø *cascade08ØÛ*cascade08Ûİ *cascade08İü *cascade08üƒ*cascade08ƒ† *cascade08†‰*cascade08‰‹ *cascade08‹*cascade08 *cascade08‘*cascade08‘± *cascade08±²*cascade08²³ *cascade08³´ *cascade08´¸*cascade08¸¹ *cascade08¹º*cascade08º» *cascade08»½*cascade08½À *cascade08ÀÄ*cascade08Ä÷ *cascade08÷ø*cascade08ø’ *cascade08’—*cascade08—‚ *cascade082Ffile:///c:/Users/kouki/.gemini/hifuu-kou-club/components/Navigation.js