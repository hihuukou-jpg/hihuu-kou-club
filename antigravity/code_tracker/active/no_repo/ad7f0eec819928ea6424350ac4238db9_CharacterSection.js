¡]"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function CharacterSection() {
    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
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
            background: 'linear-gradient(to top, #0f172a 0%, #1e293b 100%)', // Deep Space for HSR contrast
            color: '#fff',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
        }}>

            {/* Tech Particles/Grid Background */}
            <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', opacity: 0.5 }}></div>

            {/* Selector Sidebar */}
            <div style={{
                width: isMobile ? '100%' : '140px',
                height: isMobile ? 'auto' : '100vh',
                background: 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(10px)',
                borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.1)',
                borderBottom: isMobile ? '1px solid rgba(255,255,255,0.1)' : 'none',
                zIndex: 10,
                display: 'flex',
                flexDirection: isMobile ? 'row' : 'column',
                justifyContent: isMobile ? 'center' : 'center',
                alignItems: 'center',
                paddingTop: isMobile ? '1rem' : '0',
                paddingBottom: isMobile ? '1rem' : '0',
                gap: '2rem',
                position: 'relative'
            }}>
                {data.map((char) => (
                    <button
                        key={char.id}
                        onClick={() => setSelectedId(char.id)}
                        style={{
                            position: 'relative',
                            width: '80px',
                            height: '80px',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {/* Rotated Square Frame (Diamond) */}
                        <div style={{
                            width: '60px', height: '60px',
                            transform: 'rotate(45deg)',
                            border: selectedId === char.id ? '2px solid var(--hsr-gold)' : '1px solid rgba(255,255,255,0.3)',
                            background: selectedId === char.id ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                            boxShadow: selectedId === char.id ? '0 0 15px rgba(212, 175, 55, 0.3)' : 'none',
                            overflow: 'hidden',
                            position: 'relative',
                            transition: 'all 0.3s ease'
                        }}>
                            <img
                                src={char.image_url || 'https://placehold.co/100x100'}
                                alt={char.name}
                                style={{
                                    width: '140%', height: '140%',
                                    objectFit: 'cover',
                                    transform: 'rotate(-45deg) translate(-15%, -15%)', // Counter-rotate image
                                    filter: selectedId === char.id ? 'none' : 'grayscale(100%) brightness(0.7)'
                                }}
                            />
                        </div>

                        {/* Active Indicator Line */}
                        {selectedId === char.id && !isMobile && (
                            <motion.div
                                layoutId="active-line"
                                style={{ position: 'absolute', right: '-2px', top: '50%', transform: 'translateY(-50%)', width: '4px', height: '40px', background: 'var(--hsr-cyan)', boxShadow: '0 0 10px var(--hsr-cyan)' }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Main Content Area */}
            <div style={{
                flex: 1,
                position: 'relative',
                height: isMobile ? 'calc(100vh - 120px)' : '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>

                {/* Background Geometric Rings */}
                <motion.div
                    key={`ring-${selectedId}`}
                    initial={{ rotate: 0, opacity: 0 }}
                    animate={{ rotate: 360, opacity: 1 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: 'absolute',
                        width: isMobile ? '300px' : '600px',
                        height: isMobile ? '300px' : '600px',
                        border: '1px dashed rgba(255,255,255,0.1)',
                        borderRadius: '50%',
                        zIndex: 0,
                        top: isMobile ? '5%' : 'auto'
                    }}
                />
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: 'absolute',
                        width: isMobile ? '250px' : '500px',
                        height: isMobile ? '250px' : '500px',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '50%',
                        zIndex: 0,
                        top: isMobile ? '8%' : 'auto'
                    }}
                />

                {/* Character Illustration */}
                <div style={{
                    zIndex: 1,
                    height: isMobile ? '55%' : '100%',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={selectedChar.image_url}
                            src={selectedChar.image_url}
                            alt={selectedChar.name}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.6, ease: "circOut" }}
                            style={{
                                height: '90%',
                                maxHeight: isMobile ? '50vh' : '90vh',
                                width: 'auto',
                                maxWidth: '90%',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.5))'
                            }}
                        />
                    </AnimatePresence>
                </div>

                {/* Description Box: Glass Panel */}
                <div style={{
                    position: isMobile ? 'relative' : 'absolute',
                    bottom: isMobile ? 'auto' : '10%',
                    right: isMobile ? 'auto' : '5%',
                    width: isMobile ? '90%' : '400px',
                    zIndex: 2,
                    marginBottom: isMobile ? '2rem' : '0'
                }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedId}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5 }}
                            className="hsr-glass"
                            style={{
                                padding: '2rem',
                                clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)', // Cut Corners
                                borderLeft: '4px solid var(--hsr-gold)',
                                background: 'rgba(15, 23, 42, 0.7)' // Overriding generic glass for darker look
                            }}
                        >
                            <div style={{
                                fontFamily: 'var(--font-mono)',
                                color: 'var(--hsr-cyan)',
                                fontSize: '0.8rem',
                                marginBottom: '0.5rem',
                                letterSpacing: '0.1em'
                            }}>
                                // {selectedChar.role}
                            </div>
                            <h2 style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: '2.5rem',
                                marginBottom: '1rem',
                                fontWeight: 'bold',
                                color: '#fff',
                                textShadow: '0 0 10px rgba(255,255,255,0.3)'
                            }}>
                                {selectedChar.name}
                            </h2>
                            <div style={{ width: '50px', height: '2px', background: 'var(--hsr-gold)', marginBottom: '1rem' }}></div>
                            <p style={{
                                fontFamily: 'var(--font-serif)',
                                lineHeight: '1.8',
                                fontSize: '0.95rem',
                                color: '#ddd'
                            }}>
                                {selectedChar.description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>

            <style jsx>{`
                /* Ensure clip-path works on the container */
                .hsr-glass {
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                }
            `}</style>
        </section>
    );
}
 *cascade08ÃÃÚ *cascade08ÚùùŒ *cascade08Œ*cascade08Ö *cascade08Ö¢¢Ç *cascade08Çß*cascade08ßà *cascade08àæ*cascade08æç *cascade08
çè èì*cascade08ìî*cascade08îï *cascade08ïò*cascade08òø*cascade08øú *cascade08
úş şÿ*cascade08ÿ€	 *cascade08€	‚	*cascade08
‚	ƒ	 ƒ	…	*cascade08…	†	 *cascade08†	‡	*cascade08
‡	ˆ	 ˆ	“	*cascade08“	”	 *cascade08”	˜	*cascade08˜	™	 *cascade08™	°	 *cascade08°	³	*cascade08³	ş	 *cascade08
ş	·
 ·
Î
 *cascade08Î
Ï
*cascade08Ï
Ğ
 *cascade08Ğ
Ù
*cascade08
Ù
Û
 Û
ä
*cascade08
ä
å
 å
„*cascade08„… *cascade08…*cascade08
 ¡*cascade08¡¢ *cascade08¢£*cascade08£¥ *cascade08¥²*cascade08²³ *cascade08³Á*cascade08ÁÃ *cascade08ÃÆ*cascade08ÆÇ *cascade08ÇÌ*cascade08ÌÍ *cascade08ÍÑ*cascade08
ÑÒ ÒÜ*cascade08
Üİ İğ*cascade08
ğñ ñù*cascade08ùú *cascade08ú*cascade08
 ¡*cascade08
¡¢ ¢É*cascade08ÉÊ *cascade08ÊÔ*cascade08ÔÕ *cascade08Õè*cascade08èé *cascade08é‡*cascade08
‡ˆ ˆ*cascade08
 §*cascade08
§¨ ¨¯*cascade08
¯° °ò*cascade08
òó óÕ*cascade08
ÕÖ Öè*cascade08
èé é*cascade08
ƒ ƒ*cascade08Ç *cascade08ÇÛÛİ *cascade08İŞ*cascade08Şı *cascade08ı‘‘¸ *cascade08
¸½ ½¾*cascade08
¾À ÀÁ*cascade08
ÁÂ ÂÃ*cascade08
ÃÄ ÄÆ*cascade08
ÆÈ ÈÉ*cascade08
ÉË ËÌ*cascade08
Ì÷ ÷ù*cascade08
ùü ü *cascade08±±¼ *cascade08¼Ï *cascade08ÏĞ*cascade08ĞÑ *cascade08Ñå *cascade08
å‰ ‰*cascade08
» »‰ *cascade08‰œœ¥ *cascade08
¥Ş Şß*cascade08
ßà àá*cascade08
áâ âã*cascade08
ãæ æ« *cascade08«¿¿Á *cascade08Áúúü *cascade08üü*cascade08ü” *cascade08”•*cascade08•¿ *cascade08
¿À À÷ *cascade08÷ù*cascade08ù¤ *cascade08¤¦*cascade08¦Ê *cascade08ÊÏ*cascade08ÏĞ *cascade08ĞÒ*cascade08ÒÕ *cascade08Õà*cascade08àŞ *cascade08Şß*cascade08ßá *cascade08áâ*cascade08âã *cascade08ãé*cascade08éê *cascade08êë*cascade08ë‹ *cascade08‹*cascade08 *cascade08“*cascade08“• *cascade08•™*cascade08™œ *cascade08œ*cascade08 *cascade08 *cascade08 ¡ *cascade08¡¢*cascade08¢£ *cascade08
£Â ÂÃ*cascade08
ÃÅ ÅÆ*cascade08
ÆÇ ÇÌ*cascade08
ÌÎ Îá*cascade08
áã ãö*cascade08
ö÷ ÷ø*cascade08
øû ûü*cascade08
üÿ ÿ€*cascade08
€ ƒ*cascade08
ƒ„ „‹*cascade08
‹Œ Œ*cascade08á *cascade08áä*cascade08äæ *cascade08æì*cascade08ìî *cascade08îï*cascade08ïğ *cascade08ğò*cascade08òó *cascade08óô*cascade08ôö *cascade08ö€*cascade08€Ğ *cascade08ĞÑ*cascade08ÑÒ *cascade08ÒÔ*cascade08Ôà *cascade08àá*cascade08áâ *cascade08âä*cascade08ä„ *cascade08„…*cascade08…‡ *cascade08‡ˆ*cascade08ˆ‰ *cascade08‰*cascade08 *cascade08‘*cascade08‘’ *cascade08’•*cascade08•– *cascade08–™*cascade08™› *cascade08›*cascade08ß *cascade08ßààé *cascade08éë*cascade08ëì *cascade08ìğ*cascade08ğò *cascade08òø*cascade08øı *cascade08ış*cascade08ş‡ *cascade08‡š *cascade08š›*cascade08›œ *cascade08œ¼ *cascade08¼Á*cascade08ÁÂ *cascade08ÂÆ*cascade08Æâ *cascade08âù*cascade08ùş *cascade08şÿ*cascade08ÿ *cascade08‚*cascade08‚… *cascade08…ˆ*cascade08ˆŠ *cascade08Š‹*cascade08‹© *cascade08©³*cascade08³´ *cascade08´¾*cascade08¾¿ *cascade08¿Â*cascade08ÂÃ *cascade08ÃÊ*cascade08ÊË *cascade08ËÌ*cascade08ÌÍ *cascade08ÍÏ*cascade08ÏĞ *cascade08ĞÑ*cascade08ÑÒ *cascade08ÒÖ*cascade08Ö× *cascade08×û*cascade08û‹  *cascade08‹ ‹ *cascade08‹ Œ  *cascade08Œ  *cascade08 ˜  *cascade08˜ ™ *cascade08™ š  *cascade08š Ÿ *cascade08Ÿ ¢  *cascade08¢ ¦ *cascade08¦ §  *cascade08§ ¨ *cascade08¨ ©  *cascade08© ª *cascade08ª Ä  *cascade08Ä Ø *cascade08Ø Ú  *cascade08Ú İ *cascade08İ ÷  *cascade08÷ ú *cascade08ú ü  *cascade08ü €!*cascade08€!…! *cascade08…!†!*cascade08†!‡! *cascade08‡!‹!*cascade08‹!Œ! *cascade08Œ!Œ!Œ!–!*cascade08–!°! *cascade08°!³!*cascade08³!Ó! *cascade08Ó!Õ!*cascade08Õ!÷! *cascade08÷!ş!*cascade08ş!ÿ! *cascade08ÿ!‡"*cascade08‡"ˆ" *cascade08ˆ"‘"*cascade08‘"’" *cascade08’"™"*cascade08™"œ" *cascade08œ"Ş"*cascade08Ş"®# *cascade08®#¯#*cascade08¯#°# *cascade08°#±#*cascade08±#²# *cascade08²#³#*cascade08³#¶# *cascade08¶#º#*cascade08º#½# *cascade08½#¾#*cascade08¾#Æ# *cascade08Æ#Ê#*cascade08Ê#ò# *cascade08ò#ó#*cascade08ó#ô# *cascade08ô#õ#*cascade08õ#ö# *cascade08ö#ù#*cascade08ù#ú# *cascade08ú#û#*cascade08û#ş# *cascade08ş#ƒ$*cascade08ƒ$«$ *cascade08«$¬$*cascade08¬$­$ *cascade08­$²$*cascade08²$³$ *cascade08³$´$*cascade08´$·$ *cascade08·$Å$*cascade08Å$Æ$ *cascade08Æ$Ê$*cascade08Ê$Í$ *cascade08Í$Ï$*cascade08Ï$Ñ$ *cascade08Ñ$Ö$*cascade08Ö$×$ *cascade08×$ä$*cascade08ä$æ$ *cascade08æ$ç$*cascade08ç$è$ *cascade08è$ğ$*cascade08ğ$ñ$ *cascade08ñ$ò$*cascade08ò$ó$ *cascade08ó$ô$*cascade08ô$õ$ *cascade08õ$õ$õ$›% *cascade08›%Ÿ%*cascade08Ÿ%¡% *cascade08¡%¥%*cascade08¥%§% *cascade08§%Ã%*cascade08Ã%Æ% *cascade08Æ%È%*cascade08È%É% *cascade08É%Ê%*cascade08Ê%Ë% *cascade08Ë%Ú%*cascade08Ú%Û% *cascade08Û%İ%*cascade08İ%Ş% *cascade08Ş%å%*cascade08å%ˆ& *cascade08ˆ&ˆ&*cascade08ˆ&Ä& *cascade08Ä&‚'*cascade08‚'¸' *cascade08¸'Å'*cascade08Å'ä' *cascade08ä'ä'*cascade08ä'¢( *cascade08¢(£(*cascade08£(ñ( *cascade08ñ(ò(*cascade08ò(ƒ) *cascade08ƒ)‰)*cascade08‰)‹) *cascade08‹)Œ)*cascade08Œ)’) *cascade08’)“) *cascade08
“)•) •)—)*cascade08
—)˜) ˜)™)*cascade08
™)š) š)¡)*cascade08¡)Í) *cascade08Í)Î)*cascade08Î)Ğ) *cascade08Ğ)Ô)*cascade08Ô)Ö) *cascade08Ö)×)*cascade08×)Ø) *cascade08Ø)Ú)*cascade08Ú)Û) *cascade08Û)Ü)*cascade08Ü)í) *cascade08í)î)*cascade08î)ï) *cascade08ï)ñ)*cascade08ñ)ô) *cascade08ô)õ)*cascade08õ)ö) *cascade08ö)÷)*cascade08÷)ø) *cascade08ø)‚**cascade08‚** *cascade08*¡*¡*¥* *cascade08¥*¿**cascade08¿*Á* *cascade08Á*Â**cascade08Â*Õ* *cascade08Õ*Ù*Ù*Û* *cascade08Û*á**cascade08á*ğ* *cascade08
ğ*ô* ô*õ**cascade08
õ*…+ …+°+ *cascade08
°+Ï+ Ï+à+
à+é+ é+ú+
ú+, ,¡,
¡,ª, 
ª,Ä, Ä,Å,*cascade08
Å,Í, 
Í,Ô, 
Ô,æ, 
æ,ö, ö,‡-
‡-¡- ¡-²-
²-Ç- 
Ç-ş- 
ş-„. „.„.*cascade08
„.¥. ¥.«.*cascade08
«.¬. ¬.­.*cascade08
­.®. ®.´.*cascade08
´.ò. ò.õ.*cascade08
õ.¦/ ¦/©/*cascade08
©/ª/ ª/«/*cascade08
«/ß/ ß/â/*cascade08
â/ã/ ã/ä/*cascade08
ä/ç/ ç/ê/*cascade08
ê/§0 §0Ë0*cascade08
Ë0¼1 ¼1Ñ1
Ñ1Ò1 Ò1Ó1*cascade08
Ó1û1 û12
2‘2 ‘2’2*cascade08
’2³2 ³2À2*cascade08
À2Á2 Á2Ç2*cascade08
Ç2È2 È2ù2*cascade08
ù2ú2 ú23*cascade08
3‚3 ‚3§3*cascade08
§3©3 ©3«3*cascade08
«3­3 ­3Ï3*cascade08
Ï3Ğ3 Ğ3Ô3*cascade08
Ô3Ö3 Ö3ã3*cascade08
ã3ä3 ä3¬4*cascade08
¬4­4 ­4¾4*cascade08
¾4¿4 ¿4Ì4*cascade08
Ì4Í4 Í4ù4*cascade08
ù4ú4 ú4¬5*cascade08
¬5­5 ­5¯5*cascade08
¯5°5 °5Ü5*cascade08
Ü5İ5 İ5û5*cascade08
û5ü5 ü5 6*cascade08
 6¡6 ¡6Ò6*cascade08
Ò6Ó6 Ó6à6*cascade08
à6â6 â6—7*cascade08
—7š7 š7›7*cascade08›7œ7*cascade08
œ77 7Ÿ7*cascade08
Ÿ7¤7 ¤7¥7 *cascade08¥7©7*cascade08
©7«7 «7¯7*cascade08¯7°7 *cascade08°7µ7*cascade08µ7¶7 *cascade08¶7Æ7*cascade08Æ7Ç7 *cascade08Ç7Ó7*cascade08Ó7Õ7 *cascade08Õ7×7*cascade08×7Ø7 *cascade08Ø7Û7*cascade08Û7Ü7 *cascade08Ü7ğ7*cascade08
ğ7Á8 
Á8í8 í8î8*cascade08
î8ù8 
ù8£9 £9£9*cascade08
£9ö9 ö9‹:
‹:–: –:«:
«:´: 
´:Á: Á:Â:*cascade08
Â:Ç: 
Ç:Î: 
Î:ˆ; 
ˆ;˜; ˜;­;
­;Ã; Ã;Ø;
Ø;ñ; 
ñ;ƒ< 
ƒ<”= ”=˜=*cascade08
˜=Î= Î=Ò=*cascade08
Ò=½> ½>¾>*cascade08
¾>À> À>Á>*cascade08
Á>ú> ú>û>*cascade08
û>ı> ı>ş>*cascade08
ş>³? ³?´?*cascade08
´?¶? ¶?·?*cascade08
·?¸? ¸?¹?*cascade08
¹?ô? ô?õ?*cascade08
õ?ş? ş?‚@*cascade08
‚@ŒA ŒA A
 A¡A ¡A£A*cascade08
£A¥A ¥A‡B
‡BC CC*cascade08
C´D ´DÁD*cascade08
ÁD„E „EœE
œEÅE ÅEÙE
ÙEüE üEF
F²F ²FÅF
ÅFÆF ÆFÈF*cascade08
ÈFìF ìF¨G
¨GøH øHùH*cascade08
ùHµI µI¶I*cascade08
¶IîI îIïI*cascade08
ïI¬J ¬J¯J*cascade08
¯JĞJ ĞJÑJ*cascade08
ÑJÒJ ÒJØJ*cascade08
ØJÚJ ÚJåJ*cascade08
åJƒK ƒK„K*cascade08
„K…K …K‹K*cascade08
‹KßK ßKäK*cascade08
äKåK åKçK*cascade08
çKêK êKîK*cascade08
îKïK ïKñK*cascade08
ñKôK ôKöK*cascade08
öK÷K ÷KùK*cascade08
ùKúK úKşK*cascade08
şKÿK ÿKL*cascade08
L‚L ‚L†L*cascade08
†L‡L ‡LL*cascade08
L‘L ‘L’L*cascade08
’L“L “L™L*cascade08
™LšL šL£L*cascade08
£L¤L ¤L¥L*cascade08
¥L¦L ¦L«L*cascade08
«L¬L ¬L±L*cascade08
±L²L ²L³L*cascade08
³L´L ´L¹L*cascade08
¹LºL ºL»L*cascade08
»L¼L ¼LÃL*cascade08
ÃLÄL ÄLÆL*cascade08
ÆLÇL ÇLÊL*cascade08
ÊLËL ËLÌL*cascade08
ÌLÎL ÎLĞL*cascade08
ĞLÑL ÑLÒL*cascade08
ÒLúL úLşL*cascade08
şLM M‚M*cascade08
‚M’M ’M“M*cascade08
“M•M •M˜M*cascade08
˜MÀM ÀMÇM*cascade08
ÇMĞM ĞMÒM*cascade08
ÒMÓM ÓMÖM*cascade08
ÖM×M ×MÚM*cascade08
ÚMÛM ÛMÜM*cascade08
ÜMŞM ŞMßM*cascade08
ßMàM 
àMâM âMäM*cascade08
äMåM åMïM*cascade08
ïMğM ğM÷M*cascade08
÷MøM øMıM*cascade08
ıMşM şMN*cascade08
N‚N ‚NN*cascade08
N«N «N­N*cascade08
­N­O ­O±O*cascade08
±OåO åOæO*cascade08
æOèO èOìO*cascade08
ìOP PŸP*cascade08
ŸPÜP ÜPİP*cascade08
İPÿP ÿP•Q*cascade08
•Q«Q «Q¸Q*cascade08
¸QÈQ ÈQÛQ*cascade08
ÛQ¬S ¬S®S*cascade08
®S™T ™TT*cascade08
TÊT ÊTÍT*cascade08
ÍTÎT ÎTÏT*cascade08
ÏTñT ñTU*cascade08
U·U ·UÔU*cascade08
ÔU´V ´V·W*cascade08
·WY Y Y*cascade08
 Y¡Y ¡Y¡Y*cascade08
¡YİZ İZİZ*cascade08
İZîZ îZÌ[ *cascade08Ì[Ó[*cascade08Ó[Ö[ *cascade08Ö[Ø[*cascade08Ø[Ù[ *cascade08Ù[ß[*cascade08ß[à[ *cascade08à[å[*cascade08å[æ[ *cascade08æ[è[*cascade08è[é[ *cascade08é[ì[*cascade08ì[í[ *cascade08í[û[*cascade08û[‹\ *cascade08‹\\*cascade08\\ *cascade08\\*cascade08\‘\ *cascade08‘\•\*cascade08•\–\ *cascade08–\—\*cascade08—\­\ *cascade08­\³\*cascade08³\´\ *cascade08´\µ\*cascade08µ\¶\ *cascade08¶\·\*cascade08·\¹\ *cascade08¹\Å\*cascade08Å\Æ\ *cascade08Æ\È\*cascade08È\Ê\ *cascade08Ê\Ò\*cascade08Ò\ÿ\ *cascade08ÿ\¡] *cascade082Lfile:///c:/Users/kouki/.gemini/hifuu-kou-club/components/CharacterSection.js